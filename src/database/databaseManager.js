/**
 * @file databaseManager.js
 * @description Fichier de gestion de la base de données.
 */

// On importe les modules nécessaires
const __modules = {
    Mongoose: require("mongoose"),
    MongoMemoryServer: require("mongodb-memory-server").MongoMemoryServer,
    UserSchema: require("./models/User"),
    ClientSchema: require("./models/Client"),
    LivraisonSchema: require("./models/Livraison"),
    ProduitSchema: require("./models/Produit"),
    SacSchema: require("./models/Sac"),
    CamionSchema: require("./models/Camion")
}

module.exports = {

    connect: async () => {

        try {
            const mongoServer = await __modules.MongoMemoryServer.create({
                instance: {
                    port: 60254,
                    dbName: "logistique",
                    dbPath: "C:\\MongoDBData"
                }
            });

            const uri = mongoServer.getUri();
            const dbName = "logistique";

            await __modules.Mongoose.connect(`${uri}${dbName}`);

            console.log(`Connected to database: ${dbName}`);
            console.log("URI:", `${uri}${dbName}`);

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }

    },

    // Catégorie : utilisateurs
    utilisateurs: {

        // Fonction : obtenir un utilisateur avec son ID
        obtenirUtilisateurAvecId: async (id) => {
            try {
                const utilisateur = await __modules.UserSchema.findOne({ id });
                return utilisateur || null;
            } catch (error) {
                console.error(error);
                return null;
            }
        },

        // Fonction : obtenir un utilisateur avec son adresse email
        obtenirUtilisateurAvecEmail: async (email) => {
            try {
                const utilisateur = await __modules.UserSchema.findOne({ email });
                return utilisateur || null;
            } catch (error) {
                console.error(error);
                return null;
            }
        },

        // Fonction : obtenir un utilisateur avec son username
        obtenirUtilisateurAvecUsername: async (username) => {
            try {
                const utilisateur = await __modules.UserSchema.findOne({ username });
                return utilisateur || null;
            } catch (error) {
                console.error(error);
                return null;
            }
        },

        // Fonction : obtenir un utilisateur avec son username
        modifierUtilisateur: async (id, data) => {
            try {
                const result = await __modules.UserSchema.updateOne(
                    { id },
                    { $set: { ...data } },
                    { upsert: true } // Permet d'insérer un nouveau document s'il n'existe pas
                );
                return result.modifiedCount > 0 || result.upsertedCount > 0;
            } catch (error) {
                console.error(error);
                return false;
            }
        },

    },

    // Catégorie : clients
    clients: {

        // Fonction : obtenir un client avec son ID
        obtenirClientAvecId: async (id) => {
            try {
                const client = await __modules.ClientSchema.findOne({ id });
                return client || null;
            } catch (error) {
                console.error(error);
                return null;
            }
        },

        // Fonction : obtenir un client avec son adresse email
        obtenirClientAvecEmail: async (email) => {
            try {
                const client = await __modules.ClientSchema.findOne({ email });
                return client || null;
            } catch (error) {
                console.error(error);
                return null;
            }
        },

        // Fonction : obtenir un client avec son nom d'utilisateur
        obtenirClientAvecUsername: async (username) => {
            try {
                const client = await __modules.ClientSchema.findOne({ username });
                return client || null;
            } catch (error) {
                console.error(error);
                return null;
            }
        },

        // Fonction : modifier les informations d'un client
        modifierClient: async (id, data) => {
            try {
                const result = await __modules.ClientSchema.updateOne(
                    { id },
                    { $set: { ...data } },
                    { upsert: true } // Permet d'insérer un nouveau document s'il n'existe pas
                );
                return result.modifiedCount > 0 || result.upsertedCount > 0;
            } catch (error) {
                console.error(error);
                return false;
            }
        },

    },

    // Catégorie : livraisons
    livraisons: {
        // Fonction : obtenir une livraison avec son ID
        obtenirLivraisonAvecId: async (id) => {
            try {
                const livraison = await __modules.LivraisonSchema.findOne({ id });
                return livraison || null;
            } catch (error) {
                console.error(error);
                return null;
            }
        },

        // Fonction : obtenir une livraison avec le client associé (par ID client)
        obtenirLivraisonAvecClientId: async (clientId) => {
            try {
                const livraison = await __modules.LivraisonSchema.findOne({ client: clientId });
                return livraison || null;
            } catch (error) {
                console.error(error);
                return null;
            }
        },

        // Fonction : obtenir toutes les livraisons d'un client
        obtenirToutesLivraisonsClient: async (clientId) => {
            try {
                const livraisons = await __modules.LivraisonSchema.find({ client: clientId });
                return livraisons || [];
            } catch (error) {
                console.error(error);
                return [];
            }
        },

        // Fonction : modifier les informations d'une livraison
        modifierLivraison: async (id, data) => {
            try {
                const result = await __modules.LivraisonSchema.updateOne(
                    { id },
                    { $set: { ...data } },
                    { upsert: true } // Permet d'insérer un nouveau document si aucun n'existe
                );
                return result.modifiedCount > 0 || result.upsertedCount > 0;
            } catch (error) {
                console.error(error);
                return false;
            }
        },

        // Fonction : créer une nouvelle livraison
        creerLivraison: async (data) => {
            try {
                const nouvelleLivraison = new __modules.LivraisonSchema(data);
                await nouvelleLivraison.save();
                return nouvelleLivraison;
            } catch (error) {
                console.error(error);
                return null;
            }
        },

        // Fonction : supprimer une livraison avec son ID
        supprimerLivraisonAvecId: async (id) => {
            try {
                const result = await __modules.LivraisonSchema.deleteOne({ id });
                return result.deletedCount > 0;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
    },

    // Catégorie : produits
    produits: {

        // Fonction : obtenir un produit avec son ID
        obtenirProduitAvecId: async (id) => {
            try {
                const produit = await __modules.ProduitSchema.findOne({ id });
                return produit || null;
            } catch (error) {
                console.error(error);
                return null;
            }
        },

        // Fonction : obtenir tous les produits
        obtenirTousProduits: async () => {
            try {
                const tousLesProduits = await __modules.ProduitSchema.find({});
                return tousLesProduits || [];
            } catch (error) {
                console.error(error);
                return [];
            }
        },

        // Fonction : créer un nouveau produit
        creerProduit: async (data) => {
            try {
                const nouveauProduit = new __modules.ProduitSchema(data);
                await nouveauProduit.save();
                return nouveauProduit;
            } catch (error) {
                console.error(error);
                return null;
            }
        },

        // Fonction : modifier un produit avec son ID
        modifierProduit: async (id, data) => {
            try {
                const result = await __modules.ProduitSchema.updateOne(
                    { id },
                    { $set: { ...data } },
                    { upsert: false } // Ne crée pas de nouveau produit si l'ID n'existe pas
                );
                return result.modifiedCount > 0;
            } catch (error) {
                console.error(error);
                return false;
            }
        },

        // Fonction : supprimer un produit avec son ID
        supprimerProduitAvecId: async (id) => {
            try {
                const result = await __modules.ProduitSchema.deleteOne({ id });
                return result.deletedCount > 0;
            } catch (error) {
                console.error(error);
                return false;
            }
        },

        // Fonction : mettre à jour le stock d'un produit
        mettreAJourStock: async (id, quantite) => {
            try {
                const produit = await __modules.ProduitSchema.findOne({ id });
                if (!produit) return false;
                produit.stock += quantite;
                await produit.save();
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        },

        // Fonction : rechercher des produits par catégorie
        rechercherProduitsParCategorie: async (categorie) => {
            try {
                const produits = await __modules.ProduitSchema.find({ categorie });
                return produits || [];
            } catch (error) {
                console.error(error);
                return [];
            }
        },

    },

    // Catégorie : sacs
    sacs: {

        // Fonction : obtenir un sac avec son ID
        obtenirSacAvecId: async (id) => {
            try {
                const sac = await __modules.SacSchema.findOne({ id });
                return sac || null;
            } catch (error) {
                console.error(error);
                return null;
            }
        },

        // Fonction : obtenir tous les sacs
        obtenirTousSacs: async () => {
            try {
                const tousLesSacs = await __modules.SacSchema.find({});
                return tousLesSacs || [];
            } catch (error) {
                console.error(error);
                return [];
            }
        },

        // Fonction : créer un nouveau sac
        creerSac: async (data) => {
            try {
                const nouveauSac = new __modules.SacSchema(data);
                await nouveauSac.save();
                return nouveauSac;
            } catch (error) {
                console.error(error);
                return null;
            }
        },

        // Fonction : modifier un sac avec son ID
        modifierSac: async (id, data) => {
            try {
                const result = await __modules.SacSchema.updateOne(
                    { id },
                    { $set: { ...data } },
                    { upsert: false } // Ne crée pas de nouveau sac si l'ID n'existe pas
                );
                return result.modifiedCount > 0;
            } catch (error) {
                console.error(error);
                return false;
            }
        },

        // Fonction : supprimer un sac avec son ID
        supprimerSacAvecId: async (id) => {
            try {
                const result = await __modules.SacSchema.deleteOne({ id });
                return result.deletedCount > 0;
            } catch (error) {
                console.error(error);
                return false;
            }
        },

        // Fonction : ajouter un produit à un sac
        ajouterProduitDansSac: async (idSac, produitData) => {
            try {
                const sac = await __modules.SacSchema.findOne({ id: idSac });
                if (!sac) return false;
                sac.articles.push(produitData);
                await sac.save();
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        },

    },

    // Catégorie : camions
    camions: {

        // Fonction : obtenir un camion avec son ID
        obtenirCamionAvecId: async (id) => {
            try {
                const camion = await __modules.CamionSchema.findOne({ id });
                return camion || null;
            } catch (error) {
                console.error(error);
                return null;
            }
        },

        // Fonction : obtenir tous les camions
        obtenirTousCamions: async () => {
            try {
                const tousLesCamions = await __modules.CamionSchema.find({});
                return tousLesCamions || [];
            } catch (error) {
                console.error(error);
                return [];
            }
        },

        // Fonction : créer un nouveau camion
        creerCamion: async (data) => {
            try {
                const nouveauCamion = new __modules.CamionSchema(data);
                await nouveauCamion.save();
                return nouveauCamion;
            } catch (error) {
                console.error(error);
                return null;
            }
        },

        // Fonction : modifier un camion avec son ID
        modifierCamion: async (id, data) => {
            try {
                const result = await __modules.CamionSchema.updateOne(
                    { id },
                    { $set: { ...data } },
                    { upsert: false } // Ne crée pas de nouveau camion si l'ID n'existe pas
                );
                return result.modifiedCount > 0;
            } catch (error) {
                console.error(error);
                return false;
            }
        },

        // Fonction : supprimer un camion avec son ID
        supprimerCamionAvecId: async (id) => {
            try {
                const result = await __modules.CamionSchema.deleteOne({ id });
                return result.deletedCount > 0;
            } catch (error) {
                console.error(error);
                return false;
            }
        },

        // Fonction : ajouter un sac à un camion
        ajouterSacDansCamion: async (idCamion, sacData) => {
            try {
                const camion = await __modules.CamionSchema.findOne({ id: idCamion });
                if (!camion) return false;
                camion.sac = sacData;
                await camion.save();
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        },

    },

}