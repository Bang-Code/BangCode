// link variables
var allLinks = [];
var linksArr = [
  ['W3schools', 'https://www.w3schools.com/css/default.asp', 'learn CSS', 7, false],
  ['Mozilla Developer Network (MDN)', 'https://developer.mozilla.org/en-US/docs/Web/CSS', 'all things CSS', 9, false],
  ['CSS Tricks', 'https://css-tricks.com/', 'Resources and Videos for everything CSS', 32, false],
  ['Learn CSS Layout', 'http://learnlayout.com/', 'learning CSS fundamentals', 5, false],
  ['Shay Howe', 'https://learn.shayhowe.com/', 'code school for HTML and CSS', 11, false],
  ['CSS Zen Garden', 'http://www.csszengarden.com/', 'different ways CSS effects HTML', 14, false],
  ['CSS3', 'https://css3gen.com/css-box-model/', 'learn the box model', 3, false],
  ['Smashing Magazine', 'https://www.smashingmagazine.com/2007/05/css-float-theory-things-you-should-know/', 'Understanding Float therory', 17, false],
];
// video variables
var allVideos = [];
var videosArr = [
  ['EJ Media', 'https://www.youtube.com/watch?v=qKoajPPWpmo', 'Introduction to CSS video', 7, false],
  ['CSS crash course', 'https://www.youtube.com/watch?v=yfoY53QXEnI', 'CSS crash course for begginers', 12, false],
];

// Local Storage variables
// localStorage.removeItem('Links-CSS');
// localStorage.removeItem('Videos-CSS');
var storedLinksArr = JSON.parse(localStorage.getItem('Links-CSS'));
var storedVideosArr = JSON.parse(localStorage.getItem('Videos-CSS'));

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
  localStorage.setItem('Links-CSS', JSON.stringify(allLinks));
  storedLinksArr = JSON.parse(localStorage.getItem('Links-CSS'));
}
if (storedVideosArr === null) {
  createVideo();
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
      localStorage.setItem('Videos-CSS', JSON.stringify(storedVideosArr));
      linkType = 'video-list';
    } else {
      storedLinksArr.push(new Link(name, source, description, 0, false));
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

      localStorage.setItem('Links-CSS', JSON.stringify(storedLinksArr));
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

      localStorage.setItem('Videos-CSS', JSON.stringify(storedVideosArr));
      break;
    }
  }
}
