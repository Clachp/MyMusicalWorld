const Artist = require('../models/artist');
const Album = require('../models/album');
const Track = require('../models/track');
const User = require('../models/user');
const Music = require('../models/music');

// const CoreModel = require('../models/coreModels'); 



module.exports = {

    // ajouter un album/artiste/chanson au dashboard
    addOneItem: async (request, response) => {

        try {
            // On récupère l'id unique de l'item (album, artiste ou musique) du front :
            const itemId = request.body.apiId;

             // On récupère le nom de la table à cibler : album, track ou artist
            const itemType = request.params.type;
            
            // J'identifie le user qui veut ajouter l'item dans son dashboard via le userId récupéré dans le service jwt
            const userId = request.userId;

            // On regarde quel est le type d'item, et en fonction de ce type on appelle les méthodes du modèle correspondant
            // si type = album
            if (itemType === 'album') {

                // On crée une nouvelle instance de Album
                const instance = new Album(request.body);
            
                // On donne à cette instance l'id du user et de l'album pour ajouter une ligne dans la table de liaison USER_LIKES_ALBUM
                const album = await instance.addAlbum(userId, itemId);

                // On retourne un message de validation au format JSON pour le front
                return response.json(`Album ${album.name} ajouté`);

                // si type = artist
            } else if (itemType === 'artist') {
       
                // On crée une nouvelle instance de Artist
                const instance = new Artist(request.body);

                // On donne à cette instance l'id du user et de l'artist pour ajouter une ligne dans la table de liaison USER_LIKES_ARTIST
                const artist = await instance.addArtist(userId, itemId);
     
                // On retourne un message de validation au format JSON pour le front
                return response.json(`Artiste ${artist.name} ajouté`);

                // si type = track
            } else if (itemType === 'track') {

                // On crée une nouvelle instance de Track
                const instance = new Track(request.body);

                // On donne à cette instance l'id du user et de l'artist pour ajouter une ligne dans la table de liaison USER_LIKES_TRACK
                const track = await instance.addTrack(userId, itemId);
                
                // On retourne un message de validation au format JSON pour le front
                return response.json(`Chanson ${track.name} ajouté`);


            }

        } catch (error) {
            console.log('error du controller');
            response.status(500).json(error.message);

        }

    },

    //afficher/get toute la bibliotheque de l'utilisateur
    getUserItems: async (request, response) => {

        try {
            // si on a un token valide
            if (request.userId){
                
                // On appelle la méthode pour trouver un utilisateur  à partir de son id du modèle User, et ensuite récupérer son pseudo
                const id = request.userId;
                const user = await User.findOne(id);

                // On récupère les items (artistes, albums ou chansons) de cet utilisateur via la méthode getMusic du modèle Music en lui donnant le pseudo du user
                const music  = await Music.getMusic(user.pseudo);    

                // On renvoit la liste au front au format JSON
                response.json(music);

                // si on n'a pas de token valide, pour le lien de partage du dashboard par exemple
            } else {
                // on va chercher le pseudo dans les params
                const pseudo = request.params.pseudo;
                // On récupère les items (artistes, albums ou chansons) de cet utilisateur via la méthode getMusic du modèle Music en lui donnant le pseudo du user
                const music  = await Music.getMusic(pseudo);       
                // On renvoit la liste au front au format JSON
                response.json(music);

                    }
                      
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }

    },
    
    // Supprimer un item de la bibliothèque de l'utilisateur 
    deleteOneItem: async (request, response) => {
        try {

            // On va chercher l'id unique de l'item
            const itemId = request.body.apiId;

            // On récupère le type pour savoir dans quelle table aller chercher
            const itemType = request.params.type;

            // On récupère le userId via le service jwt 
            const userId = request.userId;

            // si le type = album
            if (itemType === 'album') {
              
                // On appelle la méthode delete du modèle Album, à laquelle on donne les id du user et de l'item, et on récupère le nom de l'album
               const album = await Album.delete(userId, itemId);

                // qu'on envoi au front dans un message de succès au format JSON
               response.json(`l'album ${album} a été supprimé de votre discothèque`);

               // si le type = artist
            } else if (itemType === 'artist') {

                // On appelle la méthode delete du modèle Album, à laquelle on donne les id du user et de l'item, et on récupère le nom de l'artist
                const artist = await Artist.delete(userId, itemId);

                // qu'on envoi au front dans un message de succès au format JSON
                response.json(`l'artiste ${artist} a été supprimé de votre discothèque`);

                // si le type = track
            } else if (itemType === 'track') {

                // On appelle la méthode delete du modèle Album, à laquelle on donne les id du user et de l'item, et on récupère le nom de la chanson
                const track = await Track.delete(userId, itemId);

                // qu'on envoi au front dans un message de succès au format JSON
                response.json(`la chanson ${track} a été supprimé de votre discothèque`);

            }

        } catch (error) {
            response.status(500).json(error.message);
        }

    },

}