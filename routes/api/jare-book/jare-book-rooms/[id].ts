import { HandlerContext } from "$fresh/server.ts";
import { JareBookRoomRepository } from "../../../../src/jare-book/jare-book-room.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const kv = await Deno.openKv();
  const room = await new JareBookRoomRepository(kv).findBy(_ctx.params.id);
  await kv.close();
  return Response.json(room);
};
