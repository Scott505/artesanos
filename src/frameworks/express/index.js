import { perfilRouter } from '../express/routes/perfilRoutes.js';
import { usuarioRouter } from '../express/routes/usuarioRoutes.js';
import { publicacionesRouter } from './routes/publicacionesRoutes.js';
import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { estaLogueado } from '../../middlewares/estaLogueado.js';

export const appConfig = (app) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Configuración de la aplicación Express
  app.use(express.static('public'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Config. sesion
  app.use(session({
    secret: 'clave-secreta-bien-larga', // poné una clave segura
    resave: false,
    saveUninitialized: false
  }));

  // Configurar Pug
  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, '../pug-views'));

  //Rutas
  app.use('/publicar', publicacionesRouter)
  app.use('/perfil',estaLogueado, perfilRouter);
  app.use('/usuario', usuarioRouter);

};


