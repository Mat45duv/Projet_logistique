const Mongoose = require('mongoose');

module.exports = Mongoose.model('User', new Mongoose.Schema({

    id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, default: "inactive" },
    permissions: { type: Array, default: [] },

}));