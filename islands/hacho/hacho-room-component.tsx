import { Signal, useComputed, useSignal } from "@preact/signals";
import { get } from "../../src/get.ts";
import { Hacho } from "../../src/hacho/Hacho.ts";
import HachoRoomJoinCard from "./hacho-room-join-card.tsx";
import { polling } from "../../src/polling.ts";
import HachoRoomWaitingCard from "./hacho-room-waiting-card.tsx";
import HachoRoomPlayCard from "./hacho-room-play-card.tsx";
import HachoRoomInfoCard from "./hacho-room-info-card.tsx";
import HachoRoomFinishedCard from "./hacho-room-finished-card.tsx";

interface HachoRoomComponentProps {
  id: string;
}
export default function HachoRoomComponent(props: HachoRoomComponentProps) {
  const hacho: Signal<Hacho | undefined> = useSignal(undefined);
  const userId: Signal<string | undefined> = useSignal(undefined);
  const userName: Signal<string | undefined> = useSignal(undefined);
  const password: Signal<string | undefined> = useSignal(undefined);
  const isMember = useComputed(() => {
    if (hacho.value && userId.value) {
      return hacho.value.users.some((u) => u.id == userId.value);
    } else return false;
  });
  async function onLoad() {
    loadLocalStorage();
    const response = await get(`/api/hacho/hachoes/${props.id}`).then((res) => {
      return res;
    }, () => {
      location.href = "/hacho";
    });
    hacho.value = response as Hacho;
    await checkUpdate();
  }
  async function checkUpdate() {
    if (hacho.value?.status != "FINISHED") {
      const updation = await polling(`../api/updation`, {
        id: props.id,
        updatedAt: new Date().toJSON(),
      });
      if (updation.isUpdated) {
        loadLocalStorage();
        hacho.value = await get(`/api/hacho/hachoes/${props.id}`);
      }
      await checkUpdate();
    }
  }
  function loadLocalStorage() {
    userId.value = window.localStorage.getItem("hacho-userId") ?? undefined;
    userName.value = window.localStorage.getItem("hacho-userName") ?? undefined;
    password.value = window.localStorage.getItem("hacho-password") ?? undefined;
  }
  self.addEventListener("load", onLoad);
  return (
    <>
      {(hacho.value && !isMember.value)
        ? <HachoRoomJoinCard roomId={props.id} />
        : ""}
      {isMember.value
        ? (
          <>
            {hacho.value ? <HachoRoomInfoCard hacho={hacho} /> : ""}
            {hacho.value?.status == "WAITING" && userId.value
              ? <HachoRoomWaitingCard userId={userId.value} hacho={hacho} />
              : ""}
            {hacho.value?.status == "ONGOING" && userId.value
              ? <HachoRoomPlayCard userId={userId.value} hacho={hacho} />
              : ""}
            {hacho.value?.status == "FINISHED" && userId.value
              ? <HachoRoomFinishedCard userId={userId.value} hacho={hacho} />
              : ""}
          </>
        )
        : ""}
    </>
  );
}
