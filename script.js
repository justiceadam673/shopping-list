const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear')

function addItems (e) {
  e.preventDefault();

  
  // validate input
  if (itemInput.value === '') {
    alert('please add an item');
    return;
  }
  
  // create new list items
  const newItem = document.createTextNode(itemInput.value);
  const newList = document.createElement('li');
  newList.appendChild(newItem);
  const button = createButton("remove-item btn-link text-red");
  newList.appendChild(button);
  console.log(newList);
  itemList.appendChild(newList);
  itemInput.value = '';
}

// create button
function createButton (classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

// create icon
function createIcon (classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function removeItem(e) {
  if (e.target.parentElement.classList.contain = 'remove-item') {
    e.target.parentElement.parentElement.remove();
  }
}

function clearItems (){
  while (itemList.firstChild){
    itemList.removeChild(itemList.firstChild);
  }
}
 
  

// event listeners
itemForm.addEventListener('submit', addItems)
itemList.addEventListener('click', removeItem)
clearBtn.addEventListener('click', clearItems)