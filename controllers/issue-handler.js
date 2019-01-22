const Project = require('../models/project.js');
const Issue = require('../models.issue.js');

function IssueHandler(){
  this.postIssues;
  //find the project. If project does not exist, prompt the user to create project. If project does exist, post to that project
  
  this.putIssues;
  //Not exactly sure what to do....
  
  this.deleteIssues;
  //Finds issue by id. If issue is not present, return err. If present, delete

}

module.exports = IssueHandler;