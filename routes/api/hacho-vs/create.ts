import { HandlerContext } from "$fresh/server.ts";
import { HachoVS } from "../../../src/hacho-vs/HachoVS.ts";
import { updations } from "../../../src/updations.ts";

export interface HachoVSCreateRequest {
  userName: string;
  maxRound: string;
  password?: string;
}

export interface HachoVSCreateResponse {
  userId: string;
  userName: string;
  roomId: string;
  password?: string;
}

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const body = await _req.json() as HachoVSCreateRequest;
  const userId = crypto.randomUUID();
  const hachoVS = HachoVS.create(
    userId,
    body.userName,
    parseInt(body.maxRound),
    body.password,
  );
  const kv = await Deno.openKv();
  updations[hachoVS.id] = new Date().toJSON();
  await hachoVS.save(kv);
  kv.close();
  const response = {
    userId: userId,
    userName: body.userName,
    roomId: hachoVS.id,
    password: hachoVS.password,
  } as HachoVSCreateResponse;
  return Response.json(response);
};
