import { IS_BROWSER } from "$fresh/runtime.ts";
import { Signal, useComputed } from "@preact/signals";
import { Card } from "../../components/shared/Card.tsx";
import { Hacho } from "../../src/hacho/Hacho.ts";
import HachoRoomHistoryCard from "./hacho-room-history-card.tsx";

interface HachoRoomFinishedCardProps {
  userId: string;
  hacho: Signal<Hacho | undefined>;
}
export default function HachoRoomFinishedCard(
  props: HachoRoomFinishedCardProps,
) {
  return (
    <>
      <Card width={240}>
        <div class="flex justify-center pt-1.5">
          <h3>参加者</h3>
        </div>
        <ul class="py-1.5">
          {props.hacho.value?.users.map((user) => {
            return <li>{user.name}</li>;
          })}
        </ul>
      </Card>
      <Card width={360}>
        <div class="flex flex-col items-center pt-1.5">
          <p>
            あなたたちの点数は<span style="font-size: 24px; font-weight: 700">
              {props.hacho.value?.point ?? 0}
            </span>/{(props.hacho.value?.maxRound ?? 0) * 7}点でした！
          </p>
          <p class="pb-3">
            {useComputed(() => {
              const ratio = (props.hacho.value?.point ?? 0) /
                ((props.hacho.value?.maxRound ?? 1) * 7);
              if (ratio == 1.0) return "同一人物なレベルなようです...";
              if (
                ratio > 0.9
              ) return "お互いを知り尽くしているレベルなようです...";
              if (ratio > 0.8) return "背中を預けられる相棒レベルなようです...";
              if (ratio > 0.7) return "絶対不滅永久親友レベルなようです...";
              if (ratio > 0.6) return "カップルyoutuberレベルなようです...";
              if (ratio > 0.5) return "親友レベルなようです...";
              if (ratio > 0.4) return "友だちレベルなようです...";
              if (ratio > 0.3) return "知り合いレベルなようです...";
              if (ratio > 0.2) return "名前を知っているレベルなようです...";
              if (ratio > 0.1) return "顔を見たことはあるレベルなようです...";
              return "赤の他人のレベルなようです...";
            }).value}
          </p>
        </div>
      </Card>
      <HachoRoomHistoryCard userId={props.userId} hacho={props.hacho} />
      <button
        class="secondory-btn my-2"
        disabled={!IS_BROWSER}
        onClick={() => location.href = `/hacho`}
      >
        戻る
      </button>
    </>
  );
}
