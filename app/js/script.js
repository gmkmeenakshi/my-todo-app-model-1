// DESCRIPTION: Global variables for ul, add btn and save btn
let list=document.getElementById("list");
let addbtn=document.getElementById("add");
let savebtn=document.getElementById("save");


//-------------------------------------------------------------------------------------------------------------------------------//
// COMMENTS: Examples values used for todo list
// let todoList=[];
let todoList=[
    {
        uniqueNo:0,
        liId:"li-0",
        checkboxId:"checkbox-0",
        labelId:"label-0",        
        userInput:"Todo Tutorial",
        isChecked:false
    },         
];
//-------------------------------------------------------------------------------------------------------------------------------//
// DESCRIPTION: Global variables declared here
let userInput="";
let checkboxId=""
let labelId="";
let liId="";
let count=0;

//-------------------------------------------------------------------------------------------------------------------------------//
// DESCRIPTION: Function declaration for getting values from local storage
function getTodoListFromLocalStorage(){
    let storedTodoList=JSON.parse(localStorage.getItem("todolist"));   
    if (storedTodoList === null){
        return [];
    }
    else{
        return storedTodoList;
    }
};
//-------------------------------------------------------------------------------------------------------------------------------//
// DESCRIPTION: A function is called with locally stored todolist values
todoList =getTodoListFromLocalStorage();
count=JSON.parse(localStorage.getItem("count"));

//-------------------------------------------------------------------------------------------------------------------------------//
// DESCRIPTION: Function declaration for checkbox status
function onTodoStatusChange(checkboxId,labelId,liId){
    let cb=document.getElementById(checkboxId);
    let lb=document.getElementById(labelId);
    // COMMENTS: Toggle is used to add or remove the .checked class name
    lb.classList.toggle("checked");  
    let liIndex=todoList.findIndex(function(val){
        if (val.liId === liId){
            return true;
        }
    });
    // console.log(liIndex);
    if (todoList[liIndex].isChecked === true){
        todoList[liIndex].isChecked=false;
    }
    else{
        todoList[liIndex].isChecked=true;
    }
    
}
//-------------------------------------------------------------------------------------------------------------------------------//
// DESCRIPTION: Delete funtcion declaration
function onDeleteTodo(liId){
    let deleteLi=document.getElementById(liId);
    list.removeChild(deleteLi);
    let deleteIndex=todoList.findIndex(function(i){
        if(i.liId === liId){
            return true;           
        }        
    });
    todoList.splice(deleteIndex,1);
    localStorage.setItem("todolist",JSON.stringify(todoList));
}
//-------------------------------------------------------------------------------------------------------------------------------//
// DESCRIPTION: Creating and add task function declaration
function createandAppendTodo(todo){
    // COMMENTS: li tag created here
    let liElement=document.createElement("li");
    liElement.classList.add("tasks");
    liElement.id=todo.liId
    list.appendChild(liElement);
    // COMMENTS: Checkbox created here
    let checkboxElement=document.createElement("input");
    checkboxElement.type="checkbox";
    checkboxElement.id=todo.checkboxId;
    checkboxElement.classList.add("check-box");
    checkboxElement.checked=todo.isChecked;
    checkboxElement.onclick=function(){
        onTodoStatusChange(todo.checkboxId,todo.labelId,todo.liId)
    };
    liElement.appendChild(checkboxElement);
    // COMMENTS: Div container for label and del icon created here
    let labelDelDiv=document.createElement("div");
    labelDelDiv.classList.add("label-del-div");
    liElement.appendChild(labelDelDiv);
    // COMMENTS: label tag created here
    let labelElement=document.createElement("label");
    labelElement.classList.add("label-style");
    labelElement.id=todo.labelId;
    labelElement.htmlFor=todo.checkboxId;
    labelElement.textContent=todo.userInput;
    if (todo.isChecked === true){
        labelElement.classList.add("checked");
    }
    labelDelDiv.appendChild(labelElement);
    // COMMENTS: Div container for delete icon created here
    let delDiv=document.createElement("div");
    delDiv.classList.add("delete-btn-div");
    labelDelDiv.appendChild(delDiv);
    // COMMENTS: Delete icon created here
    let delIcon=document.createElement("i");
    delIcon.classList.add("fa-regular","fa-trash-can","fa-lg");
    delIcon.onclick=function(){
        onDeleteTodo(todo.liId);
    };
    delDiv.appendChild(delIcon);
}
//-------------------------------------------------------------------------------------------------------------------------------//
// DESCRIPTION: Using for-of-loop to access todoList array items
for (let todo of todoList){
    createandAppendTodo(todo);
};
//-------------------------------------------------------------------------------------------------------------------------------//
// DESCRIPTION: Add button onclick funtion declaration
function onAddTodo(){
    let userInput=document.getElementById("userinput").value;
    if (userInput.value == ""){
        alert("Enter Valid Input");
        return;
    };
    document.getElementById("userinput").value="";
    // COMMENTS: tags id calculated here
    count += 1;
    console.log(count);
    liId="li-"+count;
    checkboxId="checkbox-"+count;
    labelId="label-"+count;
    // COMMENTS: Creating temporary object and adding it to todolist
    let newValues={
        uniqueNo:count,
        liId:liId,
        checkboxId:checkboxId,
        labelId:labelId,
        userInput:userInput,
        isChecked:false
    };  
    todoList.push(newValues);    
    createandAppendTodo(newValues);
    userInput.value="";
    
}
//-------------------------------------------------------------------------------------------------------------------------------//
// DESCRIPTION: Add button onclick funtion calling
addbtn.onclick=function(){
    onAddTodo();
};
//-------------------------------------------------------------------------------------------------------------------------------//
// DESCRIPTION: Save button onclick function here
savebtn.onclick=function(){
    localStorage.setItem("todolist", JSON.stringify(todoList));  
    if (todoList.length === 0){
        localStorage.setItem("count", JSON.stringify(0));
    }          
    else{
        // count=todoList[todoList.length-1].uniqueNo;
        // localStorage.setItem("count", JSON.stringify(count));
        localStorage.setItem("count",JSON.stringify(todoList[todoList.length-1].uniqueNo))
    }
    count=JSON.parse(localStorage.getItem("count"));
           
};

