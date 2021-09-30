(async function () {
  
//asynchronous anonymous function

  const taskInput = document.getElementById("new");
  const addButton = document.getElementById("add");
  const tasks = document.getElementById("tasks");

  addButton.addEventListener("click", addNewItem);
  taskInput.addEventListener("keyup", processKeyPress); //when someone jpresses enter it adds to list, now we define taht funciton

  const items = await getItems();

  for (let item of items) {
    const li = createElementForTask(item);
    tasks.appendChild(li);
  }
  //for each item inside of item array, do something

  function processKeyPress(event) {
    console.log(event);
    addButton.disabled = event.target.value.trim() === "";

    if (event.key === "Enter" && !addButton.disabled) {
      addNewItem();
    }
  }

  function createElementForTask(item) {
    const template = document.getElementById("taskTemplate");
    const newListItem = template.content.cloneNode(true);

    const checkbox = newListItem.querySelector(".item-check");
    const text = newListItem.querySelector(".item-text");
    const deleteButton = newListItem.querySelector(".delete");

    text.innerText = item.value;
    checkbox.checked = item.complete;

    deleteButton.onclick = function (event) {
      event.target.closest('li').remove();
      items.splice(items.indexOf(item), 1); // where you start spliceing from(this item in index), how many to splice until
      saveItems();
    }

    checkbox.onchange = function (event) {
      item.complete = event.target.checked;
      saveItems();
    }

    return newListItem;
  }
  // templates (html tag) has a bunch of methods
  // one of methods is content clone node takes a copy of all of the markup inside of template
  // makes it into an element that we can manipulate with javascript
  // for some reason needs to be passed true so that it can take all of the info insode of template
  // if we didn't pass true it would only take the li

  //query selector allows js to select things by class not id
  // we can't use id here bc you should only have one id, unique, nonnreusable
  // we don't use query selector all the time bc it's slightly slower
  // as much as possible use get.element by id

  // we've prepared an html element that is ready to be insterted into our html 
  function addNewItem() {
    const task = {
      value: taskInput.value, 
      complete: false
    };

    items.push(task);
    saveItems();

    let newItem = createElementForTask(task);
    tasks.appendChild(newItem);

    taskInput.value= ""; // clears the input box
    taskInput.focus(); // allows us to keep typiing without having to move mouse back to the textbox
  }

  //push is adding items to the array, like adding anotehr pez candy to the bottom of pez despenser
  // creating a new task
  // passing that task that we just created to our create element for task funcion
  // sending that task as an item, set the item value for the text and value to be either complete or not complete
  // this new item we are then appending to our tasks list which is the ul
  //(task) is saying call create element for task function and giev it this new object we just created 

  // when we click the add button it calls addnewitem function
  // then we say get the task input value (what we tyuped)
  // make new const called task
  // task = value: "do homework",
  // complete: false

  // then we say add this task to an array called items, where we're storing our items
  // and then once you've added it, create an element for it, 
  // 

  async function getItems() {
    const request = await fetch('https://todo-api-ff.azurewebsites.net/api/todo', {
      method: "GET",
      headers: {
        "Content-Type": "application/JSON"
      }
    });
    const itemsJSON = (await request.text() || "[]" );
    return JSON.parse(itemsJSON);
  }
  // whatever comes back from taht get me the text from tat or an empty array
  // then parse that
  // takes item from JSON which is a string and turns it back into an object

  async function saveItems() {
    const data = JSON.stringify(items);
    localStorage.setItem('items', data);
  }

  //saveItems updates the values that are saved in local storage
  //stringifies items we already have
  // saves items to local storage

  //JSON gives us methods for dealing with data, ex stringify and parse allow us to manipulate the types
  // of data that we have
  // -- what is parse?

  //javascriptobjectnotation
  // an object is with brackets and value pairs
  // a way of serializing your data- turning your data from one type to another

  // explain api
  // 
}());

//asynch makes doing http requests easier
// this is an anonymous function, with asynch inside and is self-executing ( what () is at the end)
// wrapping the whole code in this so that we can immediately use it

// now this means we won't have to wait on a request coming back, its doing it for us automatically 