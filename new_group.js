// references to html elements
let contentBody = document.getElementsByClassName("content-body")[0];

chrome.windows.getAll({populate:true}, windows => {
    for (let x = 0; x < windows.length; x++) {
        let button = constructCollapsibleButton("Window "+ (x+1));
        contentBody.appendChild(button);
        let newWindow = document.createElement("div");
        newWindow.classList.add("window");
        for (let z = 0; z < windows[x].tabs.length; z++) {
            let tab = constructTabList(windows[x].tabs[z]);
            newWindow.appendChild(tab);
        }
        contentBody.appendChild(newWindow)
    }
});

function constructCollapsibleButton(name) {
    // creating collapsible button
    let collapsibleButton = document.createElement("button");
    collapsibleButton.classList.add("collapsible");

    // adding collapsible behaviour
    collapsibleButton.addEventListener("click", function() {
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

function constructTabList(tab) {
    // creating tab div
    let tabHtml = document.createElement("div");
    tabHtml.classList.add("tab", "group");

    // creating checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "tabCheckbox";
    checkbox.id = name.replace(/ /g, '');

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
