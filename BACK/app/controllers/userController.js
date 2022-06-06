const User = require('../models/user');
const jwt = require('../services/jwt');


module.exports = {


    // Créer un compte : ajouter un user en bdd
    validSignup: async (request, response) => {
        try {

            const mail = request.body.mail;
            const password = request.body.password;
            const pseudo = request.body.pseudo;
            const instance = new User(request.body);
            const user = await instance.addUser(mail, password, pseudo);
            const token = jwt.makeToken(user.id);

            return response.setHeader('Authorization', 'Bearer ' + token).status(201).json(user);

        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }

    },

    // Se connecter : retrouver un user enregistré en bdd à partir de son mail
    validLogin: async (request, response) => {
        try {

            const mail = request.body.mail;
            const password = request.body.password;
            const user = await User.findByMail(mail, password);
            const token = jwt.makeToken(user.id);

            // Envoyer le token généré dans le header de la réponse
            return response.setHeader('Authorization', 'Bearer ' + token).status(200).json(user);

        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }


    },

    // récupérer un user en bdd 
    getUserInfos: async (request, response) => {
        try {

            const id = request.userId;
            const user = await User.findOne(id);

            response.json(user);

        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }


    },

    // mise à jour d'un enregistrement dans la table USER
    updateUser: async (request, response) => {
        try {
            const newPwd = request.body.password;
            const instance = new User(request.body);
            // la fonction SQl update_user selectionne le user par son id :
            instance.id = request.userId;
            const user = await instance.updateUser(newPwd);
            return response.status(201).json(user);

        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },

    // Supprimer un user 
    deleteUser: async (request, response) => {

        try {
            const id = request.userId;
            await User.delete(id);

            response.json(`L'utilisateur ayant l'id ${id} a bien été supprimé.`);

        } catch (error) {
            response.status(500).json(error.message);
        }


    }

}



