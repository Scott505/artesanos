
//Funcion para traer todas las personas

export const getAllPerfiles = async (perfilRepository) => {
  const perfiles = await perfilRepository.getAllPerfiles();

  return perfiles || []; // Retorna las personas si encontro
}