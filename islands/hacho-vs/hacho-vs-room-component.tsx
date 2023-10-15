import { Signal, useComputed, useSignal } from "@preact/signals";
import { polling } from "../../src/polling.ts";
import { useEffect } from "preact/hooks";
import { HachoVS } from "../../src/hacho-vs/HachoVS.ts";
import HachoVSRoomJoinCard from "./hacho-vs-room-join-card.tsx";
import HachoVSRoomInfoCard from "./hacho-vs-room-info-card.tsx";
import { post } from "../../src/post.ts";
import HachoVSRoomWaitingCard from "./hacho-vs-room-waiting-card.tsx";
import HachoVSRoomPlayCard from "./hacho-vs-room-play-card.tsx";
import HachoVSRoomFinishedCard from "./hacho-vs-room-finished-card.tsx";

interface HachoVSRoomComponentProps {
  id: string;
}
export default function HachoVSRoomComponent(props: HachoVSRoomComponentProps) {
  const hacho: Signal<HachoVS | undefined> = useSignal(undefined);
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
    const response = await post(`/api/hacho-vs/hacho-vses/${props.id}`, {
      id: userId.value,
    })
      .then(
        (res) => {
          return res;
        },
        () => {
          location.href = "/hacho-vs";
        },
      );
    hacho.value = response as HachoVS;
    await checkUpdate(new Date().toJSON());
  }
  async function checkUpdate(date: string) {
    if (hacho.value?.status != "FINISHED") {
      const updation = await polling(`../api/updation-v2`, {
        id: props.id,
        updatedAt: date,
      });
      if (updation) {
        loadLocalStorage();
        hacho.value = await post(`/api/hacho-vs/hacho-vses/${props.id}`, {
          id: userId.value,
        });
      }
      await checkUpdate(updation.updatedAt);
    }
  }
  function loadLocalStorage() {
    userId.value = window.localStorage.getItem("hacho-vs-userId") ?? undefined;
    userName.value = window.localStorage.getItem("hacho-vs-userName") ??
      undefined;
    password.value = window.localStorage.getItem("hacho-vs-password") ??
      undefined;
  }
  useEffect(() => {
    onLoad();
  }, []);

  return (
    <>
      {(hacho.value && !isMember.value)
        ? <HachoVSRoomJoinCard roomId={props.id} />
        : ""}
      {isMember.value && userId.value
        ? (
          <>
            {hacho.value ? <HachoVSRoomInfoCard hacho={hacho} /> : ""}
            {userId.value
              ? <HachoVSRoomWaitingCard userId={userId.value} hacho={hacho} />
              : ""}
            {(hacho.value?.status == "PICKING" ||
                hacho.value?.status == "GUESSING" ||
                hacho.value?.status == "INTERVAL") && userId.value
              ? <HachoVSRoomPlayCard userId={userId.value} hacho={hacho} />
              : ""}
            {hacho.value?.status == "FINISHED" && userId.value
              ? <HachoVSRoomFinishedCard userId={userId.value} hacho={hacho} />
              : ""}
          </>
        )
        : ""}
    </>
  );
}
