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

var allLinks = [];
function Link (name,source,description){
  this.name = name;
  this.source = source;
  this.description = description;
  allLinks.push(this);
  console.log('test links');
}

var linksArr = [['CSS Tricks','https://css-tricks.com/','css tricks'], ['layout','http://learnlayout.com/','layout'], ['Layout','https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Introduction','layout - mozilla'],['Zen Garden','http://www.csszengarden.com/','zen garden'],['Color','https://www.w3schools.com/css/css_colors.asp','colour'],['box model','https://css3gen.com/css-box-model/','boxes'],['color-hex-codes','http://www.color-hex.com','color-hex']
];

function createLinks() {
  for (var i = 0; i < linksArr.length; i++) {
    // console.log('Name: ' + linksArr[i][0]);
    // console.log('URL: ' + linksArr[i][1]);
    // console.log('Description: ' + linksArr[i][2]);
    new Link(linksArr[i]);
  }
}
createLinks();

var allVideos = [];

function Video (name,source,description){
  this.name = name;
  this.source = source;
  this.description = description;
  allVideos.push(this);
}

new Video('video', 'https://www.youtube.com/watch?v=qKoajPPWpmo','css-video');
new Video ('Css crash course','https://www.youtube.com/watch?v=yfoY53QXEnI','crash course for begginers');

function accordianCss(){
  var addAcordian = document.getElementById('css-link');

}
