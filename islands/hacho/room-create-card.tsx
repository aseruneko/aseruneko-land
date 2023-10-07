import { IS_BROWSER } from "$fresh/runtime.ts";
import { Card } from "../../components/shared/Card.tsx";
import { polling } from "../../src/polling.ts";

export default function HachoRoomCreateCard() {
  async function onClickCreateButton() {
    const updation = await polling(`/api/updation`, {
      id: "test",
      updatedAt: new Date(),
    });
    console.log(updation);
  }
  return (
    <Card width={480}>
      <h2>部屋を作る</h2>
      <dl class="flex flex-wrap items-center">
        <dt class="w-1/4 pl-2">ユーザ名</dt>
        <dd class="w-3/4 p-1">
          <input type="text" class="w-3/4"></input>
        </dd>
        <dt class="w-1/4 pl-2">部屋のパス</dt>
        <dd class="w-3/4 p-1">
          <input type="text" class="w-3/4"></input>
        </dd>
      </dl>
      <div class="flex justify-center">
        <button
          onClick={onClickCreateButton}
          class="primary-btn mt-1.5"
          disabled={!IS_BROWSER}
        >
          作成
        </button>
      </div>
    </Card>
  );
}
