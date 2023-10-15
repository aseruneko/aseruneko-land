import { Signal, useComputed } from "@preact/signals";
import { Card } from "../../components/shared/Card.tsx";
import { useSignal } from "@preact/signals";
import { HachoVS } from "../../src/hacho-vs/HachoVS.ts";

interface HachoVSRoomInfoCardProps {
  hacho: Signal<HachoVS | undefined>;
}

export default function HachoVSRoomInfoCard(props: HachoVSRoomInfoCardProps) {
  const copied: Signal<boolean> = useSignal(false);
  function copyURL() {
    copied.value = true;
    navigator.clipboard.writeText(location.href);
  }
  return (
    <Card width={512}>
      <dl class="flex flex-wrap">
        <dt class="w-1/5">ルームID:</dt>
        <dd class="w-4/5">
          {props.hacho.value?.id}
          <span
            class="ml-1"
            style="color: #aaaaaa; cursor: pointer;"
            onClick={copyURL}
          >
            {copied.value ? "[copied!]" : "[copy]"}
          </span>
        </dd>
        <dt class="w-1/5">オーナー:</dt>
        <dd class="w-4/5">{props.hacho.value?.owner.name}</dd>
        <dt class="w-1/5">ステータス:</dt>
        <dd class="w-4/5">
          {useComputed(() => {
            if (props.hacho.value?.status == "WAITING") {
              return "待合中";
            }
            if (props.hacho.value?.status == "PICKING") {
              return "お題考え中";
            }
            if (props.hacho.value?.status == "GUESSING") {
              return "回答中";
            }
            if (props.hacho.value?.status == "INTERVAL") {
              return "インターバル";
            }
            if (props.hacho.value?.status == "FINISHED") {
              return "終了済";
            }
          })}
        </dd>
        {props.hacho.value?.status != "WAITING"
          ? (
            <>
              <dt class="w-1/5">ラウンド:</dt>
              <dd class="w-4/5">
                {(props.hacho.value?.round ?? 0) + 1} /{" "}
                {props.hacho.value?.maxRound ?? 0}
              </dd>
            </>
          )
          : ""}
      </dl>
      {props.hacho.value?.status == "PICKING" ||
          props.hacho.value?.status == "GUESSING"
        ? (
          <>
            <p class="py-2">
              <span class="font-bold">
                {props.hacho.value?.rounds[props.hacho.value?.round ?? 0]
                  .pickerName}
              </span>がpickerです
            </p>
          </>
        )
        : ""}
    </Card>
  );
}
