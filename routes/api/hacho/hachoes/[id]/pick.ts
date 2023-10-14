import { HandlerContext } from "$fresh/server.ts";
import { Hacho } from "../../../../../src/hacho/Hacho.ts";
import { updations } from "../../../../../src/updations.ts";

interface HachoesPickRequest {
  userId: string;
  pick: string;
}

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const body = await _req.json() as HachoesPickRequest;
  const kv = await Deno.openKv();
  const response = await Hacho.findBy(kv, _ctx.params.id).then(
    async (hacho) => {
      if (hacho) {
        const picked = hacho.pick(body.userId, body.pick);
        if (picked) {
          await hacho.save(kv);
          updations[hacho.id] = new Date().toJSON();
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
  return Response.json(response);
};
