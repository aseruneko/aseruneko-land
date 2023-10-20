import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { Card } from "../../components/shared/Card.tsx";
import { get } from "../../src/get.ts";
import { useEffect } from "preact/hooks";

export default function RandamaizaCard() {
  const text = useSignal("");
  const submitting = useSignal(false);
  async function clickGenerateButton() {
    submitting.value = true;
    const response = await get(`/api/randamaiza`);
    text.value = response.text;
    submitting.value = false;
  }
  useEffect(() => {
    clickGenerateButton();
  });
  return (
    <Card width={512}>
      <div class="flex flex-col items-center">
        <div
          class="flex flex-col items-center justify-center"
          style="width: 480px; height: 100px; background-color: #eeeeee; border-radius: 4px;"
        >
          <p class="text-4xl" style="font-family: 'Zen Maru Gothic'">
            {text}
          </p>
        </div>
        <button
          class="primary-btn mt-2"
          onClick={clickGenerateButton}
          disabled={!IS_BROWSER || submitting}
        >
          生成
        </button>
      </div>
    </Card>
  );
}
