
function deletionEventHandler(event){
	let confirmation = confirm("Do you really want to delete the selected task?");
	if(!confirmation)
		return;
	let delete_icon = event.currentTarget;
	let parentDiv = delete_icon.parentNode;
	parentDiv.parentNode.removeChild(parentDiv);
}
let delete_icons = document.getElementsByClassName("delete_icon");
for(let i in delete_icons){
	delete_icons[i].onclick=deletionEventHandler;
}

let add_icons = document.getElementsByClassName("add-icon");


let selectedUser = undefined;
function addButtonEventHandler(event) {
    let popup= document.getElementById("fade");
    let light = document.getElementById("light");
    popup.style.display="block";
    light.style.display="block";
    selectedUser = event.currentTarget;
}
for(let i in add_icons){
    add_icons[i].onclick = addButtonEventHandler;
}

function submitbuttonEventHandler(event) {
    let form = document.getElementById("addtask");
    let formchildren = form.childNodes;
    let taskname = undefined;
    let duedate = undefined;
    let taskstatus=undefined;
    for(let i in formchildren){
        if(formchildren[i].id=="taskname"){
            taskname=formchildren[i].value;
            formchildren[i].value="";
        }
        if(formchildren[i].id=="duedate"){
        	duedate=formchildren[i].value.toString();
            formchildren[i].value="";
		}
		if(formchildren[i].id=="taskstatus"){
        	taskstatus=formchildren[i].options[formchildren[i].selectedIndex].text;
		}
    }
	selectedUser = selectedUser.parentNode;
    let insertionPosition = selectedUser.getElementsByClassName("tasklistelement")[0];
	let classOfToBeInserted = undefined;
    if(taskstatus=="Todo"){
    	classOfToBeInserted = "tasklisttodo";
	}
	else if(taskstatus=="Doing"){
    	classOfToBeInserted = "tasklistdoing";
	}
	else{
    	classOfToBeInserted = "tasklistdone";
	}
	let maindiv = document.createElement("div");
    maindiv.setAttribute("class","tasklist "+classOfToBeInserted);
    let innerContent = "<img src=\"delete_icon.png\" height=\"20px\" width=\"20px\" align=\"top right\" class=\"delete_icon\">" +
        taskname +
        "<p class=\"duedate\">" +
        "<strong>Due date: </strong>"+duedate +
        "</p>" +
        "<p class=\"taskdata\">" +
        "<img src=\"edit_icon.png\" height=\"15px\" width=\"15px\" align=\"top right\">" +
        taskstatus +
        "</p>";
    maindiv.innerHTML = innerContent;
    let delete_icon = maindiv.getElementsByClassName("delete_icon")[0];
    delete_icon.onclick = deletionEventHandler;
    insertionPosition.appendChild(maindiv);
    let popup= document.getElementById("fade");
    let light = document.getElementById("light");
    popup.style.display="none";
    light.style.display="none";
}

let submitbutton = document.getElementById("submitbutton");

submitbutton.onclick = submitbuttonEventHandler;
function cancelButtonEventHandler(event) {
    let popup= document.getElementById("fade");
    let light = document.getElementById("light");
    popup.style.display="none";
    light.style.display="none";
}

let cancelbutton = document.getElementById("cancelbutton");

cancelbutton.onclick = cancelButtonEventHandler;

function filterEventHandler(event) {
	let targetCheckBox = event.target;
	let checkboxes = (targetCheckBox.parentNode).getElementsByTagName("input");
	let parentOfForm = targetCheckBox.parentNode.parentNode;
	let childNodesOfUserList = parentOfForm.childNodes;
	let requiredList = undefined;
	for( let i in childNodesOfUserList){
		if(childNodesOfUserList[i].className == "tasklistelement"){
			requiredList = childNodesOfUserList[i];
			break;
		}
	}
    let taskList = requiredList.getElementsByClassName("tasklist");
	for(let i=0;i<taskList.length;i++){
		if(taskList[i].className=="tasklist tasklisttodo"){
			if(checkboxes[1].checked){
				taskList[i].style.display = "block";
			}
			else{
				taskList[i].style.display="none";
			}
		}
        if(taskList[i].className=="tasklist tasklistdoing"){
            if(checkboxes[2].checked){
                taskList[i].style.display = "block";
            }
            else{
                taskList[i].style.display="none";
            }
        }
        if(taskList[i].className=="tasklist tasklistdone"){
            if(checkboxes[3].checked){
                taskList[i].style.display = "block";
            }
            else{
                taskList[i].style.display="none";
            }
        }
        if(checkboxes[0].checked){
			taskList[i].style.display="block";
		}
	}
}

let filterForms = document.getElementsByClassName("filtercheckbox");

for(let i in filterForms){
	let inputTags = filterForms[i].childNodes;
	for(let j in inputTags){
		inputTags[j].onclick = filterEventHandler;
	}
}


