/**
 * @file index.js
 * @author Maxencexz
 * @description Endpoint de test
 */

module.exports = {
    "enabled": true,
    "method": "GET",
    "auth": {
        "session": true,
        "api": false
    },
    "path": "/login-destroy",
    "execute": async function (routerRequest, routerResponse) {

        await routerRequest.session.destroy();
        routerResponse.redirect("/");

    }
}