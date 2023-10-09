import { IS_BROWSER } from "$fresh/runtime.ts";
import { Signal, useSignal } from "@preact/signals";

export default function NameChangeCard() {
  const userName: Signal<string | undefined> = useSignal(undefined);
  const newName: Signal<string> = useSignal("");
  function changeName() {
    window.localStorage.setItem("userName", newName.value);
    userName.value = window.localStorage.getItem("userName") ?? undefined;
    newName.value = "";
  }
  self.addEventListener("load", () => {
    userName.value = window.localStorage.getItem("userName") ?? undefined;
  });
  return (
    <>
      <div
        class="card small-card"
        style="width: 480px; max-width: 95vw;"
      >
        <h3>保存された名前を変更する</h3>
        <dl>
          <dt>現在の名前</dt>
          <dd>{userName.value ? userName.value : "---"}</dd>
          <dt>新しい名前</dt>
          <dd>
            <input
              type="text"
              class="text-input"
              disabled={!IS_BROWSER}
              onInput={(e: any) => newName.value = e.target.value}
            >
            </input>
          </dd>
        </dl>
        <div class="flex justify-center">
          <button
            class="secondory-btn mt-1.5"
            disabled={!IS_BROWSER}
            onClick={changeName}
          >
            変更
          </button>
        </div>
      </div>
    </>
  );
}
