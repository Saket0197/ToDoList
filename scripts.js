const addBtn = document.querySelector('.add');
const itemToBeAdded = document.querySelector('.item-to-add');
const items = document.querySelector('.items');
const clearInput = document.querySelector('.clear-input');
const clearList = document.querySelector('.clear-list');
let arr = [];

function addToList(val) {

    let listItem = document.createElement('li');
    listItem.classList.add('itemAdded');
    listItem.innerHTML = `${val}<i class="fa-solid fa-xmark"></i>`;
    items.appendChild(listItem);
    itemToBeAdded.value = "";

    listItem.querySelector('.fa-xmark').addEventListener('click',() => {
        listItem.remove();
    });

    listItem.addEventListener('click',() => {
        listItem.classList.toggle('task-completed');
    });

}

addBtn.addEventListener('click',(event) => {
    event.preventDefault();
    if(itemToBeAdded.value) {

        let store = {};
        arr.push(itemToBeAdded.value);
        store.listData = arr;
        localStorage.setItem('listData',JSON.stringify(store));

        addToList(itemToBeAdded.value);

        itemToBeAdded.focus();
    }
});

clearInput.addEventListener('click',(e) => {
    e.preventDefault();
    itemToBeAdded.value="";
    itemToBeAdded.focus();
});

clearList.addEventListener('click',(e) => {
    e.preventDefault();
    let itemsAdded = document.querySelectorAll('.itemAdded');
    for(let i =0; i < itemsAdded.length; i++) {
        itemsAdded[i].remove();
    }
});

function initiate() {
    
    if('listData' in localStorage) {
        console.log(localStorage.getItem('listData'));
        let store = JSON.parse(localStorage.getItem('listData'));
        let listArr = store.listData;
        if(listArr.length === 0)
            return;
        for(let i=0; i < listArr.length; i++){
            addToList(listArr[i]);
        }
        itemToBeAdded.focus();
    }
}

initiate();
