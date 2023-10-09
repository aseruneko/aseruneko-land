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
    const res = await polling(url, params);
    return res;
  });
  return await response.json();
}
