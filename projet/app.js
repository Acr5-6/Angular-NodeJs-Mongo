const express = require('express');
const app = express();
var morgan = require('morgan');
const port = 8001;
var dataLayer = require('./dataLayer')


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));
/*
dataLayer.init(function() {
    console.log("initialisation : " + port);
    app.listen(port);
});
*/
dataLayer.init(function() {
    console.log("initialisation : " + process.env.PORT);
    app.listen(process.env.PORT);
});


/******************************************** Task *********************************************/
app.post('/addTask', function(req, res) {
    if (req.body && typeof req.body.name != 'undefined') {

        var task = {
            name: req.body.name,
            listname: req.body.listname,
            username: req.body.username
        };

        dataLayer.insertTask(task, function() {
            res.send({ success: true });
        });
    } else {

        res.send({
            success: false,
            errorCode: "PARAM_MISSING"
        });
    }
});


app.post('/deleteTask', function(req, res) {

    var task = { _id: req.body.identifiant };
    dataLayer.deleteTask(task, function() {
        res.send({ success: true });
    });
});

app.post('/updateTask', function(req, res) {
    console.log(req);
    var id = { _id: req.body.identifiant };
    console.log(id);
    var task = {
        name: req.body.text,
        listname: req.body.listname,
        username: req.body.username
    };
    var req = { listname: req.body.listname };
    dataLayer.updateTask(id, task, function() {
        dataLayer.getTasks(req, function(dtSet) {
            res.send(dtSet);
        });
    });
});

/******************************************** GroupTask *********************************************/
app.post('/addGroupTask', function(req, res) {
    if (req.body && typeof req.body.listname != 'undefined') {

        var grptask = {
            listname: req.body.listname,
            username: req.body.username
        };

        dataLayer.insertGroupTask(grptask, function() {
            res.send({ success: true });
        });
    } else {
        res.send({
            success: false,
            errorCode: "PARAM_MISSING"
        });
    }
});


app.post('/getGroupTaskSet', function(req, res) {
    var user = {
        username: req.body.username,
    };
    console.log(req.body.username);
    dataLayer.getGroupTaskSet(user, function(dtSet) {
        console.log(dtSet);
        res.send(dtSet);
    });
});


app.post('/getTasks', function(req, res) {
    var req = {
        listname: req.body.listname,
        username: req.body.username
    };
    dataLayer.getTasks(req, function(dtSet) {
        res.send(dtSet);
    });
});

app.post('/deleteGroupTask', function(req, res) {

    var grptask = { _id: req.body.identifiant };
    dataLayer.deleteGroupTask(grptask, function() {
        res.send({ success: true });
    });
});

app.post('/deleteTasks', function(req, res) {

    var req = { listname: req.body.listname };
    dataLayer.deleteTasks(req, function() {
        res.send({ success: true });
    });
});

app.post('/updateGroupTask', function(req, res) {
    console.log(req);
    var id = { _id: req.body.identifiant };
    console.log(id);
    var grptask = {
        listname: req.body.text,
        username: req.body.username
    };
    dataLayer.updateGroupTask(id, grptask, function() {
        var user = {
            username: req.body.username,
        };
        dataLayer.getGroupTaskSet(user, function(dtSet) {
            res.send(dtSet);
        });

    });
});

app.post('/updateTaskS', function(req, exLname, res) {
    console.log(req);
    var task = {
        listname: req.body.listname,
        username: req.body.username
    };
    var list = { listname: exLname.body.listname };
    dataLayer.updateTaskS(list, task, function() {
        res.send({ success: true });

    });
});
/*
        dataLayer.getTasks(req, function(dtSet) {
            res.send(dtSet);
        });
        */

/******************************************* User ************************************************/
app.post('/createUser', function(req, res, next) {
    var userData = {
        username: req.body.username,
        password: req.body.password
    };
    var usernameData = {
        username: req.body.username,
    }
    dataLayer.signInUser(usernameData, function(dtSet) {
        console.log(dtSet);
        if (dtSet) {
            res.send({
                success: false,
                'status': 'error',
                'message': 'Ce nom existe déjà'
            });
        } else if (userData.password.length >= 4) {
            dataLayer.createUser(userData, function() {
                res.send({ success: true });
            })
        } else {
            res.send({
                success: false,
                'status': 'error',
                'message': 'Votre mot de passe doit être de 4 caractères minimum'
            });
        }
    })

});

// GET route after connection
app.post('/connection', function(req, res) {
    var usernameData = {
        username: req.body.username,
    }

    dataLayer.signInUser(usernameData, function(dtSet) {
        console.log(dtSet);
        if (!dtSet) {
            res.send({
                success: false,
                'status': 'error',
                'message': 'Cet utilisateur n\'existe pas'
            });
        } else if (dtSet.password != req.body.password) {
            res.send({
                success: false,
                'status': 'error',
                'message': 'le mot de passe est erroné'
            });
        } else {
            res.send({ success: true });
        }
    })
});