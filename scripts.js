const addBtn = document.querySelector('.add');
const itemToBeAdded = document.querySelector('.item-to-add');
const items = document.querySelector('.items');
const clearInput = document.querySelector('.clear-input');
const clearList = document.querySelector('.clear-list');
let arr = [];
let store = {};
let currItem = 0;

function addToList(val) {

    let listItem = document.createElement('li');
    listItem.currItem = currItem;
    console.log('ind for ',val,' is ',listItem.currItem);
    currItem++;
    listItem.classList.add('itemAdded');

    listItem.innerHTML = `${val}<i class="fa-solid fa-xmark"></i>`;
    items.appendChild(listItem);
    itemToBeAdded.value = "";

        arr.push(val);
        console.log('arr after adding ele', arr);
        store.listData = arr;
        localStorage.setItem('listData',JSON.stringify(store));

    listItem.querySelector('.fa-xmark').addEventListener('click',() => {
        console.log('deleting ',val,' at ind ',listItem.currItem);
        arr.splice(listItem.currItem,1);
        currItem--;
        console.log('arr after splice is ',arr);
        store.listData = arr;
        localStorage.setItem('listData',JSON.stringify(store));
        listItem.remove();
    });

    listItem.addEventListener('click',() => {
        listItem.classList.toggle('task-completed');
    });

}

addBtn.addEventListener('click',(event) => {
    event.preventDefault();
    if(itemToBeAdded.value) {
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

    currItem = 0;

    if('listData' in localStorage)
        localStorage.removeItem('listData');
});

function sub(e){
    console.log('iv is ',itemToBeAdded.value);
    e.preventDefault();
    console.log('hi');
        console.log('iv is ',itemToBeAdded.value);
        addToList(itemToBeAdded.value);
        
    return false;
}

function initiate() {
    
    if('listData' in localStorage) {
        console.log(localStorage.getItem('listData'));
        let store = JSON.parse(localStorage.getItem('listData'));
        let listArr = store.listData;
        console.log('listArr is ',listArr);
        if(listArr.length === 0)
            return;
        for(let i=0; i < listArr.length; i++){
            addToList(listArr[i]);
        }
        itemToBeAdded.focus();
    }
}

initiate();
