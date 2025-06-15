import express from 'express';
import { seguirController, dejarDeSeguirController } from '../../../adapters/controllers/SeguidoresController.js';

export const seguidoresRoutes = express.Router();

seguidoresRoutes.post('/seguir/:idSeguido', seguirController);

seguidoresRoutes.post('/dejar/:idSeguido', dejarDeSeguirController);

seguidoresRoutes.get('/solicitudes', (req, res) => {
    res.render('solicitudes', {
        title: 'Solicitudes de Seguimiento',
        solicitudes: {}
    });
});