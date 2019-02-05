const Project = require('../models/project');

function ProjectHandler(){
  
  this.getAllProjects = function(req, res){
    Project.find({}, (err, projects)=>{
      if (err){
        res.send({error: err});
        console.log(err);
      } else {
        res.json({projects: projects});
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
    const projectName = req.body.projectName.toString();
    Project.findOne({projectName: projectName}, function(err, project){
      if (err){console.log(err)};
      
      if (project){
        res.json({message: 'that project already exists'});
      } else {
        let proj = new Project({projectName: projectName});
        proj.save()
          .then( (x) => {
              let response = {
                message: `${proj} created`,
                _id: x._id
              }
              console.log(response);
              res.json(response);
          })
    }})
      .catch(err => console.log(err));
  }
  
//Will search for a matching project. If none found, return an error message. If found, delete and update page
  this.deleteProject = function(req, res){
    const name = req.params.project.toString();
    Project.findOneAndDelete({projectName: name}, (proj, err)=>{
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