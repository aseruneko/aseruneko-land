import { HandlerContext } from "$fresh/server.ts";
import { HachoVS } from "../../../../../src/hacho-vs/HachoVS.ts";
import { updations } from "../../../../../src/updations.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const kv = await Deno.openKv();
  const response: Response = await HachoVS.findBy(kv, _ctx.params.id).then(
    async (hacho) => {
      if (hacho) {
        const started = hacho.start();
        if (started) {
          updations[hacho.id] = new Date().toJSON();
          await hacho.save(kv);
          return Response.json({});
        } else {
          return Response.error();
        }
      } else {
        return Response.error();
      }
    },
  ).catch(() => {
    return Response.error();
  }).finally(() => kv.close());
  return response;
};
