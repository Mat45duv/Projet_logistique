const Mongoose = require('mongoose');

module.exports = Mongoose.model('Livraison', new Mongoose.Schema({
    id: { type: String, required: true },
    client: { type: Mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    dateLivraison: { type: Date, required: true },
    statut: {
        type: String,
        enum: ['en attente', 'en cours', 'livrée', 'annulée'],
        default: 'en attente',
        required: true
    },
    numeroSuivi: { type: String, unique: true },
    adresse: {
        rue: { type: String, required: true },
        ville: { type: String, required: true },
        codePostal: { type: String, required: true },
        pays: { type: String, required: true }
    },
    articles: [{
        produit: { type: Mongoose.Schema.Types.ObjectId, ref: 'Produit', required: true },
        quantite: { type: Number, required: true, min: 1 }
    }],
    sac: { type: Mongoose.Schema.Types.ObjectId, ref: 'Sac', required: true },
    poidsTotal: { type: Number, required: false },
    creeLe: { type: Date, default: Date.now },
    misAJourLe: { type: Date, default: Date.now },
    camion: { type: Mongoose.Schema.Types.ObjectId, ref: 'Camion', required: false }
}, {
    timestamps: true
}));