import { Signal, useComputed, useSignal } from "@preact/signals";
import { Card } from "../../components/shared/Card.tsx";
import { Hacho } from "../../src/hacho/Hacho.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { post } from "../../src/post.ts";

interface HachoRoomWaitingCardProps {
  userId: string;
  hacho: Signal<Hacho | undefined>;
}

export default function HachoRoomWaitingCard(props: HachoRoomWaitingCardProps) {
  const submitting = useSignal(false);
  const startButtonDisabled = useComputed(() => {
    return submitting.value || (props.hacho.value?.users.length ?? 0) <= 1;
  });
  async function onClickStartButton() {
    if (props.hacho.value) {
      await post(`../api/hacho/hachoes/${props.hacho.value.id}/start`, {});
      submitting.value = false;
    }
  }
  return (
    <Card width={240}>
      <div class="flex justify-center pt-1.5">
        <h3>参加者</h3>
      </div>
      <ul class="py-1.5">
        {props.hacho.value?.users.map((user) => {
          return <li>{user.name}</li>;
        })}
      </ul>
      {props.hacho.value?.owner.id == props.userId
        ? (
          <div class="flex justify-center pt-1 pb-2">
            <button
              class="primary-btn"
              disabled={!IS_BROWSER || startButtonDisabled}
              onClick={onClickStartButton}
            >
              開始
            </button>
          </div>
        )
        : ""}
    </Card>
  );
}
