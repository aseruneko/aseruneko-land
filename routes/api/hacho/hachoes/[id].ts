import { HandlerContext } from "$fresh/server.ts";
import { Hacho } from "../../../../src/hacho/Hacho.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const id = _ctx.params.id;
  const kv = await Deno.openKv();
  return await Hacho.findBy(kv, id).then((hacho) => {
    kv.close();
    if (hacho) {
      hacho.hidePassword();
      return Response.json(hacho);
    } else return Response.error();
  }, () => {
    kv.close();
    return Response.error();
  });
};
