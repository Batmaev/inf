const oneForm = document.forms.one
oneForm.addEventListener("submit", main.bind(this))

oneForm.addEventListener("keypress", event => {
    if(event.keyCode == 13){
        oneForm.dispatchEvent(new Event("submit", {cancelable: true}))
    }
})