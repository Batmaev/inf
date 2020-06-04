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
function energy(positions, velocities, masses, diameter) {
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
