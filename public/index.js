(function(){
  //fetch projects and store in list
  let projects = {  
    list: [],
    init: function(){
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
    addProject: function(projectName){
      console.log(projectName);
      return fetch('/api/projects',{
        method: 'POST',
        body: JSON.stringify({projectName}),
        headers:{'Content-Type': 'application/json'}
      })
        .then(data => {return data.json();})
        .then((res)=>{
            this.list.push([projectName, res._id])
              console.log('made it this far');

            return res;
          })
        .catch(err => {throw new Error('Failed to add project')});
      
    }
    
  };//end projects  
  console.log(projects.list);
  
  const dom = {
    init: function(){
      
      //Rendering
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
      //Form Handling
      const submitButton = document.getElementById('submitProject');
      let formInput = document.getElementById('projectName');
      submitButton.addEventListener('click', (e)=>{
        e.preventDefault();
        projects.addProject(formInput.value);
        formInput.value = '';
      });
    }
  }//end dom
  dom.init();
})()// end iife
