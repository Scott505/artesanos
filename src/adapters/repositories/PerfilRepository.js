import { getModels } from "../../frameworks/sequelize/db/db.js";

export class PerfilRepository {
constructor() {
    const models = getModels();
    this.perfilesModel = models.perfiles;
  }

  async getPerfilById(id) {
    return await this.perfilesModel.findByPk(id);
  }

  async getAllPerfiles() {
    return await this.perfilesModel.findAll();
  }

  async create(PerfilData, transaction) {
    return await this.perfilesModel.create(PerfilData, { transaction });
  };
};

