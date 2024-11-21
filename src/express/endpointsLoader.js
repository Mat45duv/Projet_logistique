/**
 * @file endpointsLoader.js
 * @author Maxencexz
 * @description Charge de façon dynamique les endpoints de l'application.
 */

// Modules requis
const path = require("path");
const fs = require("fs");

const middlewaresList = require("./middlewares/middlewares");

// Fonction utilisée pour charger (configurer) une route (endpoint) dans l'application express
function configurerRoute(app, routerData) {
    const middlewares = [];

    // On vérifie si la route néssecite une authentification API
    if (routerData.auth && routerData.auth.api && routerData.auth.api === true) {
        middlewares.push(middlewaresList.apiAuthentication);
    }

    // On vérifie si la route néssecite une authentification session (utilisateur connecté)
    if (routerData.auth && routerData.auth.session && routerData.auth.session === true) {
        middlewares.push(middlewaresList.userAuthentication);
    }

    // Si l'endpoint a des middlewares spécifiques, on les ajoute à la liste
    if (Array.isArray(routerData.middlewares)) {
        middlewares.push(...routerData.middlewares);
    }

    // Fonction pour éxecuter les routes avec un catch pour les erreurs
    const executeWithCatch = async (req, res, next) => {
        try {
            await routerData.execute(req, res);
        } catch (error) {
            console.error(`[❌] [WEB SERVER] Erreur non gérée pour l'endpoint ${routerData.method} ${routerData.path}:`, error);
            res.status(500).json({
                erreur: {
                    message: "Une erreur inattendue s'est produite.",
                    type: "erreur_serveur",
                    code: "erreur_interne_serveur"
                }
            });
        }
    };

    // On ajoute la fonction d'éxecution avec gestion d'erreurs à la liste des middlewares
    middlewares.push(executeWithCatch);

    // On charge la route dans l'application express en fonction de la méthode HTTP
    const { method, path } = routerData;
    switch (method) {
        case "GET":
            app.get(path, middlewares);
            break;
        case "POST":
            app.post(path, middlewares);
            break;
        case "DELETE":
            app.delete(path, middlewares);
            break;
        case "PUT":
            app.put(path, middlewares);
            break;
        default:
            console.warn(`[⚠️] [WEB SERVER] Méthode non supportée : ${method} pour l'endpoint ${path}`);
            return;
    }

    // On affiche un message de confirmation dans la console
    console.log(`[✅] [WEB SERVER] Endpoint chargé avec succès: ${path} [${method}] ${routerData.auth.api ? '[AUTH🔒]' : ''}`);
}

function chargerEndpoints(app, cheminDossier) {
    const fichiers = fs.readdirSync(cheminDossier);

    fichiers.forEach(fichier => {
        const cheminFichier = path.resolve(cheminDossier, fichier);
        const statsFichier = fs.statSync(cheminFichier);

        if (statsFichier.isFile() && fichier.endsWith('.js')) {
            const donneesRouteur = require(cheminFichier);

            if (donneesRouteur.enabled) {
                configurerRoute(app, donneesRouteur);
            }
        } else if (statsFichier.isDirectory()) {
            // Appel récursif pour gérer les sous-dossiers
            chargerEndpoints(app, cheminFichier);
        }
    });
}

module.exports = function (app) {

    // On obtient le dossier contenant tout les endpoints
    const endpointsDir = path.join(__dirname, "endpoints");

    try {
        chargerEndpoints(app, endpointsDir);
    } catch (error) {
        console.error(`[❌] [WEB SERVER] Erreur pendant le chargement des endpoints : ${error.message}`);
    }
};