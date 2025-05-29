import express from 'express';
import {Personas} from '../models/Personas.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const perfilRouter = express.Router();

//Rutas para el perfil de usuario
perfilRouter.get('/', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../public/perfil.html'));
  }
  catch (error) {
    console.error('Error al renderizar perfil:', error);
    res.status(500).json({ error: 'Error del servidor' });
}
});

// Ruta para obtener una persona por ID
perfilRouter.get('/:id', async (req, res) => {
  try {
    const persona = await Personas.findByPk(req.params.id);
    if (persona) {
      res.json(persona);
    } else {
      res.status(404).json({ error: 'Persona no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener persona:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});
