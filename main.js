let input=document.querySelector(".input");
let submit=document.querySelector(".add");
let taskDiv=document.querySelector(".tasks");

// empty array
let ArrayOfTask=[];
if(localStorage.getItem("tasks")){
    ArrayOfTask=JSON.parse(localStorage.getItem("tasks"))

}
getDataFromLocalStorage();
submit.onclick=function(){
    if(input.value !=""){
        addTaskArray(input.value);
        input.value="";
    }
}
taskDiv.addEventListener("click", (e) => {
    // Delete Button
    if (e.target.classList.contains("del")) {
      // Remove Task From Local Storage
      deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
      // Remove Element From Page
      e.target.parentElement.remove();
    }
    // Task Element
    if (e.target.classList.contains("task")) {
      // Toggle Completed For The Task
      toggleStatusTaskWith(e.target.getAttribute("data-id"));
      // Toggle Done Class
      e.target.classList.toggle("done");
    }
  });

function addTaskArray(taskText){
const task={
    id:Date.now(),
    title:taskText,
    complated:false
}
ArrayOfTask.push(task)
addElementToPageForm(ArrayOfTask);
addDataToLocalStorage(ArrayOfTask)
}
function addElementToPageForm(addTaskArrays) {
    taskDiv.innerHTML = "";  // Clear existing content in taskDiv, assuming taskDiv is defined
    addTaskArrays.forEach((task) => {        
        let div = document.createElement("div");
        div.className = "task";
        if(task.complated){
            div.className="task done"
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        taskDiv.appendChild(div);  // Append the created div to taskDiv
    let span=document.createElement("span");
    span.className="del";
    span.appendChild(document.createTextNode("Delete"))
    div.appendChild(span)
    });
}
function addDataToLocalStorage(arrayoftask){
    window.localStorage.setItem("tasks",JSON.stringify(arrayoftask))
}
function getDataFromLocalStorage(){
    let data=window.localStorage.getItem("tasks");
    if(data){
        let tasks=JSON.parse(data);
        addElementToPageForm(tasks)
    }
}

function deleteTaskWith(taskId) {
  // For Explain Only
  // for (let i = 0; i < arrayOfTasks.length; i++) {
  //   console.log(`${arrayOfTasks[i].id} === ${taskId}`);
  // }
  ArrayOfTask = ArrayOfTask.filter((task) => task.id != taskId);
  addDataToLocalStorage(ArrayOfTask);
}
function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < ArrayOfTask.length; i++) {
      if (ArrayOfTask[i].id == taskId) {
        ArrayOfTask[i].completed == false ? (ArrayOfTask[i].completed = true) : (ArrayOfTask[i].completed = false);
      }
    }
    addDataToLocalStorage(ArrayOfTask);
  }