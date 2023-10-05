import { Signal } from "@preact/signals";
import { JareBookRoom } from "../../src/jare-book/jare-book-room.ts";

export default function PageViewCard(
  data: { bookRoom: Signal<JareBookRoom | undefined> },
) {
  return (
    <>
      {data.bookRoom.value?.books.map((book) => {
        return (
          <>
            <div
              class="card small-card"
              style="width: 95vw; max-width: 640px;"
            >
              <p>----------------------------------------</p>
              <h3>{book.title}</h3>
              <p>----------------------------------------</p>
              {book.pages.map((p) => {
                return (
                  <>
                    <div style="witdh: 100%; white-space: pre-wrap">
                      {p.content}
                    </div>
                    <p>----------------------------------------</p>
                  </>
                );
              })}
            </div>
          </>
        );
      })}
    </>
  );
}
