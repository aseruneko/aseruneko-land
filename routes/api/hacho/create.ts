import { HandlerContext } from "$fresh/server.ts";
import { Hacho } from "../../../src/hacho/Hacho.ts";
import { updations } from "../../../src/updations.ts";

export interface HachoCreateRequest {
  userName: string;
  maxRound: string;
  password?: string;
}

export interface HachoCreateResponse {
  userId: string;
  userName: string;
  roomId: string;
  password?: string;
}

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const body = await _req.json() as HachoCreateRequest;
  const userId = crypto.randomUUID();
  const hacho = Hacho.create(
    userId,
    body.userName,
    parseInt(body.maxRound),
    body.password,
  );
  const kv = await Deno.openKv();
  await hacho.save(kv);
  kv.close();
  updations[hacho.id] = new Date().toJSON();
  const response = {
    userId: userId,
    userName: body.userName,
    roomId: hacho.id,
    password: hacho.password,
  } as HachoCreateResponse;
  return Response.json(response);
};
