import { Signal, useSignal } from "@preact/signals";
import { JareBookRoom } from "../../src/jare-book/jare-book-room.ts";

export default function AllBooksViewCard() {
  const bookRooms: Signal<JareBookRoom[]> = useSignal([]);
  async function onLoad() {
    const res = await fetch(
      `/api/jare-book/books`,
    );
    const rs = await res.json();
    bookRooms.value = rs;
  }
  self.addEventListener("load", onLoad);
  return (
    <>
      <div
        class="card small-card"
        style="width: 480px; max-width: 95vw;"
      >
        <h3>過去の部屋</h3>
        <dl>
          {bookRooms.value.map((bookRoom, idx) => {
            return (
              <>
                <dt>
                  <a href={`/jare-book/rooms/${bookRoom.roomId}`}>
                    部屋{idx + 1}
                  </a>
                </dt>
                <dd>
                  {bookRoom.books.map((b) => b.title).join("/").length > 0
                    ? bookRoom.books.map((b) => b.title).join("/")
                    : "-"}
                </dd>
              </>
            );
          })}
        </dl>
      </div>
      <div class="centering">
        <button
          class="secondory-btn mt-1.5"
          onClick={() => location.href = "/jare-book"}
        >
          戻る
        </button>
      </div>
    </>
  );
}
