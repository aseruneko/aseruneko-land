import { Signal } from "@preact/signals";
import { JareBookRoom } from "../../src/jare-book/jare-book-room.ts";
import PageViewCard from "./page-view-card.tsx";

export default function BookViewCard(
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
                    <PageViewCard content={p.content} />
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
