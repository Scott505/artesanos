import {Personas} from '../models/Personas.js';

export const getPersonas = async () => {
    try {
        const personas = await Personas.findAll();
        console.log(personas.map(persona => persona.dataValues));
    } catch (error) {
        console.error('Error al obtener las personas:', error);
    }
};

export const getPersonaById = async (id) => {
    try {
        const persona = await Personas.findByPk(id);
        if (persona) {
            console.log(persona.dataValues);
        } else {
            console.log(`Persona con ID ${id} no encontrada.`);
        }
    } catch (error) {
        console.error('Error al obtener la persona por ID:', error);
    }
}