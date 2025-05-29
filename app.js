import express from 'express';
import { appConfig } from './frameworks/index.js';
import { initDb } from './frameworks/db.js';

const app = express();
appConfig(app);
await initDb();

// Inicio servidor
const port = 3000
app.listen(port,()=>{
    console.log(`Servidor corriendo en el puerto ${port}`);
});