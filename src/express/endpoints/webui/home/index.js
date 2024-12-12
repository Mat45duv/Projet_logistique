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
    "path": "/",
    "execute": async function (routerRequest, routerResponse) {
        // Render la vue 'home.ejs'
        routerResponse.render("home");
    }
};