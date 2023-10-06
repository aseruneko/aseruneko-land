import { Head } from "$fresh/runtime.ts";
import AllBooksViewCard from "../../../islands/jare-book/all-books-view-card.tsx";

export default function JareBookRooms() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/style.css"></link>
      </Head>
      <div class="wrapper">
        <header>
          <h1 class="logo">jare-book.</h1>
        </header>
        <section class="centering">
          <AllBooksViewCard />
        </section>
        <footer>
          <a href="https://twitter.com/aseruneko">@aseruneko</a>
        </footer>
      </div>
    </>
  );
}
