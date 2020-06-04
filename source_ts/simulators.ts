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

function energy(positions: number[], velocities: number[], masses: number[], diameter: number, when_stop : number){
    const Nparticles = masses.length
    const collisions = createCollisions(positions, velocities, diameter)

    const m1 = 1
    const m2 = 4

    let m1l : number[]
    let m2l : number[]

    masses.forEach((value, i) => {
        if(value === m1) m1l.push(i)
        else m2l.push(i)
    })

    let e1 : number[]
    let e2 : number[]
    let tt : number[]

    let time ={
        before_collision : 0,
        of_previous_collision : 0,
    };

    while(time.of_previous_collision < when_stop){
        let soon = findSoonestCollisions(collisions)
        time.before_collision = collisions[soon[0]]

        for(let i = 0; i < Nparticles; i++){
            positions[i] += velocities[i] * time.before_collision
        }

        e1.push(m1 * m1l.reduce((acc, i) => acc + velocities[i] ** 2) / Nparticles)
        e2.push(m2 * m2l.reduce((acc, i) => acc + velocities[i] ** 2) / Nparticles)
        tt.push(time.of_previous_collision)

        time.of_previous_collision += time.before_collision

        updateVelocities(masses, velocities, soon)
        updateCollisions(positions, velocities, collisions, soon, diameter)
    }
    return {t: tt, e1: e1, e2: e2}
}