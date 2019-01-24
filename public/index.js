( function(){
  
    //fetch projects and store in list
    let projects = {  
      list: [],
      fetchProjects: function(){
        return fetch('/api/projects')
          .then(function(res) {
            return res.json();
          })
          .then(res => {
            this.list = res.projects.map(project => [project.project_name, project._id]);
            return;
          })
          .catch(function(err) {
            throw new Error('oops something went wrong');
          });
      },
      addProject: function(){
        //post something
      }
      
    };
    
    console.log(projects.list);
  
    //Creating DOM elements for each project
    let project;
    for (project in projects.list){
      const linkWrapper = document.createElement('a');
      const projDiv = document.createElement('div');
      const projTitle = document.createElement('h2');
      const issueCount = document.createElement('p');
  
      linkWrapper.setAttribute('src', `issues/${project}`);
      projDiv.setAttribute('class', 'projectDiv');
      projTitle.innerText = project;
      issueCount.innerText = `${project.issues.length()} issues reported`;
  
      projDiv.appendChild(projTitle);
      projDiv.appendChild(issueCount);
  
      document.getElementById('main').appendChild(linkWrapper);
    }
  })()// end iife  