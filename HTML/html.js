// Navigation bar / drop down menu
document.getElementById("dropdown").addEventListener("mouseover", toggleDropDown);
document.getElementById("dropdown").addEventListener("mouseout", toggleDropDown);

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



// link variables
var allLinks = [];
var linksArr = [
  ['W3schools', 'https://www.w3schools.com/html/default.asp', 'learn HTML', 12, false],
  ['Mozilla Developer Network (MDN)', 'https://developer.mozilla.org/en-US/docs/Web/HTML', 'all things HTML', 25, false],
  ['HTML CSS and JS', 'http://html-css-js.com/', 'Learn HTML CSS and JS', 10, false],
  ['Shay Howe', 'https://learn.shayhowe.com/', 'code school for HTML and CSS', 7, false],
  ['Robert Nyman', 'https://robertnyman.com/html5/forms/input-types.html', 'HTML5 Forms', 1, false],
  ['HTML5 Up', 'https://html5up.net/', 'learn form code in HTML', 2, false],
  ['Symbols/Punctuation', 'https://www.w3schools.com/charsets/ref_utf_punctuation.asp', 'Add any symbol or punctuation to your page', 4, false],
  ['Creative Tim', 'http://blog.creative-tim.com/tutorial/html-cheat-sheet-for-download/', 'Complete HTML cheat sheet', 9, false],
];
// video variables
var allVideos = [];
var videosArr = [
  ['Learn HTML in 12 Minutes', 'https://www.youtube.com/watch?v=bWPMSSsVdPk', 'Basic intro to HTML', 3, false],
  ['HTML5 Tutorial for Beginners', 'https://www.youtube.com/watch?v=9gTw2EDkaDQ', '6 part video for learning', 0, false]
];

// Local Storage variables
// localStorage.removeItem('Links-html');
// localStorage.removeItem('Videos-html');
var storedLinksArr = JSON.parse(localStorage.getItem('Links-html'));
var storedVideosArr = JSON.parse(localStorage.getItem('Videos-html'));

// Constructor function to create a Link object
function Link(name, source, description, votes, isVoted) {
  this.name = name;
  this.source = source;
  this.description = description;
  this.votes = votes;
  this.isVotes = isVoted;
  allLinks.push(this);
}

// Constructor function to create a Video object
function Video(name, source, description, votes, isVoted) {
  this.name = name;
  this.source = source;
  this.description = description;
  this.votes = votes;
  this.isVotes = isVoted;
  allVideos.push(this);
}

// populate our links array object
function createLinks() {
  for (var i = 0; i < linksArr.length; i++) {
    new Link(linksArr[i][0], linksArr[i][1], linksArr[i][2], linksArr[i][3], linksArr[i][4]);
  }
}

// populate our videos array object
function createVideo() {
  for (var j = 0; j < videosArr.length; j++) {
    new Video(videosArr[j][0], videosArr[j][1], videosArr[j][2], videosArr[j][3], videosArr[j][4]);
  }
};

// Init the local storage variables
if (storedLinksArr === null) {
  createLinks();
  localStorage.setItem('Links-html', JSON.stringify(allLinks));
  storedLinksArr = JSON.parse(localStorage.getItem('Links-html'));
}
if (storedVideosArr === null) {
  createVideo();
  localStorage.setItem('Videos-html', JSON.stringify(allVideos));
  storedVideosArr = JSON.parse(localStorage.getItem('Videos-html'));
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
      storedVideosArr.push(new Video(name, source, description, 0, false));
      localStorage.setItem('Videos-html', JSON.stringify(storedVideosArr));
      linkType = 'video-list';
    } else {
      storedLinksArr.push(new Link(name, source, description, 0, false));
      localStorage.setItem('Links-html', JSON.stringify(storedLinksArr));
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

function toggleVotes(event) {
  for (var i = 0; i < storedLinksArr.length; i++) {
    if (storedLinksArr[i].name === event.target.id) {
      var votes = storedLinksArr[i].votes;
      var thumbsImg = document.getElementById(storedLinksArr[i].name);
      if (thumbsImg.src.search("assets/thumbs-up.png") !== -1 && storedLinksArr[i].isVoted === true) {
        thumbsImg.src = '../assets/thumbs-upgrey.png';
        votes--;
        storedLinksArr[i].isVoted = false;
      } else {
        thumbsImg.src = '../assets/thumbs-up.png';
        votes++;
        storedLinksArr[i].isVoted = true;
      }

      storedLinksArr[i].votes = votes;
      var votesLbl = document.getElementById(storedLinksArr[i].source);
      if (votes === 1) {
        votesLbl.innerHTML = votes + ' like';
      } else {
        votesLbl.innerHTML = votes + ' likes';
      }

      localStorage.setItem('Links-html', JSON.stringify(storedLinksArr));
      break;
    }
  }
  for (var i = 0; i < storedVideosArr.length; i++) {
    if (storedVideosArr[i].name === event.target.id) {
      var votes = storedVideosArr[i].votes;
      var thumbsImg = document.getElementById(storedVideosArr[i].name);
      if (thumbsImg.src.search("assets/thumbs-up.png") !== -1 && storedVideosArr[i].isVoted === true) {
        thumbsImg.src = '../assets/thumbs-upgrey.png';
        votes--;
        storedVideosArr[i].isVoted = false;
      } else {
        thumbsImg.src = '../assets/thumbs-up.png';
        votes++;
        storedVideosArr[i].isVoted = true;
      }

      storedVideosArr[i].votes = votes;
      var votesLbl = document.getElementById(storedVideosArr[i].source);
      if (votes === 1) {
        votesLbl.innerHTML = votes + ' like';
      } else {
        votesLbl.innerHTML = votes + ' likes';
      }

      localStorage.setItem('Videos-html', JSON.stringify(storedVideosArr));
      break;
    }
  }
}
