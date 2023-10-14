import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/style.css"></link>
      </Head>
      <div class="wrapper">
        <header>
          <h1 class="logo">aseruneko-land.</h1>
        </header>
        <section class="centering">
          <div
            class="card"
            style="width: 95vw; max-width: 640px;"
          >
            <dl>
              <dt>
                <a href="/jare-book">jare-book</a>
              </dt>
              <dd>リレー小説アプリ</dd>
              <dt>
                <a href="/hacho">hacho</a>
              </dt>
              <dd>価値観共有ゲーム</dd>
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
