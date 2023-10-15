import { HandlerContext } from "$fresh/server.ts";
import { updations } from "../../src/updations.ts";

interface UpdationV2Request {
  id: string;
  updatedAt: string;
}
export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const body = await _req.json() as UpdationV2Request;
  if (!Object.keys(updations).includes(body.id)) {
    Deno.env.set;
    updations[body.id] = body.updatedAt;
  }
  const updatedAt = body.updatedAt;
  while (updations[body.id] === updatedAt) {
    await new Promise((r) => setTimeout(r, 50));
  }
  return Response.json({ updatedAt: updations[body.id] });
};
