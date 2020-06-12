function updateVelocities(mpvdn, happened) {
    const masses = mpvdn.masses
    const velocities = mpvdn.velocities

    happened.forEach(i => {
        if (i === 0) {
            velocities[0] *= -1;
        }
        else if (i === mpvdn.Nparticles) {
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

function writeHistory(mpvdn, time, positionsHistory, dt) {
    const positions = mpvdn.positions
    const velocities = mpvdn.velocities

    if (time.of_frame + dt < time.of_previous_collision + time.before_collision) {
        time.of_frame += dt;
        positionsHistory.push(positions.map((value, i) => value + (time.of_frame - time.of_previous_collision) * velocities[i])
            .slice(0, -1)); //В positionsHistory не храним историю стенок
    }

    while (time.of_frame + dt < time.of_previous_collision + time.before_collision) {
        time.of_frame += dt;
        positionsHistory.push(positionsHistory[positionsHistory.length - 1].map((value, i) => value + dt * velocities[i]));
    }
}

function createCollisions(mpvdn) {
    const collisions = new Array(mpvdn.Nparticles + 1);
    for (let i = 0; i < collisions.length; i++) {
        collisions[i] = calculateCollision(mpvdn, i);
    }
    return collisions;
}

function calculateCollision(mpvdn, i) {
    const positions = mpvdn.positions
    const velocities = mpvdn.velocities
    const diameter = mpvdn.diameter
    if (velocities[i - 1] - velocities[i] > 0) {
        return (positions[i] - positions[i - 1] - diameter) / (velocities[i - 1] - velocities[i]);
    }
    else {
        return -2020;
    }
}

function updateCollisions(mpvdn, collisions, happened) {
    const deltaT = collisions[happened[0]];
    for (let i = 0; i < collisions.length; i++) {
        collisions[i] -= deltaT;
    }
    
    happened.forEach(i => {
        collisions[i] = calculateCollision(mpvdn, i);
        if (i !== 0) {
            collisions[i - 1] = calculateCollision(mpvdn, i - 1);
        }
        if (i + 1 != collisions.length) {
            collisions[i + 1] = calculateCollision(mpvdn, i + 1);
        }
    });
}

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
    return ans;
}
