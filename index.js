/**
 * @file index.js
 * @author Maxencexz
 * @description Fichier en charge de démarrer le serveur Express.
 */

// On charge les variables d'environnement
require("dotenv").config();

// On importe les modules requis
const __modules = {
    express: require("express"),
    expressBodyParser: require('body-parser'),
    path: require("path"),
    middlewares: require("./src/express/middlewares/middlewares"),
    endpointsLoader: require("./src/express/endpointsLoader"),
    nocache: require("nocache")
}

// Création de l'application Express
const app = __modules.express();
app.disable("x-powered-by");
app.set("view engine", "ejs");
app.set('view cache', false);
app.set('trust proxy', 1);
app.use(__modules.express.static(__dirname + '/src/public'));
app.set('views', __modules.path.join(__dirname, '/src/views'));
app.use(__modules.expressBodyParser.json());
app.use(__modules.expressBodyParser.urlencoded({ extended: true }));

// Add middlewares
app.use(__modules.middlewares.sessionMiddleware);
app.use(__modules.middlewares.isSessionMiddleware);

// Starts the Express server
const server = app.listen(process.env.EXPRESS_PORT, async () => {
    console.log(`[🔄] [WEB SERVER] Application Express démarrée; chargement des endpoints...`);
    await __modules.endpointsLoader(app);
});