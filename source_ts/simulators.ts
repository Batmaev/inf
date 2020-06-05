function gett0(positions: number[], velocities: number[], masses: number[], diameter: number){

    const Nparticles = masses.length
    const collisions = createCollisions(positions, velocities, diameter)

    let time ={
        before_collision : 0,
        of_previous_collision : 0,
    };

    while(velocities[Nparticles - 1] === 0){
        let soon = findSoonestCollisions(collisions)
        time.before_collision = collisions[soon[0]]

        for(let i = 0; i < Nparticles; i++){
            positions[i] += velocities[i] * time.before_collision
        }

        time.of_previous_collision += time.before_collision

        updateVelocities(masses, velocities, soon)
        updateCollisions(positions, velocities, collisions, soon, diameter)
    }

    return time.of_previous_collision
}

function prepareanimation(
    positions : number[], 
    velocities : number[], 
    masses : number[], 
    dt : number, diameter : number, when_stop : number){
    const Nparticles = masses.length
    const collisions = createCollisions(positions, velocities, diameter)
    const positionsHistory = []
    positionsHistory[0] = positions.slice(0, -1)

    let time ={
        before_collision : 0,
        of_frame : 0,
        of_previous_collision : 0,
    };
//Мб есть разрыв, когда я запущу время в обратную сторону
    while(time.of_frame < when_stop){

        let soon = findSoonestCollisions(collisions)
        time.before_collision = collisions[soon[0]]

        writeHistory(time, positions, velocities, positionsHistory, dt)
        
        for(let i = 0; i < Nparticles; i++){
            positions[i] += velocities[i] * time.before_collision
        }
        updateVelocities(masses, velocities, soon)
        updateCollisions(positions, velocities, collisions, soon, diameter)
    }
    return positionsHistory
}

function energy(positions: number[], velocities: number[], masses: number[], diameter: number, when_stop : number, deltaT : number){
    const Nparticles = masses.length
    const collisions = createCollisions(positions, velocities, diameter)
    //const N = Math.round(when_stop / deltaT)

    let e0 = []
    let e1 = []
    let tt = []

    let time ={
        before_collision : 0,
        of_previous_collision : 0,
    };

    let i = 0
    let remT = 0
    let remE0 = 0
    let remE1 = 0
    while(time.of_previous_collision < when_stop){
        let soon = findSoonestCollisions(collisions)
        time.before_collision = collisions[soon[0]]

        if(remT + time.before_collision >= deltaT){
            remT = remT + time.before_collision - deltaT
            e0.push((remE0 + (time.before_collision - remT) * velocities[0] ** 2) * masses[0] / 2 / deltaT)
            e1.push((remE1 + (time.before_collision - remT) * velocities[1] ** 2) * masses[1] / 2 / deltaT)
            //tt.push(i++ * deltaT + deltaT/2)
            tt.push(i++)
        }
        else{
            remT += time.before_collision
            remE0 += time.before_collision * velocities[0] ** 2
            remE0 += time.before_collision * velocities[0] ** 2
        }

        for(let i = 0; i < Nparticles; i++){
            positions[i] += velocities[i] * time.before_collision
        }

         time.of_previous_collision += time.before_collision

        updateVelocities(masses, velocities, soon)
        updateCollisions(positions, velocities, collisions, soon, diameter)
    }
    return {t: tt, e1: e0, e2: e1}
}

// function simpleArray(N){
//     let array = new Array(N)

//     for(let k = 0; k < N; ++k){
//         array[k] = k + 1;
//     }
//     return array
//}