import {Perfiles} from '../../frameworks/sequelize/models/Perfiles.js';

//Repositorio con Sequelize para manejar las operaciones de la entidad Persona

export class PerfilRepository {
  async getPerfilById(id) {
    return await Perfiles.findByPk(id);
  }

  async getAllPerfiles() {
    return await Perfiles.findAll();
  }

  async create(PerfilData) {
    return await Perfiles.create(PerfilData);
  };
};

