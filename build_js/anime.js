let interval;
function anime(positionsHistory, masses, diameter, dt) {
    const svg = document.getElementById("anime");
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
    const cy = svg.getBoundingClientRect().height / 2;
    const circles = [];
    //let i = 0
    masses.forEach(element => {
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cy", cy.toString());
        circle.setAttribute("r", (diameter / 2).toString());
        if (element === 1) {
            circle.setAttribute("fill", "rgba(120, 120, 255, 1)");
        }
        else {
            circle.setAttribute("fill", "rgba(120, 185, 120, 1)");
        }
        //circle.setAttribute("cx", positionsHistory[0][i++])
        svg.append(circle);
        circles.push(circle);
    });
    let i = 0;
    return new Promise((resolve, reject) => interval = setInterval(() => {
        circles.forEach((circle, index) => circle.setAttribute("cx", positionsHistory[i][index]));
        if (++i === positionsHistory.length) {
            clearInterval(interval);
            resolve();
        }
    }, dt));
}