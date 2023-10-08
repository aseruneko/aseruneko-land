import { Signal, useSignal } from "@preact/signals";
import { JareBookRoom } from "../../src/jare-book/jare-book-room.ts";
import { User } from "../../src/user/user.ts";
import { JareBookBook } from "../../src/jare-book/jare-book-book.ts";
import { Room } from "../../src/room/room.ts";
import PageViewCard from "./page-view-card.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function PageEditCard(
  data: {
    room: Signal<Room | undefined>;
    user: Signal<User | undefined>;
    bookRoom: Signal<JareBookRoom | undefined>;
  },
) {
  const book: Signal<JareBookBook | undefined> = useSignal(undefined);
  const pageSubmitted: Signal<boolean> = useSignal(false);
  const content: Signal<string> = useSignal("");
  const pageForTimer: Signal<number> = useSignal(-1);
  const timer: Signal<number> = useSignal(-1);
  data.bookRoom.subscribe((br) => {
    if (br) {
      book.value = data.user.value?.id
        ? JareBookRoom.reconstruct(br).searchBook(data.user.value.id)
        : undefined;
      if (br.editingPageNum !== pageForTimer.value) {
        if (pageForTimer.value == -1) {
          setInterval(timerDecrease, 1000);
        }
        pageSubmitted.value = false;
        const pageEditor: any = document.getElementById("page-editor");
        if (pageEditor) pageEditor.value = "";
        pageForTimer.value = br.editingPageNum ?? 0;
        timer.value = br.limitMin * 60;
      }
    }
  });
  function timerDecrease() {
    if (timer.value > 0) {
      timer.value = timer.value - 1;
    }
  }
  async function onClickSubmitButton() {
    pageSubmitted.value = true;
    const res = await fetch(
      `/api/jare-book/jare-book-rooms/${data.bookRoom.value?.roomId}/edit-page`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: data.user.value?.id,
          pageNum: data.bookRoom.value?.editingPageNum,
          content: content.value,
        }),
      },
    );
    const r = await res.json();
    data.room.value = r.room;
    data.bookRoom.value = r.bookRoom;
  }
  return (
    <>
      <div
        class="card small-card"
        style="width: 95vw; max-width: 640px;"
      >
        <h3>『{book.value?.title}』</h3>
        {data.bookRoom.value?.editingPageNum &&
            data.bookRoom.value?.editingPageNum >= 1
          ? (
            <>
              <h3>{data.bookRoom.value?.editingPageNum ?? 0}ページ目</h3>
              <PageViewCard
                content={book.value
                  ?.pages[data.bookRoom.value?.editingPageNum - 1]
                  .content}
              />
            </>
          )
          : ""}
      </div>
      <div
        class="card small-card"
        style="width: 95vw; max-width: 640px;"
      >
        <h3>{(data.bookRoom.value?.editingPageNum ?? 0) + 1}ページ目</h3>
        <textarea
          id="page-editor"
          class="w-full h-40"
          disabled={!IS_BROWSER}
          onInput={(e: any) => {
            content.value = e.target.value;
          }}
        >
        </textarea>
        <div>
          残り時間: {Math.floor(timer.value / 60)}分{timer.value % 60}秒
        </div>
        <div class="flex gap-x-2 mt-2">
          <button
            class="primary-btn"
            disabled={!IS_BROWSER}
            onClick={onClickSubmitButton}
            placeholder="タイトルを入力"
          >
            提出
          </button>
          {pageSubmitted.value
            ? (
              <p style="color: #aaaaaa" class="pt-1">
                提出しました！
              </p>
            )
            : ""}
        </div>
        <p style="color: #aaaaaa" class="pt-1">
          全員揃うまで再提出可能です
        </p>
        <div class="flex items-center">
          青空文庫記法でルビを振ることができます
          <div class="tooltip ml-1">
            <span
              class="material-symbols-outlined help-icon"
              style="font-size: 14px"
            >
              help
            </span>
            <div
              class="description"
              style="width: 200px; left: -93px; top: -180px;"
            >
              <p>（例）</p>
              <p class="mt-4">
                とある超電磁砲《レールガン》が
              </p>
              <p>
                →とある<ruby>
                  超電磁砲<rt>レールガン</rt>
                </ruby>が
              </p>
              <p class="mt-4">
                ｜そう《・・》とは知らずに
              </p>
              <p class="pb-2">
                →<ruby>
                  そう<rt>・・</rt>
                </ruby>とは知らずに
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
