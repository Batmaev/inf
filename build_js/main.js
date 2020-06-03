function main_for_anime() {
    var an = document.getElementById("anime");
    while (an.firstChild) {
        an.removeChild(an.firstChild);
    }
    var diameter = Number(document.forms.gen.diameter.value);
    var Nparticles = 10;
    var masses = new Array(Nparticles); //(Nparticles + 2) //Лишние 2 частицы - это стенки, [-1] и [Nparticles]
    for (var i = 0; i < Nparticles; i++) {
        masses[i] = i % 2 ? 4 : 1;
    }
    var positions = new Array(Nparticles + 1); //В момент времени сразу после столкновения
    var totalLength = an.getBoundingClientRect().width;
    if (totalLength <= Nparticles * diameter) {
        alert("Шарики не помещаются");
        return false;
    }
    var between = (totalLength + diameter) / (Nparticles + 1);
    for (var i = -1; i < positions.length; i++) {
        positions[i] = (i + 1) * between - diameter / 2;
    }
    var velocities = new Array(Nparticles + 1);
    for (var i = -1; i < velocities.length; i++) {
        velocities[i] = 0;
    }
    velocities[0] = Number(document.forms.gen.v_1.value);
    var dt = 1000 / Number(document.forms.animef.playrate.value);
    var positionsHistory = simulate(positions, velocities, masses, dt, diameter, function (now, t0) { return !(now > t0 * Number(document.forms.animef.t_k_t.value)); });
    // for(let i = 0; i < velocities.length; i++){
    //     velocities[i] *= -1
    // }
    // positionsHistory = simulate(positions, velocities, masses, dt, diameter, (now, t0) => !(now > 9 * t0))
    anime(positionsHistory, masses, diameter, dt);
    // let Xarr = simpleArray(Nsteps)
    // let Aarr = new Array(Nsteps)
    // let Barr = new Array(Nsteps)
    // Aarr[0] = Aparticles
    // Barr[0] = Bparticles
    // for(let k = 1; k < Nsteps; ++k){
    //     Aresults = simulate(Aarr[k - 1], P_A, AtoB)
    //     Bresults = simulate(Barr[k - 1], P_B, BtoA)
    //     Aarr[k] = Aarr[k - 1] - Aresults.Changed - Aresults.Disappeared + Bresults.Changed
    //     Barr[k] = Barr[k - 1] - Bresults.Changed - Bresults.Disappeared + Aresults.Changed
    // }
    // let n_x_Obj = document.getElementById("n(x)")
    // n_x_Obj.clear()
    // const XYCLsForN_X = [
    //     {X: Xarr, Y: Aarr, color: Acolor, lines: true},
    //     {X: Xarr, Y: Barr, color: Bcolor, lines: true},
    // ]
    // n_x_Obj.drawGraph(XYCLsForN_X, 0)
}
