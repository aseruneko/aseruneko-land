import { Signal, useComputed } from "@preact/signals";
import { HachoVS } from "../../src/hacho-vs/HachoVS.ts";

interface HachoVSRoomIntervalComponentProps {
  userId: string;
  hacho: Signal<HachoVS | undefined>;
}

export default function HachoVSRoomIntervalComponent(
  props: HachoVSRoomIntervalComponentProps,
) {
  const round = useComputed(() => {
    return props.hacho.value?.rounds[props.hacho.value?.round ?? 0];
  });
  return (
    <>
      <p>
        <span class="px-1">
          {round.value?.pickerName}
        </span>にとって<span class="px-1" style="font-weight: 700;">
          {round.value?.picked}
        </span>は...
      </p>
      <div class="flex flex-row items-center my-1.5 gap-1.5">
        {round.value?.minLabel}
        <input
          type="range"
          min="0"
          max="23"
          step="1"
          value={round.value?.correct ?? 0}
          style="width: 240px"
          disabled={true}
        >
        </input>
        {round.value?.maxLabel}
      </div>
      {props.hacho.value?.users.map((user) => {
        return (
          <>
            {user.id != round.value?.pickerId
              ? (
                <>
                  <p>{user.name}の回答:</p>
                  <div class="flex flex-row items-center my-1.5 gap-1.5">
                    {round.value?.minLabel}
                    <input
                      type="range"
                      min="0"
                      max="23"
                      step="1"
                      value={user.guess ?? 0}
                      style="width: 240px"
                      disabled={true}
                    >
                    </input>
                    {round.value?.maxLabel}
                  </div>
                </>
              )
              : ""}
          </>
        );
      })}
    </>
  );
}
