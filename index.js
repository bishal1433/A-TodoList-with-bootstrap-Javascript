// if user add a notes, add it to local storage
showNotes(); //to show the notes when it reload again...
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value); //push the content or value of text area if click the button add notes
  localStorage.setItem("notes", JSON.stringify(notesObj));
  //to stringify the  content of JSON inside localStorage
  addTxt.value = ""; //to blank the value of addTxt
  console.log(notesObj);
  showNotes();
});


// show notes function
function showNotes() {
  let notes = localStorage.getItem("notes"); //take notes from localstorage.
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = ""; //creating a null html string...

  //take the note array and traverse..
  notesObj.forEach(function(element, index) {
    html += `
      <div class="card mx-2 my-2 noteCard" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title" style="color:green;">Note ${index+1}</h5>
          <p class="card-text" style="color:blue;">${element}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-success">Delete</button>
        </div>
      </div>`;
  });
  let notesElm = document.getElementById("notes");

  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `<h3 style="color:blue;">Nothing to show!! Please add your Notes</h3>`;
  }

}

// function to delete a node

function deleteNote(index) {
  console.log("deleting this node.", index);
  let notes = localStorage.getItem("notes"); //take notes from localstorage.
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index,1);
  localStorage.setItem("notes",JSON.stringify(notesObj));//updating localstorage..
  showNotes();

}

let search=document.getElementById("searchTxt");

search.addEventListener("input",function(){

  let inputVal=search.value;
  // console.log("Input Event fired!!!",inputVal);

  let noteCards= document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function(element){
    let cardTxt=element.getElementsByTagName("p")[0].innerText;
    if(cardTxt.includes(inputVal))
    {
      element.style.display="block";
    }
    else{
      element.style.display="none";
    }
  });
});
