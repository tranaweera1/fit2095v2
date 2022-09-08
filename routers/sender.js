const mongoose = require('mongoose');

const Sender = require("../models/sender");
const Parcel = require("../models/parcel");

module.exports = {

    // GET ALL PARCELS FROM ONE SENDER
    getOne: function (req, res) {
        Sender.findOne({ _id: req.params.id })
            .populate('parcels')
            .exec(function (err, parcel) {
                if (err) return res.json(err);
                if (!parcel) return res.json();
                res.json(parcel);
            });
    },
    
    // CREATE A NEW SENDER (TESTED AND WORKING)

    createOne: function (req, res) {
        let newSenderDetails = req.body;
        newSenderDetails._id = new mongoose.Types.ObjectId();
    
        Sender.create(newSenderDetails, function (err, Sender) {
            if (err)
                return res.json(err);
            res.json(Sender);
        }); 
    },

    // DELETE SENDER BY ID (TESTED AND WORKING)

    deleteOne: function (req, res) {
        Sender.findByIdAndDelete({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },

    // UPDATE SENDER NAME BY ID 

    updateOne: function (req, res) {
        Sender.findOneAndUpdate({ _id: req.body.id }, req.body, function (err, Sender) {
            if (err) return res.status(400).json(err);
            if (!Sender) return res.status(404).json();

            res.json(Sender);
        });
    },

    // ADD PARCEL TO SENDER

    addParcel: function (req, res) {
        Sender.findOne({ _id: req.params.id }, function (err, Sender) {
            if (err) return res.status(400).json(err);
            if (!Sender) return res.status(404).json();

            Parcel.findOne({ _id: req.body.id }, function (err, parcel) {
                if (err) return res.status(400).json(err);
                if (!parcel) return res.status(404).json();

                Sender.parcels.push(parcel._id);
                Sender.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(Sender);
                });
            })
        });
    }
    
}