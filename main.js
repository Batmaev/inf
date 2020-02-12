
function main(event){
    event.preventDefault()
    let N = Number(SingleRform.N.value)
    let r = Number(SingleRform.r.value)
    let x0 = Number(SingleRform.x0.value)
    let diff = 0.1

    const x_n_obj = document.getElementById("x_n")
    let Yarr = simulate(N, r, x0)
    let Xarr = simpleArray(N)
    x_n_obj.drawGraph({X: Xarr, Y: Yarr}, 1, 0, true)

    const bifurk_obj = document.getElementById("bifurk")
    let XYPair = steadyState(100, 0.6, 1, 0.5)
    bifurk_obj.drawGraph(XYPair, 1, 0, false)

    const err_obj = document.getElementById("err")
    let Yarr2 = simulate(N, r, x0 + diff)
    let Yarr3 = Yarr.map((value, index) => Math.abs(value - Yarr2[index])/value)
    err_obj.drawGraph({X: Xarr, Y:Yarr3}, undefined, 0, true)
}
