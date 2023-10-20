import { Head } from "$fresh/runtime.ts";
import { Card } from "../../components/shared/Card.tsx";
import HachoRoomCreateCard from "../../islands/hacho/hacho-room-create-card.tsx";

export default function HachoIndexPage() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/shared.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* @ts-ignore */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&family=Roboto+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div class="min-h-screen flex flex-col items-center">
        <h1
          class="text-6xl mt-6 mb-4"
          style="font-family: 'Poppins', sans-serif;
font-family: 'Roboto Mono', monospace;"
        >
          Hacho
        </h1>
        <Card width={360}>
          <ul>
            <li>価値観で遊ぶボードゲームです</li>
          </ul>
        </Card>
        <HachoRoomCreateCard />
        <Card width={480}>
          <h2>部屋に入る</h2>
          <ul>
            <li>ホストの人に部屋のURLを教えて貰ってください</li>
          </ul>
        </Card>
        <Card width={480}>
          <h2>更新履歴</h2>
          <dl class="flex flex-wrap py-1.5">
            <dt class="w-1/4">v1.0.1</dt>
            <dd class="w-3/4">
              @2023-10-14 ブラウザによる初期読込失敗問題改善
            </dd>
            <dt class="w-1/4">v1.0.0</dt>
            <dd class="w-3/4">@2023-10-14 完成</dd>
          </dl>
        </Card>
        <a href="../" class="button-like mt-2">戻る</a>
        <a href="https://twitter.com/aseruneko" class="my-3">@aseruneko</a>
      </div>
    </>
  );
}
