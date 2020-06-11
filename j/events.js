document.getElementById("TotalLength").innerText = Math.round(document.getElementById("anime").getBoundingClientRect().width).toString();

for (let form of document.forms){
    for (let field of form.querySelectorAll("input[type=text]")){
        field.addEventListener("keydown", event => {
            if(event.key === "Enter"){
                form.parentElement.querySelector("button").dispatchEvent(new Event("click"))
            }
        })
    }
}