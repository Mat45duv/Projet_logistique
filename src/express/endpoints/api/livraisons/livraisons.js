/**
 * @file index.js
 * @author Maxencexz
 * @description Endpoint de test
 */

// Modules nécessaires
const databaseManager = require("../../../../database/databaseManager")

module.exports = {
    "enabled": true,
    "method": "GET",
    "auth": {
        "session": true,
        "api": false
    },
    "path": "/api/fetch/livraison",
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

            // On tente d'obtenir la livraison
            const livraison = await databaseManager.livraisons.obtenirLivraisonAvecId(id);
            if (!livraison) {
                return routerResponse.status(404).json({
                    error: {
                        message: "Livraison introuvable.",
                        type: "not_found",
                        code: "delivery_not_found"
                    }
                });
            }

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