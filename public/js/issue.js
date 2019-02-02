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
          this.list = res; 
          dom.init()
          return;
        })
        .catch(function(err) {
          throw new Error('oops something went wrong' + err);
        });
    },
    addIssue: function(issue){
      
      return fetch(`/api/issues/${projName}`, {
        method: 'POST',
        body: issue,
        headers: {'Content-Type': 'application/json'}
      })
        .then((data) => {return data.json()})
        .then((res)=>{
            this.list.push({issue})

            return res;
          })
        .catch(err => console.log(err + issue));
      
    },
    deleteIssue: function(id){
      return fetch(`/api/issues/${id}`, {
        method: 'DELETE',
      })
      .then((data)=>{return data.json()})
      .catch(err => console.log(err + id))
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
        const issueTitle = document.createElement('h2');
        const author = document.createElement('p');
        const description = document.createElement('p');
        const created = document.createElement('span');
        const updated = document.createElement('span');
        const status = document.createElement('span');
        const open = document.createElement('open');
        const id = document.createElement('span')
        

        issueDiv.setAttribute('class', 'issueDiv');
        created.setAttribute('class', 'date');
        updated.setAttribute('class', 'date');
        status.setAttribute('class', 'status');
        open.setAttribute('class', 'status');
        id.setAttribute('class', 'issueId');
        
        issueTitle.innerText = issues.list[i].issueTitle;
        author.innerText = issues.list[i].name;
        description.innerText = issues.list[i].description;
        created.innerText = `Created: ${issues.list[i].dateCreated.slice(3, 12)}`;
        updated.innerText = `Last Updated: ${issues.list[i].dateUpdated.slice(3, 12)}`;
        id.innerText = `id: ${issues.list[i]._id}`;
        
        if (issues.list[i].open){
          open.innerText = "Open";
          open.setAttribute('style', 'color: red');
        } else {
          open.innerText = "Closed";
          open.setAttribute('style', 'color: green');
        }
        
        issueDiv.appendChild(issueTitle);
        issueDiv.appendChild(description);
        issueDiv.appendChild(author);
        issueDiv.appendChild(created);
        issueDiv.appendChild(document.createElement('br'));
        issueDiv.appendChild(updated);
        issueDiv.appendChild(document.createElement('br'));
        issueDiv.appendChild(status);
        issueDiv.appendChild(document.createElement('br'));
        issueDiv.appendChild(open);
        issueDiv.appendChild(document.createElement('br'));
        issueDiv.appendChild(id);

        document.getElementById('issues').appendChild(issueDiv);
      }
      
    /* ********FORM HANDLING******** */
      
      //POST
      const form = document.getElementById('submitIssue')
      const submitButtonPOST = document.getElementById('buttonPOST');
      let formInput = {
        title: document.getElementsByName('issue_title')[0],
        description: document.getElementsByName('issue_text')[0],
        createdBy: document.getElementsByName('created_by')[0],
        assignedTo: document.getElementsByName('assigned_to')[0],
        statusText: document.getElementsByName('status_text')[0]
      }
      //document.querySelector('submitIssue');
      
      submitButtonPOST.addEventListener('click', (e)=>{
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
        
        location.reload();        
      });
      
      //DELETE
      const issueId = document.getElementsByName('_id')[1];
      const submitButtonDELETE = document.getElementById('buttonDELETE');
      
      submitButtonDELETE.addEventListener('click', (e)=>{
        e.preventDefault();
        issues.deleteIssue(issueId.value);
        issueId.value = '';
        
        location.reload();
      })
      
    }
  }//end dom
  issues.init();

})()// end iife
