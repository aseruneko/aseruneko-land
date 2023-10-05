import { HandlerContext } from "$fresh/server.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const kv = await Deno.openKv();
  const entries = await kv.list({
    prefix: [],
  });
  const data = [];
  for await (const entry of entries) {
    data.push(entry);
  }
  for (const datum of data) {
    await kv.delete(datum.key);
  }
  await kv.close();
  return Response.json({});
};
