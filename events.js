const oneForm = document.forms.one
oneForm.addEventListener("submit", main.bind(this))
oneForm.N.value = Math.floor(document.getElementById("avg").querySelector("canvas").getBoundingClientRect().width / 2)

function setTime(){
    oneForm.seed.value = (new Date()).getTime() % 4294967296
    oneForm.dispatchEvent(new Event("submit", {cancelable: true}))
}