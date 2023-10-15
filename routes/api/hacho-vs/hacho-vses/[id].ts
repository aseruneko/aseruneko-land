import { HandlerContext } from "$fresh/server.ts";
import { HachoVS } from "../../../../src/hacho-vs/HachoVS.ts";

interface HachoVSesRequest {
  id?: string;
}

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const body = await await _req.json() as HachoVSesRequest;
  const userId = body.id;
  const id = _ctx.params.id;
  const kv = await Deno.openKv();
  return await HachoVS.findBy(kv, id).then((hachoVS) => {
    kv.close();
    if (hachoVS) {
      return Response.json(hachoVS.view(userId));
    } else return Response.error();
  }, () => {
    kv.close();
    return Response.error();
  });
};
