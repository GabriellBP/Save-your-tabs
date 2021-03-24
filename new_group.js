// references to html elements
let contentBody = document.getElementsByClassName("content-body")[0];
let newGroupButton = document.getElementById("new-group");

// show all tabs and windows
chrome.windows.getAll({populate:true}, windows => {
    for (let x = 0; x < windows.length; x++) {
        // if (x > 0) return;
        let button = constructCollapsibleButton("Window "+ (x+1));
        contentBody.appendChild(button);
        let newWindow = document.createElement("div");
        newWindow.classList.add("window");
        for (let z = 0; z < windows[x].tabs.length; z++) {
            let tab = constructTabList(windows[x].tabs[z], (x + 1));
            newWindow.appendChild(tab);
        }
        contentBody.appendChild(newWindow)
    }
    addCheckboxesEvent();
});

function addCheckboxesEvent() {
    let windowCheckbox = document.querySelectorAll("input[type=checkbox][name=windowCheckbox]");

    // add change event to window checkbox
    for (let idx = 1; idx <= windowCheckbox.length; idx++) {
        let checkbox = windowCheckbox[idx - 1];
        checkbox.addEventListener('change', function () {
            let query = "input[type=checkbox][name=tabCheckbox_" + idx + "]";
            let tabCheckbox = document.querySelectorAll(query);
            tabCheckbox.forEach(function (tabCheckbox) {
                tabCheckbox.checked = checkbox.checked;
            });
        });
    }

    let selectAllCheckbox = document.getElementsByClassName("select-all")[0];
    let allCheckboxes = document.querySelectorAll("input[type=checkbox]");

    // add events to select all
    selectAllCheckbox.addEventListener("click", function () {
        allCheckboxes.forEach(function (checkbox) {
            if (selectAllCheckbox.checked === true) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
        });
    });
}

function constructCollapsibleButton(name) {
    // creating collapsible button
    let collapsibleButton = document.createElement("div");
    collapsibleButton.classList.add("collapsible");

    // adding collapsible behaviour
    collapsibleButton.addEventListener("click", function (e) {
        if(this === e.target) {
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        }
    });

    // creating checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "windowCheckbox";
    checkbox.id = name.replace(/ /g, '');
    checkbox.value = name.replace(/ /g, '');

    // add name and checkbox to button
    collapsibleButton.appendChild(checkbox);
    collapsibleButton.innerHTML += name;

    return collapsibleButton;
}

function constructTabList(tab, windowId) {
    // creating tab div
    let tabHtml = document.createElement("div");
    tabHtml.classList.add("tab", "group");

    // creating checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "tabCheckbox_" + windowId;
    checkbox.value = tab.url;
    checkbox.classList.add("tab-checkbox");

    // creating favicon
    let favicon = document.createElement("img");
    favicon.setAttribute("src", tab.favIconUrl);
    favicon.setAttribute("height", "16");
    favicon.setAttribute("width", "16");
    favicon.classList.add("favicon")

    // creating tab link
    let tabLink = document.createElement("a");
    tabLink.setAttribute("target", "_blank");
    tabLink.setAttribute("href", tab.url);
    tabLink.innerHTML += tab.title;

    // creating tab url domain
    let domain = new URL(tab.url);
    let tabDomain = document.createElement("small");
    tabDomain.innerHTML += domain.hostname;

    // creating tab detail
    let tabDetail = document.createElement("div");
    tabDetail.classList.add("tab-detail");
    let container = document.createElement("div");
    container.appendChild(tabLink);
    container.appendChild(document.createElement("br"));
    container.appendChild(tabDomain);
    tabDetail.appendChild(container);

    // add subcomponents to tab div
    tabHtml.appendChild(checkbox);
    tabHtml.appendChild(favicon);
    tabHtml.appendChild(tabDetail);

    return tabHtml;
}

function createNewGroup() {
    let group = {}
    let groupName = document.getElementsByName("newGroup")[0].value;
    if (groupName.length < 5) {
        alert('The group name must be at least 5 characters!');
        return;
    }
    group['name'] = groupName;
    group['tabs'] = []
    let checkedValue = document.querySelectorAll('.tab-checkbox:checked');
    if (checkedValue === null || checkedValue.length === 0) {
        alert('At least one tab must be selected');
        return;
    }

    for (let i = 0; i < checkedValue.length; i++) {
        group['tabs'].push(checkedValue[i].value);
    }

    chrome.storage.local.get({groups: []}, data => {
        // if (data.groups.length > groups.length) alert('something is wrong!'); // todo: treat this inconsistence case!

        data.groups.push(group);
        console.log(JSON.stringify(data, null, '  '));
        chrome.storage.local.set(data, function () { });
    });
}

// configure buttons event listener
newGroupButton.addEventListener("click", createNewGroup);

// todo: create Group behaviour
// todo: layout of collapsibles
// todo: testar as permissões no manifest.json
