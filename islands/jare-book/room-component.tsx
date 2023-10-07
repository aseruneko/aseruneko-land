import { Signal, useComputed, useSignal } from "@preact/signals";
import { JareBookRoom } from "../../src/jare-book/jare-book-room.ts";
import { User } from "../../src/user/user.ts";
import { Head } from "$fresh/runtime.ts";
import { Room } from "../../src/room/room.ts";
import TitleCreateCard from "./title-create-card.tsx";
import PageEditCard from "./page-edit-card.tsx";
import BookViewCard from "./book-view-card.tsx";
import { polling } from "../../src/polling.ts";

export default function JareBookRoomComponent(data: { roomId: string }) {
  const room: Signal<Room | undefined> = useSignal(undefined);
  const bookRoom: Signal<JareBookRoom | undefined> = useSignal(undefined);
  const user: Signal<User | undefined> = useSignal(undefined);
  const editingTitle: Signal<string> = useSignal("");
  const copied: Signal<boolean> = useSignal(false);
  editingTitle.subscribe((title) => {
    if (title.length > 0) submitTitle();
  });
  async function onLoad() {
    user.value = await verifyUser();
    room.value = await verifyRoom();
    bookRoom.value = await verifyBookRoom();
    checkUpdate();
  }
  async function verifyRoom(): Promise<Room> {
    const res = await fetch(`/api/rooms/${data.roomId}`);
    return await res.json();
  }
  async function verifyBookRoom(): Promise<JareBookRoom> {
    const res = await fetch(`/api/jare-book/jare-book-rooms/${data.roomId}`);
    return await res.json();
  }
  async function verifyUser(): Promise<User> {
    const localUser = localStorage.getItem("user");
    const parsedUser = localUser ? JSON.parse(localUser) : undefined;
    if (parsedUser) {
      const res = await fetch(
        `/api/jare-book/jare-book-rooms/${data.roomId}/join-by-id`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: parsedUser.id,
            userName: parsedUser.name,
          }),
        },
      );
      return parsedUser;
    } else {
      const userName = window.prompt("ユーザ名を入力して下さい");
      const res = await fetch(
        `/api/jare-book/jare-book-rooms/${data.roomId}/join-by-name`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName: userName }),
        },
      );
      const u = await res.json();
      localStorage.setItem("user", JSON.stringify(u));
      return u;
    }
  }
  async function checkUpdate() {
    if (!(bookRoom.value?.status == "FINISHED")) {
      const updated = await polling(`/api/updation`, {
        id: data.roomId,
        updatedAt: new Date(),
      });
      if (updated.isUpdated) {
        room.value = await verifyRoom();
        bookRoom.value = await verifyBookRoom();
        checkUpdate();
      }
    }
  }
  async function onClickStart() {
    const res = await fetch(
      `/api/jare-book/jare-book-rooms/${data.roomId}/start`,
      {
        method: "POST",
      },
    );
    const r = await res.json();
    room.value = r.room;
    bookRoom.value = r.bookRoom;
  }
  async function submitTitle() {
    const title = editingTitle.value;
    editingTitle.value = "";
    const res = await fetch(
      `/api/jare-book/jare-book-rooms/${data.roomId}/title`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.value?.id,
          title: title,
        }),
      },
    );
    const r = await res.json();
    room.value = r.room;
    bookRoom.value = r.bookRoom;
  }
  function copyURL() {
    copied.value = true;
    navigator.clipboard.writeText(location.href);
  }
  window.onload = onLoad;
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/style.css"></link>
        <link
          href="https://cdn.quilljs.com/1.3.6/quill.snow.css"
          rel="stylesheet"
        >
        </link>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      <div class="wrapper">
        <section class="centering">
          <div
            class="card small-card"
            style="width: 95vw; max-width: 512px;"
          >
            <dl>
              <dt>部屋ID</dt>
              <dd>
                {bookRoom.value?.roomId}
                <div
                  class="ml-1"
                  style="color: #aaaaaa; cursor: pointer;"
                  onClick={copyURL}
                >
                  {copied.value ? "[copied!]" : "[copy]"}
                </div>
              </dd>
              <dt>ページ数</dt>
              <dd>
                {bookRoom.value?.pageNum}ページ
              </dd>
              <dt>制限時間</dt>
              <dd>
                {bookRoom.value?.limitMin}分
              </dd>
              <dt>ランダム順</dt>
              <dd>
                {bookRoom.value?.isRandom ? "TRUE" : "FALSE"}
              </dd>
              <dt>作品の公開</dt>
              <dd>
                {bookRoom.value?.isPublished ? "公開する" : "公開しない"}
              </dd>
              <dt>ステータス</dt>
              <dd>
                {useComputed(() => {
                  switch (bookRoom.value?.status) {
                    case "WAITING":
                      return "待合中";
                    case "TITLING":
                      return "タイトル考え中";
                    case "WRITING":
                      return `${
                        (bookRoom.value?.editingPageNum ?? 0) + 1
                      }ページ目を執筆中`;
                    case "FINISHED":
                      return "終了済";
                    default:
                      return "その他";
                  }
                })}
              </dd>
            </dl>
          </div>
          <div
            class="card small-card"
            style="width: 95vw; max-width: 320px;"
          >
            <table>
              <thead>
                <tr>
                  <th>名前</th>
                  <th class="w-1/5">提出</th>
                </tr>
              </thead>
              <tbody>
                {bookRoom.value?.users.map((user) => {
                  return (
                    <tr>
                      <td>{user.user.name}</td>
                      <td>{user.isReady ? "済" : "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {useComputed(() => {
              if (
                user.value?.id && bookRoom.value?.status === "WAITING" &&
                room.value?.owner.id === user.value?.id
              ) {
                return (
                  <div class="centering" style="margin-top: 8px">
                    <button class="primary-btn" onClick={onClickStart}>
                      開始
                    </button>
                  </div>
                );
              }
            }).value}
          </div>
          {bookRoom.value?.status === "TITLING"
            ? <TitleCreateCard editing={editingTitle} />
            : ""}
          {bookRoom.value?.status === "WRITING"
            ? <PageEditCard room={room} user={user} bookRoom={bookRoom} />
            : ""}
          {bookRoom.value?.status === "FINISHED"
            ? <BookViewCard bookRoom={bookRoom} />
            : ""}
        </section>
      </div>
    </>
  );
}
