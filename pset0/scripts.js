/// Create a "close" button and append it to each list item

// Get all the list elements (with the <li> tags)
var myNodelist = document.getElementsByTagName("LI");

// iterate through and for each, create a span withe the CSS class "close"
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



/// Click on a close button to hide the current list item

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



/// Add a "checked" symbol when clicking on a list item

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
    // if a list item is checked off, and the user toggled the checkbox to move checked 
    // items to the bottom, it gets moved to the bottom of the list

    // get the checkbox element
    checkbox = document.getElementById("myCheckbox")

    // if the clicked list item is now checked and the "move to bottom" checkbox is checked,
    // move the list item to the bottom (by deleting and readding to the list)
      if (ev.target.className == "checked" && checkbox.checked) {
        document.getElementById("myUL").removeChild(ev.target)
        document.getElementById("myUL").appendChild(ev.target)
      }
  }
}, false);



/// Create a new list item when clicking on the "Add" button
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
    // adds to list here
    // if the "move checked items to the bottom" checkbox is checked off, add new item
    // before checked items. else, add the new item to the bottom of the list

    // get todo list by id
    list = document.getElementById("myUL")

    // to check whether we already added the item to the list so it gets added add the correct
    // slot only
    addedToList = false;

    // get checkbox by id
    checkbox = document.getElementById("myCheckbox")

    // if the "move to bottom" heckbox is checked, iterate through the list items to find
    // the first checked item if it exists, and insert the new item before.
    if (checkbox.checked){
      for (i = 0; i < list.children.length; i++) {
        if (list.children[i].className == "checked"){
          list.insertBefore(li, list.children[i]);
          addedToList = true;
          break
        }
      }
    }
    
    // if the checkbox isn't checked or there are no checked items, add to the bottom
    if (!addedToList){
      list.appendChild(li);
    }
  }
// sets the text field value to the default empty string now that the item is added
  document.getElementById("myInput").value = "";

// adds the close button (and its function when its clicked) to the list item 
// since that part was manual above

// iterate through and for each, create a span withe the CSS class "close"
// that has a child text node with the multiplication x symbol (\u00D7). Then adds
// it as a child to the current li item
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

// add a function for when they are clicked that accesses the parent element of the 
// bottom (list item) and hides it by setting the display value to "none"
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}



// added this myself
// if the "move to bottom" checkbox is checked, automatically move all the checked items
// to the bottom

// get the checkbox by its id
var checkbox = document.getElementById("myCheckbox");

// add an event listener to the checkbox for when it is checked/unchecked
checkbox.addEventListener('change', function() {

  // if it is checked, go through all of the list items and move down one by one if checked
  if (this.checked) {

    // separate counter to make sure we only check each item once (otherwise wev loop
    // forever if everything is checked)
    counter = 0;

    //cursor index i
    i = 0;

    // loop through all the list items and move them to the bottom if they are checked
    while (counter < list.children.length){
      // check if item is checked off based on its class
      if (list.children[i].className == "checked"){
        // move to bottom by removing and readding item
        list.appendChild(list.removeChild(list.children[i]))
      }
      else {
        // increment i if it isn't checked only since indices change when you reorder the
        // list
        i++;
      }
      // increment counter every iteration
      counter++;
    }
  }
});