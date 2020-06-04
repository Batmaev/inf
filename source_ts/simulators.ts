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

function simulate(
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
        if(collisions[0] === NaN){
            break
        }
        console.log(`positions : ${positions}`)
        console.log(`velocities : ${velocities}`)

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

function energy(positions: number[], velocities: number[], masses: number[], diameter: number){
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