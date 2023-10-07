import { HandlerContext } from "$fresh/server.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const { socket, response } = Deno.upgradeWebSocket(_req);
  if (!socket) throw new Error("unreachable");
  const channel = new BroadcastChannel("test");
  socket.onopen = (ev) => {
    socket.send("HEYHEYHEY");
    channel.onmessage = (e) => {
      socket.send(e.data);
    };
    channel.postMessage("HELLO");
  };
  return response;
};
