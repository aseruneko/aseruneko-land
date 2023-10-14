import { IS_BROWSER } from "$fresh/runtime.ts";
import { useComputed, useSignal } from "@preact/signals";
import { Card } from "../../components/shared/Card.tsx";
import { post } from "../../src/post.ts";
import {
  HachoCreateRequest,
  HachoCreateResponse,
} from "../../routes/api/hacho/create.ts";

export default function HachoRoomCreateCard() {
  const userName = useSignal("");
  const password = useSignal("");
  const maxRound = useSignal(1);
  const createButtonDisable = useComputed(() => {
    return userName.value.length == 0;
  });
  async function onClickCreateButton() {
    const response: HachoCreateResponse = await post(`/api/hacho/create`, {
      userName: userName.value,
      maxRound: maxRound.value.toString(),
      password: password.value.length > 0 ? password.value : undefined,
    } as HachoCreateRequest);
    window.localStorage.setItem("hacho-userId", response.userId);
    window.localStorage.setItem("hacho-userName", response.userName);
    if (response.password) {
      window.localStorage.setItem("hacho-password", response.password);
    }
    location.href = `/hacho/${response.roomId}`;
  }
  return (
    <Card width={480}>
      <h2>部屋を作る</h2>
      <dl class="flex flex-wrap items-center">
        <dt class="w-1/4 pl-2">ユーザ名*</dt>
        <dd class="w-3/4 p-1 flex justify-right pr-3">
          <input
            type="text"
            class="w-3/4"
            disabled={!IS_BROWSER}
            onInput={(e: any) => userName.value = e.target.value}
          >
          </input>
        </dd>
        <dt class="w-1/4 pl-2">部屋のパス</dt>
        <dd class="w-3/4 p-1 flex justify-right pr-3">
          <input
            type="text"
            class="w-3/4"
            disabled={!IS_BROWSER}
            onInput={(e: any) => password.value = e.target.value}
          >
          </input>
        </dd>
        <dt class="w-1/4 pl-2">ラウンド数</dt>
        <dd class="w-3/4 p-1 flex justify-right pr-3">
          <input
            type="number"
            max="12"
            min="1"
            class="w-1/5"
            value={maxRound.value}
            disabled={!IS_BROWSER}
            onInput={(e: any) => maxRound.value = e.target.value}
          >
          </input>
        </dd>
      </dl>
      <div class="flex justify-center">
        <button
          onClick={onClickCreateButton}
          class="primary-btn mt-1.5"
          disabled={!IS_BROWSER || createButtonDisable.value}
        >
          作成
        </button>
      </div>
    </Card>
  );
}
