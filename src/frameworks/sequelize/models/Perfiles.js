import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dbConexion.js';

//Modelo Sequelize para la entidad Persona

export const Perfiles = sequelize.define('Perfiles', {
    id_perfil: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    experiencia: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'perfiles',
    timestamps: false
});
