const fst = document.querySelector("graph-element")
let N = 25
let Xarr = simulate(N, 0.5, 0.5)
let Yarr = Xarr
fst.drawGraph(Xarr, Yarr)
