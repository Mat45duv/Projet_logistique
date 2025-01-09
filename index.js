/**
 * @file index.js
 * @author Maxencexz
 * @description Fichier en charge de démarrer le serveur Express avec HTTPS.
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
    nocache: require("nocache"),
    https: require("https"), // HTTPS module
    fs: require("fs"), // File system module to read certificate and key files,
    databaseManager: require("./src/database/databaseManager")
};

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
app.use(__modules.nocache());

// Add middlewares
app.use(__modules.middlewares.sessionMiddleware);
app.use(__modules.middlewares.isSessionMiddleware);

// Load HTTPS certificates
const httpsOptions = {
    key: __modules.fs.readFileSync(__dirname + '/certificate/localhost+2-key.pem'),
    cert: __modules.fs.readFileSync(__dirname + '/certificate/localhost+2.pem')
};

// Start the HTTPS server
const server = __modules.https.createServer(httpsOptions, app).listen(process.env["EXPRESS_PORT"], async () => {

    // On se connecte à la base de données
    const dbConnect = await __modules.databaseManager.connect();
    if(!dbConnect) {
        console.log("[❌] [DATABASE] Impossible de se connecter à la base de données.");
        process.exit(1);
    }

    console.log(`[🔒] [DATABASE] Base de données connectée avec succès.`);

    console.log(`[🔒] [WEB SERVER] Application Express démarrée en HTTPS; chargement des endpoints...`);
    console.log("[🔗] [WEB SERVER] Port: " + process.env["EXPRESS_PORT"]);
    await __modules.endpointsLoader(app);
});