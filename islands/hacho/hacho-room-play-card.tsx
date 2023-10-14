import { Signal, useComputed } from "@preact/signals";
import { Hacho } from "../../src/hacho/Hacho.ts";
import HachoRoomPickerCard from "./hacho-room-picker-card.tsx";
import HachoRoomGuesserCard from "./hacho-room-guesser-card.tsx";
import HachoRoomHistoryCard from "./hacho-room-history-card.tsx";

interface HachoRoomPlayCardProps {
  userId: string;
  hacho: Signal<Hacho | undefined>;
}

export default function HachoRoomPlayCard(props: HachoRoomPlayCardProps) {
  const isPicker = useComputed(() => {
    if (props.hacho.value) {
      return props.hacho.value.rounds[props.hacho.value.round].picker.id ==
        props.userId;
    } else return false;
  });
  return (
    <>
      {isPicker.value
        ? <HachoRoomPickerCard userId={props.userId} hacho={props.hacho} />
        : <HachoRoomGuesserCard userId={props.userId} hacho={props.hacho} />}
      {(props.hacho.value?.round ?? 0) > 0
        ? <HachoRoomHistoryCard userId={props.userId} hacho={props.hacho} />
        : ""}
    </>
  );
}
