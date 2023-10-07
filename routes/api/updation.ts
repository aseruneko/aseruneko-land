import { HandlerContext } from "$fresh/server.ts";
import { updations } from "../../dev.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const body = await _req.json();
  if (!Object.keys(updations).includes(body.id)) {
    updations[body.id] = body.updatedAt;
  }
  const updatedAt = updations[body.id];
  console.log(updations);
  while (updations[body.id] === updatedAt) {
    await new Promise((r) => setTimeout(r, 50));
  }
  return Response.json({ "isUpdated": true });
};
