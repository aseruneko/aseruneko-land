import { HandlerContext } from "$fresh/server.ts";
import { JareBookRoom } from "../../../src/jare-book/jare-book-room.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const url = new URL(_req.url);
  const limit = url.searchParams.get("limit");
  const kv = await Deno.openKv();
  const entries = await kv.list({
    prefix: ["jare-book-rooms"],
  });
  const data = [];
  for await (const entry of entries) {
    data.push(entry);
  }
  const rooms = data.map((d: any) => {
    return d.value as JareBookRoom;
  }).filter((bookRoom) => {
    return bookRoom.isPublished;
  }).sort((a, b) => {
    const aTime = a.createdAt?.getTime() ?? 0;
    const bTime = b.createdAt?.getTime() ?? 0;
    return bTime - aTime;
  });
  const res = limit ? rooms.slice(0, parseInt(limit)) : rooms;
  await kv.close();
  return Response.json(res);
};
