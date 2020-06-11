function gett0(positions, velocities, masses, diameter) {
    const Nparticles = masses.length
    let t = {t: 0.1}
    core_of(positions, velocities, masses, diameter,
        ()   => velocities[Nparticles - 1] == 0,
        time => t.t = time.of_previous_collision)

    return t.t;
}

function prepareanimation(positions, velocities, masses, dt, diameter, when_stop) {
    const positionsHistory = [];
    core_of(positions, velocities, masses, diameter, 
        time => time.of_previous_collision < when_stop, 
        time => writeHistory(time, positions, velocities, positionsHistory, dt))
    return positionsHistory;
}

function core_of(positions, velocities, masses, diameter, continue_condition, foo) {
    const Nparticles = masses.length;
    const collisions = createCollisions(positions, velocities, diameter);
    let time = {
        before_collision: 0,
        of_frame: 0,
        of_previous_collision: 0,
    };
    //Мб есть разрыв, когда я запущу время в обратную сторону
    while (continue_condition(time)) {
        let soon = findSoonestCollisions(collisions);
        time.before_collision = collisions[soon[0]];
        foo(time)
        time.of_previous_collision += time.before_collision
        for (let i = 0; i < Nparticles; i++) {
            positions[i] += velocities[i] * time.before_collision;
        }
        updateVelocities(masses, velocities, soon);
        updateCollisions(positions, velocities, collisions, soon, diameter);
    }
}

function energy(positions, velocities, masses, diameter, when_stop, deltaT) {
    const Nparticles = masses.length;
    const collisions = createCollisions(positions, velocities, diameter);
    //const N = Math.round(when_stop / deltaT)
    let e0 = [];
    let e1 = [];
    let tt = [];
    let time = {
        before_collision: 0,
        of_previous_collision: 0,
    };
    let i = 0;
    let remT = 0;
    let remE0 = 0;
    let remE1 = 0;
    while (time.of_previous_collision < when_stop) {
        let soon = findSoonestCollisions(collisions);
        time.before_collision = collisions[soon[0]];

        if (remT + time.before_collision >= deltaT) {
            remT = remT + time.before_collision - deltaT;
            e0.push((remE0 + (time.before_collision - remT) * Math.pow(velocities[0], 2)) * masses[0] / 2 / deltaT);
            e1.push((remE1 + (time.before_collision - remT) * Math.pow(velocities[1], 2)) * masses[1] / 2 / deltaT);
            tt.push(i++ * deltaT + deltaT/2)
            while(remT - deltaT >= 0){
                remT -= deltaT
                e0.push(velocities[0] ** 2 * masses[0] / 2 / deltaT)
                e1.push(velocities[1] ** 2 * masses[1] / 2 / deltaT)
                tt.push(i++ * deltaT + deltaT/2)
            }
            remE0 = remT * velocities[0] ** 2
            remE1 = remT * velocities[1] ** 2
        }
        else {
            remT += time.before_collision;
            remE0 += time.before_collision * Math.pow(velocities[0], 2);
            remE1 += time.before_collision * Math.pow(velocities[1], 2);
        }
        for (let i = 0; i < Nparticles; i++) {
            positions[i] += velocities[i] * time.before_collision;
        }
        time.of_previous_collision += time.before_collision;
        updateVelocities(masses, velocities, soon);
        updateCollisions(positions, velocities, collisions, soon, diameter);
    }
    return { t: tt, e1: e0, e2: e1 };
}

// function energy(positions, velocities, masses, diameter, when_stop, deltaT) {

//     let e0 = [];
//     let e1 = [];
//     let tt = [];

//     let rem = {i: 0,
//         t: 0, 
//         E0: 0, 
//         E1: 0,
//     }
// core_of(positions, velocities, masses, diameter, 
//     time => time.of_previous_collision < when_stop,
//     time => {
//         if (rem.t + time.before_collision >= deltaT) {
//             rem.t = rem.t + time.before_collision - deltaT;
//             e0.push((rem.E0 + (time.before_collision - rem.t) * velocities[0]**2) * masses[0] / 2 / deltaT);
//             e1.push((rem.E1 + (time.before_collision - rem.t) * velocities[1]**2) * masses[1] / 2 / deltaT);
//             tt.push(rem.i++ * deltaT + deltaT/2)
//             while(rem.t - deltaT >= 0){
//                 rem.t -= deltaT
//                 e0.push(velocities[0] ** 2 * masses[0] / 2 / deltaT)
//                 e1.push(velocities[1] ** 2 * masses[1] / 2 / deltaT)
//                 tt.push(rem.i++ * deltaT + deltaT/2)
//             }
//             rem.E0 = rem.t * velocities[0] ** 2
//             rem.E1 = rem.t * velocities[1] ** 2
//         }
//         else {
//             rem.t += time.before_collision;
//             rem.E0 += time.before_collision * velocities[0] ** 2
//             rem.E1 += time.before_collision * velocities[1] ** 2
//         }
//     })

//     return { t: tt, e1: e0, e2: e1 };
// }
