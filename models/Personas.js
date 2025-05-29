import { DataTypes } from 'sequelize';
import { sequelize } from '../dbConexion.js';

export const Personas = sequelize.define('Personas', {
    id_persona: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    intereses: {
        type: DataTypes.STRING,
        allowNull: false
    },
    info: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'personas',
    timestamps: false
});
