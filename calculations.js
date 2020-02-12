simulate = parabolic
noise_level = 0

function parabolic(N, r, x0){
    let array = new Array(N)
    array[0] = x0

    for(let k = 1; k < N; ++k){
        array[k] = 4 * r * array[k - 1] * (1 - array[k - 1]) + noise_level * Math.random()
    }
    return array
}

function exponential(N, r, x0) {
    let array = new Array(N)
    array[0] = x0

    for(let k = 1; k < N; ++k){
        array[k] = array[k -1] * Math.exp(r * (1 - array[k - 1])) + noise_level * Math.random()
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

function steadyState(N_Iterations, r_min, r_max, x0){
    const N_r_values = 100
    const N_last = 80
    let arrayOfArrays = new Array(N_r_values)
    let arrayOfRvalues = new Array(N_r_values)

    for(let k = 0; k < N_r_values; ++k){
        arrayOfRvalues[k] = r_min + k * (r_max - r_min) / N_r_values;
        arrayOfArrays[k] = simulate(N_Iterations, arrayOfRvalues[k], x0).slice(-N_last)
    }

    let array1DX = new Array(N_r_values * N_last)
    let array1DY = new Array(N_r_values * N_last)
    for(let k = 0; k < N_r_values; k++){
        for(let l = 0; l < N_last; l++){
            array1DX[k * N_last + l] = arrayOfRvalues[k]
            array1DY[k * N_last + l] = arrayOfArrays[k][l]
        }
    }
    return {X: array1DX, Y: array1DY}
}