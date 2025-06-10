import { getModels } from "../../frameworks/sequelize/db/db.js";

export class PerfilRepository {
  constructor() {
    const models = getModels();
    this.perfilesModel = models.perfiles;
  }

  async getPerfilById(id, options = {}) {
    return await this.perfilesModel.findByPk(id, options);
  }

  async getAllPerfiles(options = {}) {
    return await this.perfilesModel.findAll(options);
  }

  async create(perfilData, options = {}) {
    return await this.perfilesModel.create(perfilData, options);
  }

  async findByUsuarioId(id_usuario, options = {}) {
    return await this.perfilesModel.findOne({
      where: { id_usuario },
      ...options,
    });
  }
}
