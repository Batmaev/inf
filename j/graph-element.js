class DataForGraphList{
    constructor(XYpairs, width, height, userMinY, userMinX, userMaxY, userMaxX){
        this.width = width
        this.height = height

        this.lengths = new Array(XYpairs.length)

        /*Далее переусложнённый код,
        чтобы найти максимальное и минимальное значения X и Y.
        Я просто подумал, что написать Math.max(...X) недостаточно эффективно
        */
        this.maxX = this.minX = XYpairs[0].X[0]
        this.maxY = this.minY = XYpairs[0].Y[0]
       for(let k = 0; k < XYpairs.length; k++){
           let Xarr = XYpairs[k].X
           let Yarr = XYpairs[k].Y
           this.lengths[k] = Math.min(Xarr.length, Yarr.length)
           for(let l = 0; l < this.lengths[k]; ++l){
               let currentX = Xarr[l]
               let currentY = Yarr[l]

               this.maxX = currentX > this.maxX ? currentX : this.maxX
               this.minX = currentX < this.minX ? currentX : this.minX

               this.maxY = currentY > this.maxY ? currentY : this.maxY
               this.minY = currentY < this.minY ? currentY : this.minY
           }
        }
        if(userMaxY !== undefined){
           this.maxY = Math.max(this.maxY, userMaxY)
        }
        if(userMinY !== undefined){
            this.minY = Math.min(this.minY, userMinY)
        }
        if(userMaxX !== undefined){
            this.maxX = Math.max(this.maxX, userMaxX)
         }
         if(userMinX !== undefined){
             this.minX = Math.min(this.minX, userMinX)
         }
        this.ampX = this.maxX - this.minX
        this.ampY = this.maxY - this.minY
    }
    screenX(Xarr, n){
        return (Xarr[n] - this.minX) / this.ampX * this.width
    }
    screenY(Yarr, n){
        return (1 - (Yarr[n] - this.minY) / this.ampY) * this.height
    }
}

class Graph extends HTMLElement{
    constructor(){
        super()
        this.append(graphTempl.content.cloneNode(true))
    }
    connectedCallback(){
        // Я хотел просто сделать window.renderMathInElement(head)
        // Но работал только katex.render()
        // Он плохо воспринимал пробелы и кириллицу, 
        // поэтому пришлось каждую формулу писать в своём <span> и рендерить эти <span> изолированно 
        const head = this.querySelector(".head")
        head.innerHTML = this.getAttribute("name")
        head.querySelectorAll("span").forEach(el => {
            katex.render(el.innerHTML, el, {
                strict: false
            })
        })

        this.svg = this.querySelector("svg")
    }

    /**
     * @param {[{X : [number]; Y: number; color: string; lines: boolean}]} XYCLs 
     * Если XYCLs[i].lines == true, то точки графика будут соединены линиями.
     * Если false, то это будут просто точки, но эта опция не реализована. 
     * Также нереализовано отключение оси Y и метки на ней.
     * @param {number} [minY] Координата самой нижней точки, которая помещается на графике.
     * Если не указано, то это самая нижняя точка во входных данных 
     * @param {number} [minX] 
     * @param {number} [maxY] 
     * @param {number} [maxX] 
     */
    drawGraph(XYCLs, minY, minX, maxY, maxX){
        //XYLs = [{X, Y, color, lines or dots}]

        const width = this.svg.getBoundingClientRect().width
        const height = this.svg.getBoundingClientRect().height
        // MysvgElement.setAttribute("width", `${Math.round(width)}`)
        // MysvgElement.setAttribute("height", `${Math.round(height)}`)

        let data = new DataForGraphList(XYCLs, width, height, minY,minX, maxY, maxX)


        let xexe = document.createElementNS("http://www.w3.org/2000/svg", "line")
        const x0 = - data.minX / data.ampX * width
        xexe.setAttribute("x1", x0)
        xexe.setAttribute("x2", x0)
        xexe.setAttribute("y1", 0)
        xexe.setAttribute("y1", height)
        xexe.setAttribute("stroke", "var(--axes-color)")
        this.svg.append(xexe)

        xexe = document.createElementNS("http://www.w3.org/2000/svg", "line")
        const lenin = 10
        const persik = 0.1
        xexe.setAttribute("x1", x0 - lenin)
        xexe.setAttribute("x2", x0 + lenin)
        xexe.setAttribute("y1", persik * height)
        xexe.setAttribute("y2", persik * height)
        xexe.setAttribute("stroke", "var(--axes-color)")
        this.svg.append(xexe)

        xexe = document.createElementNS("http://www.w3.org/2000/svg", "text")
        xexe.setAttribute("x", x0 + 2 * lenin)
        xexe.setAttribute("y", persik * height + 7)
        xexe.innerHTML = tostd((1 - persik) * data.ampY + data.minY)
        this.svg.append(xexe)


        for(let k = 0; k < XYCLs.length; k++){
            let Xarr = XYCLs[k].X
            let Yarr = XYCLs[k].Y

            if(XYCLs[k].lines){
                let polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline")
                let str = ""
                for(let l = 0; l < data.lengths[k]; l++){
                    str += `${(data.screenX(Xarr, l))},${(data.screenY(Yarr, l))} `
                }
                polyline.setAttributeNS(null, "points", str)
                polyline.setAttributeNS(null, "stroke", XYCLs[k].color)
                this.svg.append(polyline)
            }
            else{
                alert("Режим точек не реализован")
            }
        }
    }

    clear(){
        this.svg.textContent = ""
    }
}
customElements.define("graph-element", Graph);

/**@returns строку, в которой число записано более-менее аккуратно
 * @param {number} x
 */
function tostd(x){
    if(x === 0){
        return "0"
    }
    let pow = Math.floor(Math.log10(Math.abs(x)))
    let mnts = x / 10 ** pow
    mnts = mnts.toFixed(3)
    if(pow >= -1 && pow <= 2){
        return x.toFixed(3)
    }
    return mnts + " * 10^" + pow
}