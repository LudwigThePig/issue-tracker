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
      const options = {
        method: 'POST',
        body: JSON.stringify({projectName}),
        headers: {'Content-Type': 'application/json'}
      };
      
      return fetch('/api/projects', options)
        .then((data) => {return data.json()})
        .then((res)=>{
            this.list.push([projectName, res._id])

            return res;
          })
        .catch(err => {console.log(err)});
      
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
        // let count = (project.issues.length == undefined) ? 0 : project.issues.length;
        issueCount.innerText = `0 issues reported`;

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
  projects.init();
  //TODO: Find way to invoke this function after fetch
  setTimeout(function(){dom.init();}, 2000);

})()// end iife
