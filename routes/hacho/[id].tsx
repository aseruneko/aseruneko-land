import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import HachoRoomComponent from "../../islands/hacho/hacho-room-component.tsx";

export default function HachoPage(props: PageProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/shared.css" />
      </Head>
      <div class="min-h-screen flex flex-col items-center">
        <HachoRoomComponent id={props.params.id} />
      </div>
    </>
  );
}
