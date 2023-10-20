import { Head } from "$fresh/runtime.ts";
import { Card } from "../../components/shared/Card.tsx";
import RandamaizaCard from "../../islands/randamaiza/randamaiza-card.tsx";

export default function RandamaizaPage() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/shared.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&family=Roboto+Mono&family=Special+Elite&family=Zen+Maru+Gothic:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div class="flex flex-col items-center">
        <h1 class="text-6xl my-4" style="font-family: 'Zen Maru Gothic'">
          RANDAMAIZA
        </h1>
        <p>ランダムな外来語(360語くらい)を表示します</p>
        <RandamaizaCard />
        <Card width={480}>
          <h2>更新履歴</h2>
          <dl class="flex flex-wrap py-1.5">
            <dt class="w-1/4">v1.0.0</dt>
            <dd class="w-3/4">@2023-10-20 完成</dd>
          </dl>
        </Card>
        <a href="../" class="button-like mt-2">戻る</a>
        <a href="https://twitter.com/aseruneko" class="my-3">@aseruneko</a>
      </div>
    </>
  );
}
