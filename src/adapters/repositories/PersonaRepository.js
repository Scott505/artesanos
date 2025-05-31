import {Personas} from '../../frameworks/sequelize/models/Personas.js';

//Repositorio con Sequelize para manejar las operaciones de la entidad Persona

export class PersonaRepository {
  async getPersonaById(id) {
    return await Personas.findByPk(id);
  }

  async getAllPersonas() {
    return await Personas.findAll();
  }
}