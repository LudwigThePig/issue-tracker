'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {
  MongoClient.connect(process.env.MONGO, (err)=>{
    if (err){
      console.log(`Ooops, looks like something went wrong: ${err}`);
    } else {
      console.log(`You are now connected to the database!`)
    }
  });

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params;
      console.log(project);
      
    })
    
    .post(function (req, res){
      var project = req.params.project;
      
    })
    
    .put(function (req, res){
      var project = req.params.project;
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
