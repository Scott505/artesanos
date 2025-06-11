import { getSequelize } from "../../frameworks/sequelize/db/db.js";
import { PerfilRepository } from '../repositories/PerfilRepository.js';
import { getPerfilById } from '../../usecase/perfil/getPerfilById.js';
import { getAllPerfiles } from '../../usecase/perfil/getAllPerfiles.js';
import { crearUsuarioConPerfil } from '../../usecase/perfil/crearUsuarioConPerfil.js';
import { UsuarioRepository } from '../repositories/UsuarioRepository.js';
import { manejadorDeTransacciones } from "../../usecase/manejadorDeTransacciones.js";
import * as hashService from "../../frameworks/bcrypt/hash.js";
import { ingresar } from '../../usecase/perfil/ingresar.js';

// Controlador para manejar la solicitud de obtener una persona por ID
export const getPerfilByIdController = async (req, res) => {
  const perfilRepository = new PerfilRepository();
  try {
    //Busca la elperfil por el id
    const id = req.params.id; 
    const perfil = await getPerfilById(id, perfilRepository); 

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
  const usuarioRepo = new UsuarioRepository();
  const perfilRepo = new PerfilRepository();

  const { nombre, mail, contraseña, foto, telefono, experiencia } = req.body;
  //Verifica campos
  if (!mail || !contraseña) {
    return res.status(400).json({ error: "Mail y contraseña son obligatorios." });
  }

  try {
    const nuevoUsuario = await manejadorDeTransacciones.withTransaction(
      sequelize,
      async (transaction) => {
        return await crearUsuarioConPerfil({
          usuarioRepository: usuarioRepo,
          perfilRepository: perfilRepo,
          usuarioData: { username: mail, contraseña },
          perfilData: { nombre, mail, telefono, foto, experiencia },
          transaction,
          hashService,
        });
      }
    );

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const ingresarUsuarioController = async (req, res) => {
  const { mail, contraseña } = req.body;
  const usuarioRepo = new UsuarioRepository();

  if (!mail || !contraseña) {
    return res.status(400).json({ error: "Mail y contraseña obligatorios." });
  }

  try {
    const usuario = await ingresar({
      mail,
      contraseña,
      usuarioRepo,
      hashService,
    });

    req.session.user = usuario;

    res.redirect('/perfil/id/' + usuario.id);

  } catch (error) {
    console.error(error);
    res.status(401).render('logueo', { error: error.message });;
  }
};