import { IS_BROWSER } from "$fresh/runtime.ts";
import { Signal, useComputed, useSignal } from "@preact/signals";
import { Card } from "../../components/shared/Card.tsx";
import { post } from "../../src/post.ts";

export default function HachoVSRoomJoinCard(
  props: { roomId: string; userId: Signal<string | undefined> },
) {
  const userName = useSignal("");
  const password = useSignal("");
  const submitting = useSignal(false);
  const joinFailed = useSignal(false);
  const joinRoomDisabled = useComputed(() => {
    return userName.value.length == 0;
  });
  async function onClickJoinButton() {
    submitting.value = true;
    await post(`../api/hacho-vs/hacho-vses/${props.roomId}/join`, {
      userName: userName.value,
      password: password.value.length > 0 ? password.value : undefined,
    }).then((res) => {
      if (res.joined) {
        window.localStorage.setItem("hacho-vs-userId", res.userId);
        window.localStorage.setItem("hacho-vs-userName", userName.value);
        if (password.value.length > 0) {
          window.localStorage.setItem("hacho-vs-password", password.value);
        }
        props.userId.value = res.userId;
      } else {
        submitting.value = false;
        joinFailed.value = true;
      }
    }).catch(() => {
      submitting.value = false;
      joinFailed.value = true;
    });
  }
  return (
    <>
      <Card width={360}>
        <h3>部屋に入る</h3>
        <dl class="flex flex-wrap items-center">
          <dt class="w-1/3 pl-1">ユーザ名*</dt>
          <dd class="w-2/3 my-1 pr-1.5 flex justify-end">
            <input
              disabled={!IS_BROWSER || submitting}
              onInput={(ev: any) => userName.value = ev.target.value}
              type="text"
            >
            </input>
          </dd>
          <dt class="w-1/3 pl-1">パスワード</dt>
          <dd class="w-2/3 my-1 pr-1.5 flex justify-end">
            <input
              disabled={!IS_BROWSER || submitting}
              onInput={(ev: any) => password.value = ev.target.value}
              type="text"
            >
            </input>
          </dd>
        </dl>
        <div class="flex justify-center mt-1.5">
          <button
            disabled={!IS_BROWSER || submitting || joinRoomDisabled}
            onClick={onClickJoinButton}
            class="primary-btn"
          >
            入室
          </button>
        </div>
        {joinFailed.value
          ? <p style="color: #aaaaaa">入室できませんでした</p>
          : ""}
      </Card>
    </>
  );
}
