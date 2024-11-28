/**
 * @file index.js
 * @author Maxencexz
 * @description Endpoint de test
 */

// Modules nécessaires
const middlewaresList = require("../../../middlewares/middlewares");

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
    "path": "/scanner",
    "execute": async function (routerRequest, routerResponse) {

        // On retourne un message de bienvenue
        routerResponse.status(200).render("main/scanner", {
            "title": "Page d'accueil",
        })

    }
}