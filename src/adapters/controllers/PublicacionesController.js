import { crearPublicacionConAlbum } from '../../usecase/publicaciones/crearPublicacionConAlbum.js';
import { PublicacionesRepository } from '../repositories/PublicacionesRepository.js';
import { AlbumRepository } from '../repositories/AlbumRepository.js';
import { AlbumPublicacionRepository } from '../repositories/AlbumPublicacionRepository.js';
import { manejadorDeTransacciones } from '../../usecase/manejadorDeTransacciones.js';
import { getSequelize } from '../../frameworks/sequelize/db/db.js';

export const crearPublicacionController = async (req, res) => {
    const sequelize = getSequelize();
    const publicacionesRepo = new PublicacionesRepository();
    const albumRepo = new AlbumRepository();
    const albumPublicacionRepo = new AlbumPublicacionRepository();

    const { descripcion, id_album, titulo_nuevo_album } = req.body;
    const imagen = req.file ? req.file.filename : null;
    const id_perfil = req.session.user.id_perfil;

    if (!descripcion || !id_perfil || !imagen) {
        return res.status(400).send('Faltan datos obligatorios');
    }

    console.log('Datos de la publicación:', {
        descripcion,
        id_perfil,
        imagen,
        id_album,
        titulo_nuevo_album,
    });

    try {
        await manejadorDeTransacciones.withTransaction(sequelize, async (transaction) => {
            await crearPublicacionConAlbum({
                publicacionesRepo,
                albumRepo,
                albumPublicacionRepo,
                transaction,
                id_perfil,
                descripcion,
                imagen,
                id_album: id_album || null,
                titulo_nuevo_album: titulo_nuevo_album?.trim() || null,
            });
        });

        //res.redirect('/publicar');

        res.status(201).json({
            mensaje: 'Publicación creada exitosamente',
            datos: {
                id_perfil,
                descripcion,
                imagen,
                id_album,
                titulo_nuevo_album
            }
        });



    } catch (error) {
        console.error('Error al crear publicación:', error);
        res.status(500).send('Error al crear la publicación');
    }
};
