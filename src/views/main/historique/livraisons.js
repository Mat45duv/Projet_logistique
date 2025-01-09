const databaseManager = require('./databaseManager');

// Fonction pour afficher toutes les livraisons
async function afficherLivraisons() {
    try {
        const livraisons = await databaseManager.livraisons.obtenirToutesLesLivraisons();
        console.log("Liste des livraisons : ", livraisons);
    } catch (err) {
        console.error("Erreur lors de l'affichage des livraisons :", err);
    }
}

afficherLivraisons();
