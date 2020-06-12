function core_of(mpvdn, continue_condition, foo) {
    const collisions = createCollisions(mpvdn);
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
        for (let i = 0; i < mpvdn.Nparticles; i++) {
            mpvdn.positions[i] += mpvdn.velocities[i] * time.before_collision;
        }
        updateVelocities(mpvdn, soon);
        updateCollisions(mpvdn, collisions, soon);
    }
}

function gett0(mpvdn) {
    let t = {t: 0.1}
    core_of(mpvdn,
        ()   => mpvdn.velocities[mpvdn.Nparticles - 1] == 0,
        time => t.t = time)

    return t.t.of_previous_collision;
}

function prepareanimation(mpvdn, dt, when_stop) {
    const positionsHistory = [];
    core_of(mpvdn, 
        time => time.of_previous_collision < when_stop, 
        time => writeHistory(mpvdn, time, positionsHistory, dt))
    return positionsHistory;
}

function energy(mpvdn, when_stop, deltaT) {

    let e0 = [];
    let e1 = [];
    let tt = [];

    let rem = {i: 0,
        t: 0, 
        E0: 0, 
        E1: 0,
    }
core_of(mpvdn, 
    time => time.of_previous_collision < when_stop,
    time => {
        if (rem.t + time.before_collision >= deltaT) {
            rem.t = rem.t + time.before_collision - deltaT;
            e0.push((rem.E0 + (time.before_collision - rem.t) * mpvdn.velocities[0]**2) * mpvdn.masses[0] / 2 / deltaT);
            e1.push((rem.E1 + (time.before_collision - rem.t) * mpvdn.velocities[1]**2) * mpvdn.masses[1] / 2 / deltaT);
            tt.push(rem.i++ * deltaT + deltaT/2)
            while(rem.t - deltaT >= 0){
                rem.t -= deltaT
                e0.push(mpvdn.velocities[0] ** 2 * mpvdn.masses[0] / 2 / deltaT)
                e1.push(mpvdn.velocities[1] ** 2 * mpvdn.masses[1] / 2 / deltaT)
                tt.push(rem.i++ * deltaT + deltaT/2)
            }
            rem.E0 = rem.t * mpvdn.velocities[0] ** 2
            rem.E1 = rem.t * mpvdn.velocities[1] ** 2
        }
        else {
            rem.t  += time.before_collision;
            rem.E0 += time.before_collision * mpvdn.velocities[0] ** 2
            rem.E1 += time.before_collision * mpvdn.velocities[1] ** 2
        }
    })

    return { t: tt, e1: e0, e2: e1 };
}
