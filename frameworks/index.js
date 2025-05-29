import { perfilRouter } from '../routes/perfilRoutes.js';
import express from 'express';
export const appConfig = (app) => {
  // Configuración de la aplicación Express
app.use(express.static('public'));
app.use('/perfil', perfilRouter);
};


