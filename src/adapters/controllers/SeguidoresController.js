import { SeguidoresRepository } from '../repositories/SeguidoresRepository.js';
import { seguir } from '../../usecase/seguidores/seguir.js';
import { dejarDeSeguir } from '../../usecase/seguidores/dejarDeSeguir.js';

export const seguirController = async (req, res) => {
    const seguidoresRepository = new SeguidoresRepository();

    try {
        const id_seguidor = req.session.user.id_perfil;
        const id_seguido = parseInt(req.params.idSeguido, 10);

        if (id_seguidor === id_seguido) {
            return res.status(400).json({ error: "No podés seguirte a vos mismo." });
        }

        await seguir(seguidoresRepository, id_seguidor, id_seguido);

        res.status(200).json({ message: 'Solicitud de seguimiento enviada.' });
    } catch (error) {
        console.error('Error en seguirController:', error);
        res.status(500).json({ error: 'Error del servidor.' });
    }
};

export const dejarDeSeguirController = async (req, res) => {
    const seguidoresRepository = new SeguidoresRepository();
    
    try {
        const id_seguidor = req.session.user.id_perfil;
        const id_seguido = parseInt(req.params.idSeguido, 10);

        await dejarDeSeguir(seguidoresRepository, id_seguidor, id_seguido);

        res.status(200).json({ message: 'Seguimiento cancelado o eliminado.' });
    } catch (error) {
        console.error('Error en dejarDeSeguirController:', error);
        res.status(500).json({ error: 'Error del servidor.' });
    }
};
