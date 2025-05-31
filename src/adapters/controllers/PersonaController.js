import { PersonaRepository } from '../repositories/PersonaRepository.js';
import { getPersonaById } from '../../usecase/persona/getPersonasById.js';
import { getAllPersonas } from '../../usecase/persona/getAllPersonas.js';
import { createPersona } from '../../usecase/persona/createPersona.js';

const personaRepository = new PersonaRepository();

// Controlador para manejar la solicitud de obtener una persona por ID
export const getPersonaByIdController = async (req, res) => {
  try {
    const id = req.params.id; //Toma el ID de los parámetros de la solicitud
    const persona = await getPersonaById(id, personaRepository); // Llama a la función usecase pasando el ID y el repositorio
    if (!persona) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
    res.json(persona); // Devuelve la persona encontrada en formato JSON
  }

  catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ error: error.message }); // Devuelve un error 404 si la persona no se encuentra
    }

    console.error('Error en getPersonaByIdController:', error);
    res.status(500).json({ error: 'Error del servidor' }); // Devuelve un error 500 si ocurre un error del servidor
  }
};


export const getAllPersonasController = async (req, res) => {
  try {
    const personas = await getAllPersonas(personaRepository);
    res.json(personas);
  } catch (error) {
    console.error('Error en getAllPersonasController:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};


export const createPersonaController = async (req, res) => {
  try {
    console.log('Datos recibidos para crear persona:', req.body);
    const nuevaPersona = await createPersona(req.body, personaRepository);
    res.status(201).send("Persona creada exitosamente");
    console.log('Persona creada:', nuevaPersona);
  } catch (error) {
    console.error('Error al crear persona:', error);
    res.status(500).json({ error: 'Error del servidor al crear persona' });
  }
};
