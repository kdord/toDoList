"use strict"



let create_window = document.getElementById("create_window")
let create_btn = document.getElementById("create_btn")
let close_btn = document.querySelector(".close_btn");


create_btn.onclick = function () {
	create_window.style.display = "block";
}
close_btn.onclick = function () {
	create_window.style.display = "none";
}

window.onclick = function (event) {
	if (event.target == create_window) {
		create_window.style.display = "none"
	}
}

let itemsArray = new Array();

class Item {
	constructor(title, text, priority, state){
		this.title = title;
		this.text = text;
		this.priority = priority;
		this.state = "open";
	}
}



let createItem = () => {
	saveItem(); // create new item from input data and push it to itemsArray
	console.log(itemsArray);
	itemsDiv.innerHTML = ""; //delete all displayed items 
	arrayDisplay(); //update displaying
	create_window.style.display = "none";
	clearForm(); //clear input forms
}

let saveItem = () => {
	let item = new Item(
			document.getElementById("item_title").value,
			document.getElementById("item_text").value,
			document.getElementById("item_priority").value
		);
	itemsArray.push(item);
	console.log("saved")
}

let clearForm = () => {
	document.getElementById("item_title").value = "";
	document.getElementById("item_text").value = "";
	document.getElementById("item_priority").value = "normal";
	console.log("cleared")
}

let itemsDiv = document.getElementById("itemsDiv");
itemsDiv.className = "d-flex"

let arrayDisplay = () => {
	itemsArray.forEach( function(element) {
		if(element.state === "open") {
			displayOpenItem(element);
			
		} else {
			displayDoneItem(element);
		}
		
		
	});
}


let displayOpenItem = (element) => {
	let itemCard = document.createElement("div");
	itemCard.className = "itemCard"
	itemsDiv.prepend(itemCard);
	
	createItemCardContent(itemCard, element);

}

let displayDoneItem = (element) => {
	let itemCard = document.createElement("div");
	itemCard.className = "itemCard done"
	itemsDiv.append(itemCard);
	
	createItemCardContent(itemCard, element);

	
}


let createItemCardContent = (itemCard, element) => {

	let itemTitleDiv = document.createElement("div");
	itemCard.append(itemTitleDiv);
	itemTitleDiv.innerHTML = element.title;

	let itemTextDiv = document.createElement("div");
	itemCard.append(itemTextDiv);
	itemTextDiv.className = "my-5"
	itemTextDiv.innerHTML = element.text;

	let itemFooterDiv = document.createElement("div");
	itemCard.append(itemFooterDiv);
	itemFooterDiv.className = "d-flex justify-content-between"
	

	let itemPrioritySpan = document.createElement("span");
	itemFooterDiv.append(itemPrioritySpan);
	itemPrioritySpan.innerHTML = element.priority;

	
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
	dropdownToggle.innerHTML = "..."

	let dropdownMenu = document.createElement("div");
	dropdownSpan.append(dropdownMenu);
	dropdownMenu.className = "dropdown-menu";
	dropdownMenu.setAttribute("aria-labelledby", "dropdownMenuLink")

	let doneBtn = document.createElement("a");
	dropdownMenu.append(doneBtn);
	doneBtn.className = "dropdown-item";

	if (element.state ==="open") {
		doneBtn.innerHTML = "Done";
		doneBtn.setAttribute("onclick", "doneClick(this)")
	} else {
		doneBtn.innerHTML = "Open";
		doneBtn.setAttribute("onclick", "openClick(this)")
	}

	

	let editBtn = document.createElement("a");
	dropdownMenu.append(editBtn);
	editBtn.className = "dropdown-item";
	editBtn.innerHTML = "Edit"

	let deleteBtn = document.createElement("a");
	dropdownMenu.append(deleteBtn);
	deleteBtn.className = "dropdown-item";
	deleteBtn.innerHTML = "Delete"
}

let openClick = (element) => {
	let title = element.parentNode.parentNode.parentNode.parentNode.firstChild;
	console.log(title.innerHTML)
	itemsArray.forEach( function(element) {
		if (element.title === title.innerHTML) {
			console.log("find")
			element.state = "open"
			console.log(itemsArray)

		}
		itemsDiv.innerHTML = ""; //delete all displayed items 
		arrayDisplay();
	});
}

let doneClick = (element) => {
	let title = element.parentNode.parentNode.parentNode.parentNode.firstChild;
	console.log(title.innerHTML)
	itemsArray.forEach( function(element) {
		if (element.title === title.innerHTML) {
			console.log("find")
			element.state = "done"
			console.log(itemsArray)

		}
		itemsDiv.innerHTML = ""; //delete all displayed items 
		arrayDisplay();
	});
}




let init = () => {
	let firstItem = new Item("title1", "todo text", "normal")
	itemsArray.push(firstItem)
	arrayDisplay();
}

init();
console.log(itemsArray)

