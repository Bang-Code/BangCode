// link variables
var allLinks = [];
var linksArr = [['CSS Tricks','https://css-tricks.com/','css tricks'], ['layout','http://learnlayout.com/','layout'], ['Layout','https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Introduction','layout - mozilla'],['Zen Garden','http://www.csszengarden.com/','zen garden'],['Color','https://www.w3schools.com/css/css_colors.asp','colour'],['box model','https://css3gen.com/css-box-model/','boxes'],['color-hex-codes','http://www.color-hex.com','hex-codes']
];
// video variables
var allVideos = [];
var videosArr = [['video', 'https://www.youtube.com/watch?v=qKoajPPWpmo','css-video'],['Css crash course','https://www.youtube.com/watch?v=yfoY53QXEnI','crash course for begginers']];

// Local Storage variables
var storedLinksArr = JSON.parse(localStorage.getItem('Links-CSS'));
var storedVideosArr = JSON.parse(localStorage.getItem('Videos-CSS'));

// Constructor function to create a Link object
function Link(name,source,description){
  this.name = name;
  this.source = source;
  this.description = description;
  allLinks.push(this);
}

// Constructor function to create a Link object
function Video(name,source,description){
  this.name = name;
  this.source = source;
  this.description = description;
  allVideos.push(this);
}


// populate our links array object
function createLinks() {
  for (var i = 0; i < linksArr.length; i++) {
    new Link(linksArr[i][0], linksArr[i][1], linksArr[i][2]);
  }
}
createLinks();

// populate our videos array object
function createVideo() {
  for (var j = 0; j < videosArr.length; j++) {
    new Video(videosArr[j][0], videosArr[j][1], videosArr[j][2]);
  }
};
createVideo();

// Init the local storage variables
if (storedLinksArr === null) {
  localStorage.setItem('Links-CSS', JSON.stringify(allLinks));
  storedLinksArr = JSON.parse(localStorage.getItem('Links-CSS'));
}
if (storedVideosArr === null) {
  localStorage.setItem('Videos-CSS', JSON.stringify(allVideos));
  storedVideosArr = JSON.parse(localStorage.getItem('Videos-CSS'));
}

// populate our tables
function addElementsToTable(tableName, linksArray) {
  var ulEl = document.getElementById(tableName);
  for (var i = 0; i < linksArray.length; i++) {
    // we're creating a link, list element
    var liAEl = document.createElement('li');
    var aEl = document.createElement('a');
    aEl.textContent = linksArray[i]['name'];
    aEl.href = (linksArray[i]['source']);
    liAEl.appendChild(aEl);
    ulEl.appendChild(liAEl);

    // we're creating a regular element
    var liEl = document.createElement('li');
    liEl.textContent = linksArray[i]['description'];
    ulEl.appendChild(liEl);
  }
};
addElementsToTable('link-list', storedLinksArr);
addElementsToTable('video-list', storedVideosArr);

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

    if (isVideo === 'Yes') {
      storedVideosArr.push(new Video(name, source, description));
      localStorage.setItem('Videos-CSS', JSON.stringify(storedVideosArr));
      linkType = 'video-list';
    } else {
      storedLinksArr.push(new Link(name, source, description));
      localStorage.setItem('Links-CSS', JSON.stringify(storedLinksArr));
      linkType = 'link-list';
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
