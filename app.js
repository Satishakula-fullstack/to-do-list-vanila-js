const itemInput = document.querySelector(".item-input");
const addBtnEl = document.querySelector(".add-item");
const itemlist = document.querySelector(".items");
const updateBtn = document.querySelector(".update");

const addNewItemToLS = (e) => {
  const newItem = itemInput.value;
  if (newItem === "") {
    alert("please write your taks for today");
    return;
  }
  addItemToDOM(newItem);
  addItemsToLocalStorage(newItem);
};

const addItemToDOM = (item) => {
  const li = document.createElement("li");
  li.className = "item";
  li.appendChild(document.createTextNode(item));
  const button = createButton("action");
  const checkIcon = createIcon("fa-solid fa-check fa-2x");
  const trashIcon = createIcon("fa-solid fa-trash fa-2x");

  button.appendChild(checkIcon);
  button.appendChild(trashIcon);
  li.appendChild(button);
  itemlist.appendChild(li);
  itemInput.value = "";
};
const getItemsFromLocalStorage = () => {
  let itemList;
  if (localStorage.getItem("items") === null) {
    itemList = [];
  } else {
    itemList = JSON.parse(localStorage.getItem("items"));
  }
  return itemList;
};
const loadItems = () => {
  const items = getItemsFromLocalStorage();
  items.forEach((item) => {
    addItemToDOM(item);
  });
};
const addItemsToLocalStorage = (item) => {
  const itemList = getItemsFromLocalStorage();
  itemList.push(item);

  localStorage.setItem("items", JSON.stringify(itemList));
};
const createButton = (classes) => {
  const button = document.createElement("button");
  button.className = classes;
  return button;
};

const createIcon = (classes) => {
  const checkIcon = document.createElement("i");
  checkIcon.className = classes;
  return checkIcon;
};
const updateItemInLS = (e) => {
  const li = e.target.parentElement.parentElement;
  if (e.target.classList.contains("fa-check")) {
    li.classList.add("strike-out");
    e.target.classList.add("hide");
  } else if (e.target.classList.contains("fa-trash")) {
    removeItem(li);
  } else if (e.target.classList.contains("item")) {
    setItemToEdit(e.target);
  } else {
  }
};
const removeClasses = () => {
  const items = document.querySelectorAll(".item");
  items.forEach((item) => {
    item.classList.remove("edit-mode");
  });
};
const setItemToEdit = (item) => {
  removeClasses();
  isupdate = true;
  itemInput.value = item.textContent;
  item.classList.add("edit-mode");
  addBtnEl.classList.add("hide");
  updateBtn.classList.remove("hide");
  updateBtn.classList.add("show");
};
const updateItem = (e) => {
  const itemsFromStorage = getItemsFromLocalStorage();
  const preItem = document.querySelector(".edit-mode").textContent;
  const preItemIndex = itemsFromStorage.indexOf(preItem);
  itemsFromStorage[preItemIndex] = itemInput.value;
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
  updateBtn.classList.toggle("hide");
  addBtnEl.classList.remove("hide");
  removeClasses();
  itemlist.innerHTML = "";
  loadItems();
};
const removeItem = (item) => {
  if (confirm("Are you sure to remove task")) {
    item.remove();
    console.log(item.textContent);
    removeItemFromLocalStorage(item.textContent);
  } else {
    return;
  }
};
const removeItemFromLocalStorage = (itemText) => {
  let items = getItemsFromLocalStorage();
  items = items.filter((item) => item !== itemText);
  localStorage.setItem("items", JSON.stringify(items));
};
addBtnEl.addEventListener("click", addNewItemToLS);
itemlist.addEventListener("click", updateItemInLS);
updateBtn.addEventListener("click", updateItem);
document.addEventListener("DOMContentLoaded", loadItems);
