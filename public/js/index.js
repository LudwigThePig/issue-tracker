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
          this.list = res.projects.map(project => [project.projectName, project._id, project.issues]);
          return;
        })
        .catch(function(err) {
          throw new Error('oops something went wrong');
        });
    },
    addProject: function(projectName){
      
      return fetch('/api/projects', {
        method: 'POST',
        body: JSON.stringify({projectName}),
        headers: {'Content-Type': 'application/json'}
      })
        .then((data) => {return data.json()})
        .then((res)=>{
            this.list.push([projectName, res._id])

            return res;
          })
        .catch(err => {console.log(err)});
      
    }
    
  };//end projects  
  
  const dom = {
    init: function(){
      //Rendering
      for (let i = 0; i < projects.list.length; i++){
        const linkWrapper = document.createElement('a');
        const projDiv = document.createElement('div');
        const projTitle = document.createElement('h2');
        const issueCount = document.createElement('p');
        const id = document.createElement('span');

        linkWrapper.setAttribute('href', `/${projects.list[i][0]}`);
        projDiv.setAttribute('class', 'projectDiv');
        console.log(projects.list[i][2]);
        projTitle.innerText = projects.list[i][0];
        
        let count =  projects.list[i][2].length;       
        issueCount.innerText = `issues: ${count}`;
        
        projDiv.appendChild(projTitle);
        projDiv.appendChild(issueCount);
        linkWrapper.appendChild(projDiv);

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
