//things needed:
//Each section in accordian contains link, video, add content box
//need video and link constructors
var allLinks = [];
function Link (name,source,description){
  this.name = name;
  this.source = source;
  this.description = description;
  allLinks.push(this);
  //for loo
}

new Link('CSS Tricks','https://css-tricks.com/','css tricks dig it');

new Link('Layout','https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Introduction','layout mozilla flavor');

new Link('Zen Garden','http://www.csszengarden.com/','Crunchy');
new Link('Color','https://www.w3schools.com/css/css_colors.asp','colour');
new Link('box model','https://css3gen.com/css-box-model/','boxes');
console.log(allLinks);

// Navigation bar
document.getElementById("dropbtn").addEventListener("mouseover", mouseOut);
document.getElementById("dropbtn").addEventListener("mouseout", mouseOut);

// show/hide the dropdown on mouse over/out
document.getElementById("myDropdown").addEventListener("mouseout", mouseOut);

function mouseOut() {
  document.getElementById("myDropdown").classList.toggle("show");
}

var img = document.getElementById('logo').addEventListener('click', logoClicked);
function logoClicked() {
  window.location = "../LandingPage/index.html";
};

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
