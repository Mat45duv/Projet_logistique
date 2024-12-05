/**
 * @file databaseManager.js
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
const bagsDatabase = new __modules.NEDatabase({ filename: __modules.path.join(__dirname, "data/bags.db"), autoload: true });

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
        obtenirLivraisonAvecID: (id, includeBag = false) => {
            return new Promise((resolve, reject) => {
                livraisonsDatabase.findOne({ id }, async (err, doc) => {
                    if (err || !doc) return resolve(null);
                    if (includeBag && doc.numBag) {
                        module.exports.bags.obtenirBagAvecId(doc.numBag).then(bagDoc => {
                            doc.bag = bagDoc || null;
                            resolve(doc);
                        });
                    } else {
                        resolve(doc);
                    }
                });
            });
        },

        // Fonction : obtenir toutes les livraisons
        obtenirToutesLesLivraisons: (includeBag = false) => {
            return new Promise((resolve, reject) => {
                livraisonsDatabase.find({}, async (err, docs) => {
                    if (err || !docs) return resolve(null);
                    if (includeBag) {
                        const promises = docs.map(doc => {
                            if (doc.numBag) {
                                return module.exports.bags.obtenirBagAvecId(doc.numBag).then(bagDoc => {
                                    doc.bag = bagDoc || null;
                                });
                            }
                        });
                        await Promise.all(promises);
                    }
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

        // Changer le status d'une livraison en livrée
        indiquerLivraisonCommeEtantLivree: (id) => {
            return new Promise((resolve, reject) => {
                livraisonsDatabase.update({ id }, { $set: { status: 1 } }, {}, (err, numReplaced) => {
                    if (err) resolve(false);
                    else resolve(true);
                });
            });
        },

        // Changer le status d'une livraison en non livrée
        indiquerLivraisonCommeEtantNonLivree: (id) => {
            return new Promise((resolve, reject) => {
                livraisonsDatabase.update({ id }, { $set: { status: 0 } }, {}, (err, numReplaced) => {
                    if (err) resolve(false);
                    else resolve(true);
                });
            });
        },

        // Définir le numéro de bag d'un colis
        definirNumeroDeBag: (id, numBag) => {
            return new Promise((resolve, reject) => {
                livraisonsDatabase.update({ id }, { $set: { numBag: numBag } }, {}, (err, numReplaced) => {
                    if (err) resolve(false);
                    else resolve(true);
                });
            });
        },

        // Définir la hauteur du colis dans le bag
        definirHauteurDuBag: (id, hauteurBag) => {
            return new Promise((resolve, reject) => {
                livraisonsDatabase.update({ id }, { $set: { hauteurBag } }, {}, (err, numReplaced) => {
                    if (err) resolve(false);
                    else resolve(true);
                });
            });
        },

    },

    // Catégorie : bags
    bags: {

        // Fonction : obtenir un bag avec son ID
        obtenirBagAvecId: (id) => {
            return new Promise((resolve, reject) => {
                bagsDatabase.findOne({ id }, (err, doc) => {
                    if (err) return resolve(null);
                    return resolve(doc);
                });
            });
        },

        // Fonction : obtenir tous les bags
        obtenirTousLesBags: () => {
            return new Promise((resolve, reject) => {
                bagsDatabase.find({}, (err, docs) => {
                    if (err) return resolve(null);
                    return resolve(docs);
                });
            });
        },

        // Fonction : ajouter un bag. Si le document ayant le même ID existe déjà, il sera modifié (upsert)
        ajouterBag: (id, data) => {
            return new Promise((resolve, reject) => {
                bagsDatabase.update({ id }, { $set: { ...data } }, { upsert: true }, (err, numReplaced) => {
                    if (err) resolve(false);
                    else resolve(true);
                });
            });
        },

        // Fonction : supprimer un bag avec son ID
        supprimerBag: (id) => {
            return new Promise((resolve, reject) => {
                bagsDatabase.remove({ id }, {}, (err, numRemoved) => {
                    if (err) resolve(false);
                    else resolve(true);
                });
            });
        },

    }
}