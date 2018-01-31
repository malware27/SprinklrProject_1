
const MONTHS = ["January", "February","March", "April","May","June",
                "July","August","September","October","November","December"];
let model = {
    usersData:
        {

        },
    tasksData:
        {

        }
};
Object.defineProperty(model.usersData, "length", {
    enumerable: false,
    value: 0,
    writable: true
});
Object.defineProperty(model.tasksData, "length", {
    enumerable: false,
    value: 0,
    writable: true
});
let view = {
    init: function () {
        let userlists = document.getElementById("userlists");
        this.renderUsers(userlists);
        this.renderTasks();
    },

    renderUsers: function (userlists) {
        for (let user in model.usersData) {  //map
            let userElement = document.createElement("div");
            userElement.setAttribute("class", "userlistelement");
            userElement.setAttribute("id", `user${user}`);
            userElement.innerHTML = `${model.usersData[user].userName} 
		<form class="filtercheckbox"> 
			<input type="checkbox" name="filter" value="All" checked> All
			<input type="checkbox" name="filter" value="ToDo"> ToDo
			<input type="checkbox" name="filter" value="Doing"> Doing
			<input type="checkbox" name="filter" value="Done">   Done
		</form>
		<hr>
		<div class="tasklistelement" ondragover="controller.allowDrop(event);" ondrop="controller.drop(event,this);">
		</div>
        <img src="add_icon.svg" height="20px" class="add-icon">`;
            userElement.onclick = this.clickHandler;
            userlists.appendChild(userElement);
        }
    },

    renderTasks: function () {
        for (let task in model.tasksData) {
            let assgndUser = model.tasksData[task].assignedUser;
            if(!model.usersData[assgndUser]){
                delete model.tasksData[task];
                return;
            }
            let userlist = document.getElementById(`user${assgndUser}`);
            let tasklistelement = userlist.getElementsByClassName("tasklistelement")[0];
            let add_icon = userlist.getElementsByClassName("add-icon")[0];
            let taskDiv = document.createElement("div");
            let taskStatus = model.tasksData[task].taskStatus.toLowerCase();
            taskDiv.setAttribute("class", `tasklist tasklist${taskStatus}`);
            taskDiv.setAttribute("id", `task${task}`);
            let date = new Date(model.tasksData[task].dueDate);
            let dueDate = MONTHS[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear();
            taskDiv.draggable = true;
            taskDiv.ondragstart = controller.drag;
            taskDiv.innerHTML = `<img src="delete_icon.png" height="20px" width="20px" class="delete_icon">
					${model.tasksData[task].taskName}
				<p class="duedate">
					<strong>Due date: </strong>${dueDate}
				</p>
				<p class="taskdata">
						${model.tasksData[task].taskStatus}
				</p>`;
            tasklistelement.appendChild(taskDiv);
        }
    },

    clickHandler: function (event) {
        let target = event.target;
        if (target.className == "delete_icon") {
            controller.deleteTaskHandler(event);
        }
        else if (target.tagName == "input") {
            filterEventHandler(event);
        }
        else if (target.className == "add-icon") {
            controller.addTaskHandler(event);
        }
        else if(target.closest(".tasklist")) {
            controller.viewTask(target.closest(".tasklist"));
        }
        else if(target.parentNode.className == "filtercheckbox"){
            controller.filterTasks(event);
        }
    },
    removeTask: function (taskDiv) {
        taskDiv.parentNode.removeChild(taskDiv);
    },
    enableAddTaskPopup: function () {
        let popup = document.getElementById("fade");
        let light = document.getElementById("addtask-form-popup");
        popup.style.display = "block";
        light.style.display = "block";
    },
    disableAddTaskPopup: function () {
        let popup = document.getElementById("fade");
        let light = document.getElementById("addtask-form-popup");
        popup.style.display = "none";
        light.style.display = "none";
        let taskname = document.getElementById("task-name");
        taskname.value = "";
        let dueDate = document.getElementById("duedate");
        dueDate.value = "";
    },
    enableViewTaskPopup: function () {
        let popup = document.getElementById("fade");
        let light = document.getElementById("edittask-form-popup");
        popup.style.display = "block";
        light.style.display = "block";
    },
    disableEditTaskPopup: function () {
        let popup = document.getElementById("fade");
        let light = document.getElementById("edittask-form-popup");
        popup.style.display = "none";
        light.style.display = "none";
        let taskname = document.getElementById("edit-task-name");
        taskname.value = "";
        let dueDate = document.getElementById("due-date");
        dueDate.value = "";
    },
    renderNewTask: function (newTask) {
        let selectedUserID = document.getElementById("submit-button").dataset.selecteduser;
        let selectedUser = document.getElementById(`user${selectedUserID}`);
        let tasklist = selectedUser.getElementsByClassName("tasklistelement")[0];
        let taskDiv = document.createElement("div");
        taskDiv.setAttribute("class", `tasklist tasklist${newTask.taskStatus.toLowerCase()}`);
        taskDiv.setAttribute("id",`task${newTask.taskID}`);
        let date = new Date(newTask.dueDate);
        let dueDate = MONTHS[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear();
        taskDiv.draggable = true;
        taskDiv.ondragstart = controller.drag;
        taskDiv.innerHTML =
            `<img src="delete_icon.png" height="20px" width="20px" class="delete_icon">
					${newTask.taskName}
				<p class="duedate">
					<strong>Due date: </strong>${dueDate}
				</p>
				<p class="taskdata">
						${newTask.taskStatus}
				</p>`;
        tasklist.appendChild(taskDiv);
    },
    renderEditedTask: function(taskID,taskDiv,userID,changeAssignedUser){
        if(changeAssignedUser){
            taskDiv.parentNode.removeChild(taskDiv);
            let newParent = document.getElementById(`user${userID}`);
            let tasklist = newParent.getElementsByClassName("tasklistelement")[0];
            tasklist.appendChild(taskDiv);
        }
        let date = new Date(model.tasksData[taskID].dueDate);
        let dueDate = MONTHS[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear();
        taskDiv.setAttribute("class",`tasklist tasklist${model.tasksData[taskID].taskStatus.toLowerCase()}`);
        taskDiv.innerHTML =
            `<img src="delete_icon.png" height="20px" width="20px" class="delete_icon">
					${model.tasksData[taskID].taskName}
				<p class="duedate">
					<strong>Due date: </strong>${dueDate}
				</p>
				<p class="taskdata">
						${model.tasksData[taskID].taskStatus}
				</p>`;
        this.disableEditTaskPopup();
    }
};

let controller = {
    deleteTaskHandler: function (event) {
        let target = event.target;
        let taskDiv = target.closest(".tasklist");
        let confirmation = confirm("Do you really want to delete the selected task?");
        if (confirmation) {
            let id = parseInt(taskDiv.id.substr(4));
            localStorage.removeItem(taskDiv.id);
            delete model.tasksData[id];
            view.removeTask(taskDiv);
        }
    },

    addTaskHandler: function (event) {
        view.enableAddTaskPopup();
        let userDiv = event.currentTarget;
        let submitButton = document.getElementById("submit-button");
        submitButton.setAttribute("data-selecteduser", userDiv.id.substr(4));
    },
    submitAddTaskHandler: function () {
        let taskname = document.getElementById("task-name").value;
        let taskstatus = document.getElementById("task-status");
        taskstatus = taskstatus.options[taskstatus.selectedIndex].value;
        let selectedUserID = document.getElementById("submit-button").dataset.selecteduser;
        let dueDate = document.getElementById("duedate").value;
        let newTask = {
            taskName: taskname,
            assignedUser: selectedUserID,
            taskID: model.tasksData.length,
            dueDate: dueDate,
            taskStatus: taskstatus,
            taskDetails: " "
        };
        localStorage.setItem(`task${model.tasksData.length}`,JSON.stringify(newTask));
        model.tasksData[model.tasksData.length] = newTask;
        model.tasksData.length = model.tasksData.length + 1;
        view.renderNewTask(newTask);
        view.disableAddTaskPopup();
    },
    viewTask: function (task) {
        let taskID = task.id.substr(4);
        let assignedUserDropDown = document.getElementById("assigned-user");
        let dropDownOptions = "";
        let assignedUser = model.tasksData[taskID].assignedUser;
        for(let i in model.usersData){
            if(i == assignedUser) {
                dropDownOptions += `<option value=${i} selected>${model.usersData[i].userName}</option>`;
            }
            else{
                dropDownOptions += `<option value=${i}>${model.usersData[i].userName}</option>`;
            }
        }
        assignedUserDropDown.innerHTML = dropDownOptions;
        view.enableViewTaskPopup();
        let taskNameInput = document.getElementById("edit-task-name");
        taskNameInput.value = model.tasksData[taskID].taskName;
        let taskStatusInput =document.getElementById("edit-task-status");
        taskStatusInput.value = model.tasksData[taskID].taskStatus;
        let dueDateInput = document.getElementById("due-date");
        dueDateInput.value = model.tasksData[taskID].dueDate;
        let submitButton = document.getElementById("submit_button");
        submitButton.setAttribute("data-selectedtask",task.id);
    },
    editTaskHandler: function (event) {
        let submitButton = document.getElementById("submit_button");
        let selectedTask = submitButton.dataset.selectedtask;
        let taskID = selectedTask.substr(4);
        let taskDiv = document.getElementById(selectedTask);
        let taskName = document.getElementById("edit-task-name").value;
        let taskStatus = document.getElementById("edit-task-status");
        let userID = document.getElementById("assigned-user");
        userID = userID.options[userID.selectedIndex].value;
        taskStatus = taskStatus.options[taskStatus.selectedIndex].value;
        let dueDate = document.getElementById("due-date").value;
        model.tasksData[taskID].taskName = taskName;
        model.tasksData[taskID].taskStatus = taskStatus;
        model.tasksData[taskID].dueDate = dueDate;
        localStorage.setItem(`task${taskID}`,JSON.stringify(model.tasksData[taskID]));
        let changeTaskUser = false;
        if(userID != model.tasksData[taskID].assignedUser.toString()){
            changeTaskUser = true;
            model.tasksData[taskID].assignedUser = userID;
            localStorage.setItem(`task${taskID}`,JSON.stringify(model.tasksData[taskID]));
        }
        view.renderEditedTask(taskID,taskDiv,userID,changeTaskUser);
    },
    allowDrop: function (event) {
      event.preventDefault();
    },
    drag: function (event) {
        event.dataTransfer.setData("text",event.target.id);
    },
    drop: function (event,element) {
        event.preventDefault();
        let taskID = event.dataTransfer.getData("text");
        let taskDiv = document.getElementById(taskID);
        taskID = taskID.substr(4);
        let userDiv = event.target.closest(".userlistelement");
        let userID = userDiv.id.substr(4);
        model.tasksData[taskID].assignedUser = userID;
        localStorage.setItem(`task${taskID}`,JSON.stringify(model.tasksData[taskID]));
        element.appendChild(taskDiv);
    },
    filterTasks: function (event) {
        let user = event.target.closest(".userlistelement");
        let tasks = user.getElementsByClassName("tasklist");
        let form = event.target.closest("form");
        let checkBoxes = form.getElementsByTagName("input");
        for(let task = 0;task< tasks.length;task++) {
            let taskID = tasks[task].id;
            taskID = taskID.substr(4);
            if(checkBoxes[1].checked && model.tasksData[taskID].taskStatus == "ToDo"){
                tasks[task].style.display = "block";
            }
            if(checkBoxes[2].checked && model.tasksData[taskID].taskStatus == "Doing"){
                tasks[task].style.display = "block";
            }
            if(checkBoxes[3].checked && model.tasksData[taskID].taskStatus == "Done"){
                tasks[task].style.display = "block";
            }
            if(!checkBoxes[1].checked && model.tasksData[taskID].taskStatus == "ToDo"){
                tasks[task].style.display = "none";
            }
            if(!checkBoxes[2].checked && model.tasksData[taskID].taskStatus == "Doing"){
                tasks[task].style.display = "none";
            }
            if(!checkBoxes[3].checked && model.tasksData[taskID].taskStatus == "Done"){
                tasks[task].style.display = "none";
            }
            if(checkBoxes[0].checked){
                tasks[task].style.display = "block";
            }
        }
    },
    retrieveData: function () {
      for(let data in localStorage){
          if(!localStorage.hasOwnProperty(data))
              continue;
          if(data.charAt(0) == "u") {
              let userData = JSON.parse(localStorage.getItem(data));
              if (model.usersData[userData.id]) {
                  model.usersData[userData.id] = userData;
                  continue;
              }
              model.usersData[model.usersData.length] = userData;
              model.usersData.length = model.usersData.length + 1;
          }
          else{
              let taskData = JSON.parse(localStorage.getItem(data));
              if(model.tasksData[taskData.id]) {
                  model.tasksData[taskData.id] = taskData;
                  continue;
              }
              model.tasksData[model.tasksData.length] = taskData;
              model.tasksData.length = model.tasksData.length + 1;
          }
      }
    },
    init: function () {
        this.retrieveData();
        view.init();
        let cancelButton = document.getElementById("cancelbutton");
        cancelButton.onclick = view.disableAddTaskPopup;
        let cancel_Button = document.getElementById("cancel_button");
        cancel_Button.onclick = view.disableEditTaskPopup;
    }
};
controller.init();