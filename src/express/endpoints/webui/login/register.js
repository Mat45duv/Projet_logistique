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
    "path": "/register",
    "execute": async function (routerRequest, routerResponse) {

        // On affiche la page de register
        routerResponse.status(200).render("login/register");

    }
}