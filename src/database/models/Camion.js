const Mongoose = require('mongoose');

const CamionSchema = new Mongoose.Schema({
    id: { type: String, required: true, unique: true },
    nom: { type: String, required: true },
    conducteur: { type: Mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    capacite: { type: Number, required: true },
    sacs: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Sac", required: true }],
    dateAjout: { type: Date, default: Date.now }
});

module.exports = Mongoose.model('Camion', CamionSchema);