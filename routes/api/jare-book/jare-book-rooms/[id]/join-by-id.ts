import { HandlerContext } from "$fresh/server.ts";
import { updations } from "../../../../../dev.ts";
import { JareBookRoomRepository } from "../../../../../src/jare-book/jare-book-room.ts";
import { RoomRepository } from "../../../../../src/room/room.ts";
import { User, UserRepository } from "../../../../../src/user/user.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const req = await _req.json();
  const kv = await Deno.openKv();
  const room = await new RoomRepository(kv).findBy(_ctx.params.id);
  const bookRoom = await new JareBookRoomRepository(kv).findBy(_ctx.params.id);
  const user = new User(req.userId, req.userName);
  room.join(user);
  updations[room.id] = new Date().toJSON();
  bookRoom.join(user);
  await new UserRepository(kv).save(user);
  await new RoomRepository(kv).save(room);
  await new JareBookRoomRepository(kv).save(bookRoom);
  await kv.close();
  return Response.json(user);
};
