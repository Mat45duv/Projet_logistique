module.exports = {
    "enabled": true,
    "method": "GET",
    "auth": {
        "session": true, // Nécessite une session active
        "api": false     // Pas une API
    },
    "path": "/bags",
    "execute": async function (routerRequest, routerResponse) {
        // Vérifie si la session est active
        if (!routerRequest.session || !routerRequest.session.user) {
            return routerResponse.redirect("/login"); // Redirige si non connecté
        }

        // Rend la vue "bags"
        routerResponse.render("bags");
    }
};