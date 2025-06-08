//Funcion para traer todas las personas

export const createPerfil = async (perfilData, perfilRepository) => {
  const nuevaPerfil = await perfilRepository.create(perfilData);

  return nuevaPerfil; // Retorna las personas si encontro
}