const fst = document.querySelector("graph-element")
let N = 25
let Yarr = simulate(N, 0.4, 0.5)
let Xarr = simpleArray(N)
fst.drawGraph(Xarr, Yarr, 1, 0)
