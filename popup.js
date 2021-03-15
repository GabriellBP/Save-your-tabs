/* configure buttons event listener */
let newGroupButton = document.getElementById("new-group");
newGroupButton.addEventListener("click", createGroup);


let contentBody = document.getElementsByClassName("content-body")[0];

function constructGroup() {
    /* creating group */
    let newGroup = document.createElement("div");
    newGroup.classList.add("group");

    /* creating group body elements */
    // adding group name
    let groupName = document.createElement("p");
    groupName.classList.add("group-name");
    groupName.innerHTML += "Group 3";
    // preparing restore and delete icons
    const restoreIcon = document.createElement("i");
    restoreIcon.classList.add("fas", "fa-external-link-alt");
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash-alt");
    // creating restore and delete buttons
    let groupRestoreButton = document.createElement("button");
    groupRestoreButton.classList.add("only-icon", "button");
    groupRestoreButton.appendChild(restoreIcon);
    groupRestoreButton.setAttribute("title", "Restore group");
    groupRestoreButton.addEventListener("click", restoreGroup())
    let groupDeleteButton = document.createElement("button");
    groupDeleteButton.classList.add("only-icon", "button");
    groupDeleteButton.appendChild(deleteIcon);
    groupDeleteButton.setAttribute("title", "Delete group");
    groupDeleteButton.addEventListener("click", deleteGroup())
    // adding group elements to new group
    newGroup.appendChild(groupName);
    newGroup.appendChild(groupRestoreButton);
    newGroup.appendChild(groupDeleteButton);

    /* adding new group to content body */
    contentBody.appendChild(newGroup);
}

function createGroup() {
    constructGroup();
}

function restoreGroup() {

}

function deleteGroup() {

}

function deleteAll() {

}

