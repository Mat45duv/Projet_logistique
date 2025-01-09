/**
 * @file local-cdn.js
 * @description CDN local utilisé pour charger des fichiers statiques (supprime le problème de chemins avec EJS)
 */

// Modules requis
const path = require('path');
const fs = require('fs');

module.exports = {
    "enabled": true,
    "method": "GET",
    "auth": {
        "session": true,
        "api": false
    },
    "path": "/local-cdn/:folder/:file",
    "execute": async function (routerRequest, routerResponse) {

        // Get the folder and file from the request
        const folder = routerRequest.params.folder;
        const file = routerRequest.params.file;

        // Check if the folder and file are valid
        const filePath = path.join(__dirname, "../../../public/assets/", folder, file);

        // Check if the file exists
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                // File does not exist
                return routerResponse.status(404).json({
                    message: "Impossible de traiter la demande : le fichier demandé n'existe pas.",
                });
            }

            // Set the content type based on the file extension
            

            // Send the file
            return routerResponse.sendFile(filePath);
        });
    }
}