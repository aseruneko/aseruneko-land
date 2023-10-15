import { Signal, useComputed, useSignal } from "@preact/signals";
import { Card } from "../../components/shared/Card.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { post } from "../../src/post.ts";
import { HachoVS } from "../../src/hacho-vs/HachoVS.ts";

interface HachoVSRoomWaitingCardProps {
  userId: string;
  hacho: Signal<HachoVS | undefined>;
}

export default function HachoVSRoomWaitingCard(
  props: HachoVSRoomWaitingCardProps,
) {
  const submitting = useSignal(false);
  const startButtonDisabled = useComputed(() => {
    return submitting.value || (props.hacho.value?.users.length ?? 0) <= 1;
  });
  async function onClickStartButton() {
    if (props.hacho.value) {
      await post(
        `../api/hacho-vs/hacho-vses/${props.hacho.value.id}/start`,
        {},
      );
      submitting.value = false;
    }
  }
  return (
    <Card width={360}>
      <div class="flex justify-center pt-1.5">
        <h3>参加者</h3>
      </div>
      <table class="w-full my-1.5 mx-1.5">
        <thead>
          <tr>
            <th class="text-left">名前</th>
            <th class="text-left">点数</th>
            <th class="text-left">提出</th>
          </tr>
        </thead>
        <tbody>
          {props.hacho.value?.users.map((user) => {
            return (
              <tr>
                <td class="text-left">{user.name}</td>
                <td class="text-left">{user.point}点</td>
                <td class="text-left">
                  {user.guess != undefined ? "済" : "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {props.hacho.value?.owner.id == props.userId
        ? (
          <div class="flex justify-center pt-1 pb-2">
            <button
              class="primary-btn"
              hidden={props.hacho.value?.status != "WAITING"}
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
