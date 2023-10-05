import { Signal, useComputed, useSignal } from "@preact/signals";
import { JareBookRoom } from "../../src/jare-book/jare-book-room.ts";
import { User } from "../../src/user/user.ts";
import { Head } from "$fresh/runtime.ts";
import { Room } from "../../src/room/room.ts";
import TitleCreateCard from "./title-create-card.tsx";
import { useEffect } from "preact/hooks";
import PageEditCard from "./page-edit-card.tsx";
import PageViewCard from "./book-view-card.tsx";

export default function JareBookRoomComponent(data: { roomId: string }) {
  const room: Signal<Room | undefined> = useSignal(undefined);
  const bookRoom: Signal<JareBookRoom | undefined> = useSignal(undefined);
  const user: Signal<User | undefined> = useSignal(undefined);
  const editingTitle: Signal<string> = useSignal("");
  editingTitle.subscribe((title) => {
    if (title.length > 0) submitTitle();
  });
  async function onLoad() {
    user.value = await verifyUser();
    room.value = await verifyRoom();
    bookRoom.value = await verifyBookRoom();
    setInterval(checkUpdate, 10000);
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
      const res = await fetch(
        `/api/rooms/${data.roomId}/is-updated`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ updatedAt: room.value?.updatedAt.toString() }),
        },
      );
      const updated = await res.json();
      if (updated.isUpdated) {
        room.value = await verifyRoom();
        bookRoom.value = await verifyBookRoom();
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
      </Head>
      <div class="wrapper">
        <section class="centering">
          <div
            class="card small-card"
            style="width: 95vw; max-width: 416px;"
          >
            <dl>
              <dt>ユーザ名</dt>
              <dd>
                {user.value?.name}
              </dd>
              <dt>部屋ID</dt>
              <dd>
                {bookRoom.value?.roomId}
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
            ? <PageViewCard bookRoom={bookRoom} />
            : ""}
        </section>
      </div>
    </>
  );
}
