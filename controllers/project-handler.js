const Project = require('../models/project.js');

function ProjectHandler(){
  
  this.getAllProjects = function(req, res){
    Project.find({}, (err, projects)=>{
      if (err){
        res.send({error: err});
        console.log(err);
      } else {
        res.json({projects: projects});
        console.log('getAllProjects sent projects');
      }
    })
  };
  
  this.getOneProject;
  //Will serach for one project and return in JSON. If none present, return ...
  
  this.postProject = function(req, res){
    const projName = req.body.projectName
  }
  //Will search for a matching project. If match is found, direct them to project. If none is found, it will add it to the database
  
  this.deleteProject;
  //Will search for a matching project. If none found, return an error message. If found, delete and update page
  

}

module.exports = ProjectHandler;