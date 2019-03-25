var app = require('express').Router();

var mongoose = require('mongoose');

// Connection a MongoDB
mongoose.connect('mongodb://localhost/ListeaFaire', { useNewUrlParser: true })
    .then(() => console.log('connection successful'))
    .catch((err) => console.error(err));

// model de Liste
var Liste = require('./model.js');

// La route au serveur
app.get('/', function(req, res) {
    res.sendFile('./public/index.html');
});


app.get('/api/laliste', function(req, res) {
    Liste.find(function(err, laliste) {
        if (err)
            res.send(err)
        res.json(laliste);
    });
});

app.post('/api/laliste', function(req, res) {
    Liste.create({
        text: req.body.text,
        user: "Yusuke",
        date: new Date(),
        done: false
    }, function(err, liste) {
        if (err)
            res.send(err);
        Liste.find(function(err, laliste) {
            if (err)
                res.send(err)
            res.json(laliste);
        });
    });
});

app.delete('/api/laliste/:liste_id', function(req, res) {
    Liste.deleteOne({
        _id: req.params.liste_id
    }, function(err, liste) {
        if (err)
            res.send(err);
        Liste.find(function(err, laliste) {
            if (err)
                res.send(err)
            res.json(laliste);
        });
    });
});

/*
app.put('/api/laliste/:liste_id', function(req, res) {
    Liste.updateOne({
        _id: req.params.liste_id
    }, function(err, liste) {
        if (err)
            res.send(err);
        Liste.find(function(err, laliste) {
            if (err)
                res.send(err)
            res.json(laliste);
        });
    });
});
*/

module.exports = app;