/**
 * Запускает анимацию, возвращает промис, который делает resolve, когда кадры заканчиваются, и делает reject, когда пользователь запустил анимацию повторно
 * @param {[[number]]} positionsHistory: positionsHistory[frame][particle] = x px; предполагается непустым 
 * @param {[number]} masses Красим m===1 в один цвет, остальное - в другой
 * @param {number} diameter 
 * @param {number} dt Время между кадрами в ms
 */
function anime(positionsHistory, masses, diameter, dt) {
    const svg = document.getElementById("anime");
    svg.innerHTML = ""

    const cy = svg.getBoundingClientRect().height / 2;
    const circles = [];

    masses.forEach(element => {
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cy", cy.toString());
        circle.setAttribute("r", (diameter / 2).toString());
        if (element === 1) {
            circle.setAttribute("fill", "var(--m1-color)");
        }
        else {
            circle.setAttribute("fill", "var(--m2-color)");
        }
        //circle.setAttribute("cx", positionsHistory[0][i++])
        svg.append(circle);
        circles.push(circle);
    });
    
    let i = 0;
    let interval;
    return new Promise((resolve, reject) => interval = setInterval(() => {
        circles.forEach((circle, index) => circle.setAttribute("cx", positionsHistory[i][index]));
        if (++i >= positionsHistory.length) {
            clearInterval(interval);
            resolve();
        }
        if(!svg.contains(circles[0])){
            clearInterval(interval);
            reject()
        }
    }, dt));
}
