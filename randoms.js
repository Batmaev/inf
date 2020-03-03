function mathRandArray(N){
    let randArr = new Array(N)
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
    const MAX_UINT = 4294967296
    
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

function Fibonacci(N, seed){
    let randArr = linearCongruent(N, seed)
    const a = 17
    const b = 5

    for(let k = Math.max(a, b); k < N; k++){
        randArr[k] = randArr[k - a] - randArr[k - b]
        if(randArr[k] < 0){
            randArr[k] += 1
        }
    }
    return randArr
}