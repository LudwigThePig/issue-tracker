'use strict';

const expect = require('chai').expect;
const MongoClient = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const Issues = require('../controller/issue-handler.js');
const Projects = require('../controller/project-handler.js');

const issues = new Issues;
const projects = new Projects;


module.exports = function (app) { 

  app.route('/api/issues/:project')
  
    .get(issues.getIssues)
    
    .post(issues.postIssues)
    
    .put(issues.putIssues)
    
    .delete(issues.deleteIssues); 
  
  
  app.route('/api/projects')
  
    .get(projects.getAllProjects)
  
    .post(projects.postProject);
  
  
  app.route('/api/projects/:project')
  
    .get(projects.getOneProject)
  
    .delete(projects.deleteProject);
};
