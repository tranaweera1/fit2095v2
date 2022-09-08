const mongoose = require('mongoose');

const Sender = require("../models/sender");
const Parcel = require("../models/parcel");

module.exports = {

    // START CRUD OPERATIONS 

    // GET PARCEL BY ID

    getOne: function (req, res) {
        Parcel.findOne({ _id: req.params.id })
            .populate('senders')
            .exec(function (err, sender) {
                if (err) return res.json(err);
                if (!sender) return res.json();
                res.json(sender);
            });
    },
    
  
    
    // CREATE A PARCEL

    createOne: function (req, res) {
        let newParcelDetails = req.body;
        newParcelDetails._id = new mongoose.Types.ObjectId();
    
        Parcel.create(newParcelDetails, function (err, Sender) {
            if (err)
                return res.json(err);
            res.json(Sender);
        });
    },

    // DELETE A PARCEL BY ID

    deleteOne: function (req, res) {
        Sender.findByIdAndDelete({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },


    // UPDATE PARCEL BY ID

    updateOne: function (req, res) {
        Parcel.findOneAndUpdate({ _id: req.body.id }, req.body, function (err, Parcel) {
            if (err) return res.status(400).json(err);
            if (!Parcel) return res.status(404).json();

            res.json(Parcel);
        });
    },

    // END CRUD OPERATIONS


    // START SPECIAL OPERATIONS

      // GET ALL PARCELS BY ADDRESS THROUGH QUERY STRING
    
      getAll: function (req, res) {
        Parcel.findOne({ address: req.query.address })
            .populate('senders')
            .exec(function (err, sender) {
                if (err) return res.json(err);
                if (!sender) return res.json();
                res.json(sender);
            });
    },


    // END SPECIAL OPERATIONS


}