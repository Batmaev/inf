
function get3arrays(randFunc, N, seed){
    let randArr = randFunc(N, seed)
    let expArr = expectation(randArr)
    let dispArr = dispersion(randArr, expArr)
    let stdDevArr = dispArr.map(item => Math.sqrt(item))
    return {avg: expArr, disp: dispArr, stdDev: stdDevArr }
}

function main(event){
    event.preventDefault()

    const builtInColor = "rgba(120, 120, 255, 1)"
    const linCongColor = "rgba(255, 120, 120, 1)"

    const N = 700
    const seed = 32766
    let Xarr = simpleArray(N)
    let builtInResults = get3arrays(mathRandArray, N, 2)
    let LinCongResults = get3arrays(linearCongruent, N, seed)

    let expObj = document.getElementById("avg")
    const XYCLsForExp = [
        {X: Xarr, Y: builtInResults.avg, color: builtInColor, lines: true},
        {X: Xarr, Y: LinCongResults.avg, color: linCongColor, lines: true},
    ]
    expObj.drawGraph(XYCLsForExp, 0, 1)

    let dispObj = document.getElementById("disp")
    const XYCLsForDisp = [
        {X: Xarr, Y: builtInResults.disp, color: builtInColor, lines: true},
        {X: Xarr, Y: LinCongResults.disp, color: linCongColor, lines: true},
    ]
    dispObj.drawGraph(XYCLsForDisp, 0, 1)

    let stdDevObj = document.getElementById("stdDev")
    const XYCLsForStdDev = [
        {X: Xarr, Y: builtInResults.stdDev, color: builtInColor, lines: true},
        {X: Xarr, Y: LinCongResults.stdDev, color: linCongColor, lines: true},
    ]
    stdDevObj.drawGraph(XYCLsForStdDev, 0, 1)

}

// function simulationFor1R(event){
//     event.preventDefault()
//     let N = Number(SingleRform.N.value)
//     let r = Number(SingleRform.r.value)
//     let x0 = Number(SingleRform.x0.value)
//     let diff = 0.1

//     const x_n_obj = document.getElementById("x_n")
//     let Yarr = simulate(N, r, x0)
//     let Xarr = simpleArray(N)
//     x_n_obj.drawGraph({X: Xarr, Y: Yarr}, true, 0, 1)

//     const err_obj = document.getElementById("err")
//     let Yarr2 = simulate(N, r, x0 + diff)
//     let Yarr3 = Yarr.map((value, index) => Math.abs(value - Yarr2[index])/value)
//     err_obj.drawGraph({X: Xarr, Y:Yarr3}, true, 0)
// }

// function bifurkation(event){
//     event.preventDefault()
//     let N = Number(multipleRs.N.value)
//     let R_min = Number(multipleRs.R_min.value)
//     let R_max = Number(multipleRs.R_max.value)
//     let x0 = Number(multipleRs.x0.value)
    
//     const bifurk_obj = document.getElementById("bifurk")
//     let XYPair = steadyState(N, R_min, R_max, x0)
//     bifurk_obj.drawGraph(XYPair, false, 0, 1)
// }
