import { getSequelize } from "../../frameworks/sequelize/db/db.js";
import { PerfilRepository } from '../repositories/PerfilRepository.js';
import { getPerfilById } from '../../usecase/perfil/getPerfilById.js';
import { getAllPerfiles } from '../../usecase/perfil/getAllPerfiles.js';
import { crearUsuarioConPerfil } from '../../usecase/perfil/crearUsuarioConPerfil.js';
import { UsuarioRepository } from '../repositories/UsuarioRepository.js';


// Controlador para manejar la solicitud de obtener una persona por ID
export const getPerfilByIdController = async (req, res) => {
  const perfilRepository = new PerfilRepository();
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
  const perfilRepository = new PerfilRepository();
  try {
    const perfiles = await getAllPerfiles(perfilRepository);
    res.json(perfiles);
  } catch (error) {
    console.error('Error en getAllPerfilesController:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};


export const crearUsuarioController = async (req, res) => {
  const sequelize = getSequelize();
  const transaction = await sequelize.transaction();

  const usuarioRepo = new UsuarioRepository();
  const perfilRepo = new PerfilRepository();

  const { nombre, mail, contraseña, foto, telefono, experiencia } = req.body;

  try {
    // Llamada al usecase con los datos
    const nuevoUsuario = await crearUsuarioConPerfil({
      usuarioRepo,
      perfilRepo,
      usuarioData: { mail, contraseña },
      perfilData: { nombre, mail, telefono, foto, experiencia },
      transaction
    });

    await transaction.commit();
    res.status(201).json(nuevoUsuario); 

  } catch (error) {
     console.error(error); 
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};
