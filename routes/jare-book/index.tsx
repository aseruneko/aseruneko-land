import { Head } from "$fresh/runtime.ts";
import BooksViewCard from "../../islands/jare-book/books-view-card.tsx";
import NameChangeCard from "../../islands/jare-book/name-change-card.tsx";
import RoomCreateCard from "../../islands/jare-book/room-create-card.tsx";

export default function JareBook() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/style.css"></link>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      <div class="wrapper">
        <header>
          <h1 class="logo">jare-book.</h1>
        </header>
        <section class="centering">
          <RoomCreateCard />
        </section>
        <section class="centering">
          <BooksViewCard />
        </section>
        <section class="centering">
          <NameChangeCard />
        </section>
        <section class="centering">
          <div
            class="card"
            style="width: 95vw; max-width: 480px;"
          >
            <h3>更新履歴</h3>
            <dl>
              <dt>v2.0.7</dt>
              <dd>@2023-10-07 保存された名前を変更できる</dd>
              <dt>v2.0.6</dt>
              <dd>
                @2023-10-09
                更新検知バグ修正、読込終了まで操作不可に、戻るボタン追加
              </dd>
              <dt>v2.0.5</dt>
              <dd>@2023-10-07 更新検知の仕組みを改善</dd>
              <dt>v2.0.4</dt>
              <dd>@2023-10-07 ランダム単語機能</dd>
              <dt>v2.0.3</dt>
              <dd>@2023-10-07 過去作品の閲覧、URLコピー機能</dd>
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
