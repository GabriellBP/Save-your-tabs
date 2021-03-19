// references to html elements
let contentBody = document.getElementsByClassName("content-body")[0];

chrome.windows.getAll({populate:true}, windows => {
    for (let x = 0; x < windows.length; x++) {
        let newWindow = document.createElement("div");
        newWindow.classList.add("window");
        for (let z = 0; z < windows[x].tabs.length; z++) {
            let tab = constructTab();
        }
        let button = constructCollapsibleButton("Window "+ (x+1));
        contentBody.appendChild(button);
        contentBody.appendChild(newWindow)
    }
});

function constructCollapsibleButton(name) {
    // creating collapsible button
    let collapsibleButton = document.createElement("button");
    collapsibleButton.classList.add("collapsible");

    // adding collapsible behaviour
    collapsibleButton.addEventListener("click", function() {
        console.log('oi', this);
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });

    // creating checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "windowCheckbox";
    checkbox.id = name.replace(/ /g, '');

    // add name and checkbox to button
    collapsibleButton.appendChild(checkbox);
    collapsibleButton.innerHTML += name;

    return collapsibleButton;
}

function constructTab() {
    let tab = document.createElement("div");
    tab.classList.add("tab", "group");

    return tab;
}


// let coll = document.getElementsByClassName("collapsible");
// for (let i = 0; i < coll.length; i++) {
//     coll[i].addEventListener("click", function() {
//         console.log(this);
//         this.classList.toggle("active");
//         var content = this.nextElementSibling;
//         if (content.style.maxHeight){
//             content.style.maxHeight = null;
//         } else {
//             content.style.maxHeight = content.scrollHeight + "px";
//         }
//     });
// }
