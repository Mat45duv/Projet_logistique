const Mongoose = require('mongoose');

const SacSchema = new Mongoose.Schema({
    id: { type: String, required: true, unique: true },
    articles: { 
        type: Array, 
        default: [{
            produit: { type: Mongoose.Schema.Types.ObjectId, ref: "Produit", required: true },
            quantite: { type: Number, required: true }
        }]
    },
    dateAjout: { type: Date, default: Date.now }
});

module.exports = Mongoose.model('Sac', SacSchema);