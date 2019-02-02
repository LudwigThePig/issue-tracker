function IssueHandler(){
  const Project = require('../models/project.js');
  const Issue = require('../models/issue.js');
  
  
//gets all the current issues
  this.getIssues = function(req, res){
    const project = req.params.project;
    Issue.find({project: project}, function(err, data){
      if (err){
        console.log(err);
      } else {
        res.json(data);
      }
    })
  };
  
  this.postIssues = function(req, res){
    const projName = req.params.project.toString(); //this is the name, need __id?
    const issue = new Issue({
      "issueTitle": req.body.issueTitle,
      "description": req.body.description,
      "name": req.body.name,
      "assign": req.body.assign,
      "status": req.body.status,
      "dateCreated": new Date(),
      "dateUpdated": new Date(),
      "open": true,
      "project": projName
    });
    issue.save()
      .then(function(data){
        Project.findOneAndUpdate({projectName: projName}, { $push: {issues: data._id}})
          .then(function(){
            res.json(data);
          })
          .catch( (err)=>{ console.log(err); });
    })
    .catch( (err)=>{ console.log(err); } );

  };
  //find the project. If project does not exist, prompt the user to create project. If project does exist, post to that project
  
  this.putIssues = function(req, res){
    res.send('we made it to controller/issue-handler putIssues')
  };;
  //Not exactly sure what to do....
  
  this.deleteIssues = function(req, res){
    const issueId = req.params.project;
    console.log(issueId);
    Issue.findByIdAndDelete({_id: issueId})
      .then( response => res.json({response}) )
      .catch( err => console.log(err) );
  };
  //Finds issue by id. If issue is not present, return err. If present, delete

}

module.exports = IssueHandler;