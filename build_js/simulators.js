function gett0(positions, velocities, masses, diameter) {
    const Nparticles = masses.length;
    const collisions = createCollisions(positions, velocities, diameter);
    let time = {
        before_collision: 0,
        of_previous_collision: 0,
    };
    while (velocities[Nparticles - 1] === 0) {
        let soon = findSoonestCollisions(collisions);
        time.before_collision = collisions[soon[0]];
        for (let i = 0; i < Nparticles; i++) {
            positions[i] += velocities[i] * time.before_collision;
        }
        time.of_previous_collision += time.before_collision;
        updateVelocities(masses, velocities, soon);
        updateCollisions(positions, velocities, collisions, soon, diameter);
    }
    return time.of_previous_collision;
}
function simulate(positions, velocities, masses, dt, diameter, when_stop) {
    const Nparticles = masses.length;
    const collisions = createCollisions(positions, velocities, diameter);
    const positionsHistory = [];
    positionsHistory[0] = positions.slice(0, -1);
    let time = {
        before_collision: 0,
        of_frame: 0,
        of_previous_collision: 0,
    };
    //Мб есть разрыв, когда я запущу время в обратную сторону
    while (time.of_frame < when_stop) {
        if (collisions[0] === NaN) {
            break;
        }
        console.log(`positions : ${positions}`);
        console.log(`velocities : ${velocities}`);
        let soon = findSoonestCollisions(collisions);
        time.before_collision = collisions[soon[0]];
        writeHistory(time, positions, velocities, positionsHistory, dt);
        for (let i = 0; i < Nparticles; i++) {
            positions[i] += velocities[i] * time.before_collision;
        }
        updateVelocities(masses, velocities, soon);
        updateCollisions(positions, velocities, collisions, soon, diameter);
    }
    return positionsHistory;
}
function energy(positions, velocities, masses, diameter, when_stop) {
    const Nparticles = masses.length;
    const collisions = createCollisions(positions, velocities, diameter);
    const m1 = 1;
    const m2 = 4;
    let m1l = [];
    let m2l = [];
    masses.forEach((value, i) => {
        if (value === m1)
            m1l.push(i);
        else
            m2l.push(i);
    });
    console.log(m1l);
    let e1 = [];
    let e2 = [];
    let tt = [];
    let time = {
        before_collision: 0,
        of_previous_collision: 0,
    };
    while (time.of_previous_collision < when_stop) {
        let soon = findSoonestCollisions(collisions);
        time.before_collision = collisions[soon[0]];
        for (let i = 0; i < Nparticles; i++) {
            positions[i] += velocities[i] * time.before_collision;
        }
        e1.push(m1 * m1l.reduce((acc, i) => acc + Math.pow(velocities[i], 2)) / Nparticles);
        e2.push(m2l.reduce((acc, i) => acc + Math.pow(velocities[i], 2)) / Nparticles);
        tt.push(time.of_previous_collision);
        time.of_previous_collision += time.before_collision;
        updateVelocities(masses, velocities, soon);
        updateCollisions(positions, velocities, collisions, soon, diameter);
    }
    console.log(velocities);
    console.log(e1);
    return { t: tt, e1: e1, e2: e2 };
}
