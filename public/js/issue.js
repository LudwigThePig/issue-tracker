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
        .then( (data) => {return data.json();} )
        .then((res)=>{
            this.list.push({issue})

            return res;
          })
        .catch( err => console.log(err) );
    },
    
    updateIssue: function(update){
      return fetch(`/api/issues/${projName}`,{
        method: 'PUT',
        body: update,
        headers: {'Content-Type': 'application/json'}
      })
        .then( (data)=>{return data.json();} )
        .catch( err => console.log(err) );
    },
    
    deleteIssue: function(id){
      return fetch(`/api/issues/${id}`, {
        method: 'DELETE',
      })
      .then( (data)=>{return data.json();} )
      .catch( err => console.log(err) );
    }
    
  };//end issues  
  
  
  const dom = {
    init: function(){      
      //Rendering
      for (let i = 0; i < issues.list.length; i++){
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
        issueDiv.setAttribute('onclick', `relayId('${issues.list[i]._id}')`)
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
      let postForm = {
        title: document.getElementsByName('issue_title')[0],
        description: document.getElementsByName('issue_text')[0],
        createdBy: document.getElementsByName('created_by')[0],
        assignedTo: document.getElementsByName('assigned_to')[0],
        statusText: document.getElementsByName('status_text')[0]
      }
      
      submitButtonPOST.addEventListener('click', (e)=>{
        e.preventDefault();                
        const json = {
            "issueTitle": postForm.title.value,
            "description": postForm.description.value,
            "name": postForm.createdBy.value,
            "assign": postForm.assignedTo.value,
            "status": postForm.statusText.value
        };
        
        issues.addIssue(JSON.stringify(json));
        
        Object.keys(postForm).forEach(i => postForm[i].value = '');
        location.reload();        
      });
      
      //PUT
      const submitButtonPUT = document.getElementById('buttonPUT');
      
      const updateForm = {
        id: document.getElementsByName('_id')[0],
        title: document.getElementsByName('issue_title')[1],
        description: document.getElementsByName('issue_text')[1],
        createdBy: document.getElementsByName('created_by')[1],
        assignedTo: document.getElementsByName('assigned_to')[1],
        statusText: document.getElementsByName('status_text')[1],
        open: ''
      };
      
      //handles checkbox value and updates updateForm object
      const checkbox = document.getElementById('updateOpen')
      checkbox.addEventListener('click', ()=>{
        if (checkbox.value !== 'open'){
          checkbox.value = 'closed';
          updateForm.open = 'closed';
        } else {
          checkbox.value = 'open';
          updateForm.open = '';
        }
      });
      
      
      submitButtonPUT.addEventListener('click', (e)=>{
        e.preventDefault;
        const json = {
            "id": updateForm.id.value,
            "issueTitle": updateForm.title.value,
            "description": updateForm.description.value,
            "name": updateForm.createdBy.value,
            "assign": updateForm.assignedTo.value,
            "status": updateForm.statusText.value,
            "open": updateForm.open
        };
        
        issues.updateIssue(JSON.stringify(json));
        
        Object.keys(updateForm).forEach(i => updateForm[i].value = '');
        location.reload();
      });

      
      //DELETE
      const deleteId = document.getElementsByName('_id')[1];
      const submitButtonDELETE = document.getElementById('buttonDELETE');
      
      submitButtonDELETE.addEventListener('click', (e)=>{
        e.preventDefault();
        issues.deleteIssue(deleteId.value);
        deleteId.value = '';
        
        location.reload();
      });
      
    //OTHER EVENT HANDLERS

    }
  }//end dom
  
  
  issues.init();

})()// end iife

  const relayId = (val)=>{
    document.getElementsByName('_id').forEach(i => i.value = val);
  }