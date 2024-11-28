/**
 * @file index.js
 * @author Maxencexz
 * @description Endpoint de test
 */

// Modules nécessaires
const databaseManager = require("../../../../database/databaseManager");
const bcrypt = require('bcrypt');

module.exports = {
    "enabled": true,
    "method": "POST",
    "auth": {
        "session": false,
        "api": false
    },
    "path": "/api/users/login",
    "execute": async function (routerRequest, routerResponse) {

        // On obtient les paramètres de la requête (body)
        const { username, password } = routerRequest.body;

        // REGEX pour détecter les valeurs vides
        const emptyRegex = /^\s*$/;
        const isEmpty = (value) => emptyRegex.test(value);

        // REGEX pour valider le nom d'utilisateur (3 char min, 20 char max, only letters and numbers)
        const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
        const isValidUsername = (username) => usernameRegex.test(username);

        // Validation des champs
        if (isEmpty(username) || isEmpty(password)) {
            return routerResponse.status(400).json({
                error: {
                    message: "Un ou plusieurs champs sont manquants.",
                    type: "validation_error",
                    code: "missing_fields"
                }
            });
        };

        // On vérifie si le nom d'utilisateur est valide
        if (!isValidUsername(username)) {
            return routerResponse.status(400).json({
                error: {
                    message: "Le nom d'utilisateur est invalide.",
                    type: "validation_error",
                    code: "invalid_username"
                }
            });
        };

        // On vérifie si un compte existe avec ce nom d'utilisateur
        const user = await databaseManager.utilisateurs.obtenirUtilisateurAvecUsername(username);
        if (!user) {
            return routerResponse.status(400).json({
                error: {
                    message: "Aucun compte n'existe avec ce nom d'utilisateur.",
                    type: "validation_error",
                    code: "invalid_username"
                }
            });
        }

        // On vérifie le mot de passe
        bcrypt.compare(password, user.password, async function (err, result) {

            if (err) {
                return routerResponse.status(500).json({
                    error: {
                        message: "Une erreur est survenue lors de la comparaison des mots de passe.",
                        type: "internal_error",
                        code: "password_comparison_error"
                    }
                });
            }

            if (result === true) {

                // On stocke l'utilisateur dans la session
                delete user.password;
                routerRequest.session.user = user;
                await routerRequest.session.save();

                return routerResponse.status(200).json({
                    success: {
                        message: "Connexion réussie",
                        type: "success",
                        code: "login_success"
                    }
                });
            } else {
                return routerResponse.status(400).json({
                    error: {
                        message: "Le mot de passe est incorrect.",
                        type: "validation_error",
                        code: "invalid_password"
                    }
                });
            }
        });

    }
}