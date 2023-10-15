import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import HachoVSRoomComponent from "../../islands/hacho-vs/hacho-vs-room-component.tsx";

export default function HachoVSPage(props: PageProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/shared.css" />
      </Head>
      <div class="min-h-screen flex flex-col items-center">
        <HachoVSRoomComponent id={props.params.id} />
      </div>
    </>
  );
}
