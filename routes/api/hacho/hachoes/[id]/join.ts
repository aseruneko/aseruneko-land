import { HandlerContext } from "$fresh/server.ts";
import { Hacho } from "../../../../../src/hacho/Hacho.ts";
import { updations } from "../../../../../src/updations.ts";

export interface HachoesJoinRequest {
  userName: string;
  password?: string;
}

export interface HachoCreateResponse {
  joined: boolean;
  userId?: string;
}

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const body = await _req.json() as HachoesJoinRequest;
  const userId = crypto.randomUUID();
  const kv = await Deno.openKv();
  const response = await Hacho.findBy(kv, _ctx.params.id).then(
    async (hacho) => {
      if (hacho) {
        const joined = hacho.join(userId, body.userName, body.password);
        if (joined) {
          await hacho.save(kv);
          updations[hacho.id] = new Date().toJSON();
          return { joined: true, userId: userId } as HachoCreateResponse;
        } else {
          return { joined: false } as HachoCreateResponse;
        }
      } else {
        return { joined: false } as HachoCreateResponse;
      }
    },
  ).catch(() => {
    return { joined: false } as HachoCreateResponse;
  }).finally(() => kv.close());
  return Response.json(response);
};
