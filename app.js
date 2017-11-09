document.getElementById("dropbtn").addEventListener("mouseover", mouseOut);
document.getElementById("dropbtn").addEventListener("mouseout", mouseOut);

// show/hide the dropdown on mouse over/out
document.getElementById("myDropdown").addEventListener("mouseout", mouseOut);
function mouseOut() {
    console.log('hello');
    document.getElementById("myDropdown").classList.toggle("show");    
}
