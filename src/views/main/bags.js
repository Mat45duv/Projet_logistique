const databaseManager = require('./databaseManager');

// Fonction pour afficher tous les bags
async function afficherBags() {
    try {
        const bags = await databaseManager.bags.obtenirTousLesBags();
        console.log("Liste des bags : ", bags);
    } catch (err) {
        console.error("Erreur lors de l'affichage des bags :", err);
    }
}

afficherBags();
