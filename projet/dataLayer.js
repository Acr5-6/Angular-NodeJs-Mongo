var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://admin:acr_974€22041-996€$&@cluster0-wvvnh.mongodb.net/test?retryWrites=true";
var client = new MongoClient(uri, { useNewUrlParser: true });

var db;

var dataLayer = {
    init: function(cb) {

        // Initialisation la connexion
        client.connect(function(err) {
            if (err) throw err;

            db = client.db("Poly_task");

            cb();
        });

    },


    getTaskSet: function(cb) {
        db.collection("Task").find({}).toArray(function(err, docs) {
            cb(docs);
        });
    },


    insertTask: function(cb) {
        db.collection("Task").insertOne(task, function(err, result) {
            cb();
        });
    },
}

module.exports = dataLayer;