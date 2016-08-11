var express = require('express');
var router = express.Router();
 

exports.findAll = function (req, res, next) {
 var db = req.db;
    var collection = db.get('business');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });

};

exports.findById = function (req, res, next) {
    var id_param = req.params.id;
    var title_param = req.params.title;
    console.dir(id_param);
	var db = req.db;
    var collection = db.get('business');
    collection.find({"id":id_param,"title":title_param},function(e,docs){
    	console.dir(docs);
        res.json(docs);
    });
};


