const todoListsContainer = document.querySelector("#todo-lists");
const todoInputElem = document.querySelector("#todo-input");
const addTodoBtn = document.querySelector("#add-todo");

let todoArrays = [];


// Add Todo To Dom
function addTodoToDom (event) {
    event.preventDefault();
    let todoInputElemValue = todoInputElem.value.trim();

    let newTodoObj = {
        id: todoArrays.length +1,
        title: todoInputElem.value ,
        complete: false,
    }

    todoInputElem.value = '';

    if(todoInputElemValue){
        todoArrays.push(newTodoObj);
        setInLocalStorage(todoArrays);
        todoGenerator(todoArrays);
    
    }else{
        console.log("مقدار ورودی خالی بود");
    }

    todoInputElem.focus();

    

}


// save Item To Local Storage
function setInLocalStorage (todoList) {
    localStorage.setItem("Todos",JSON.stringify(todoList));
}


// Todo List Generator
function todoGenerator (todoList) {
    todoListsContainer.innerHTML = "";
        todoList.forEach( todo => {
           
            let newTodoLiElem = document.createElement("li");
            newTodoLiElem.className = "bg-[#423a6f] text-[#F8F9FA] mb-2 rounded-[4px] py-[10px] flex justify-between items-center";

            let newTodoTitle = document.createElement("span")
            newTodoTitle.textContent = todo.title;
            newTodoTitle.className = "ml-4";

            let newTodoContainer = document.createElement("div")
            newTodoContainer.className = "flex flex-row-reverse items-center"

            let newTodoTrashElem = document.createElement("span")
            newTodoTrashElem.className = "cursor-pointer mx-4"
            let newTodoTrashIcon = document.createElement("img")
            newTodoTrashIcon.setAttribute("src","./src/assets/img/trash.svg")
            newTodoTrashIcon.setAttribute("onclick","removeTodoList("+ todo.id +")")
            newTodoTrashElem.append(newTodoTrashIcon);

            let newTodoCompleteElem = document.createElement("span");
            newTodoCompleteElem.className = "cursor-pointer"
            let newTodoCompleteIcon = document.createElement("img")
            newTodoCompleteIcon.setAttribute("src","./src/assets/img/compelate.svg")
            newTodoCompleteIcon.setAttribute("onclick","completeTodoList("+ todo.id +")")
            newTodoCompleteElem.append(newTodoCompleteIcon)

            
            // Push Todo To Dom 
            newTodoContainer.append(newTodoTrashElem,newTodoCompleteElem);
            newTodoLiElem.append(newTodoTitle,newTodoContainer);
            todoListsContainer.append(newTodoLiElem);

            // add & remove class complete
            if(todo.complete === true){
                newTodoLiElem.classList.add("opacity-50");
                newTodoLiElem.classList.add("line-through");

            }else{
                newTodoLiElem.classList.remove("opacity-50");
                newTodoLiElem.classList.remove("line-through");
            }

        })
    
 
}


// complete TodoList
function completeTodoList (TodoId) {
    let localStorageTodo = JSON.parse(localStorage.getItem("Todos"))
    
    todoArrays = localStorageTodo

    todoArrays.forEach( todo => {

        if(todo.id === TodoId){
            todo.complete = !todo.complete
        }
       
    })

    todoGenerator(todoArrays);
    setInLocalStorage(todoArrays)
}


// Remove Todo List
function removeTodoList (TodoId) {
    let localStorageTodo = JSON.parse(localStorage.getItem("Todos"));

    todoArrays = localStorageTodo;
    
    let mainTodoIndex = todoArrays.findIndex(todo => {
        return TodoId === todo.id
    })

    todoArrays.splice(mainTodoIndex , 1);
    setInLocalStorage(todoArrays);
    todoGenerator(todoArrays);
}


// Get Local Storage
function getLocalStorage () {
    let getLocalStorageTodo = JSON.parse(localStorage.getItem("Todos"))

    if(getLocalStorageTodo){
        todoArrays = getLocalStorageTodo
    }else{
     todoArrays = [];  
    }

    todoGenerator(todoArrays);
}


// Set Events 
addTodoBtn.addEventListener("click",addTodoToDom);
window.addEventListener("load",getLocalStorage());