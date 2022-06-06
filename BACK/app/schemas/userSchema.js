const Joi = require('joi');

// email: pas de restrictions des noms de domaine, password: inclure les caractères spéciaux dans la regexp
const schema = Joi.object({
    mail: Joi.string().email().required(),
    lastname: Joi.string().required(), 
    firstname: Joi.string().required(),
    pseudo: Joi.string().required(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9\\W_]{5,30}$')).error(new Error (`Le mot de passe doit contenir au minimum 5 caractères.`)),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')).error(new Error ('Les mots de passe ne sont pas identiques.'))

});

module.exports = schema;