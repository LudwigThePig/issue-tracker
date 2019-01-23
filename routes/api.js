'use strict';

const expect = require('chai').expect;
const MongoClient = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const Issues = require('../controller/issue-handler.js');
const Projects = require('../controller/project-handler.js');

const issues = new Issues;
const projects = new Projects;

const CONNECTION_STRING = process.env.MONGO; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {
  MongoClient.connect(process.env.MONGO, (err)=>{
    if (err){
      console.log(`Ooops, looks like something went wrong: ${err}`);
    } else {
      console.log(`You are now connected to the database!`)
    }
  });

  app.route('/api/issues/:project')
  
    .get(issues.getIssues)
    
    .post(issues.postIssues)
    
    .put(issues.putIssues)
    
    .delete(issues.deleteIssues); 
  
  app.route('/api/projects')
    .get(projects.getAllProjects)
    .post(projects.postProject)
  
  app.route('/api/projects/:project')
    .get(projects.getOneProject)
    .delete(projects.deleteProject)
};
