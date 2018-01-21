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
        }
        if(children[i].id=="userrole"){
            userrole=children[i].value;
        }
    }
    let insertionPosition = document.getElementById("addbuttondiv");
    let parent = document.getElementById("userlist");
    let mainDiv = document.createElement("div");
    mainDiv.setAttribute("class","userelement");
    let deleteimage = document.createElement("img");
    deleteimage.setAttribute("src","delete_icon.png");
    deleteimage.setAttribute("class","deleteicon");
    deleteimage.setAttribute("width","20px");
    deleteimage.setAttribute("height","20px");
    mainDiv.appendChild(deleteimage);
    deleteimage.onclick = deletionEventHandler;
    let profileimage = document.createElement("img");
    profileimage.setAttribute("src","profile_icon.png");
    profileimage.setAttribute("width","100px");
    profileimage.setAttribute("height","100px");
    mainDiv.appendChild(profileimage);
    let br = document.createElement("br");
    mainDiv.appendChild(br);
    let nametext = document.createTextNode(username);
    mainDiv.appendChild(nametext);
    br = document.createElement("br");
    mainDiv.appendChild(br);
    let roletext = document.createTextNode(userrole);
    mainDiv.appendChild(roletext);
    let editimage = document.createElement("img");
    editimage.setAttribute("src","edit_icon.png");
    editimage.setAttribute("width","20px");
    editimage.setAttribute("height","20px");
    mainDiv.appendChild(editimage);
    userlist.insertBefore(mainDiv,insertionPosition);
    let popup= document.getElementById("fade");
    let light = document.getElementById("light");
    popup.style.display="none";
    light.style.display="none";
}

let submitbutton = document.getElementById("submitbutton");

submitbutton.onclick = submitButtonEventHandler;