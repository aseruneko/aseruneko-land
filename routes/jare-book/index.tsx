import { Head } from "$fresh/runtime.ts";
import RoomCreateCard from "../../islands/jare-book/room-create-card.tsx";

export default function JareBook() {
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
          <RoomCreateCard />
        </section>
        <footer>
          <a href="https://twitter.com/aseruneko">@aseruneko</a>
        </footer>
      </div>
    </>
  );
}
