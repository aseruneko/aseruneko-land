import { Signal, useComputed, useSignal } from "@preact/signals";
import { Card } from "../../components/shared/Card.tsx";
import { Hacho } from "../../src/hacho/Hacho.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { post } from "../../src/post.ts";

interface HachoRoomPickerCard {
  userId: string;
  hacho: Signal<Hacho | undefined>;
}

export default function HachoRoomPickerCard(props: HachoRoomPickerCard) {
  const pick = useSignal("");
  const submitting = useSignal(false);
  const round = useComputed(() => {
    if (props.hacho.value) {
      return props.hacho.value.rounds[props.hacho.value.round];
    } else return undefined;
  });
  async function onClickSubmitButton() {
    submitting.value = true;
    await post(`../api/hacho/hachoes/${props.hacho.value?.id}/pick`, {
      userId: props.userId,
      pick: pick.value,
    });
    submitting.value = false;
  }
  async function onClickNextButton() {
    submitting.value = true;
    await post(`../api/hacho/hachoes/${props.hacho.value?.id}/next`, {});
    submitting.value = false;
  }
  return (
    <>
      <Card width={512}>
        <div class="flex flex-col items-center">
          <div class="flex flex-row items-center my-1.5 gap-1.5">
            {round.value?.minLabel}
            <input
              type="range"
              min="0"
              max="23"
              step="1"
              value={round.value?.correct}
              style="width: 240px"
              disabled={true}
            >
            </input>
            {round.value?.maxLabel}
          </div>
          {round.value?.picked == undefined
            ? (
              <>
                <p class="mt-2">スライダーにちょうど当てはまる</p>
                <p class="mb-2">単語を一つ考えてください</p>
                <input
                  type="string"
                  class="pt-1.5"
                  style="width: 260px"
                  value={pick.value}
                  onInput={(e: any) => pick.value = e.target.value}
                >
                </input>
                <button
                  onClick={onClickSubmitButton}
                  disabled={!IS_BROWSER || submitting.value ||
                    pick.value.length == 0}
                  class="primary-btn my-1.5"
                >
                  提出
                </button>
              </>
            )
            : (
              <>
                <p>
                  {round.value.isSubmitted
                    ? "guesserの回答は..."
                    : "guesserが回答を考えています..."}
                </p>
                <div class="flex flex-row items-center my-1.5 gap-1.5">
                  {round.value?.minLabel}
                  <input
                    type="range"
                    min="0"
                    max="23"
                    step="1"
                    value={round.value?.guess ?? 0}
                    style="width: 240px"
                    disabled={true}
                  >
                  </input>
                  {round.value?.maxLabel}
                </div>
              </>
            )}
          {round.value?.isSubmitted
            ? (
              <>
                <p>{round.value?.point ?? 0}ポイント獲得しました！</p>
                <button
                  onClick={onClickNextButton}
                  disabled={!IS_BROWSER || submitting.value}
                  class="primary-btn my-1.5"
                >
                  次へ
                </button>
              </>
            )
            : ""}
        </div>
      </Card>
    </>
  );
}
