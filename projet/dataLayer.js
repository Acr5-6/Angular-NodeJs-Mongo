var MongoClient = require("mongodb").MongoClient;
var mongodb = require('mongodb');
var uri = "mongodb+srv://admin:acr_974€22041-996€$&@cluster0-wvvnh.mongodb.net/test?retryWrites=true";
var client = new MongoClient(uri, { useNewUrlParser: true });
var db;

var dataLayer = {
    init: function(cb) {
        client.connect(function(err) {
            if (err) throw err;
            db = client.db('Poly_task');
            cb();
            console.log("Connexion bd reussie");
        });
    },

    /************** Collection : Task ****************/

    insertTask: function(task, cb) {
        db.collection("Task").insertOne(task, function(err, result) {
            cb();
        });

    },

    deleteTask: function(task, cb) {
        var query = { _id: new mongodb.ObjectID(task._id) };
        db.collection("Task").deleteOne(query, function(err, result) {
            cb();
        });
    },

    updateTask: function(id, task, cb) {
        var query = { _id: new mongodb.ObjectID(id._id) };
        console.log(query, task);
        db.collection("Task").findOneAndUpdate(query, { $set: task }, function(err, result) {
            console.log('resultat : ' + result);
            cb();
        });
    },


    /************** Collection : GroupTask ****************/
    getGroupTaskSet: function(req, cb) {
        db.collection("GroupTask").find(req).toArray(function(err, docs) {
            console.log(req);
            console.log(docs);
            cb(docs);
        });
    },


    getTasks: function(req, cb) {
        db.collection("Task").find(req).toArray(function(err, docs) {
            cb(docs);
        });
    },


    insertGroupTask: function(grptask, cb) {
        db.collection("GroupTask").insertOne(grptask, function(err, result) {
            cb();
        });

    },

    deleteGroupTask: function(grptask, cb) {
        var query = { _id: new mongodb.ObjectID(grptask._id) };
        db.collection("GroupTask").deleteOne(query, function(err, result) {
            cb();
        });
    },

    deleteTasks: function(req, cb) {
        db.collection("Task").deleteMany(req, function(err, result) {
            cb();
        });
    },

    updateGroupTask: function(id, grptask, cb) {
        var query = { _id: new mongodb.ObjectID(id._id) };
        console.log(query, grptask);
        db.collection("GroupTask").findOneAndUpdate(query, { $set: grptask }, function(err, result) {

            cb();
        });
    },

    updateTaskS: function(query, task, cb) {
        console.log(query, task);
        db.collection("Task").updateMany(query, { $set: task }, function(err, result) {
            console.log(result);
            cb();
        });
    },


    /************** Collection : User ****************/
    createUser: function(req, cb) {
        db.collection("User").insertOne(req, function(err, result) {
            cb();
        });
    },

    signInUser: function(req, cb) {
        db.collection("User").findOne(req, function(err, docs) {
            cb(docs);
        });
    },


};
module.exports = dataLayer;