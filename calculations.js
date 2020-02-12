function simulate(N, r, x0){
    let array = new Array(N)
    array[0] = x0

    for(let k = 1; k < N; ++k){
        array[k] = 4 * r * array[k - 1] * (1 - array[k - 1])
    }
    return array
}

function simpleArray(N){
    let array = new Array(N)

    for(let k = 0; k < N; ++k){
        array[k] = k + 1;
    }
    return array
}