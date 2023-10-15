import { HandlerContext } from "$fresh/server.ts";
import { HachoVS } from "../../../../../src/hacho-vs/HachoVS.ts";
import { updations } from "../../../../../src/updations.ts";

export interface HachoVSesJoinRequest {
  userName: string;
  password?: string;
}

export interface HachoVSesJoinResponse {
  joined: boolean;
  userId?: string;
}

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const body = await _req.json() as HachoVSesJoinRequest;
  const userId = crypto.randomUUID();
  const kv = await Deno.openKv();
  const response = await HachoVS.findBy(kv, _ctx.params.id).then(
    async (hacho) => {
      if (hacho) {
        const joined = hacho.join(userId, body.userName, body.password);
        if (joined) {
          updations[hacho.id] = new Date().toJSON();
          await hacho.save(kv);
          return { joined: true, userId: userId } as HachoVSesJoinResponse;
        } else {
          return { joined: false } as HachoVSesJoinResponse;
        }
      } else {
        return { joined: false } as HachoVSesJoinResponse;
      }
    },
  ).catch(() => {
    return { joined: false } as HachoVSesJoinResponse;
  }).finally(() => kv.close());
  return Response.json(response);
};
