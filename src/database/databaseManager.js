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
const livraisonsDatabase = new __modules.NEDatabase({ filename: __modules.path.join(__dirname, "data/livraisons.db"), autoload: true });

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

    },

    // Catégorie : livraisons
    livraisons: {

        // Fonction : obtenir une livraison avec son ID
        obtenirLivraisonAvecID: (id) => {
            return new Promise((resolve, reject) => {
                livraisonsDatabase.findOne({ id }, (err, doc) => {
                    if (err) return resolve(null);
                    return resolve(doc);
                });
            });
        },

        // Fonction : obtenir toutes les livraisons
        obtenirToutesLesLivraisons: () => {
            return new Promise((resolve, reject) => {
                livraisonsDatabase.find({}, (err, docs) => {
                    if (err) return resolve(null);
                    return resolve(docs);
                });
            });
        },

        // Fonction : ajouter une livraison. Si le document ayant le même ID existe déjà, il sera modifié (upsert)
        ajouterLivraison: (id, data) => {
            return new Promise((resolve, reject) => {
                livraisonsDatabase.update({ id }, { $set: { ...data } }, { upsert: true }, (err, numReplaced) => {
                    if (err) resolve(false);
                    else resolve(true);
                });
            });
        },

        // Supprimer une livraison avec son ID
        supprimerLivraison: (id) => {
            return new Promise((resolve, reject) => {
                livraisonsDatabase.remove({ id }, {}, (err, numRemoved) => {
                    if (err) resolve(false);
                    else resolve(true);
                });
            });
        },

    }

}