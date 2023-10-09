import { Signal, useSignal } from "@preact/signals";
import { JareBookRoom } from "../../src/jare-book/jare-book-room.ts";

export default function BooksViewCard() {
  const bookRooms: Signal<JareBookRoom[]> = useSignal([]);
  async function onLoad() {
    const res = await fetch(
      `/api/jare-book/books?limit=3`,
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
        <div class="flex justify-end">
          <a href={`/jare-book/rooms`} class="mr-3">全部見る</a>
        </div>
      </div>
    </>
  );
}
