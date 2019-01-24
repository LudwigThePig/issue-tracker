window.onload = function(){
    var request = new XMLHttpRequest();
    request.open('GET', '/api/projects', true);
  
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        console.log('we made it');
        var resp = request.responseText;
      } else {
        // We reached our target server, but it returned an error
  
      }
    };
  
    request.onerror = function() {
      // There was a connection error of some sort
    };
  
    request.send();
  
    console.log(request)
  
    let projects = [];
  
    //Creating DOM elements for each project
    let project;
    for (project in projects){
      const projDiv = document.createElement('div');
      const projTitle = document.createElement('h2');
      const issueCount = document.createElement('p');
  
      projDiv.setAttribute('class', 'projectDiv');
      projTitle.innerText = project.name;
      issueCount.innerText = `${project.issues.length} issues reported`;
  
      projDiv.appendChild(projTitle);
      projDiv.appendChild(issueCount);
  
      document.getElementById('main').appendChild(projDiv);
    }
  }// end onload
  