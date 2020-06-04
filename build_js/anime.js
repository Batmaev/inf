var interval;
function anime(positionsHistory, masses, diameter, dt) {
    var svg = document.getElementById("anime");
    var cy = svg.getBoundingClientRect().height / 2;
    var circles = [];
    //let i = 0
    masses.forEach(function (element) {
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
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
    var i = 0;
    interval = setInterval(function () {
        circles.forEach(function (circle, index) {
            return circle.setAttribute("cx", positionsHistory[i][index]);
        });
        if (++i === positionsHistory.length) {
            clearInterval(interval);
        }
    }, dt);
}
