const mongoose = require("mongoose");


const parcelSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sender: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sender'
    }],
    weight: Number,
    address: String,
    fragile: Boolean,
});


module.exports = mongoose.model("Parcel", parcelSchema);