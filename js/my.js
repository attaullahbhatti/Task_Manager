
// Select the Elements

const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const completedList = document.getElementById("completed-list");
const completed = document.querySelector('.dropdown');
// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id, taskCompleted =0 ;

// get item from localstorage
let data = localStorage.getItem("TODO");

if(data){

    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}
console.log(LIST)
// load items to the user's interface
function loadList(array){
    taskCompleted =0;
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.description);
        addToDocompleted(item.name, item.id, item.done, item.description);
    });
    document.querySelector('.pc').innerHTML = `completed (${taskCompleted})`
    // array.forEach(function(item){
        
    // });
    
}
// add to do function

function addToDo(toDo, id, done, description){
    
    if(done){ return; }
    console.log(description)
    const item = `<li class="item">
                    <i class="fa fa-circle-thin co" job="complete" id="${id}"></i>
                    <p class="text">${toDo}</p></br>
                    <div class ="small">
                    </br><small>${description}</small>
                    </div>
                    <i class="fa fa-pencil" job="edit" id="${id}"></i>
                  </li>
                `;
   
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}
// add to completed
function addToDocompleted(toDo, id, done, description){
    
    if(done) {
        taskCompleted++;
        console.log(description)
        const item = `<li class="item">
                        <i class="fa fa-check-circle co" job="complete" id="${id}"></i>
                        <p class="text lineThrough">${toDo}</p></br>
                        <div class ="small">
                        </br><small>${description}</small>
                        </div>
                        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>
                    `;
        const position = "beforeend";
        
        completedList.insertAdjacentHTML(position, item);
    }
}
// add an item to the list using the enter key
document.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
        const toDo = input.value;
        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, '');
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                description : ""
            });
            
            // add item to localstorage ( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }
});


// complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    console.log(element.id)
    
    LIST.forEach(function(item) {
        if(item.id == element.id){
        item.done =  true;
        }
    });
        
    element.parentNode.parentNode.innerHTML = "";
    completedList.innerHTML = "";
    localStorage.setItem("TODO", JSON.stringify(LIST));
    loadList(LIST);
    console.log(LIST)

}
// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    for( var i = 0; i < LIST.length; i++){ 
    
        if ( LIST[i].id == element.id) { 
    
            LIST.splice(i, 1); 
        }
    
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
    taskCompleted--;
    document.querySelector('.pc').innerHTML = `completed (${taskCompleted})`

}

// target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete 
    const elementid = element.attributes.id.value;  // edit
    if(elementJob == "complete"){
        completeToDo(element)
    }
    else if (elementJob == "edit"){
        const description = window.prompt('Enter Task Description')
        element.parentNode.querySelector('.small').innerHTML = description;
        LIST[elementid].description = description;
        localStorage.setItem("TODO", JSON.stringify(LIST));
    };
    
});


completed.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    
    if(elementJob == "delete"){
        removeToDo(element);
    }
    
    });
    
function Display() {
    document.getElementById("myDropdown").classList.toggle("show");
}
















