(function(){
  const projName = location.pathname.slice(1).toString();
  //fetch issues and store in list
  let issues = {  
    list: [],
    init: function(){ //Gets issues for the project
      return fetch(`/api/issues/${projName}`)
        .then(function(res) {
          return res.json();
        })
        .then(res => {
        // issueTitle, description, name, assign, status, dateCreated, dateUpdated, open, project

          this.list = res; //.map(issue => [issue.projectName, issue._id]);
          console.log(this.list);
          return;
        })
        .catch(function(err) {
          throw new Error('oops something went wrong' + err);
        });
    },
    addIssue: function(issue){
      
      return fetch(`/api/issues/${projName}`, {
        method: 'POST',
        body: `${issue}`,
        headers: {'Content-Type': 'application/json'}
      })
        .then((data) => {return data.json()})
        .then((res)=>{
            this.list.push({issue})

            return res;
          })
        .catch(err => {console.log(err + issue)});
      
    }
    
  };//end issues  
  
  
  const dom = {
    init: function(){
      
      /*
      assign: "k"
      dateCreated: "Thu Jan 31 2019 21:02:53 GMT+0000 (Coordinated Universal Time)"
      dateUpdated: "Thu Jan 31 2019 21:02:53 GMT+0000 (Coordinated Universal Time)"
      description: "k"
      issueTitle: "k"
      name: "k"
      open: true
      project: "okay"
      status: "k"
      __v: 0
      _id: "5c53627da413512caa199645"
      */
      
      //Rendering
      for (let i = 0; i < issues.list.length; i++){
        console.log(issues.list);
        const issueDiv = document.createElement('div');
        const name = document.createElement('h2');
        const description = document.createElement('p');
        const created = document.createElement('span');
        const updated = document.createElement('span');
        const status = document.createElement('span');
        const open = document.createElement('open');

        issueDiv.setAttribute('class', 'projectDiv');
        created.setAttribute('class', 'date');
        updated.setAttribute('class', 'date');
        status.setAttribute('class', 'status');
        open.setAttribute('class', 'status');
        
        name.innerText = issues.list[i].name;
        description.innerText = issues.list[i].description;
        created.innerText = issues.list[i].dateCreated.slice(0, 15);
        updated.innerText = issues.list[i].dateUpdated.slice(0, 12);
        
        if (issues.list[i].open){
          open.innerText = "Open";
          open.setAttribute('style', 'color: red');
        } else {
          open.innerText = "Closed";
          open.setAttribute('style', 'color: green');
        }
        
        issueDiv.appendChild(name);
        issueDiv.appendChild(description);
        issueDiv.appendChild(created);
        issueDiv.appendChild(updated);
        issueDiv.appendChild(status);
        issueDiv.appendChild(open);

        document.getElementById('issues').appendChild(issueDiv);
      }
      
    /* ********FORM HANDLING******** */
      
      //POST
      const form = document.getElementById('submitIssue')
      const submitButton = document.getElementById('buttonPOST');
      let formInput = {
        title: document.getElementsByName('issue_title')[0],
        description: document.getElementsByName('issue_text')[0],
        createdBy: document.getElementsByName('created_by')[0],
        assignedTo: document.getElementsByName('assigned_to')[0],
        statusText: document.getElementsByName('status_text')[0]
      }
      document.querySelector('submitIssue');
      submitButton.addEventListener('click', (e)=>{
        console.log(formInput.title.value + typeof(formInput.title.value))
        e.preventDefault();                
        const json = {
            "issueTitle": formInput.title.value,
            "description": formInput.description.value,
            "name": formInput.createdBy.value,
            "assign": formInput.assignedTo.value,
            "status": formInput.statusText.value
        };        
        issues.addIssue(JSON.stringify(json));
        
        formInput.title.value = '';
        formInput.description.value = '';
        formInput.createdBy.value = '';
        formInput.assignedTo.value = '';
        formInput.statusText.value = '';
      });
    }
  }//end dom
  issues.init();
  //TODO: Find way to invoke this function after fetch
  setTimeout(function(){dom.init();}, 1000);

})()// end iife
