import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { crearUsuarioController} from '../../../adapters/controllers/PerfilController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const usuarioRouter = express.Router();
// Ruta para obtener una persona por ID utilizando el controlador

usuarioRouter.get('/registrarse', (req, res) => {
  res.render('registro', { titulo: 'Registro de Persona' });
});

usuarioRouter.get('/loguearse', (req, res) => {
  res.render('logueo', { titulo: 'Iniciar sesión' });
});

usuarioRouter.post('/registrar', crearUsuarioController);