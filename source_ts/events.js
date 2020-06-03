// import { main_for_anime } from "./main"

//alert("l")

// const oneForm = document.forms.one
// oneForm.addEventListener("submit", main.bind(this))

// oneForm.addEventListener("keypress", event => {
//     if(event.keyCode == 13){
//         oneForm.dispatchEvent(new Event("submit", {cancelable: true}))
//     }
// })

document.getElementById("TotalLength").innerText = Math.round(document.getElementById("anime").getBoundingClientRect().width)

//document.getElementById("anime-butt").onclick = main_for_anime