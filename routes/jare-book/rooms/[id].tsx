import { PageProps } from "$fresh/server.ts";
import JareBookRoomComponent from "../../../islands/jare-book/room-component.tsx";

export default function JareBookRoomPage(props: PageProps) {
  return <JareBookRoomComponent roomId={props.params.id} />;
}
