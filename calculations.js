function simpleArray(N){
    let array = new Array(N)

    for(let k = 0; k < N; ++k){
        array[k] = k + 1;
    }
    return array
}

function expectation(randArr){
    let expArr = new Array(randArr.length)
    let sum = 0;
    for(let k = 0; k < expArr.length; k ++){
        sum += randArr[k]
        expArr[k] = sum / (k + 1)
    }
    return expArr
}

function dispersion1N(randArr, N, avg){
    let sumDeviationSquares = 0
    for(let k = 0; k < N; k++){
        sumDeviationSquares += (randArr[k] - avg)**2 
    }
    return sumDeviationSquares / N //Это на самом деле N-1, так как отсчёт ведётся с 0
}

function dispersion(randArr, expArr){
    let dispArr = new Array(Math.min(randArr.length, expArr.length))
    for(let k = 1; k < dispArr.length; k++){
        dispArr[k] = dispersion1N(randArr, k, expArr[k])
    }
    dispArr[0] = dispArr[1]
    return dispArr
}
