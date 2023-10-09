export async function polling(url: string, params: object) {
  const response: any = await fetch(
    url,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...params }),
    },
  ).then(async (res) => {
    return await res.json().catch(() => {
      return polling(url, params);
    });
  }, async () => {
    return await polling(url, params);
  });
  return response;
}
