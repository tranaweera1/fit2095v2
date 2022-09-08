let express = require('express');
let app = express();
const mongoose = require('mongoose');
const path = require("path");

const sender = require('./routers/sender');
const parcel = require("./routers/parcel");


// MIDDLEWARES

app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));

app.use(express.static('images'));
app.use(express.static('css'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/parcels', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

// SENDER RESTFUL ENDPOINTS

app.get('/sender/:id', sender.getOne);
app.post('/sender', sender.createOne);
app.put('/sender/:id', sender.updateOne);
app.delete('/sender/:id', sender.deleteOne);
app.post('/sender/:id/parcel', sender.addParcel);

// ACTOR RESTFUL ENDPOINTS

app.get('/parcel/', parcel.getOne);
app.get('/parcel/:id', parcel.getOne);
app.post('/parcel', parcel.createOne);
app.put('/parcel', parcel.updateOne);
app.delete('/parcel/:id', parcel.deleteOne); 

// app.post('/parcel/:id/movies', parcel.addParcel);        

app.listen(8080);