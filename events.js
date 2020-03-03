const oneForm = document.forms.one
oneForm.addEventListener("submit", main.bind(this))
oneForm.Nsteps.value = Math.floor(document.getElementById("avg").querySelector("canvas").getBoundingClientRect().width / 2)

oneForm.addEventListener("keypress", event => {
    if(event.keyCode == 13){
        oneForm.dispatchEvent(new Event("submit"))
    }
})

function setTime(event){
    event.preventDefault()
    oneForm.seed.value = (new Date()).getTime() % 4294967296
    oneForm.dispatchEvent(new Event("submit"))
}