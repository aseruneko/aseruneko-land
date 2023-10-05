import { HandlerContext } from "$fresh/server.ts";
import {
  JareBookRoom,
  JareBookRoomRepository,
} from "../../../../src/jare-book/jare-book-room.ts";
import { Room, RoomRepository, RoomType } from "../../../../src/room/room.ts";
import { User, UserRepository } from "../../../../src/user/user.ts";

interface RoomRequest {
  userName: string;
  pageNum: number;
  limitMin: number;
  isRandom: boolean;
}

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const request = await _req.json() as RoomRequest;
  const kv = await Deno.openKv();
  const user = User.create(request.userName);
  const room = Room.create(RoomType.JareBook, user);
  const bookRoom = JareBookRoom.create(
    room,
    request.pageNum,
    request.limitMin,
    request.isRandom,
  );
  await new UserRepository(kv).save(user);
  await new RoomRepository(kv).save(room);
  await new JareBookRoomRepository(kv).save(bookRoom);
  await kv.close();
  return new Response(JSON.stringify({
    user: user,
    room: room,
  }));
};
