import { HandlerContext, PageProps } from "$fresh/server.ts";
import JareBookRoomComponent from "../../../islands/jare-book/room-component.tsx";
import {
  JareBookRoomRepository,
} from "../../../src/jare-book/jare-book-room.ts";

export const handler = async (
  req: Request,
  ctx: HandlerContext,
): Promise<Response> => {
  const kv = await Deno.openKv();
  const room = await new JareBookRoomRepository(kv).findBy(ctx.params.id);
  await kv.close();
  return ctx.render(room);
};

export default function JareBookRoomPage(props: PageProps) {
  return <JareBookRoomComponent roomId={props.params.id} />;
}
