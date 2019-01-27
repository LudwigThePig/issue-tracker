function IssueHandler(){
  const Project = require('../models/project.js');
  const Issue = require('../models/issue.js');
  
  this.getIssues = function(req, res){
    const project = req.params;
    console.log(project);
    Issue.find(project, function(err, data){
      if (err){
        console.log('We could not find these issues');
      } else {
        console.dir(res);
        res.json(res);
      }
    })
  };
  //gets all the current issues
  
  this.postIssues = function(req, res){
    res.send('we made it to controller/issue-handler postIssues')
  };
  //find the project. If project does not exist, prompt the user to create project. If project does exist, post to that project
  
  this.putIssues = function(req, res){
    res.send('we made it to controller/issue-handler putIssues')
  };;
  //Not exactly sure what to do....
  
  this.deleteIssues = function(req, res){
    res.send('we made it to controller/issue-handler deleteIssues')
  };;
  //Finds issue by id. If issue is not present, return err. If present, delete

}

module.exports = IssueHandler;