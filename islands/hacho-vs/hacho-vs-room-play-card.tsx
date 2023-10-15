import { Signal, useComputed } from "@preact/signals";
import { HachoVS } from "../../src/hacho-vs/HachoVS.ts";
import HachoVSRoomPickerCard from "./hacho-vs-room-picker-card.tsx";
import HachoVSRoomGuesserCard from "./hacho-vs-room-guesser-card.tsx";
import HachoVSRoomHistoryCard from "./hacho-vs-room-history-card.tsx";

interface HachoVSRoomPlayCardProps {
  userId: string;
  hacho: Signal<HachoVS | undefined>;
}

export default function HachoVSRoomPlayCard(props: HachoVSRoomPlayCardProps) {
  const isPicker = useComputed(() => {
    if (props.hacho.value) {
      return props.hacho.value.rounds[props.hacho.value.round].pickerId ==
        props.userId;
    } else return false;
  });
  return (
    <>
      <div>
        {isPicker.value
          ? <HachoVSRoomPickerCard userId={props.userId} hacho={props.hacho} />
          : <HachoVSRoomGuesserCard
            userId={props.userId}
            hacho={props.hacho}
          />}
      </div>
      <div>
        {(props.hacho.value?.round ?? 0) > 0
          ? <HachoVSRoomHistoryCard userId={props.userId} hacho={props.hacho} />
          : ""}
      </div>
    </>
  );
}
