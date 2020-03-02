
function get3arrays(randFunc, N, seed){
    let randArr = randFunc(N, seed)
    let expArr = expectation(randArr)
    let dispArr = dispersion(randArr, expArr)
    let stdDevArr = dispArr.map(item => Math.sqrt(item))
    return {avg: expArr, disp: dispArr, stdDev: stdDevArr }
}

const builtInColor = "rgba(120, 120, 255, 1)"
const linCongColor = "rgba(255, 120, 120, 1)"
const fiboColor = "rgba(240, 240, 120, 1)"

function main(event){
    event.preventDefault()

    const N = oneForm.value
    const seed = 32766
    let Xarr = simpleArray(N)
    let builtInResults = get3arrays(mathRandArray, N, 2)
    let LinCongResults = get3arrays(linearCongruent, N, seed)
    let FibResults = get3arrays(Fibonacci, N, seed)

    let expObj = document.getElementById("avg")
    const XYCLsForExp = [
        {X: Xarr, Y: builtInResults.avg, color: builtInColor, lines: true},
        {X: Xarr, Y: LinCongResults.avg, color: linCongColor, lines: true},
        {X: Xarr, Y: FibResults.avg, color: fiboColor, lines: true},
    ]
    expObj.drawGraph(XYCLsForExp, 0, 1)

    let dispObj = document.getElementById("disp")
    const XYCLsForDisp = [
        {X: Xarr, Y: builtInResults.disp, color: builtInColor, lines: true},
        {X: Xarr, Y: LinCongResults.disp, color: linCongColor, lines: true},
        {X: Xarr, Y: FibResults.disp, color: fiboColor, lines: true},
    ]
    dispObj.drawGraph(XYCLsForDisp, 0, 1)

    let stdDevObj = document.getElementById("stdDev")
    const XYCLsForStdDev = [
        {X: Xarr, Y: builtInResults.stdDev, color: builtInColor, lines: true},
        {X: Xarr, Y: LinCongResults.stdDev, color: linCongColor, lines: true},
        {X: Xarr, Y: FibResults.stdDev, color: fiboColor, lines: true},
    ]
    stdDevObj.drawGraph(XYCLsForStdDev, 0, 1)

}
