const SingleRform = document.forms.singleR
SingleRform.addEventListener("submit", simulationFor1R.bind(this))

const functionalForm = document.forms.functional.func
functionalForm[0].addEventListener("change", function(event){ simulate = parabolic })
functionalForm[1].addEventListener("change", function(event){ simulate = exponential })

const noiseForm = document.forms.noise
noiseForm.addEventListener("submit", function(event){
    event.preventDefault()
    noise_level = Number(noiseForm.noise.value)
})

const multipleRs = document.forms.multipleRs
multipleRs.addEventListener("submit", bifurkation.bind(this))
multipleRs.N.value = Math.floor(document.getElementById("bifurk").querySelector("canvas").getBoundingClientRect().width)