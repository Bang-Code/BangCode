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
  window.location = "../Landing/index.html";
};

// Landing page cells
var cssCell = document.getElementById('one').addEventListener('click', cssClicked);
function cssClicked() {
  window.location = "../CSS/css.html";
};

var jsCell = document.getElementById('two').addEventListener('click', jsClicked);
function jsClicked() {
  window.location = "../Javascript/javascript.html";
};

var htmlCell = document.getElementById('three').addEventListener('click', htmlClicked);
function htmlClicked() {
  window.location = "../HTML/html.html";
};

var tryCell = document.getElementById('four').addEventListener('click', tryClicked);
function tryClicked() {
  window.location = "../TryCatch/tryCatch.html";
};
