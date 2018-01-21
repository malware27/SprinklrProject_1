
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
        }
        if(formchildren[i].id=="duedate"){
        	duedate=formchildren[i].value.toString();
		}
		if(formchildren[i].id=="taskstatus"){
        	taskstatus=formchildren[i].options[formchildren[i].selectedIndex].text;
		}
    }
	selectedUser = selectedUser.parentNode;
    let insertionPosition = undefined;
    let children = selectedUser.childNodes;
    for(let i in children){
    	if(children[i].className=="tasklistelement"){
    		insertionPosition = children[i];
    		break;
		}
	}
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
	let deleteimage = document.createElement("img");
	deleteimage.setAttribute("src","delete_icon.png");
	deleteimage.setAttribute("width","20px");
	deleteimage.setAttribute("height","20px");
	deleteimage.setAttribute("class","delete_icon");
	maindiv.appendChild(deleteimage);
	deleteimage.onclick = deletionEventHandler;
	let nametext = document.createTextNode(taskname);
	maindiv.appendChild(nametext);
	let dueDateParagraph = document.createElement("p");
	dueDateParagraph.setAttribute("class","duedate");
	let content = document.createElement("strong");
	content.textContent = "Due date: ";
	dueDateParagraph.appendChild(content);
	let datetext = document.createTextNode(duedate);
	dueDateParagraph.appendChild(datetext);
	maindiv.appendChild(dueDateParagraph);
	let taskDataParagraph = document.createElement("p");
	taskDataParagraph.setAttribute("class","taskdata");
	let edit_icon = document.createElement("img");
	edit_icon.setAttribute("src","edit_icon.png");
	edit_icon.setAttribute("height","15px");
	edit_icon.setAttribute("width","15px");
	taskDataParagraph.appendChild(edit_icon);
	let statustext = document.createTextNode(taskstatus);
	taskDataParagraph.appendChild(statustext);
	maindiv.appendChild(taskDataParagraph);
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


