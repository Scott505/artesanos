import { PerfilRepository } from '../repositories/PerfilRepository.js';
import { getPerfilById } from '../../usecase/persona/getPerfilById.js';
import { getAllPerfiles } from '../../usecase/persona/getAllPerfiles.js';
import { createPerfil } from '../../usecase/persona/createPerfil.js';

const perfilRepository = new PerfilRepository();

// Controlador para manejar la solicitud de obtener una persona por ID
export const getPerfilByIdController = async (req, res) => {
  try {
    const id = req.params.id; //Toma el ID de los parámetros de la solicitud
    const perfil = await getPerfilById(id, perfilRepository); // Llama a la función usecase pasando el ID y el repositorio
    if (!perfil) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
    res.json(perfil); // Devuelve la persona encontrada en formato JSON
  }

  catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ error: error.message }); // Devuelve un error 404 si la persona no se encuentra
    }

    console.error('Error en getPersonaByIdController:', error);
    res.status(500).json({ error: 'Error del servidor' }); // Devuelve un error 500 si ocurre un error del servidor
  }
};


export const getAllPerfilesController = async (req, res) => {
  try {
    const perfiles = await getAllPerfiles(perfilRepository);
    res.json(perfiles);
  } catch (error) {
    console.error('Error en getAllPerfilesController:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};


export const createPerfilController = async (req, res) => {
  try {
    console.log('Datos recibidos para crear Perfil:', req.body);
    const nuevoPerfil = await createPerfil(req.body, perfilRepository);
    res.status(201).send("Perfil creado exitosamente");
    console.log('Perfil creado:', nuevoPerfil);
  } catch (error) {
    console.error('Error al crear Perfil:', error);
    res.status(500).json({ error: 'Error del servidor al crear Perfil' });
  }
};
