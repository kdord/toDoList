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
itemsArray.push(new Item("title1", "todo text", "normal"))

let createItem = () => {
	saveItem();
	console.log(itemsArray);
	itemsDiv.innerHTML = "";
	arrayDisplay();
	create_window.style.display = "none";
	clearForm();
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

let displayItem = (element) => {
	let itemCard = document.createElement("div");
	itemCard.className = "card"
	itemsDiv.prepend(itemCard);
	itemCard.className = "itemCard p-5 m-3";
	
	let itemTitleDiv = document.createElement("div");
	itemCard.append(itemTitleDiv);
	itemTitleDiv.innerHTML = element.title;

	let itemTextDiv = document.createElement("div");
	itemCard.append(itemTextDiv);
	itemTextDiv.className = "my-5"
	itemTextDiv.innerHTML = element.text;

	let itemFooterDiv = document.createElement("div");
	itemCard.append(itemFooterDiv);
	

	let itemPrioritySpan = document.createElement("span");
	itemFooterDiv.append(itemPrioritySpan);
	itemPrioritySpan.innerHTML = element.priority;

}

let arrayDisplay = () => {
	itemsArray.forEach( function(element) {
		displayItem(element);
	});
}


console.log(itemsArray)