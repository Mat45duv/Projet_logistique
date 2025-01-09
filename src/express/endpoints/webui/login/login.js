/**
 * @file index.js
 * @author Maxencexz
 * @description Endpoint de test
 */

module.exports = {
    "enabled": true,
    "method": "GET",
    "auth": {
        "session": false,
        "api": false
    },
    "path": "/login",
    "execute": async function (routerRequest, routerResponse) {

        // On affiche la page de login
        routerResponse.status(200).render("login/login");

    }
}