const mongoose = require("mongoose");

const senderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    parcels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parcel'
    }]
    
});



module.exports = mongoose.model("Sender", senderSchema);