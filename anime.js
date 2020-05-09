function anime(positionsHistory, masses, diameter, dt){
    const svg = document.getElementById("anime").querySelector("svg")
    const circles = []
    //let i = 0
    masses.forEach(element => {
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        circle.setAttribute("cy", "50")
        circle.setAttribute("r", diameter/2)
        if(element === 1){
            circle.setAttribute("fill", "blue")
        }
        else{
            circle.setAttribute("fill", "green")
        }
        //circle.setAttribute("cx", positionsHistory[0][i++])
        svg.append(circle)
        circles.push(circle)
    });

    let i = 0
    interval = setInterval(() => {
        circles.forEach((circle, index) => 
        circle.setAttribute("cx", positionsHistory[i][index])
        )
        if(++i === positionsHistory.length){
            i = 0
        }
    }, dt);
}