import { perfilRouter } from '../express/routes/perfilRoutes.js';
import { usuarioRouter } from '../express/routes/usuarioRoutes.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

export const appConfig = (app) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Configuración de la aplicación Express
  app.use(express.static('public'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Configurar Pug
  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, '../pug-views'));

  //Rutas
  app.use('/perfil', perfilRouter);
  app.use('/usuario', usuarioRouter);

};


