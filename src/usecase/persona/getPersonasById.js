
//Funcion para traer persona por ID sin dependencias externas

export const getPersonaById = async (id, personaRepository) => {
  const persona = await personaRepository.getPersonaById(id);
 
  if (!persona) {
    const notFoundError = new Error(`Persona con ID ${id} no encontrada`);
    notFoundError.statusCode = 404; //Cambiar el código de estado a 404 si no se encuentra la persona
    throw notFoundError; // Lanza un error si la persona no se encuentra
  } 

  return persona; // Retorna la persona si la encontró
}