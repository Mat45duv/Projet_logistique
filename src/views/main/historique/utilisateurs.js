const databaseManager = require('./databaseManager');

// Fonction pour afficher tous les utilisateurs
async function afficherUtilisateurs() {
    try {
        const utilisateurs = await databaseManager.utilisateurs.obtenirUtilisateurAvecId();
        console.log("Liste des utilisateurs : ", utilisateurs);
    } catch (err) {
        console.error("Erreur lors de l'affichage des utilisateurs :", err);
    }
}

afficherUtilisateurs();
