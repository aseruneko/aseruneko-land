export async function post(url: string, params: object) {
  const response = await fetch(
    url,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...params }),
    },
  );
  return await response.json();
}
