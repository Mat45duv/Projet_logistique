const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller"); // Controller utilisé pour les autentifications (inscription, connexion, mail de vérification, etc...)

// Ajouter les routes ci-dessous
router.get("/exemple1", authController.exempleUn);
router.post("/exemple2", authController.exempleDeux);
router.get("/etc", authController.exempleTrois);

module.exports = router;