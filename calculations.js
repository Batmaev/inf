function simpleArray(N){
    let array = new Array(N)

    for(let k = 0; k < N; ++k){
        array[k] = k + 1;
    }
    return array
}
function mathRandArray(N){
    let randArr = new Array(700)
    for(let k = 0; k < randArr.length; k++){
       randArr[k] = Math.random()
    }
    return randArr
}

function linearCongruent(N, seed){
    let next
    if(seed !== undefined){
        next = seed
    }
    else{
        next = 1
    }
    const RAND_MAX = 32767 
    const MAX_UINT = 429496729
    
    function rand() {
        next = next * 1103515245 + 12345;
        if(next >= MAX_UINT){
           next %= MAX_UINT
        }
        return Math.floor(next/65536) % (RAND_MAX + 1);
    }

    let randArr = new Array(N)

    for(let k = 0; k < N; k++){
        randArr[k] = rand()/RAND_MAX
    }
    return randArr
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
