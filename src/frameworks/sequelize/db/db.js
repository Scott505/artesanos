import { sequelize } from './dbConexion.js';

export const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log(' Conexión a la base de datos exitosa');
  } catch (err) {
    console.error(' Error al conectar la base de datos:', err);
    process.exit(1);
  }
};
