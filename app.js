//select elements
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById("list");
const input = document.getElementById("input");

//classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//VARIABLES 
let LIST, id;
// GET ITEM FROM LOCALSTORAGE
let data = localStorage.getItem("TODO");

//CHECK IF DATA IS NOT EMPTY
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; //set the id tp the last one in the list
    loadList(LIST); //LOAD THE LIST TO THE USER INTERFACE
} else {
    LIST = [];
    id = 0;
}

//load items to the user's interface
function loadList(array) {
    array.forEach(function(item) {
        addToDO(item.name, item.id, item.done, item.trash);
    });
}

//show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to do function

function addToDO(toDo, id, done, trash) {
    if (trash) { return; };
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = ` 
                <li class="item">
                <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>
                `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

//ADD ITEM TO LIST WHEN USER PRESSES ENTER
document.addEventListener("keyup", ($event) => {
    if (event.keyCode == 13) {
        const toDo = input.value;
        //if todo is not empty
        if (toDo) {
            addToDO(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false

            })

            //ADD ITEM TO LOCAL STORAGE:WRITTEN EVERYWHERE WE UPDATE OUR LIST ARRAY
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;

        }
        input.value = "";

    }
})


//FUNCTION COMPLETE TODO
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//FUNCTION TO REMOVE TO DO
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//ADD EVENT LISTENERE TO TARGET ITEMS CREATED DYNAMICALLY
list.addEventListener("click", ($event) => {
    const element = event.target; //returns the clicked element inside list
    const elementJob = element.attributes.job.value; //complete or delete

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }

    //ADD ITEM TO LOCAL STORAGE:WRITTEN EVERYWHERE WE UPDATE OUR LIST ARRAY
    localStorage.setItem("TODO", JSON.stringify(LIST));
})

//FUNCTION TO CLEAR OUT EVERYTHING
clear.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
})