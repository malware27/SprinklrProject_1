let model = {

};
Object.defineProperty(model,"length",{
    enumerable: false,
    value: 0,
    writable: true
});
let view = {
    renderAddUserButton: function () {
        let buttonDiv = document.createElement("div");
        buttonDiv.className = "addelement";
        buttonDiv.id = "addbuttondiv";
        buttonDiv.innerHTML = `<img src="add_icon.svg" height="40px" width="40px" onclick="controller.addUserHandler(event);">`;
        let userslist = document.getElementById("userlist");
        userslist.appendChild(buttonDiv);
    },
    enableAddUserPopup: function () {
        let popup = document.getElementById("adduserpopup");
        let black_overlay = document.getElementById("fade");
        popup.style.display = "block";
        black_overlay.style.display = "block";
    },
    disableAddUserPopup: function () {
        let popup = document.getElementById("adduserpopup");
        let black_overlay = document.getElementById("fade");
        let form = document.getElementById("adduser");
        let inputs = form.getElementsByTagName("input");
        inputs[0].value = "";
        inputs[1].value = "";
        popup.style.display = "none";
        black_overlay.style.display = "none";
    },
    renderNewUser: function (userID) {
        let userslist = document.getElementById("userlist");
        let addIcon = document.getElementById("addbuttondiv");
        let userDiv = document.createElement("div");
        userDiv.className = "userelement";
        userDiv.onclick = this.clickHandler;
        userDiv.setAttribute("id",`user${userID}`);
        userDiv.innerHTML =
        `<img src="delete_icon.png" height="20px" width="20px" align="top right" class="deleteicon">
		<img src="profile_icon.png" height="100px" width="100px">
		<br>
			${model[userID].userName}
		<br>
		${model[userID].userRole}`;
        userslist.insertBefore(userDiv,addIcon);
    },
    renderInitialUsers: function () {
        let userslist = document.getElementById("userlist");
        let addIcon = document.getElementById("addbuttondiv");
        for(let i in model){
            let userDiv = document.createElement("div");
            userDiv.className = "userelement";
            userDiv.onclick = this.clickHandler;
            userDiv.id = `user${i}`;
            userDiv.innerHTML =
                `<img src="delete_icon.png" height="20px" width="20px" align="top right" class="deleteicon">
		        <img src="profile_icon.png" height="100px" width="100px">
		        <br>
			    ${model[i].userName}
		        <br>
		        ${model[i].userRole}`;
                userslist.insertBefore(userDiv,addIcon);
        }
    },
    clickHandler: function (event) {
        let target = event.target;
        if(target.className == "deleteicon"){
            controller.deleteUserHandler(event);
        }
        else{
            controller.editUserHandler(event);
        }
    },
    enableEditUserPopup: function () {
        let popup = document.getElementById("edituserpopup");
        let black_overlay = document.getElementById("fade");
        popup.style.display = "block";
        black_overlay.style.display = "block";
    },
    disableEditUserPopup: function () {
        let popup = document.getElementById("edituserpopup");
        let black_overlay = document.getElementById("fade");
        popup.style.display = "none";
        black_overlay.style.display = "none";
        let userNameInput = document.getElementById("user-name");
        userNameInput.value = "";
        let userRoleInput = document.getElementById("user-role");
        userRoleInput.value = "";
    },
    renderEditedUser: function (userID) {
        let userDiv = document.getElementById(`user${userID}`);
        userDiv.innerHTML =
            `<img src="delete_icon.png" height="20px" width="20px" align="top right" class="deleteicon">
		<img src="profile_icon.png" height="100px" width="100px">
		<br>
			${model[userID].userName}
		<br>
		${model[userID].userRole}`;
    }
};

let controller = {
    init: function () {
        this.retrieveUsers();
        view.renderInitialUsers();
        view.renderAddUserButton();
    },
    retrieveUsers:function () {
        for(let user in localStorage){
            if(!localStorage.hasOwnProperty(user))
                continue;
            let data = JSON.parse(localStorage.getItem(user));
            Object.defineProperty(model,user.substr(4), {
                value: data,
                enumerable: true,
                configurable: true,
                writable: true
            });
            model.length = model.length +1;
        }
    },
    addUserHandler: function (event) {
        view.enableAddUserPopup();
    },
    submitAddUserHandler: function (event) {
        let form = document.getElementById("adduser");
        let inputs = form.getElementsByTagName("input");
        let name =  inputs[0].value;
        let role = inputs[1].value;
        let userID = model.length;
        let newUser = {
            userName: name,
            userRole: role,
            id: userID
        };
        model[userID] = newUser;
        localStorage.setItem(`user${userID}`,JSON.stringify(model[userID]));
        model.length = model.length + 1;
        view.renderNewUser(userID);
        view.disableAddUserPopup();
    },
    deleteUserHandler: function (event) {
        let confirmation = confirm("Due you really want to delete the user?");
        if(!confirmation)
            return;
        let userDiv = event.target.closest(".userelement");
        let userID = userDiv.id.substr(4);
        delete model[userID];
        localStorage.removeItem(userDiv.id);
        userDiv.parentNode.removeChild(userDiv);
    },
    editUserHandler: function(event){
        view.enableEditUserPopup();
        let userDiv = event.target.closest(".userelement");
        let userNameInput = document.getElementById("user-name");
        let userRoleInput = document.getElementById("user-role");
        let userID = userDiv.id.substr(4);
        userNameInput.value = model[userID].userName;
        userRoleInput.value = model[userID].userRole;
        let submitButton = document.getElementById("submit-button");
        submitButton.setAttribute("data-selecteduser",userID);
    },
    submitEditUserHandler: function (event) {
        let userID = event.target.dataset.selecteduser;
        let userNameInput = document.getElementById("user-name");
        let userRoleInput = document.getElementById("user-role");
        model[userID].userName = userNameInput.value;
        model[userID].userRole = userRoleInput.value;
        view.renderEditedUser(userID);
        view.disableEditUserPopup();
        localStorage.setItem(`user${userID}`,JSON.stringify(model[userID]));
    }
};

controller.init();