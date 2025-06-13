import { getModels } from "../../frameworks/sequelize/db/db.js";

export class PublicacionesRepository {
    constructor() {
        const models = getModels();
        this.publicaciones = models.publicaciones;
    }

    async create(publicacionData, options = {}) {
        return await this.publicaciones.create(publicacionData, options);
    }
};
