import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class usuarios extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "username"
    },
    'contraseña_hash': {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    rol: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'usuarios',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
        ]
      },
      {
        name: "username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
  }
}
