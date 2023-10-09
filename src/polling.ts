export async function polling(url: string, params: object) {
  const response: any = await fetch(
    url,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...params }),
    },
  ).then((res) => {
    return res;
  }, async () => {
    return await polling(url, params);
  });
  return await response.json();
}
