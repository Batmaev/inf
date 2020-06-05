class DataForGraphList{
    constructor(XYpairs, width, height, userMinY, userMinX, userMaxY, userMaxX){
        this.width = width
        this.height = height

        this.lengths = new Array(XYpairs.length)

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
        if(userMaxY !== undefined){
            this.maxX = Math.max(this.maxX, userMaxX)
         }
         if(userMinY !== undefined){
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
        const head = this.querySelector(".head")
        katex.render(this.getAttribute("name"), head, {
            strict: false
        })
        // head.innerHTML = this.getAttribute("name")
        // window.renderMathInElement(head)

        this.svg = this.querySelector("svg")
    }

    drawGraph(XYCLs, minY,minX, maxY, maxX){
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
                ctx.fillStyle = XYCLs[k].color
                const HALF_DOT_SIZE = 3
                for(let l = 0; l < data.lengths[k]; l++){
                    ctx.fillRect(data.screenX(Xarr, l) - HALF_DOT_SIZE, data.screenY(Yarr, l) - HALF_DOT_SIZE,
                     2 * HALF_DOT_SIZE, 2 * HALF_DOT_SIZE)
                }
            }
        }
    }

    clear(){
        this.svg.textContent = ""
    }
}
customElements.define("graph-element", Graph);

function tostd(x){
    if(x === 0){
        return 0
    }
    let pow = Math.round(Math.log10(Math.abs(x)))
    let mnts = x / 10 ** pow
    mnts = mnts.toFixed(3)
    return mnts + " * 10^" + pow
}