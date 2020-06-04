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
function simulate(positions, velocities, masses, dt, diameter, continue_condition) {
    const Nparticles = masses.length;
    const collisions = createCollisions(positions, velocities, diameter);
    const positionsHistory = [];
    positionsHistory[0] = positions.slice(0, -1);
    let time = {
        before_collision: 0,
        of_frame: 0,
        of_previous_collision: 0,
    };
    let t0 = undefined; //время, когда НЕ последний шарик начнёт двигаться
    //Мб есть разрыв, когда я запущу время в обратную сторону
    while (continue_condition(time.of_frame)) {
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
function updateVelocities(masses, velocities, happened) {
    const Nparticles = masses.length;
    happened.forEach(i => {
        if (i === 0) {
            velocities[0] *= -1;
        }
        else if (i === Nparticles) {
            velocities[i - 1] *= -1;
        }
        else {
            let v1 = velocities[i - 1];
            let v2 = velocities[i];
            velocities[i - 1] = ((masses[i - 1] - masses[i]) * v1 + 2 * masses[i] * v2) / (masses[i - 1] + masses[i]);
            velocities[i] = ((masses[i] - masses[i - 1]) * v2 + 2 * masses[i - 1] * v1) / (masses[i - 1] + masses[i]);
        }
    });
}
function writeHistory(time, positions, velocities, positionsHistory, dt) {
    if (time.of_frame + dt < time.of_previous_collision + time.before_collision) {
        time.of_frame += dt;
        positionsHistory.push(positions.map((value, i) => value + (time.of_frame - time.of_previous_collision) * velocities[i])
            .slice(0, -1)); //В positionsHistory не храним историю стенок
    }
    while (time.of_frame + dt < time.of_previous_collision + time.before_collision) {
        time.of_frame += dt;
        positionsHistory.push(positionsHistory[positionsHistory.length - 1].map((value, i) => value + dt * velocities[i]));
    }
    time.of_previous_collision += time.before_collision;
}
function createCollisions(positions, velocities, diameter) {
    const Nparticles = positions.length - 1;
    const collisions = new Array(Nparticles + 1);
    for (let i = 0; i < collisions.length; i++) {
        collisions[i] = calculateCollision(positions, velocities, diameter, i);
    }
    console.log(`collisions: ${collisions}`);
    return collisions;
}
function calculateCollision(positions, velocities, diameter, i) {
    if (velocities[i - 1] - velocities[i] > 0) {
        return (positions[i] - positions[i - 1] - diameter) / (velocities[i - 1] - velocities[i]);
    }
    else {
        return -2020;
    }
}
function updateCollisions(positions, velocities, collisions, happened, diameter) {
    const deltaT = collisions[happened[0]];
    for (let i = 0; i < collisions.length; i++) {
        collisions[i] -= deltaT;
    }
    happened.forEach(i => {
        collisions[i] = calculateCollision(positions, velocities, diameter, i);
        if (i !== 0) {
            collisions[i - 1] = calculateCollision(positions, velocities, diameter, i - 1);
        }
        if (i + 1 != collisions.length) {
            collisions[i + 1] = calculateCollision(positions, velocities, diameter, i + 1);
        }
    });
    console.log(`collisions: ${collisions}`);
}
// function simpleArray(N){
//     let array = new Array(N)
//     for(let k = 0; k < N; ++k){
//         array[k] = k + 1;
//     }
//     return array
// }
function findSoonestCollisions(collisions) {
    let ans = [];
    let min_time = NaN;
    let cur;
    for (let i = 0; i < collisions.length; i++) {
        cur = collisions[i];
        if (cur > 0) {
            if (!(cur >= min_time)) { // true если min_time = NaN
                min_time = cur;
                ans = [i];
            }
            else if (cur === min_time) {
                if (i === ans[-1] + 1) {
                    alert("triple collision: возможна ошибка");
                }
                ans.push(i);
            }
        }
    }
    console.log(`collisions[${ans[0]}] = ${collisions[ans[0]]}`);
    return ans;
}
