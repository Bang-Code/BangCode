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

// logo image in the NavBar
var img = document.getElementById('logo').addEventListener('click', logoClicked);
function logoClicked() {
  window.location = "../LandingPage/index.html";
};

// Landing page cells
var cssCell = document.getElementById('one').addEventListener('click', cssClicked);
function cssClicked() {
  window.location = "../CSSPage/cssPage.html";
};

var gitCell = document.getElementById('two').addEventListener('click', gitClicked);
function gitClicked() {
  window.location = "../GitPage/gitPage.html";
};

var htmlCell = document.getElementById('three').addEventListener('click', htmlClicked);
function htmlClicked() {
  window.location = "../htmlPage/htmlPage.html";
};

var pmCell = document.getElementById('four').addEventListener('click', pmClicked);
function pmClicked() {
  window.location = "../ProjectManagementPage/pmPage.html";
};
