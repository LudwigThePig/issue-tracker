(function(){
    //fetch issues and store in list
    let issues = {  
      list: [],
      init: function(){
        return fetch('/api/issues')
          .then(function(res) {
          console.log(res);
            return res.json();
          })
          .then(res => {
          // issueTitle, description, name, assign, status, dateCreated, dateUpdated, open, project
  
            this.list = res.issues.map(issue => [issue.projectName, issue._id]);
            return;
          })
          .catch(function(err) {
            throw new Error('oops something went wrong');
          });
      },
      addIssue: function(issue){
        
        return fetch('/api/issues', {
          method: 'POST',
          body: issue,
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
        //Rendering
        for (let i = 0; i < issues.list.length; i++){
          console.log(issues.list);
          const linkWrapper = document.createElement('a');
          const projDiv = document.createElement('div');
          const projTitle = document.createElement('h2');
          const issueCount = document.createElement('p');
  
          linkWrapper.setAttribute('href', `/${issues.list[i][0]}`);
          projDiv.setAttribute('class', 'projectDiv');
          projTitle.innerText = issues.list[i][0];
          // let count = (project.issues.length == undefined) ? 0 : project.issues.length;
          issueCount.innerText = `0 issues reported`;
          
          projDiv.appendChild(projTitle);
          projDiv.appendChild(issueCount);
          linkWrapper.appendChild(projDiv);
  
          document.getElementById('issues').appendChild(linkWrapper);
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
    setTimeout(function(){dom.init();}, 2000);
  
  })()// end iife
  