import express from 'express';
import { appConfig } from './src/frameworks/express/index.js';
import { initDb } from './src/frameworks/sequelize/db/db.js';

const app = express();
appConfig(app);
await initDb();

// Inicio servidor
const port = 3000
app.listen(port,()=>{
    console.log(`Servidor corriendo en el puerto ${port}`);
});