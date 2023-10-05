import { HandlerContext } from "$fresh/server.ts";
import { RoomRepository } from "../../../src/room/room.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const kv = await Deno.openKv();
  const room = await new RoomRepository(kv).findBy(_ctx.params.id);
  await kv.close();
  return Response.json(room);
};
