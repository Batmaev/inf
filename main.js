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

    let n_x_Obj = document.getElementById("n(x)")
    const XYCLsForN_X = [
        {X: Xarr, Y: builtInResults, color: builtInColor, lines: true},
        {X: Xarr, Y: LinCongResults, color: linCongColor, lines: true},
        {X: Xarr, Y: FibResults, color: fiboColor, lines: true},
    ]
    n_x_Obj.drawGraph(XYCLsForN_X, 0, Nparticles)

    const nStepsPerColumn = 25
    let derObj = document.getElementById("der")
    const XYCLsForDer = [
        {X: Xarr, Y: derivative(builtInResults, nStepsPerColumn), color: builtInColor, lines: true},
        {X: Xarr, Y: derivative(LinCongResults, nStepsPerColumn), color: linCongColor, lines: true},
        {X: Xarr, Y: derivative(FibResults, nStepsPerColumn), color: fiboColor, lines: true},
    ]
    derObj.drawGraph(XYCLsForDer)
}
