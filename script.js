const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemfilter = document.getElementById('filter')

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
  if (confirm('Are you sure?')) {
    newList.appendChild(newItem);
  }
  const button = createButton("remove-item btn-link text-red");
  newList.appendChild(button);
  console.log(newList);
  itemList.appendChild(newList);
  itemInput.value = '';
  checkUI();
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

// remove items 
function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
   if (confirm('Are you sure?')) {
    e.target.parentElement.parentElement.remove()
   }
    } 
    checkUI();
  }

// clear all items
function clearItems (){
  while (itemList.firstChild){
    itemList.removeChild(itemList.firstChild);
  }
  checkUI();
}
//  checkUI to remove the clear button and filter
function checkUI() {
    const items = itemList.querySelectorAll('li')
    if (items.length == 0) {
      clearBtn.style.display = 'none'
      itemfilter.style.display = 'none'

    } else {
      clearBtn.style.display = 'block'
      itemfilter.style.display = 'block'
    }
  }
  
  // filter items
  function filterItems(e) {
    const items = itemList.querySelectorAll('li')
    const text = e.target.value.toLowerCase()

    items.forEach(item => {
      const itemName = item.firstChild.textContent.toLowerCase();

      if(itemName.indexOf(text) !== -1) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    })
  }

// event listeners
itemForm.addEventListener('submit', addItems)
itemList.addEventListener('click', removeItem)
clearBtn.addEventListener('click', clearItems)
itemfilter.addEventListener('input', filterItems)

// calling the checkUI function on the page loading
checkUI();