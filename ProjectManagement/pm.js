// Navigation bar
document.getElementById("dropbtn").addEventListener("mouseover", mouseOut);
document.getElementById("dropbtn").addEventListener("mouseout", mouseOut);

// show/hide the dropdown on mouse over/out
document.getElementById("myDropdown").addEventListener("mouseout", mouseOut);

function mouseOut() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Back To Top functionality
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  if (window.scrollY != 0) {
    setTimeout(function() {
      window.scrollTo(0, window.scrollY - 900);
      topFunction();
    }, 40);
  }
}

var img = document.getElementById('logo').addEventListener('click', logoClicked);

function logoClicked() {
  window.location = "../Landing/index.html";
};

var allLinks = [];

function Link(name, source, description) {
  this.name = name;
  this.source = source;
  this.description = description;
  allLinks.push(this);
  // console.log('test links');
}

var linksArr = [
  ['JS Getting Started', 'http://videojs.com/getting-started/#customize', 'Video Series in JS'], ['FUN FUN FUNCTION', 'https://www.youtube.com/channel/UCO1cgjhGzsSYb1rsB4bFe4Q', 'Functional Programming'], ['REPL.it', 'Write Code https://repl.it/', 'code writer'], ['James Padolsey', 'https://j11y.io/', 'resource site'], ['Trello', 'https://trello.com/', 'project tracking tool'],
];

function createLinks() {
  for (var i = 0; i < linksArr.length; i++) {
    // console.log('Name: ' + linksArr[i][0]);
    // console.log('URL: ' + linksArr[i][1]);
    // console.log('Description: ' + linksArr[i][2]);
    new Link(linksArr[i][0], linksArr[i][1], linksArr[i][2]);
  }
}
createLinks();

var allVideos = [];

function Video(name, source, description) {
  this.name = name;
  this.source = source;
  this.description = description;
  allVideos.push(this);
  // console.log('video test');
}

var videosArr = [['Code School', 'https://www.codeschool.com/courses/discover-devtools', 'Discover DEV tools']];

function createVideo() {
  for (var j = 0; j < videosArr.length; j++) {
    // console.log('name:' + videosArr[j][0]);
    // console.log('URL:' + videosArr[j][1]);
    // console.log('Description:' + videosArr[j][2]);
    new Video(videosArr[j][0], videosArr[j][1], videosArr[j][2]);
  }
};
createVideo();

function appendLinks() {
  var ulEl = document.getElementById('link-list');
  for (var i = 0; i < allLinks.length; i++) {
    // we're creating a link, list element
    var liAEl = document.createElement('li');
    var aEl = document.createElement('a');
    aEl.textContent = allLinks[i]['name'];
    aEl.href = (allLinks[i]['source']);
    liAEl.appendChild(aEl);
    ulEl.appendChild(liAEl);

    // we're creating a regular element
    var liEl = document.createElement('li');
    liEl.textContent = allLinks[i]['description'];
    ulEl.appendChild(liEl);
  }
};
appendLinks();

function appendVideos() {
  var ulEl = document.getElementById('video-list');
  for (var i = 0; i < allVideos.length; i++) {
    // we're creating a link, list element
    var liAEl = document.createElement('li');
    var aEl = document.createElement('a');
    aEl.textContent = allVideos[i]['name'];
    aEl.href = (allVideos[i]['source']);
    liAEl.appendChild(aEl);
    ulEl.appendChild(liAEl);

    // we're creating a regular element
    var liEl = document.createElement('li');
    liEl.textContent = allVideos[i]['description'];
    ulEl.appendChild(liEl);
  }
};
appendVideos();

var userAddedVideo = [];
var userAddedLink = [];
//function and push to videosArr
//need an event listener for the user input

function addFunction(event) {
  event.preventDefault();
  var name = document.getElementById('name').value;
  console.log('name' + name);
  var source = document.getElementById('source').value;
  console.log('source ' + source);
  var description = document.getElementById('description').value;
  console.log('description' + description);

  var type = document.getElementById('yes-no').value;
  console.log(type);
  if (type === 'Yes') {
    userAddedVideo.push(name);
    userAddedVideo.push(source);
    userAddedVideo.push(description);

    var ulEl = document.getElementById('video-list');
    var liAEl = document.createElement('li');
    var aEl = document.createElement('a');
    var liEl = document.createElement('li');
    liEl.textContent = description;
    aEl.textContent = name;
    aEl.href = source;
    liAEl.appendChild(aEl);
    ulEl.appendChild(liAEl);
    ulEl.appendChild(liEl);
    // videosArr.push(userAddedResource);
    // console.log('new array' + videosArr);
  } else {
    userAddedLink.push(name);
    userAddedLink.push(source);
    userAddedLink.push(description);
    var ulEl = document.getElementById('link-list');
    var liAEl = document.createElement('li');
    var aEl = document.createElement('a');
    var liEl = document.createElement('li');
    liEl.textContent = description;
    aEl.textContent = name;
    aEl.href = source;
    liAEl.appendChild(aEl);
    ulEl.appendChild(liAEl);
    ulEl.appendChild(liEl);
  }
}
submitbutton.addEventListener('click', addFunction);
