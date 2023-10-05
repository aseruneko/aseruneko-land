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
        <section>
          <div class="card">
            hoge
          </div>
        </section>
        <footer>
          <a href="https://twitter.com/aseruneko">@aseruneko</a>
        </footer>
      </div>
    </>
  );
}
