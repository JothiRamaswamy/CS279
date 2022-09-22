// change the text inside the table cells for availability to 
// toggle the yes/no/maybe/reset functionality for each time slot
function checkClick(id) {
  // get the cell based on the id passed in
  var cell = document.getElementById(String(id));

  // if the cell was initially showing a yes availability, change it to no
  if (cell.textContent == "✅") {
    cell.textContent = "❌"
  }
  // if the cell was initially showing a no availability, change it to maybe
  else if (cell.textContent == "❌") {
    cell.textContent = "❓"
  }
  // if the cell was initially showing a maybe availability, reset it
  else if (cell.textContent == "❓") {
    cell.textContent = "☐"
  }
  // otherwise, set the availability to yes
  else {
    cell.textContent = "✅"
  }
}

// when the user inputs their availabilities and presses add,
// add their availabilities to the table with everyone's availability
// and display this table instead
function newElement() {

  // get name from the text box
  var name = document.getElementById("myInput").value;

  // make sure the name is input and isn't empty
  if (name != '') {
    // get the table with everyone's availability
    everyone_table = document.getElementById("everyone_table");

    // add a new row to the bottom to display the user's availability
    var row = everyone_table.insertRow();

    // add cells to the row so that we can add the user's name/availability
    // to each of them
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    // add the user's availability to this row based on what they
    // input into each of the cells submitted
    cell1.textContent = name;
    cell2.innerHTML = document.getElementById("0").textContent;
    cell3.innerHTML = document.getElementById("1").textContent;
    cell4.innerHTML = document.getElementById("2").textContent;

    // make sure at least something in the table was selected, and it isn't just
    // the default setting (otherwise alert the user and get rid of the new row added)
    if (cell2.innerHTML == "☐" && cell3.innerHTML == "☐" && cell4.innerHTML == "☐") {
      alert("please select an option")
      everyone_table.deleteRow();
    }

    // change the ☐ to an empty string in the table with everyone's availability
    // so it looks nicer
    else {
      if (cell2.innerHTML == "☐") {
        cell2.innerHTML = ""
      }
      if (cell3.innerHTML == "☐") {
        cell3.innerHTML = ""
      }
      if (cell4.innerHTML == "☐") {
        cell4.innerHTML = ""
      }

      // get all the table and button elements whose displays we want to change
      everyone = document.getElementById("everyone");
      timesheet = document.getElementById("timesheet");
      button = document.getElementById("addBtn");

      // change the displays of the table and buttons to now show everyone's 
      // availability
      everyone.style.display = "block";
      button.style.display = "none";
      timesheet.style.display = "none";

      // reset the name in the input field just to look nicer
      document.getElementById("myInput").value = "";
    }
  }
  else {
    // if there is no name input, alert the user to type their name
    alert("please type in your name")
  }
}