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
  
  
  //Will serach for one project, get all associated issues (via populate()), then return JSON. If none present, return ...
  this.getOneProject = function(req, res){
    const id = req.params.project.toString();
    Project.findById(id)
      .populate('issues')
      .exec( (err, project) => {
        if (err){ 
          res.send(err);
        } else { 
          res.json(project);
        }
      });          
  };
  
//Will search for a matching project. If match is found, direct them to project. If none is found, it will add it to the database
  this.postProject = function(req, res){
    const projName = req.body.projectName.toString();
    Project.findOne({projName})
      .exec((project) => {
        if (project){
          res.send('project already exists')
        } else {
          let proj = new Project(projName);
          proj.save()
            .exec( (err, x) => {
              if (err){
                res.send(err);
              } else {
                let response = {
                  message: `${proj} created`,
                  _id: x._id
                }
                res.json(response);
              }
          })
          
        }
      })
  }
  
//Will search for a matching project. If none found, return an error message. If found, delete and update page
  this.deleteProject = function(req, res){
    const id = req.params.project.toString();
    Project.findByIdAndDelete(id, (proj, err)=>{
      if (err){
        res.send(err);
      } else{
        
        let response;
        
        if (proj){
          response = `${proj} had been deleted`;
        } else {
          response = `Could not find and delete ${proj}`;
        }
        res.json({response});
      }
    })
  };;
  

}

module.exports = ProjectHandler;