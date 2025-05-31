import { Sequelize } from 'sequelize';

// Configuración de Sequelize
export const sequelize = new Sequelize('pruebas', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false
});
