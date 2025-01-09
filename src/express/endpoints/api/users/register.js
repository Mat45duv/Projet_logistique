/**
 * @file index.js
 * @author Maxencexz
 * @description Endpoint de test
 */

// Modules nécessaires
const databaseManager = require("../../../../database/databaseManager");
const UUID = require("uuid").v4
const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 15;

module.exports = {
    "enabled": true,
    "method": "POST",
    "auth": {
        "session": false,
        "api": false
    },
    "path": "/api/users/register",
    "execute": async function (routerRequest, routerResponse) {

        // On obtient les paramètres de la requête (body)
        const { username, email, password, confirmPassword } = routerRequest.body;

        // REGEX pour détecter les valeurs vides
        const emptyRegex = /^\s*$/;
        const isEmpty = (value) => emptyRegex.test(value);

        // REGEX pour valider le nom d'utilisateur (3 char min, 20 char max, only letters and numbers)
        const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
        const isValidUsername = (username) => usernameRegex.test(username);

        // REGEX pour valider l'adresse mail
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = (email) => emailRegex.test(email);

        // Validation des champs
        if (isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(confirmPassword)) {
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

        // On vérifie si l'adresse mail est valide
        if (!isValidEmail(email)) {
            return routerResponse.status(400).json({
                error: {
                    message: "L'adresse mail est invalide.",
                    type: "validation_error",
                    code: "invalid_email"
                }
            });
        };

        // On vérifie si les mots de passe correspondent
        if (password !== confirmPassword) {
            return routerResponse.status(400).json({
                error: {
                    message: "Les mots de passe ne correspondent pas.",
                    type: "validation_error",
                    code: "passwords_missmatch"
                }
            });
        };

        // On vérifie si un compte existe déjà avec cet email
        var user = await databaseManager.utilisateurs.obtenirUtilisateurAvecEmail(email);
        if (user) return routerResponse.status(400).json({
            error: {
                message: "Un compte existe déjà avec cette adresse mail.",
                type: "validation_error",
                code: "email_already_exists"
            }
        });

        // On vérifie si un compte existe déjà avec cet email
        user = await databaseManager.utilisateurs.obtenirUtilisateurAvecUsername(username);
        if (user) return routerResponse.status(400).json({
            error: {
                message: "Un compte existe déjà avec ce nom d'utilisateur.",
                type: "validation_error",
                code: "username_already_exists"
            }
        });

        // On créer un nouvel utilisateur
        const userId = UUID();

        // On tente de hasher le mot de passe
        bcrypt.genSalt(BCRYPT_SALT_ROUNDS, function (err, salt) {

            if (err) return routerResponse.status(400).json({
                error: {
                    message: "Erreur lors du hashage du mot de passe.",
                    type: "bcrypt_error",
                    code: "bcrypt_rounds_error"
                }
            });

            bcrypt.hash(password, salt, async function (err, hash) {

                if (err) return routerResponse.status(400).json({
                    error: {
                        message: "Erreur lors du hashage du mot de passe.",
                        type: "bcrypt_error",
                        code: "bcrypt_rounds_error"
                    }
                });

                const userCreatedSuccess = await databaseManager.utilisateurs.modifierUtilisateur(userId, {
                    id: userId,
                    username,
                    email,
                    password: hash,
                    status: "inactive",
                    permissions: [],
                    lastLogin: Date.now()
                });

                if(userCreatedSuccess){
                    return routerResponse.status(200).json({
                        success: {
                            message: "Votre compte a été créé avec succès. Vous allez être redirigé vers la page de connexion.",
                            type: "account_created",
                            code: "account_created"
                        }
                    });
                } else {
                    return routerResponse.status(400).json({
                        error: {
                            message: "Erreur lors de la création du compte.",
                            type: "database_error",
                            code: "database_error"
                        }
                    });
                }
                
            });
        });

    }
}