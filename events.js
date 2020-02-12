const SingleRform = document.forms.singleR
SingleRform.addEventListener("submit", main.bind(this))

const functionalForm = document.forms.functional.func
functionalForm[0].addEventListener("change", function(event){ simulate = parabolic })
functionalForm[1].addEventListener("change", function(event){ simulate = exponential })

const noiseForm = document.forms.noise
noiseForm.addEventListener("submit", function(event){
    event.preventDefault()
    noise_level = Number(noiseForm.noise.value)
})


function changeFunction(event){
    //event.preventDefault()
    alert(0)
}


