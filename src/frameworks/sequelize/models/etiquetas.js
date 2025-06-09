import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class etiquetas extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_publicacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'publicaciones',
        key: 'id_publicacion'
      }
    },
    id_interes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'intereses',
        key: 'id_interes'
      }
    }
  }, {
    sequelize,
    tableName: 'etiquetas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_interes" },
          { name: "id_publicacion" },
        ]
      },
      {
        name: "etiquetas_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "id_publicacion" },
        ]
      },
    ]
  });
  }
}
