import { perfilRouter } from '../express/routes/perfilRoutes.js';
import express from 'express';
export const appConfig = (app) => {
  // Configuración de la aplicación Express
app.use(express.static('public'));

//Rutas
app.use('/perfil', perfilRouter);

};


