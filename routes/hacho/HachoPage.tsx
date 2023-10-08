import { Head } from "$fresh/runtime.ts";

export default function HachoPage() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/shared.css" />
      </Head>
      <div class="min-h-screen flex flex-col items-center">
        <HachoRoomComponent />
      </div>
    </>
  );
}
