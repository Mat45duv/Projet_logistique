/**
 * @file middlewares.js
 * @author Maxencexz
 * @description Module contenant tout les middlewares nésecaires à l'application.
 */

// Import required modules
const __modules = {
    ironSession: require("iron-session"),
    database: require("../../database/databaseManager")
}

// On instancie une variable pour définir quand réintialiser les compteurs de requêtes (rate limit)
const GLOB_RATE_LIMITS_WINDOW = 60;

module.exports = {

    sessionMiddleware: async function (request, response, next) {
        try {
            request.session = await __modules.ironSession.getIronSession(request, response, {
                cookieName: process.env.SESSION_COOKIE_NAME,
                password: process.env.SESSION_COOKIE_SECRET,
                cookieOptions: {
                    httpOnly: true,
                    secure: (process.env.NODE_ENV === 'production'),
                    sameSite: "lax",
                }
            });
            next();
        } catch (error) {
            return response.status(500).json({
                message: "Failed to initialize session."
            });
        }
    },

    isSessionMiddleware: function (request, response, next) {

        // Check if request.session.user is a NON-EMPTY object with at least the following properties: id, username
        if (request.session.user && Object.keys(request.session.user).length > 0 && request.session.user.id && request.session.user.username) {
            request.isUserSession = true;
        } else {
            request.isUserSession = false;
        }

        next();

    },

    userAuthentication: function (request, response, next) {

        // If the user is not logged in, redirect to the login page
        if (!request.isUserSession) {
            return response.redirect("/register");
        } else {
            next();
        }

    },

    userAccountActive: function(request, response, next) {
        if (request.isUserSession && request.session.user.status === "inactive") {
            return response.status(403).redirect("/pending-approval");
        };
        next();
    },
}