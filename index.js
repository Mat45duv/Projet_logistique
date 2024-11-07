// Modules requis
const express = require("express");

// Création et configuration de l'application express (serveur)
const serveur = express();
const port = 3000;

// Routeur pour les authentifications (inscription, connexion, etc...)
const authRouter = require("./routers/auth-router");
serveur.use("/", authRouter);

// Ajoute l'URL-encoder pour récupérer le "body" des requêtes
serveur.use(express.urlencoded({
    extended: false
}));

// Configure le dossier des "vues" ejs
serveur.set("views", path.join(__dirname, "views"));
serveur.set("view engine", "ejs");

// Lancement du serveur
serveur.listen(port, () => {
    console.log(`Serveur lancé : http://localhost:${expressPort}`);
})