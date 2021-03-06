"use strict";

let create_window = document.getElementById("create_window");

let itemTitle = document.getElementById("item_title");
let itemText = document.getElementById("item_text");
let itemPriority = document.getElementById("item_priority");

let itemsArray = new Array();

//
class Item {
  constructor(title, text, priority, state) {
    this.title = title;
    this.text = text;
    this.priority = priority;
    this.state = "open";
  }
}

//TOOLBAR
let toolBarDiv = document.getElementById("toolbar");
toolBarDiv.className = "d-flex justify-content-around";

let createBtn = document.createElement("button");
let closeBtn = document.getElementById("closeBtn");

toolBarDiv.append(createBtn);

createBtn.className = "btn ";
createBtn.setAttribute("id", "createBtn");
createBtn.innerHTML = "Create";

createBtn.onclick = () => {
  create_window.style.display = "block";
};

closeBtn.onclick = () => {
  create_window.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == create_window) {
    create_window.style.display = "none";
  }
};

let priorityFilter = document.createElement("select");
priorityFilter.className = "priorityFilter custom-select";
priorityFilter.setAttribute("id", "priorityFilter");

toolBarDiv.prepend(priorityFilter);

let priorityFilterAllOption = document.createElement("option");
priorityFilterAllOption.setAttribute("selected", "true");
priorityFilterAllOption.setAttribute("value", "all");
priorityFilterAllOption.innerHTML = "All";
priorityFilter.append(priorityFilterAllOption);

let priorityFilterHighOption = document.createElement("option");
priorityFilterHighOption.setAttribute("value", "high");
priorityFilterHighOption.innerHTML = "High";
priorityFilter.append(priorityFilterHighOption);

let priorityFilterNormalOption = document.createElement("option");
priorityFilterNormalOption.setAttribute("value", "normal");
priorityFilterNormalOption.innerHTML = "Normal";
priorityFilter.append(priorityFilterNormalOption);

let priorityFilterLowOption = document.createElement("option");
priorityFilterLowOption.setAttribute("value", "low");
priorityFilterLowOption.innerHTML = "Low";
priorityFilter.append(priorityFilterLowOption);

// add eventListener to filter
document.addEventListener(
  "input",
  function(event) {
    // Only run on our select menu
    if (event.target.id !== "priorityFilter") return;

    // The selected value
    let value = event.target.value;
    console.log(value);
    priorityFilteredDisplay(value);
  },
  false
);

let priorityFilteredDisplay = filterValue => {
  itemsDiv.innerHTML = "";
  itemsArray.forEach(function(element) {
    if (filterValue === "all") {
      updateDisplay();
    }
    if (element.priority === filterValue) {
      itemDisplay(element);
    }
  });
};

let stateFilter = document.createElement("select");
stateFilter.className = "stateFilter custom-select ";
stateFilter.setAttribute("id", "stateFilter");

toolBarDiv.prepend(stateFilter);

let stateFilterAllOption = document.createElement("option");
stateFilterAllOption.setAttribute("selected", "true");
stateFilterAllOption.setAttribute("value", "all");
stateFilterAllOption.innerHTML = "All";
stateFilter.append(stateFilterAllOption);

let stateFilterOpenOption = document.createElement("option");
stateFilterOpenOption.setAttribute("value", "open");
stateFilterOpenOption.innerHTML = "Open";
stateFilter.append(stateFilterOpenOption);

let stateFilterDoneOption = document.createElement("option");
stateFilterDoneOption.setAttribute("value", "done");
stateFilterDoneOption.innerHTML = "Done";
stateFilter.append(stateFilterDoneOption);

//add eventListener to filter

document.addEventListener(
  "input",
  function(event) {
    if (event.target.id !== "stateFilter") return;

    let value = event.target.value;
    console.log(value);
    stateFilteredDisplay(value);
  },
  false
);

let stateFilteredDisplay = filterValue => {
  itemsDiv.innerHTML = "";
  itemsArray.forEach(function(element) {
    if (filterValue === "all") updateDisplay();

    if (filterValue === "open" && element.state === "open") {
      displayOpenItem(element);
    } else if (filterValue === "done" && element.state === "done") {
      displayDoneItem(element);
    }
  });
};

let searchFilter = document.createElement("input");
searchFilter.className = "searchFilter ";
searchFilter.setAttribute("id", "searchFilter");
searchFilter.setAttribute("type", "text");
searchFilter.setAttribute("placeholder", "Search by title");
searchFilter.setAttribute(
  "onkeypress",
  "return searchFilterFunc(event, this.value)"
);

let searchFilterFunc = (event, text) => {
  if (event.keyCode == 13) {
    searchFilterDisplay(text);
  }
};

let searchFilterDisplay = filterValue => {
  itemsDiv.innerHTML = "";
  itemsArray.forEach(function(element) {
    if (element.title.includes(filterValue)) {
      itemDisplay(element);
    }
  });
};

toolBarDiv.prepend(searchFilter);

let createItem = () => {
  saveItem(); // create new item from input data and push it to itemsArray
  console.log(itemsArray);
  updateDisplay();
  create_window.style.display = "none";
  clearForm(); //clear input forms
};

let saveItem = () => {
  let item = new Item(itemTitle.value, itemText.value, itemPriority.value);
  itemsArray.push(item);
  console.log("saved");
};

let clearForm = () => {
  itemTitle.value = "";
  itemText.value = "";
  itemPriority.value = "normal";
  console.log("cleared");
};

let itemsDiv = document.getElementById("itemsDiv");
itemsDiv.className = "d-flex row ";

let createItemCardContent = (itemCard, element) => {
  let itemTitleDiv = document.createElement("div");
  itemCard.append(itemTitleDiv);
  itemTitleDiv.innerHTML = element.title;

  let itemTextDiv = document.createElement("div");
  itemCard.append(itemTextDiv);
  itemTextDiv.className = "my-5";
  itemTextDiv.innerHTML = element.text;

  let itemFooterDiv = document.createElement("div");

  itemCard.append(itemFooterDiv);
  itemFooterDiv.className = "d-flex justify-content-between";
  itemFooterDiv.setAttribute("id", "itemFooterDiv");

  let itemPrioritySpan = document.createElement("span");
  itemFooterDiv.append(itemPrioritySpan);
  itemPrioritySpan.innerHTML = element.priority;
  itemPrioritySpan.setAttribute("id", "prioritySpan");

  //create dropdown menu
  let dropdownSpan = document.createElement("span");
  itemFooterDiv.append(dropdownSpan);

  let dropdownToggle = document.createElement("button");
  dropdownSpan.append(dropdownToggle);
  dropdownToggle.className = "btn ";
  dropdownToggle.setAttribute("id", "dropdownMenuLink");
  dropdownToggle.setAttribute("type", "button");
  dropdownToggle.setAttribute("aria-haspopup", "true");
  dropdownToggle.setAttribute("aria-expanded", "false");
  dropdownToggle.setAttribute("data-toggle", "dropdown");
  dropdownToggle.innerHTML = "<span>...</span>";

  let dropdownMenu = document.createElement("div");
  dropdownSpan.append(dropdownMenu);
  dropdownMenu.className = "dropdown-menu";
  dropdownMenu.setAttribute("aria-labelledby", "dropdownMenuLink");

  let doneBtn = document.createElement("a");
  dropdownMenu.append(doneBtn);
  doneBtn.className = "dropdown-item";

  if (element.state === "open") {
    doneBtn.innerHTML = "Done";
    doneBtn.setAttribute("onclick", "doneClick(this)");
  } else {
    doneBtn.innerHTML = "Open";
    doneBtn.setAttribute("onclick", "openClick(this)");
  }

  let editBtn = document.createElement("a");
  dropdownMenu.append(editBtn);
  editBtn.className = "dropdown-item";
  editBtn.innerHTML = "Edit";
  editBtn.setAttribute("onclick", "editClick(this)");

  let deleteBtn = document.createElement("a");
  dropdownMenu.append(deleteBtn);
  deleteBtn.className = "dropdown-item";
  deleteBtn.innerHTML = "Delete";
  deleteBtn.setAttribute("onclick", "deleteClick(this)");
};

let openClick = btnElement => {
  findItemByTitle(btnElement).state = "open";
  console.log("find");
  console.log(itemsArray);

  updateDisplay();
};

let doneClick = btnElement => {
  findItemByTitle(btnElement).state = "done";
  console.log("find");
  console.log(itemsArray);

  updateDisplay();
};

let findItemByTitle = btnElement => {
  let title = btnElement.parentNode.parentNode.parentNode.parentNode.firstChild;
  let foundElement;
  itemsArray.forEach(function(element) {
    if (element.title === title.innerHTML) {
      foundElement = element;
    }
  });
  return foundElement;
};

let editClick = btnElement => {
  create_window.style.display = "block";
  let foundElement = findItemByTitle(btnElement);
  itemTitle.value = foundElement.title;
  itemText.value = foundElement.text;
  itemPriority.value = foundElement.priority;
  let index = itemsArray.indexOf(foundElement);
  console.log(index);
  let removedItem = itemsArray.splice(index, 1);
};

let deleteClick = btnElement => {
  let foundElement = findItemByTitle(btnElement);
  let index = itemsArray.indexOf(foundElement);
  let removedItem = itemsArray.splice(index, 1);
  updateDisplay();
};

let arrayDisplay = () => {
  itemsArray.forEach(function(element) {
    itemDisplay(element);
  });
};

let itemDisplay = element => {
  if (element.state === "open") {
    displayOpenItem(element);
  } else {
    displayDoneItem(element);
  }
};

let displayOpenItem = element => {
  let itemCard = document.createElement("div");
  itemCard.className = "itemCard mx-4  ";
  itemsDiv.prepend(itemCard);

  createItemCardContent(itemCard, element);
};

let displayDoneItem = element => {
  let itemCard = document.createElement("div");
  itemCard.className = "itemCard  mx-4 done";
  itemsDiv.append(itemCard);

  createItemCardContent(itemCard, element);
};

let updateDisplay = () => {
  itemsDiv.innerHTML = ""; //delete all displayed items
  arrayDisplay();
  priorityFilter.value = "all"; //reset filter
  searchFilter.value = "";
  console.log("updated");
};

let init = () => {
  let firstItem = new Item("title", "description", "normal");
  itemsArray.push(firstItem);
  updateDisplay();
};

init();

console.log(itemsArray);
