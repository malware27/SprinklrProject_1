function deletionEventHandler(event) {
    let confirmation = confirm("Do you really want to delete the selected user?");
    if(!confirmation)
        return;
    let deleteIcon = event.currentTarget;
    let parentDiv = deleteIcon.parentNode;
    parentDiv.parentNode.removeChild(parentDiv);
}
let delete_icons = document.getElementsByClassName("deleteicon");
for(let i in delete_icons){
    delete_icons[i].onclick = deletionEventHandler;
}

function addButtonEventHandler(event){
    let popup= document.getElementById("fade");
    let light = document.getElementById("light");
    popup.style.display="block";
    light.style.display="block";
}

let addbutton = document.getElementById("addbuttondiv");
addbutton.onclick = addButtonEventHandler;

function cancelButtonEventHandler(event) {
    let popup= document.getElementById("fade");
    let light = document.getElementById("light");
    popup.style.display="none";
    light.style.display="none";
}

let cancelbutton = document.getElementById("cancelbutton");
cancelbutton.onclick = cancelButtonEventHandler;

function submitButtonEventHandler(event) {
    let form = document.getElementById("adduser");
    let children = form.childNodes;
    let username =undefined;
    let userrole = undefined;
    for(let i in children){
        if(children[i].id=="username"){
            username=children[i].value;
            children[i].value="";
        }
        if(children[i].id=="userrole"){
            userrole=children[i].value;
            children[i].value="";
        }
    }
    let insertionPosition = document.getElementById("addbuttondiv");
    let userlist = document.getElementById("userlist");
    let mainDiv = document.createElement("div");
    mainDiv.setAttribute("class","userelement");
    let innerContent = "<img src=\"delete_icon.png\" height=\"20px\" width=\"20px\" align=\"top right\" class=\"deleteicon\">" +
        "<img src=\"profile_icon.png\" height=\"100px\" width=\"100px\">" +
        "<br>" +
        username +
        "<br>" +
        userrole +
        "<img src=\"edit_icon.png\" height=\"20px\" width=\"20px\">";
    mainDiv.innerHTML = innerContent;
    let delete_icon = mainDiv.getElementsByClassName("deleteicon")[0];
    delete_icon.onclick = deletionEventHandler;
    userlist.insertBefore(mainDiv,insertionPosition);
    let popup= document.getElementById("fade");
    let light = document.getElementById("light");
    popup.style.display="none";
    light.style.display="none";
}

let submitbutton = document.getElementById("submitbutton");

submitbutton.onclick = submitButtonEventHandler;