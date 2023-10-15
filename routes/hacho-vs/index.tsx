import { Head } from "$fresh/runtime.ts";
import { Card } from "../../components/shared/Card.tsx";
import HachoVSRoomCreateCard from "../../islands/hacho-vs/hacho-vs-room-create-card.tsx";

export default function HachoVSIndexPage() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/shared.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* @ts-ignore */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&family=Roboto+Mono&family=Special+Elite&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div class="min-h-screen flex flex-col items-center">
        <h1
          class="text-6xl mt-6 mb-4"
          style="font-family: 'Special Elite', sans-serif;"
        >
          HachoVS
        </h1>
        <Card width={360}>
          <ul>
            <li>価値観で遊ぶボードゲーム（対戦版）です</li>
          </ul>
        </Card>
        <HachoVSRoomCreateCard />
        <Card width={480}>
          <h2>部屋に入る</h2>
          <ul>
            <li>ホストの人に部屋のURLを教えて貰ってください</li>
          </ul>
        </Card>
        <Card width={480}>
          <h2>更新履歴</h2>
          <dl class="flex flex-wrap py-1.5">
            <dt class="w-1/4">v1.0.0</dt>
            <dd class="w-3/4">@2023-10-15 完成</dd>
          </dl>
        </Card>
        <a href="https://twitter.com/aseruneko" class="mt-3">@aseruneko</a>
      </div>
    </>
  );
}
