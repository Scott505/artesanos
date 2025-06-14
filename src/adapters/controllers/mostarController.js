import { AlbumRepository } from '../repositories/AlbumRepository.js';
import { PublicacionesRepository } from '../repositories/PublicacionesRepository.js';
import { getAlbumnesByPerfil } from '../../usecase/album/getAlbumnesByPerfil.js';
import { getPublicacionesByAlbum } from '../../usecase/publicaciones/getPublicacionesByAlbum.js';

export const mostrarAlbumesDelUsuario = async (req, res) => {
    const albumRepository = new AlbumRepository();

    try {
        const id_perfil = req.session.user.id_perfil;
        const albumes = await getAlbumnesByPerfil(id_perfil, albumRepository);

        const albumesplano = albumes.map(album => ({
            id: album.id_album,
            nombre: album.titulo
        }));

       // console.log('Álbumes obtenidos:', albumes);
       // console.log('Álbumes planos:', albumesplano);

        res.render('cuadricula', {
            titulo: 'Mis Álbumes',
            tipo: 'album',
            items: albumesplano
        });

    } catch (error) {

        console.error('Error al mostrar álbumes:', error);

        res.status(500).send('Error al mostrar álbumes');
    }

};

export const mostrarPublicacionesDeAlbum = async (req, res) => {
    const publicacionesRepository = new PublicacionesRepository();

    try {
        const id_album = req.params.id;
        const publicaciones = await getPublicacionesByAlbum(id_album, publicacionesRepository);

        //console.log('Publicaciones obtenidas para el álbum:', publicaciones);

        const publicacionesParaVista = publicaciones.map(pub => ({
            id: pub.id_publicacion,
            imagen_url: `/uploads/${pub.imagen}`
        }));


        res.render('cuadricula', {
            titulo: 'Publicaciones del Álbum',
            tipo: 'publicacion',
            items: publicacionesParaVista

        });
    } catch (error) {

        console.error('Error al mostrar publicaciones:', error);
        res.status(500).send('Error al mostrar publicaciones');

    }
};
