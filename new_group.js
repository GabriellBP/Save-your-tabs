/* configure collapsible */
let coll = document.getElementsByClassName("collapsible");
for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

chrome.windows.getAll({populate:true}, windows => {
    for (let i = 0; i < windows.length; i++) {
        // todo: construct the html of windows
        for (let j = 0; j < windows[i].tabs.length; j++) console.log('oi')
            // todo: construct the html of tabs
    }
});

