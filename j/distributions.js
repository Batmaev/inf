function distributions(mpvdn, v0, Nintervals, t0, Ndots) {

    v0 = Math.abs(v0)
    const deltaV = 2 * Math.sqrt(mpvdn.masses[0]) * v0 / Nintervals
    const deltaE = mpvdn.masses[0] * v0 ** 2 / 2 / Nintervals
    
    let vx = []
    let ex = []
    for(let y = 0; y < Nintervals; y++){
        vx[y] = y * deltaV - v0 + deltaV/2
        ex[y] = y * deltaE + deltaE/2
    }

    function getEinterval(e){
        return Math.floor(e / deltaE)
    }
    function getVinterval(v){
        return Math.floor((v + v0) / deltaV)
    }

    const collisions = createCollisions(mpvdn);

    const m1 = 1
    const m2 = 4

    let m1l = []
    let m2l = []

    mpvdn.masses.forEach((value, i) => {
        if(value === m1) m1l.push(i)
        else m2l.push(i)
    })

    let v1 = vx.map(() => 0)
    let v2 = vx.map(() => 0)
    let e1 = ex.map(() => 0)
    let e2 = ex.map(() => 0)


    let time = {
        before_collision: 0,
        of_previous_collision: 0,
    };

    let k = 0
    for (; k < Ndots / m1l.length; k++) {
        m1l.forEach(i => {
            e1[getEinterval(m1 * mpvdn.velocities[i] ** 2 / 2)]++; 
            v1[getVinterval(mpvdn.velocities[i])]++

        })
        m2l.forEach(i => {
            e2[getEinterval(m2 * mpvdn.velocities[i] ** 2 / 2)]++
            v2[getVinterval(mpvdn.velocities[i])]++
        })

        while (time.of_previous_collision <= t0) {
            let soon = findSoonestCollisions(collisions);
            time.before_collision = collisions[soon[0]];

            for (let i = 0; i < mpvdn.Nparticles; i++) {
                mpvdn.positions[i] += mpvdn.velocities[i] * time.before_collision;
            }

            time.of_previous_collision += time.before_collision;
            updateVelocities(mpvdn, soon);
            updateCollisions(mpvdn, collisions, soon);
        }

        time.of_previous_collision = 0
    }

return {v1: v1.map(v => v / k / m1l.length / deltaV), 
    v2: v2.map(v => v / k / m2l.length / deltaV), 
    vx: vx,
    e1: e1.map(e => e / k / m1l.length / deltaE), 
    e2: e2.map(e => e / k / m2l.length / deltaE), 
    ex: ex}
}

function theory(masses, v0, vx, ex){
    const Eav = masses[0] * v0 ** 2 / 2 / masses.length
    const A = 1 / 2 / Eav
    const m1 = masses[0]
    const m2 = masses[1]
    return {
        e : ex.map(e => A * Math.exp(-e / 2/Eav)),
        v1: vx.map(v => A * m1 * Math.abs(v) * Math.exp(- m1 * v ** 2 / 4 / Eav)),
        v2: vx.map(v => A * m2 * Math.abs(v) * Math.exp(- m2 * v ** 2 / 4 / Eav))
    }
}