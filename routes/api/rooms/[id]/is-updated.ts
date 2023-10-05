import { HandlerContext } from "$fresh/server.ts";
import { RoomRepository } from "../../../../src/room/room.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const req = await _req.json();
  const kv = await Deno.openKv();
  const room = await new RoomRepository(kv).findBy(_ctx.params.id);
  return Response.json({
    isUpdated: room.updatedAt.toJSON() !== req.updatedAt,
  });
};
