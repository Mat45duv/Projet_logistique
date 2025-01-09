const Mongoose = require('mongoose');

const ProduitSchema = new Mongoose.Schema({

    id: { type: String, required: true, unique: true },
    nom: { type: String, required: true },
    description: { type: String },
    prix: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    categorie: { type: String },
    dateAjout: { type: Date, default: Date.now },

});

module.exports = Mongoose.model('Produit', ProduitSchema);