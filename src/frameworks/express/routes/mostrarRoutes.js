import express from 'express';
import {  mostrarAlbumesDelUsuario, mostrarPublicacionesDeAlbum } from '../../../adapters/controllers/mostarController.js';
import { mostrarPublicacionesController } from '../../../adapters/controllers/PublicacionesController.js';

export const mostrarRouter = express.Router();

mostrarRouter.get('/albumnes', mostrarAlbumesDelUsuario);

mostrarRouter.get('/album/publicacion/:id', mostrarPublicacionesController);

mostrarRouter.get('/album/:id', mostrarPublicacionesDeAlbum);