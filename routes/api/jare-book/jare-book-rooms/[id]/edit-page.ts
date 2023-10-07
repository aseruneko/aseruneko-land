import { HandlerContext } from "$fresh/server.ts";
import { JareBookRoomRepository } from "../../../../../src/jare-book/jare-book-room.ts";
import { RoomRepository } from "../../../../../src/room/room.ts";
import { updations } from "../../../../../src/updations.ts";

interface EditPageRequest {
  userId: string;
  pageNum: number;
  content: string;
}

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const req = await _req.json() as EditPageRequest;
  const kv = await Deno.openKv();
  const room = await new RoomRepository(kv).findBy(_ctx.params.id);
  const bookRoom = await new JareBookRoomRepository(kv).findBy(_ctx.params.id);
  bookRoom.editPage(req.userId, req.pageNum, req.content);
  updations[room.id] = new Date().toJSON();
  await new JareBookRoomRepository(kv).save(bookRoom);
  await kv.close();
  return Response.json({ room: room, bookRoom: bookRoom });
};
