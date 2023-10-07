import { HandlerContext } from "$fresh/server.ts";
import { updations } from "../../../../../dev.ts";
import { JareBookRoomRepository } from "../../../../../src/jare-book/jare-book-room.ts";
import { RoomRepository } from "../../../../../src/room/room.ts";

interface TitleRequest {
  userId: string;
  title: string;
}

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const req = await _req.json() as TitleRequest;
  const kv = await Deno.openKv();
  const room = await new RoomRepository(kv).findBy(_ctx.params.id);
  const bookRoom = await new JareBookRoomRepository(kv).findBy(_ctx.params.id);
  bookRoom.editTitle(req.userId, req.title);
  updations[room.id] = new Date().toJSON();
  await new JareBookRoomRepository(kv).save(bookRoom);
  await kv.close();
  return Response.json({ room: room, bookRoom: bookRoom });
};
