import { perfilRouter } from '../express/routes/perfilRoutes.js';
import express from 'express';
export const appConfig = (app) => {
  // Configuración de la aplicación Express
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express)
  // Configurar Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../pug-views'));
//Rutas
app.use('/perfil', perfilRouter);

};


