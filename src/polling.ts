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
  }, () => {
    return polling(url, params);
  });
  return await response.json();
}
