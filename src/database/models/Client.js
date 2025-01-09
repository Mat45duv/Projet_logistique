const Mongoose = require('mongoose');

module.exports = Mongoose.model('Client', new Mongoose.Schema({

    id: { type: String, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    dateNaissance: { type: Date, required: true },
    adresse: { type: String, required: true },
    
}));