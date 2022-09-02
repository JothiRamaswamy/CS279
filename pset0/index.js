// Create a "close" button and append it to each list item

// Get all the list elements (with the <li> tags)
var myNodelist = document.getElementsByTagName("LI");

// iterate through and for each, create a button withe the CSS class "close"
// that has a child text node with the multiplication x symbol (\u00D7). Then adds
// it as a child to the current li item
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item

// get all the close buttons created above based on their class name
var close = document.getElementsByClassName("close");

// iterate through each close button and add a function for when they are clicked
// that accesses the parent element of the botton (list item) and hides it by setting
// the display value to "none"
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item

// gets the list based on it having the <ul> tag
var list = document.querySelector('ul');

// listener checks if there is a click event
list.addEventListener('click', function(ev) {

// checks if the clicked event target was on a list element
  if (ev.target.tagName === 'LI') {

    // toggles the checked class- if the class is previously checked, it no longer 
    // will be checked, and vice versa
      ev.target.classList.toggle('checked');

    // added myself to look nice
    // if a list item is checked off, it gets moved to the bottom of the list
      if (ev.target.className == "checked") {
        document.getElementById("myUL").removeChild(ev.target)
        document.getElementById("myUL").appendChild(ev.target)
      }
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {

// creates a new list element and adds a child node with text from the input 
// text field, then adds this list element to the list if the text is valid
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);

// checks if input is valid
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    // adds to th beginning of the list since I decided to move the checked off
    // list items to the end of the list
    list = document.getElementById("myUL")
    list.insertBefore(li, list.children[0]);
  }
// sets the text field value to the default empty string now that the item is added
  document.getElementById("myInput").value = "";

// adds the close button (and its function when its clicked)to the list item 
// since that part was manual above
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}