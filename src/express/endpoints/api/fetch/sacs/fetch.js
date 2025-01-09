/**
 * @file index.js
 * @author Maxencexz
 * @description Endpoint de test
 */

// Modules nécessaires
const databaseManager = require("../../../../../database/databaseManager");

module.exports = {
    "enabled": true,
    "method": "GET",
    "auth": {
        "session": true,
        "api": false
    },
    "path": "/api/fetch/sac",
    "execute": async function (routerRequest, routerResponse) {

        try {

            // On obtient les paramètres de la requête (body)
            const { id } = routerRequest.query;

            // On vérifie qu'on a bien un ID
            if (!id) {
                return routerResponse.status(400).json({
                    error: {
                        message: "Aucun ID n'a été fourni.",
                        type: "validation_error",
                        code: "missing_id"
                    }
                });
            };

            // On tente d'obtenir le sac
            const sac = await databaseManager.sacs.obtenirSacAvecId(id);
            if (!sac) {
                return routerResponse.status(404).json({
                    error: {
                        message: "Sac introuvable.",
                        type: "not_found",
                        code: "bag_not_found"
                    }
                });
            }

            return routerResponse.status(200).json({
                data: sac
            });

        } catch (error) {

            console.log(error);

            return routerResponse.status(500).json({
                error: {
                    message: "Une erreur inattendue s'est produite.",
                    type: "erreur_serveur",
                    code: "erreur_interne_serveur"
                }
            });

        }

    }
}