import { Signal, useComputed, useSignal } from "@preact/signals";
import { Card } from "../../components/shared/Card.tsx";
import { Hacho } from "../../src/hacho/Hacho.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { post } from "../../src/post.ts";

interface HachoRoomGuesserCard {
  userId: string;
  hacho: Signal<Hacho | undefined>;
}

export default function HachoRoomGuesserCard(props: HachoRoomGuesserCard) {
  const submitting = useSignal(false);
  const round = useComputed(() => {
    if (props.hacho.value) {
      return props.hacho.value.rounds[props.hacho.value.round];
    } else return undefined;
  });
  async function onChangeGuessSlider(guess: number) {
    await post(`../api/hacho/hachoes/${props.hacho.value?.id}/guess`, {
      guess: guess,
    });
  }
  async function onClickSubmitButton() {
    submitting.value = true;
    await post(`../api/hacho/hachoes/${props.hacho.value?.id}/submit`, {});
    submitting.value = false;
  }
  return (
    <>
      <Card width={512}>
        <div class="flex flex-col items-center">
          {round.value?.picked == undefined ? "" : (
            <p>
              お題は<span style="font-weight: 700; font-size: 16px;">
                『{round.value?.picked}』
              </span>です
            </p>
          )}
          <div class="flex flex-row items-center my-1.5 gap-1.5">
            {round.value?.minLabel}
            <input
              type="range"
              min="0"
              max="23"
              step="1"
              value={round.value?.guess ?? 0}
              style="width: 240px"
              onChange={(e: any) => onChangeGuessSlider(e.target.value)}
              disabled={!IS_BROWSER || round.value?.picked == undefined ||
                round.value.isSubmitted}
            >
            </input>
            {round.value?.maxLabel}
          </div>
          {round.value?.picked
            ? (
              <button
                onClick={onClickSubmitButton}
                hidden={round.value?.isSubmitted}
                disabled={!IS_BROWSER || submitting.value}
                class="primary-btn my-1.5"
              >
                確定
              </button>
            )
            : ""}
          {round.value?.isSubmitted
            ? (
              <>
                <p>正解は...</p>
                <div class="flex flex-row items-center my-1.5 gap-1.5">
                  {round.value?.minLabel}
                  <input
                    type="range"
                    min="0"
                    max="23"
                    step="1"
                    value={round.value?.correct ?? 0}
                    style="width: 240px"
                    disabled={true}
                  >
                  </input>
                  {round.value?.maxLabel}
                </div>
                <p>{round.value?.point ?? 0}ポイント獲得しました！</p>
              </>
            )
            : ""}
          {round.value?.picked == undefined
            ? "pickerがお題を考えています..."
            : ""}
        </div>
      </Card>
    </>
  );
}
