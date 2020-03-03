const oneForm = document.forms.one
oneForm.addEventListener("submit", main.bind(this))
oneForm.N.value = Math.floor(document.getElementById("avg").querySelector("canvas").getBoundingClientRect().width / 2)