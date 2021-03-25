// references to html elements
let newGroupButton = document.getElementById("new-group");
let removeAllButton = document.getElementById("erase-button");
let contentBody = document.getElementsByClassName("content-body")[0];


function updateGroupList() {
    // clean content body
    contentBody.textContent = '';

    // get existing groups
    chrome.storage.local.get({groups: []}, data => {
        for (let i = 0; i < data.groups.length; i++) {
            let group = data.groups[i];
            const newGroup = constructGroup(group);
            contentBody.appendChild(newGroup);
            // alert(JSON.stringify(groups[i], null, '  '));
        }
    })
}

function openNewGroupModal() {
    chrome.windows.create({
        focused: true,
        type: "popup",
        url: "new_group.html",
        height: 600,
        width: 600
    });
}

// construct the group html
function constructGroup(group) {
    // creating group
    let newGroup = document.createElement("div");
    newGroup.classList.add("group");

    /* creating group body elements */
    // adding group name
    let groupName = document.createElement("p");
    groupName.classList.add("group-name");
    groupName.innerHTML += group.name;

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
        // groupRestoreButton.addEventListener("click", restoreGroup(groups.length));
    groupRestoreButton.addEventListener("click", () => restoreGroup(group));
    let groupDeleteButton = document.createElement("button");
    groupDeleteButton.classList.add("only-icon", "button");
    groupDeleteButton.appendChild(deleteIcon);
    groupDeleteButton.setAttribute("title", "Delete group");
        // groupDeleteButton.addEventListener("click", deleteGroup(groups.length));
    groupDeleteButton.addEventListener("click", () => deleteGroup(group));

    // adding group elements to new group
    newGroup.appendChild(groupName);
    newGroup.appendChild(groupRestoreButton);
    newGroup.appendChild(groupDeleteButton);

    return newGroup;
}

function restoreGroup(group) {
    chrome.windows.create({
        focused: true,
        state: "maximized",
        type: "normal",
        url: group.tabs,
    });
}

function deleteGroup(group) {
    let ans = confirm('Do you really want to delete the group ' + group.name);
    if (ans === true) {
        chrome.storage.local.get({groups: []}, data => {
            data.groups = data.groups.filter(obj => obj.id !== group.id);
            chrome.storage.local.set(data, function () { });
        });
    }
}

function removeAll() {
    let ans = confirm('Do you really want to delete all groups?');
    if (ans === true) {
        chrome.storage.local.clear(() => {
        }); // todo: treat unsuccessful and successful behavior
    }
}

// configure buttons event listener
newGroupButton.addEventListener("click", openNewGroupModal);
removeAllButton.addEventListener("click", removeAll);

// event to update popup screen
chrome.storage.onChanged.addListener(updateGroupList);

// start
updateGroupList();
