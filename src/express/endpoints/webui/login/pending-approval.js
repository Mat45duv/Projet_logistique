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
    "path": "/pending-approval",
    "execute": async function (routerRequest, routerResponse) {

        console.log(routerRequest.session.user);

        // On vérifie que le compte est en attente de validation
        if (routerRequest.session.user.status === "inactive") {
            routerResponse.status(200).render("login/pending-approval");
        } else {
            routerResponse.redirect("/");
        }

    }
}