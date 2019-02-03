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
  
  this.putIssues = function(req, res){
    
    const id = req.body.id;
    const request = req.body;
    let update = {};
    
    //Prunes the request body of any empty form fields. Slice is removing the id key
    Object.keys(request).slice(1).forEach( field => {
      if (request[field] != ''){
        update[field] = request[field];
      }
    });
    if (update.open == 'closed'){
      update.open = false;
    }
    console.log(update)
    Issue.findByIdAndUpdate(id);
  };;
  
  this.deleteIssues = function(req, res){
    const issueId = req.params.project;
    console.log(issueId);
    Issue.findByIdAndDelete({_id: issueId})
      .then( response => res.json({response}) )
      .catch( err => console.log(err) );
  };

}

module.exports = IssueHandler;