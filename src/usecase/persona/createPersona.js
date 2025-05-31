//Funcion para traer todas las personas

export const createPersona = async (personaData, personaRepository) => {
  const nuevaPersona = await personaRepository.create(personaData);

  return nuevaPersona; // Retorna las personas si encontro
}