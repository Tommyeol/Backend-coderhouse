export async function createProducts() {
  const data = await fetch("/api/productos-test", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const response = await data.json();

  return response;
}
