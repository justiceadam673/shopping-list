const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemfilter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");
isEditMode = false;
// Display items form the storage to the dom
function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}
// Add items to the dom on submit
function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // validate input
  if (newItem === "") {
    alert("please add an item");
    return;
  }

  // check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    removeItemsFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExist(newItem)) {
      alert("That Item Already Exist");
      itemInput.value = "";
      return;
    }
  }
  itemInput.value = "";
  // Calling Item To Dom Function
  addItemToDOM(newItem);
  // Calling Item From LocalStorage
  addItemToStorage(newItem);
  // remove items from storage
  removeItemsFromStorage();
  // Empty The The Input Field Fter Adding Items
  checkUI();
}
// Function To Add Item To DOM
function addItemToDOM(item) {
  // create new list items
  const newList = document.createElement("li");
  // Creating Li Text
  newList.appendChild(document.createTextNode(item));
  const button = createButton("remove-item btn-link text-red");
  newList.appendChild(button);
  console.log(newList);
  itemList.appendChild(newList);
}

// create button
function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

// create icon
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}
// Function To Get Item From Storage
function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}
// Function To Add Item To Storage
function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}
// Functin to click on the item
function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    confirm("Are you sure?");
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}
// seeting item to edit mode
function setItemToEdit(item) {
  isEditMode = "true";
  const allListItem = itemList.querySelectorAll("li");

  allListItem.forEach((i) => i.classList.remove("edit-mode"));

  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = "#226c22";
  itemInput.value = item.textContent;
}

// remove items
function removeItem(item) {
  // Remove from DOM
  item.remove();

  // Remove from localStorage
  removeItemsFromStorage(item.textContent);

  checkUI();
}
// function to removve item from storage
function removeItemsFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}
// function to check if item exist in the list already
function checkIfItemExist(item) {
  const itemsFromStorage = getItemsFromStorage();
  if (itemsFromStorage.includes(item)) {
    return itemsFromStorage.includes(item);
  }
}

// clear all items
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  // Clear from localStorage
  localStorage.removeItem("items");
  checkUI();
}
//  checkUI to remove the clear button and filter
function checkUI() {
  const items = itemList.querySelectorAll("li");
  if (items.length == 0) {
    clearBtn.style.display = "none";
    itemfilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemfilter.style.display = "block";
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = "#333";
  isEditMode = false;
}

// filter items
function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// initialize to load on pag load
function init() {
  // event listeners
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  itemList.addEventListener("click", removeItem);
  clearBtn.addEventListener("click", clearItems);
  itemfilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  // calling the checkUI function on the page loading
  checkUI();
}

init();
