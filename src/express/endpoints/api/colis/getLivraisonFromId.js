/**
 * @file index.js
 * @author Maxencexz
 * @description Endpoint de test
 */

// Modules nécessaires
const databaseManager = require("../../../../database/databaseManager");

module.exports = {
    "enabled": true,
    "method": "POST",
    "auth": {
        "session": true,
        "api": false
    },
    "path": "/api/livraisons/getInfo",
    "execute": async function (routerRequest, routerResponse) {

        try {

            // On obtient les paramètres de la requête (body)
            const { id } = routerRequest.body;

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

            // On tente d'obtenir les informations de la livraison
            const livraison = await databaseManager.livraisons.obtenirLivraisonAvecID(id);
            if (!livraison) {
                return routerResponse.status(404).json({
                    error: {
                        message: "Aucune livraison n'a été trouvée avec cet ID.",
                        type: "not_found",
                        code: "livraison_not_found"
                    }
                });
            }

            // On retourne les informations de la livraison
            delete livraison._id;

            return routerResponse.status(200).json({
                data: livraison
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