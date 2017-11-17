// GIT variables
var allGit = [];
var gitArr = [
  ['Atlassian', 'https://www.atlassian.com/git/', 'getting git right tutorials', 9, false],
  ['GitHub Help', 'https://help.github.com/', ' Learn Git/GitHub', 13, false],
  ['GIT Tower', 'https://www.git-tower.com/learn/', ' Git and Version Control', 6, false],
  ['Git Ignore', 'https://www.gitignore.io/', ' adding security to your web page', 15, false],
];
// PM variables
var allProjectManagement = [];
var projectManagementArr = [
  ['Code School', 'https://www.codeschool.com/courses/discover-devtools', 'Discover DEV tools', 4, false]
];
//Everything Else variables
var allEverythingElse = [];
var everythigElseArr = [
  []
];

// Local Storage variables
// localStorage.removeItem('Links-git');
// localStorage.removeItem('Links-pm');
// localStorage.removeItem('Links-everything');
var storedGitArr = JSON.parse(localStorage.getItem('Links-git'));
var storedProjectManagementArr = JSON.parse(localStorage.getItem('Links-pm'));
var storedEverthingElseArr = JSON.parse(localStorage.getItem('Links-everything'));

// Constructor function to create a GIT object
function Git(name, source, description, votes, isVoted) {
  this.name = name;
  this.source = source;
  this.description = description;
  this.votes = votes;
  this.isVotes = isVoted;
  allGit.push(this);
}

// Constructor function to create a PM object
function ProjectManagement(name, source, description, votes, isVoted) {
  this.name = name;
  this.source = source;
  this.description = description;
  this.votes = votes;
  this.isVotes = isVoted;
  allProjectManagement.push(this);
}
// Constructor function to create Everything Else object
function EverythingElse(name, source, description, votes, isVoted) {
  this.name = name;
  this.source = source;
  this.description = description;
  this.votes = votes;
  this.isVotes = isVoted;
  allEverythingElse.push(this);
}
// populate our git array object
function createGit() {
  for (var i = 0; i < gitArr.length; i++) {
    new Git(gitArr[i][0], gitArr[i][1], gitArr[i][2], gitArr[i][3], gitArr[i][4]);
  }
}

// populate our PM array object
function createProjectManagement() {
  for (var j = 0; j < projectManagementArr.length; j++) {
    new ProjectManagement(projectManagementArr[j][0], projectManagementArr[j][1], projectManagementArr[j][2], projectManagementArr[j][3], projectManagementArr[j][4]);
  }
}
//populate everything else array object
function createEverythingElse() {
  for (var j = 0; j < everythigElseArr.length; j++) {
    new EverythingElse(everythigElseArr[j][0], everythigElseArr[j][1], everythigElseArr[j][2], everythigElseArr[j][3], everythigElseArr[j][4]);
  }
}

// Init the local storage variables
if (storedGitArr === null) {
  createGit();
  localStorage.setItem('Links-git', JSON.stringify(allGit));
  storedGitArr = JSON.parse(localStorage.getItem('Links-git'));
}
if (storedProjectManagementArr === null) {
  createProjectManagement();
  localStorage.setItem('Links-pm', JSON.stringify(allProjectManagement));
  storedProjectManagementArr = JSON.parse(localStorage.getItem('Links-pm'));
}
if (storedEverthingElseArr === null) {
  createProjectManagement();
  localStorage.setItem('Links-everything', JSON.stringify(allEverythingElse));
  storedEverthingElseArr = JSON.parse(localStorage.getItem('Links-everything'));
}
// populate our tables
function addElementsToTable(tableName, linksArray) {
  var ulEl = document.getElementById(tableName);
  for (var i = 0; i < linksArray.length; i++) {
    // we're creating a link, list element
    var liAEl = document.createElement('li');
    var aEl = document.createElement('a');
    aEl.textContent = linksArray[i].name;
    aEl.href = (linksArray[i]['source']);
    liAEl.appendChild(aEl);

    var thumbsImg = document.createElement('img');
    if (linksArray[i].isVoted) {
      thumbsImg.src = '../assets/thumbs-up.png';
    } else {
      thumbsImg.src = '../assets/thumbs-upgrey.png';
    }
    thumbsImg.setAttribute('id', linksArray[i].name);
    thumbsImg.addEventListener('mousedown', toggleVotes);
    thumbsImg.classList.add('vote');
    liAEl.appendChild(thumbsImg);

    var votesLbl = document.createElement('label');
    votesLbl.setAttribute('id', linksArray[i]['source']);
    votesLbl.classList.add('votesLbl');
    var votes = linksArray[i]['votes'];
    if (votes === 1) {
      votesLbl.innerHTML = votes + ' like';
    } else {
      votesLbl.innerHTML = votes + ' likes';
    }

    liAEl.appendChild(votesLbl);
    ulEl.appendChild(liAEl);

    // we're creating a regular element
    var liEl = document.createElement('li');
    liEl.textContent = linksArray[i]['description'];
    ulEl.appendChild(liEl);
  }
};
addElementsToTable('git-list', storedGitArr);
addElementsToTable('project-list', storedProjectManagementArr);
addElementsToTable('everything-list', storedEverthingElseArr);

// the User Input getting added to the array
function addFunction(event) {
  event.preventDefault();
  var name = document.getElementById('name').value;
  var source = document.getElementById('source').value;
  var description = document.getElementById('description').value;
  var linkType;
  var isVideo = document.getElementById('yes-no').value;

  if (name && source && description) {
    if (source.search('www.')) {
      source = 'http://www.' + source;
    } else if (source.search('http://')) {
      source = 'http://' + source;
    }

    if (isVideo === 'GIT') {
      storedGitArr.push(new Git(name, source, description, 0, false));
      localStorage.setItem('Links-git', JSON.stringify(storedGitArr));
      linkType = 'git-list';
    }
    if (isVideo === 'PM') {
      storedProjectManagementArr.push(new ProjectManagement(name, source, description, 0, false));
      localStorage.setItem('Links-pm', JSON.stringify(storedProjectManagementArr));
      linkType = 'project-list';
    }else {
      storedEverthingElseArr.push(new EverythingElse(name, source, description, 0, false));
      localStorage.setItem('Links-everything', JSON.stringify(storedEverthingElseArr));
      linkType = 'everything-list';
    }

    // add the ul element to the end of it's table
    var ulEl = document.getElementById(linkType);
    var liAEl = document.createElement('li');
    var aEl = document.createElement('a');
    var liEl = document.createElement('li');

    liEl.textContent = description;
    aEl.textContent = name;
    aEl.href = source;

    liAEl.appendChild(aEl);

    var thumbsImg = document.createElement('img');
    thumbsImg.src = '../assets/thumbs-upgrey.png';
    thumbsImg.setAttribute('id', name);
    thumbsImg.addEventListener('mousedown', toggleVotes);
    thumbsImg.classList.add('vote');
    liAEl.appendChild(thumbsImg);

    var votesLbl = document.createElement('label');
    votesLbl.setAttribute('id', source);
    votesLbl.classList.add('votesLbl');
    votesLbl.innerHTML = '0 likes';
    liAEl.appendChild(votesLbl);

    ulEl.appendChild(liAEl);
    ulEl.appendChild(liEl);

    // clear the fields
    resetFields();

  } else {
    // there is a missing field
    alert('Please fill all fields.');
  }
}
submitbutton.addEventListener('click', addFunction);

function resetFields() {
  var name = document.getElementById('name');
  var source = document.getElementById('source');
  var description = document.getElementById('description');
  name.value = '';
  source.value = '';
  description.value = '';
}

// Navigation bar / drop down menu
document.getElementById("dropbtn").addEventListener("mouseover", toggleDropDown);
document.getElementById("dropbtn").addEventListener("mouseout", toggleDropDown);
document.getElementById("myDropdown").addEventListener("mouseout", toggleDropDown);

function toggleDropDown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// logo image in the NavBar
var img = document.getElementById('logo').addEventListener('click', returnToHomePage);

function returnToHomePage() {
  window.location = "../Landing/index.html";
};

// Back To Top functionality
window.onscroll = function() {
  showBackToTopButton();
};

function showBackToTopButton() {
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function scrollToTop() {
  if (window.scrollY != 0) {
    setTimeout(function() {
      window.scrollTo(0, window.scrollY - 900);
      scrollToTop();
    }, 40);
  }
}

//accordion view of Resources
var acc = document.getElementsByClassName("accordion");
var k;

for (k = 0; k < acc.length; k++) {
  acc[k].onclick = function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  };
}



// testing
function toggleVotes(event) {
  for (var i = 0; i < storedGitArr.length; i++) {
    if (storedGitArr[i].name === event.target.id) {
      var votes = storedGitArr[i].votes;
      var thumbsImg = document.getElementById(storedGitArr[i].name);
      if (thumbsImg.src.search("assets/thumbs-up.png") !== -1 && storedGitArr[i].isVoted === true) {
        thumbsImg.src = '../assets/thumbs-upgrey.png';
        votes--;
        storedGitArr[i].isVoted = false;
      } else {
        thumbsImg.src = '../assets/thumbs-up.png';
        votes++;
        storedGitArr[i].isVoted = true;
      }

      storedGitArr[i].votes = votes;
      var votesLbl = document.getElementById(storedGitArr[i].source);
      if (votes === 1) {
        votesLbl.innerHTML = votes + ' like';
      } else {
        votesLbl.innerHTML = votes + ' likes';
      }

      localStorage.setItem('Links-git', JSON.stringify(storedGitArr));
      break;
    }
  }
  for (var i = 0; i < storedProjectManagementArr.length; i++) {
    if (storedProjectManagementArr[i].name === event.target.id) {
      var votes = storedProjectManagementArr[i].votes;
      var thumbsImg = document.getElementById(storedProjectManagementArr[i].name);
      if (thumbsImg.src.search("assets/thumbs-up.png") !== -1 && storedProjectManagementArr[i].isVoted === true) {
        thumbsImg.src = '../assets/thumbs-upgrey.png';
        votes--;
        storedProjectManagementArr[i].isVoted = false;
      } else {
        thumbsImg.src = '../assets/thumbs-up.png';
        votes++;
        storedProjectManagementArr[i].isVoted = true;
      }

      storedProjectManagementArr[i].votes = votes;
      var votesLbl = document.getElementById(storedProjectManagementArr[i].source);
      if (votes === 1) {
        votesLbl.innerHTML = votes + ' like';
      } else {
        votesLbl.innerHTML = votes + ' likes';
      }

      localStorage.setItem('Links-pm', JSON.stringify(storedProjectManagementArr));
      break;
    }
  }
  for (var i = 0; i < storedEverthingElseArr.length; i++) {
    if (storedEverthingElseArr[i].name === event.target.id) {
      var votes = storedEverthingElseArr[i].votes;
      var thumbsImg = document.getElementById(storedEverthingElseArr[i].name);
      if (thumbsImg.src.search("assets/thumbs-up.png") !== -1 && storedEverthingElseArr[i].isVoted === true) {
        thumbsImg.src = '../assets/thumbs-upgrey.png';
        votes--;
        storedEverthingElseArr[i].isVoted = false;
      } else {
        thumbsImg.src = '../assets/thumbs-up.png';
        votes++;
        storedEverthingElseArr[i].isVoted = true;
      }

      storedEverthingElseArr[i].votes = votes;
      var votesLbl = document.getElementById(storedEverthingElseArr[i].source);
      if (votes === 1) {
        votesLbl.innerHTML = votes + ' like';
      } else {
        votesLbl.innerHTML = votes + ' likes';
      }

      localStorage.setItem('Links-everything', JSON.stringify(storedEverthingElseArr));
      break;
    }
  }
}