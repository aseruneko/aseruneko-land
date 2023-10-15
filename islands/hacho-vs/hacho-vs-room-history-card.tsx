import { Signal } from "@preact/signals";
import { Card } from "../../components/shared/Card.tsx";
import { HachoVS } from "../../src/hacho-vs/HachoVS.ts";

interface HachoVSRoomHistoryCardProps {
  userId: string;
  hacho: Signal<HachoVS | undefined>;
}

export default function HachoVSRoomHistoryCard(
  props: HachoVSRoomHistoryCardProps,
) {
  return (
    <>
      <Card width={512}>
        <div class="flex flex-col items-center">
          {props.hacho.value?.rounds.map((round, idx) => {
            if (
              (props.hacho.value?.round ?? 0) > idx ||
              props.hacho.value?.status == "FINISHED"
            ) {
              return (
                <>
                  <p>
                    <span class="px-1">
                      {round.pickerName}
                    </span>にとって<span class="px-1" style="font-weight: 700;">
                      {round.picked}
                    </span>は...
                  </p>
                  <div class="flex flex-row items-center my-1.5 gap-1.5">
                    {round.minLabel}
                    <input
                      type="range"
                      min="0"
                      max="23"
                      step="1"
                      value={round.correct}
                      style="width: 240px"
                      disabled={true}
                    >
                    </input>
                    {round.maxLabel}
                  </div>
                </>
              );
            }
          })}
        </div>
      </Card>
    </>
  );
}
