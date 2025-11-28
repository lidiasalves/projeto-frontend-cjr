export async function getUsuarioById(id) {
  const resposta = await fetch(`http://localhost:3001/usuario/${id}`, {
    method: "GET",
  });

  if (!resposta.ok) {
    throw new Error("Erro ao buscar usuário");
  }

  return await resposta.json();
}
