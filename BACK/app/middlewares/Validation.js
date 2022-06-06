const validator = {
    validateBody: (schema) => (request, response, next) => {
            const {error} = schema.validate(request.body);
            if (error) {
                return response.status(400).json(error.message);
            } else {
                next();
            }
        
    },

    validateQuery: (schema) => (request, response, next) => {
        const {error} = schema.validate(request.query);
        if (error) {
            response.status(400).json(error.message);
        } else {
            next();
        }
    },

    // curring : on utilise une fonction pour configurer une autre fonction
    validateParams: (schema) => {
    return (request,response, next) => {
        const {error} = schema.validate(request.params);
        if (error) {
            response.status(400).json(error.message); 
        } else {
            next();
        }

    }
}

}

module.exports = validator;