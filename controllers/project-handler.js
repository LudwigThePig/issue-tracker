const Project = require('../models/project.js');

function Models(){
  
  this.getAllProjects;
  //Will find all projects and return in JSON
  
  this.getOneProject;
  //Will serach for one project and return in JSON. If none present, return ...
  
  this.postProject;
  //Will search for a matching project. If match is found, direct them to project. If none is found, it will add it to the database
  
  this.deleteProject;
  //Will search for a matching project. If none found, return an error message. If found, delete and update page
  

}

module.exports = Models;