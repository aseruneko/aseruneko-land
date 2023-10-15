import { IS_BROWSER } from "$fresh/runtime.ts";
import { Signal, useComputed } from "@preact/signals";
import { Card } from "../../components/shared/Card.tsx";
import { HachoVS } from "../../src/hacho-vs/HachoVS.ts";
import HachoVSRoomHistoryCard from "./hacho-vs-room-history-card.tsx";

interface HachoVSRoomFinishedCardProps {
  userId: string;
  hacho: Signal<HachoVS | undefined>;
}
export default function HachoVSRoomFinishedCard(
  props: HachoVSRoomFinishedCardProps,
) {
  const winner = useComputed(() => {
    if (props.hacho.value) {
      const users = props.hacho.value.users;
      users.sort((a, b) => b.point - a.point);
      return users[0].name;
    } else return "";
  });
  return (
    <>
      <Card width={360}>
        <div class="flex flex-col items-center pt-1.5">
          <p>
            勝者は<span style="font-size: 16px; font-weight: 700">
              {winner.value}
            </span>でした！
          </p>
        </div>
      </Card>
      <HachoVSRoomHistoryCard userId={props.userId} hacho={props.hacho} />
      <button
        class="secondory-btn my-2"
        disabled={!IS_BROWSER}
        onClick={() => location.href = `/hacho-vs`}
      >
        戻る
      </button>
    </>
  );
}
