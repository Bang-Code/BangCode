// link variables
var allLinks = [];
var linksArr = [
  //Git/GitHub/ATOM resources
  ['Atlassian', 'https://www.atlassian.com/git/', 'getting git right tutorials', 8, false],
  ['GitHub Help', 'https://help.github.com/', 'Learn Git/GitHub'],
  ['Git-Cheat', 'www.git-tower.com/learn/', 'Quick reference for git operations', 13, false],
  ['git ignore', 'www.gitignore.io/', 'How to use the git ignore option for security', 2, false],
  ['Atom Documention', 'http://flight-manual.atom.io/', 'flight manual for learning ATOM', 3, false],
  //Project Management
  ['Trello', 'https://trello.com/', 'project tracking tool', 8, false],
  ['Waffle.io', 'https://waffle.io/', 'Free or Paid Project Management Tool', 5, false],
  //misc
  ['Mark Down', 'guides.github.com/features/mastering-markdown/', 'markdown fundamentals', 4, false],
  ['REPL.it', 'Write Code https://repl.it/', 'code writer', 19, false],
  //Text/Font
  ['Fun Lorem Ipsums', 'https://www.shopify.com/partners/blog/79940998-15-funny-lorem-ipsum-generators-to-shake-up-your-design-mockups', '15 funny lorem ipsum generators', 26, false],
  ['Google Fonts', 'https://fonts.google.com/', 'All fonts you could ever dream of available for free',
    31, false],
  //Color picker/generator
  ['Paletton', 'http://paletton.com/#uid=1000u0kllllaFw0g0qFqFg0w0aF', 'Color Picker', 5, false],
  ['W3schools', 'https://www.w3schools.com/css/css_colors.asp', 'adding color to your page', 8, false],
  ['Color-hex', 'http://www.color-hex.com/', 'HEX color picker', 11, false],
  ['Adobe Color', 'https://color.adobe.com/create/color-wheel/', 'Adobe color picker', 1, false],
  ['Canva', 'https://www.canva.com/color-palette/', 'Color Palette Generator', 18, false],
  //other
  ['Canva', 'https://www.canva.com/', 'All things web design', 10, false],
  ['James Padolsey', 'https://j11y.io/', 'resource site', 12, false],
  ['Pixir', 'https://pixlr.com/editor/', 'Free Online Photo Editor', 13, false],
  ['PNG Tree', 'https://pngtree.com/', 'Free and Paid imager resources', 22, false],
  ['Leaflets JS', 'http://leafletjs.com/index.html', 'Adding Maps', 14, false],
  ['Google', 'https://www.google.com/', 'When all else fails', 11, false],
];
// video variables
var allVideos = [];
var videosArr = [
  ['LearnCode Academy', 'https://www.youtube.com/user/learncodeacademy', 'Videos about becoming a web devloper', 18, false],
  ['Code School', 'https://www.codeschool.com/courses/discover-devtools', 'Discover DEV tools', 15, false],
];

// Local Storage variables
// localStorage.removeItem('Links-pm');
// localStorage.removeItem('Videos-pm');
var storedLinksArr = JSON.parse(localStorage.getItem('Links-pm'));
var storedVideosArr = JSON.parse(localStorage.getItem('Videos-pm'));

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
  localStorage.setItem('Links-pm', JSON.stringify(allLinks));
  storedLinksArr = JSON.parse(localStorage.getItem('Links-pm'));
}
if (storedVideosArr === null) {
  createVideo();
  localStorage.setItem('Videos-pm', JSON.stringify(allVideos));
  storedVideosArr = JSON.parse(localStorage.getItem('Videos-pm'));
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
      localStorage.setItem('Videos-pm', JSON.stringify(storedVideosArr));
      linkType = 'video-list';
    } else {
      storedLinksArr.push(new Link(name, source, description, 0, false));
      localStorage.setItem('Links-pm', JSON.stringify(storedLinksArr));
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

      localStorage.setItem('Links-pm', JSON.stringify(storedLinksArr));
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

      localStorage.setItem('Videos-pm', JSON.stringify(storedVideosArr));
      break;
    }
  }
}
