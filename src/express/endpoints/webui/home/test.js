/**
 * @file index.js
 * @author Maxencexz
 * @description Endpoint de test
 */

// Modules nécessaires
const middlewaresList = require("../../../middlewares/middlewares");
const database = require("../../../../database/databaseManager");

module.exports = {
    "enabled": true,
    "method": "GET",
    "auth": {
        "session": true,
        "api": false
    },
    "middlewares": [
        middlewaresList.userAccountActive
    ],
    "path": "/test",
    "execute": async function (routerRequest, routerResponse) {

        const test = await database.livraisons.obtenirToutesLesLivraisons(true);

        // On retourne un message de bienvenue
        routerResponse.status(200).json({
            data: test
        })

    }
}