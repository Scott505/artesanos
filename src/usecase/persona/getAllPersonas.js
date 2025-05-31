
//Funcion para traer todas las personas

export const getAllPersonas = async (personaRepository) => {
  const personas = await personaRepository.getAllPersonas();

  return personas || []; // Retorna las personas si encontro
}