/**
 * @file databaseManager.js
 * @author Maxencexz
 * @description Fichier de gestion de la base de données.
 */

// On importe les modules nécessaires
const __modules = {
    NEDatabase: require("nedb"),
    path: require("path")
}

// On initialise les fichiers .db
const usersDatabase = new __modules.NEDatabase({ filename: __modules.path.join(__dirname, "data/users.db"), autoload: true });

// On export les méthodes
module.exports = {

    // Catégorie : utilisateurs
    utilisateurs: {

        // Fonction : obtenir un utilisateur avec son ID
        obtenirUtilisateurAvecId: (id) => {
            return new Promise((resolve, reject) => {
                usersDatabase.findOne({ id }, (err, doc) => {
                    if (err) return resolve(null);
                    return resolve(doc);
                });
            });
        },

        // Fonction : obtenir un utilisateur avec son adresse email
        obtenirUtilisateurAvecEmail: (email) => {
            return new Promise((resolve, reject) => {
                usersDatabase.findOne({ email }, (err, doc) => {
                    if (err) return resolve(null);
                    return resolve(doc);
                });
            });
        },

        // Fonction : obtenir un utilisateur avec son username
        obtenirUtilisateurAvecUsername: (username) => {
            return new Promise((resolve, reject) => {
                usersDatabase.findOne({ username }, (err, doc) => {
                    if (err) return resolve(null);
                    return resolve(doc);
                });
            });
        },

        // Fonction : obtenir un utilisateur avec son username
        modifierUtilisateur: (id, data) => {
            return new Promise((resolve, reject) => {
                usersDatabase.update({ id }, { $set: { ...data } }, { upsert: true }, (err, numReplaced) => {
                    if (err) resolve(false);
                    else resolve(true);
                });
            });
        },

    }

}