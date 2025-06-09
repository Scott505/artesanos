import { getModels } from "../../frameworks/sequelize/db/db.js";

export class UsuarioRepository {
  constructor() {
    const models = getModels();
    this.usuariosModel = models.usuarios;
  }

  async getUsuarioById(id) {
    return await this.usuariosModel.findByPk(id);
  }

  async getAllUsuarios() {
    return await this.usuariosModel.findAll();
  }

  async create(usuarioData, transaction) {
    return await this.usuariosModel.create(usuarioData, { transaction });
  }
}