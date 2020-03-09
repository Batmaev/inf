const Acolor = "rgb(120, 120, 255)"
const Bcolor = "rgb(255, 120, 120)"
const TotalColor = "rgb(235, 235, 235)"

function main(event){
    event.preventDefault()
    const Aparticles = Number(document.forms.one.Aparticles.value)
    const Bparticles = Number(document.forms.one.Bparticles.value)
    const P_A = Number(document.forms.one["P(A)"].value)
    const P_B = Number(document.forms.one["P(B)"].value)
    const AtoB = Number(document.forms.one["A->B"].value)
    const BtoA = Number(document.forms.one["B->A"].value)
    const Nsteps = Number(document.forms.one.Nsteps.value)

    let Xarr = simpleArray(Nsteps)

    let Aarr = new Array(Nsteps)
    let Barr = new Array(Nsteps)

    Aarr[0] = Aparticles
    Barr[0] = Bparticles

    for(let k = 1; k < Nsteps; ++k){
        Aresults = simulate(Aarr[k - 1], P_A, AtoB)
        Bresults = simulate(Barr[k - 1], P_B, BtoA)

        Aarr[k] = Aarr[k - 1] - Aresults.Changed - Aresults.Disappeared + Bresults.Changed
        Barr[k] = Barr[k - 1] - Bresults.Changed - Bresults.Disappeared + Aresults.Changed
    }

    let n_x_Obj = document.getElementById("n(x)")
    const XYCLsForN_X = [
        {X: Xarr, Y: Aarr, color: Acolor, lines: true},
        {X: Xarr, Y: Barr, color: Bcolor, lines: true},
    ]
    n_x_Obj.drawGraph(XYCLsForN_X, 0)
}
