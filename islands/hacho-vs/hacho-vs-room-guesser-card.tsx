import { Signal, useComputed, useSignal } from "@preact/signals";
import { Card } from "../../components/shared/Card.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { post } from "../../src/post.ts";
import { HachoVS } from "../../src/hacho-vs/HachoVS.ts";
import HachoVSRoomIntervalComponent from "./hacho-vs-room-interval-component.tsx";

interface HachoVSRoomGuesserCard {
  userId: string;
  hacho: Signal<HachoVS | undefined>;
}

export default function HachoVSRoomGuesserCard(props: HachoVSRoomGuesserCard) {
  const guess = useSignal(0);
  const submitted = useSignal(false);
  const round = useComputed(() => {
    if (props.hacho.value) {
      return props.hacho.value.rounds[props.hacho.value.round];
    } else return undefined;
  });
  async function onClickSubmitButton() {
    submitted.value = true;
    await post(`../api/hacho-vs/hacho-vses/${props.hacho.value?.id}/guess`, {
      userId: props.userId,
      guess: guess.value,
    });
  }
  return (
    <>
      <Card width={512}>
        <div class="flex flex-col items-center">
          {round.value?.picked == undefined ||
              props.hacho.value?.status == "INTERVAL"
            ? ""
            : (
              <p>
                お題は<span style="font-weight: 700; font-size: 16px;">
                  『{round.value?.picked}』
                </span>です
              </p>
            )}
          {props.hacho.value?.status != "INTERVAL"
            ? (
              <div class="flex flex-row items-center my-1.5 gap-1.5">
                {round.value?.minLabel}
                <input
                  type="range"
                  min="0"
                  max="23"
                  step="1"
                  value={guess.value}
                  style="width: 240px"
                  onChange={(e: any) => guess.value = e.target.value}
                  disabled={!IS_BROWSER || round.value?.picked == undefined ||
                    props.hacho.value?.users.find((u) => u.id == props.userId)
                        ?.guess != undefined ||
                    submitted.value}
                >
                </input>
                {round.value?.maxLabel}
              </div>
            )
            : ""}
          {round.value?.picked && props.hacho.value?.status != "INTERVAL"
            ? (
              <button
                onClick={onClickSubmitButton}
                hidden={submitted.value}
                disabled={!IS_BROWSER || submitted.value ||
                  props.hacho.value?.users.find((u) => u.id == props.userId)
                      ?.guess != undefined}
                class="primary-btn my-1.5"
              >
                確定
              </button>
            )
            : ""}
          {props.hacho.value?.status == "INTERVAL"
            ? (
              <HachoVSRoomIntervalComponent
                userId={props.userId}
                hacho={props.hacho}
              />
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
