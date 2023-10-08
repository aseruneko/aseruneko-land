import { Signal, useComputed, useSignal } from "@preact/signals";
import { get } from "../../src/get.ts";
import { Hacho } from "../../src/hacho/Hacho.ts";

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
  }
  function loadLocalStorage() {
    userId.value = window.localStorage.getItem("hacho-userId") ?? undefined;
    userName.value = window.localStorage.getItem("hacho-userName") ?? undefined;
    password.value = window.localStorage.getItem("hacho-password") ?? undefined;
  }
  window.onload = onLoad;
  return <>{isMember.value ? <div>{props.id}</div> : <p>notMember</p>}</>;
}