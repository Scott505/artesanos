import { getModels } from "../../frameworks/sequelize/db/db.js";

export class SeguidoresRepository {
  constructor() {
    const models = getModels();
    this.seguidores = models.seguidores;
  }

  async getSeguimientosDeUsuario(id_seguidor, options = {}) {
  return await this.seguidores.findAll({
    where: { id_seguidor },
    ...options
  });
}

  async crearSolicitud(id_seguidor, id_seguido, options = {}) {
  return await this.seguidores.create({
    id_seguidor,
    id_seguido,
    aceptado: 0
  }, {
    ...options
  });
}

  async eliminarSeguimiento(id_seguidor, id_seguido, options = {}) {
    return await this.seguidores.destroy({
      where: {
        id_seguidor,
        id_seguido
      },
      ...options
    });
  }

  

  async getEstadoSeguimiento(id_seguidor, id_seguido, options = {}) {
  return await this.seguidores.findOne({
    where: {
      id_seguidor,
      id_seguido
    },
    ...options
  });
}


}
