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
        <section class="centering">
          <div
            class="card"
            style="width: 95vw; max-width: 480px;"
          >
            <h3>更新履歴</h3>
            <dl>
              <dt>v2.0.2</dt>
              <dd>@2023-10-06 ルビ機能の搭載</dd>
              <dt>v2.0.1</dt>
              <dd>@2023-10-06 バグ修正、作品公開の制御</dd>
              <dt>v2.0.0</dt>
              <dd>@2023-10-06 完成</dd>
            </dl>
          </div>
        </section>
        <footer>
          <a href="https://twitter.com/aseruneko">@aseruneko</a>
        </footer>
      </div>
    </>
  );
}
