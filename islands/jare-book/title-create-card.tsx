import { Signal, useComputed } from "@preact/signals";
import { useSignal } from "@preact/signals";
import { computed } from "@preact/signals-core";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function JareBookRoomComponent(
  data: { editing: Signal<string> },
) {
  const firstWords: Signal<string>[] = [
    useSignal(""),
    useSignal(""),
    useSignal(""),
    useSignal(""),
  ];
  const firstWord: Signal<string | undefined> = useSignal(undefined);
  const secondWords: Signal<string>[] = [
    useSignal(""),
    useSignal(""),
    useSignal(""),
    useSignal(""),
  ];
  const secondWord: Signal<string | undefined> = useSignal(undefined);
  const thirdWord: Signal<string | undefined> = useSignal(undefined);
  const title: Signal<string | undefined> = useSignal(undefined);
  const titleSubmitted: Signal<boolean> = useSignal(false);
  const firstButtonDisabled = useComputed(() => {
    return firstWords.some((w) => w.value.length === 0);
  });
  const secondButtonDisabled = useComputed(() => {
    return secondWords.some((w) => w.value.length === 0);
  });
  function onClickFirstButton() {
    firstWord.value = firstWords[Math.floor(Math.random() * 4)].value;
  }
  function onClickSecondButton() {
    secondWord.value = secondWords[Math.floor(Math.random() * 4)].value;
    thirdWord.value =
      firstWords.map((w) => w.value).filter((w) =>
        w !== firstWord.value
      )[Math.floor(Math.random() * 3)];
  }
  function onClickTitleButton() {
    data.editing.value = title.value ?? "";
    titleSubmitted.value = true;
  }
  async function onClickRandomButton() {
    const res = await fetch(
      `/api/random-words?limit=4`,
      {
        method: "GET",
      },
    );
    const r = await res.json();
    firstWords[0].value = r[0];
    firstWords[1].value = r[1];
    firstWords[2].value = r[2];
    firstWords[3].value = r[3];
  }
  return (
    <div
      class="card small-card"
      style="width: 95vw; max-width: 480px;"
    >
      <h3>1. ランダムに単語を4つ書く</h3>
      <div>
        <input
          type="text"
          class="text-input mb-1 mr-1"
          value={firstWords[0].value}
          disabled={!IS_BROWSER}
          onInput={(e: any) => {
            firstWords[0].value = e.target.value;
          }}
        >
        </input>
        <input
          type="text"
          class="text-input mb-1 mr-1"
          value={firstWords[1].value}
          disabled={!IS_BROWSER}
          onInput={(e: any) => {
            firstWords[1].value = e.target.value;
          }}
        >
        </input>
      </div>
      <div>
        <input
          type="text"
          class="text-input mb-1 mr-1"
          value={firstWords[2].value}
          disabled={!IS_BROWSER}
          onInput={(e: any) => {
            firstWords[2].value = e.target.value;
          }}
        >
        </input>
        <input
          type="text"
          class="text-input mb-1 mr-1"
          value={firstWords[3].value}
          disabled={!IS_BROWSER}
          onInput={(e: any) => {
            firstWords[3].value = e.target.value;
          }}
        >
        </input>
      </div>
      {!firstWord.value
        ? (
          <div class="flex">
            <button
              class="primary-btn"
              disabled={!IS_BROWSER || firstButtonDisabled}
              onClick={onClickFirstButton}
            >
              書いた
            </button>
            <button
              class="secondory-btn ml-2"
              disabled={!IS_BROWSER}
              onClick={onClickRandomButton}
            >
              単語ガチャ
            </button>
          </div>
        )
        : ""}
      {firstWord.value
        ? (
          <>
            <h3 class="mt-2">2. そのうち1つに関連する単語を4つ書く</h3>
            <p>
              「<span class="font-bold">{firstWord}
              </span>」に関連する言葉を4つ書いて下さい
            </p>
            <div>
              <input
                type="text"
                class="text-input mb-1 mr-1"
                value={secondWords[0].value}
                disabled={!IS_BROWSER}
                onInput={(e: any) => {
                  secondWords[0].value = e.target.value;
                }}
              >
              </input>
              <input
                type="text"
                class="text-input mb-1 mr-1"
                value={secondWords[1].value}
                disabled={!IS_BROWSER}
                onInput={(e: any) => {
                  secondWords[1].value = e.target.value;
                }}
              >
              </input>
            </div>
            <div>
              <input
                type="text"
                class="text-input mb-1 mr-1"
                value={secondWords[2].value}
                disabled={!IS_BROWSER}
                onInput={(e: any) => {
                  secondWords[2].value = e.target.value;
                }}
              >
              </input>
              <input
                type="text"
                class="text-input mb-1 mr-1"
                value={secondWords[3].value}
                disabled={!IS_BROWSER}
                onInput={(e: any) => {
                  secondWords[3].value = e.target.value;
                }}
              >
              </input>
            </div>
            {!secondWord.value
              ? (
                <button
                  class="primary-btn"
                  disabled={!IS_BROWSER || secondButtonDisabled}
                  onClick={onClickSecondButton}
                >
                  書いた
                </button>
              )
              : ""}
          </>
        )
        : ""}
      {secondWord.value && thirdWord.value
        ? (
          <>
            <h3 class="pt-2">3. 2つの単語群から1つずつ組み合わせる</h3>
            <p>
              「<span class="font-bold">{thirdWord.value}
              </span>」と「<span class="font-bold">{secondWord.value}
              </span>」を組み合わせて小説のタイトルを作ってください
            </p>
            <div>
              <input
                type="text"
                class="text-input mb-1 mr-1"
                value={title.value}
                disabled={!IS_BROWSER}
                onInput={(e: any) => {
                  title.value = e.target.value;
                }}
              >
              </input>
            </div>
            <div class="flex gap-x-2">
              <button
                class="primary-btn"
                disabled={!IS_BROWSER || !title.value}
                onClick={onClickTitleButton}
                placeholder="タイトルを入力"
              >
                提出
              </button>
              {titleSubmitted.value
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
          </>
        )
        : ""}
    </div>
  );
}
