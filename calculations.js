function simpleArray(N){
    let array = new Array(N)

    for(let k = 0; k < N; ++k){
        array[k] = k + 1;
    }
    return array
}

function simulate(Nparticles, probabilityDisappear, Nsteps, randFunc, seed){
    const resArr = new Array(Nsteps)
    resArr[0] = Nparticles

    for(let k = 1; k < Nsteps; ++k){
        let randArr = randFunc(resArr[k - 1], seed)
        seed = randArr[randArr.length - 1] //костыль для разных seed каждый раз
        resArr[k] = 0
        randArr.forEach(element => {
            if(element > probabilityDisappear){
                resArr[k] += 1
            }
        });

    }
    return resArr
}