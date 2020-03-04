function simpleArray(N){
    let array = new Array(N)

    for(let k = 0; k < N; ++k){
        array[k] = k + 1;
    }
    return array
}

function simulate(Nparticles, probabilityDisappear, probabilityChange){
    let disappeared = 0
    let changed = 0
    for(let k = 0; k < Nparticles; k++){
        let randomValue = Math.random()
        if(randomValue < probabilityDisappear){
            disappeared++
        }
        else if(randomValue < probabilityDisappear + probabilityChange){
            changed++
        }
    }
    return {Disappeared: disappeared, Changed: changed}
}