function distributions(positions, velocities, masses, diameter, v0, Nintervals, t0, Ndots) {

    v0 = Math.abs(v0)
    const deltaV = 2 * Math.sqrt(masses[0]) * v0 / Nintervals
    const deltaE = masses[0] * v0 ** 2 / 2 / Nintervals
    
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

    const Nparticles = masses.length;
    const collisions = createCollisions(positions, velocities, diameter);

    const m1 = 1
    const m2 = 4

    let m1l = []
    let m2l = []

    masses.forEach((value, i) => {
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
            e1[getEinterval(m1 * velocities[i] ** 2 / 2)]++; 
            v1[getVinterval(velocities[i])]++

        })
        m2l.forEach(i => {
            e2[getEinterval(m2 * velocities[i] ** 2 / 2)]++
            v2[getVinterval(velocities[i])]++
        })

        while (time.of_previous_collision <= t0) {
            let soon = findSoonestCollisions(collisions);
            time.before_collision = collisions[soon[0]];
            for (let i = 0; i < Nparticles; i++) {
                positions[i] += velocities[i] * time.before_collision;
            }
            time.of_previous_collision += time.before_collision;
            updateVelocities(masses, velocities, soon);
            updateCollisions(positions, velocities, collisions, soon, diameter);
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