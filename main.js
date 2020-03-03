const builtInColor = "rgba(120, 120, 255, 1)"
const linCongColor = "rgba(255, 120, 120, 1)"
const fiboColor = "rgba(240, 240, 120, 1)"

function main(event){
    event.preventDefault()
    const Nparticles = Number(document.forms.one.Nparticles.value)
    const probabilityDisappear = Number(document.forms.one.W.value)
    const Nsteps = Number(document.forms.one.Nsteps.value)
    const seed = Number(document.forms.one.seed.value)

    let Xarr = simpleArray(Nsteps)
    let builtInResults = simulate(Nparticles, probabilityDisappear, Nsteps, mathRandArray, seed)
    let LinCongResults = simulate(Nparticles, probabilityDisappear, Nsteps, linearCongruent, seed)
    let FibResults = simulate(Nparticles, probabilityDisappear, Nsteps, Fibonacci, seed)

    let expObj = document.getElementById("avg")
    const XYCLsForExp = [
        {X: Xarr, Y: builtInResults, color: builtInColor, lines: true},
        {X: Xarr, Y: LinCongResults, color: linCongColor, lines: true},
        {X: Xarr, Y: FibResults, color: fiboColor, lines: true},
    ]
    expObj.drawGraph(XYCLsForExp, 0, Nparticles)
}
