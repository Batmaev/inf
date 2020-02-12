class DataFor1Graph{
    constructor(Xarr, Yarr, width, height, userMaxY, userMinY){
        this.width = width
        this.height = height

        this.Xarr = Xarr
        this.Yarr = Yarr

        this.N = Math.min(Xarr.length, Yarr.length)
        this.maxX = Math.max.apply(null, Xarr)
        this.minX = Math.min.apply(null, Xarr)
        if(userMaxY === undefined){
            this.maxY = Math.max.apply(null, Yarr)
        }
        else{
            this.maxY = userMaxY
        }
        if(userMinY === undefined){
            this.minY = Math.min.apply(null, Yarr)
        }
        else{
            this.minY = userMinY
        }
        this.ampX = this.maxX - this.minX
        this.ampY = this.maxY - this.minY
    }
    screenX(n){
        return (this.Xarr[n] - this.minX) / this.ampX * this.width
    }
    screenY(n){
        return (1 - (this.Yarr[n] - this.minY) / this.ampY) * this.height
    }
}

class Graph extends HTMLElement{
    constructor(){
        super()
        this.append(graphTempl.content.cloneNode(true))
    }
    connectedCallback(){
        this.querySelector(".head").innerHTML = this.getAttribute("name")
    }

    drawGraph(XYpair, maxY, minY, lines){
        const cnv = this.querySelector("canvas")
        let ctx = cnv.getContext("2d")
        
        const width = cnv.getBoundingClientRect().width
        const height = cnv.getBoundingClientRect().height
        cnv.height = height
        cnv.width = width

        let data = new DataFor1Graph(XYpair.X, XYpair.Y, width, height, maxY, minY)

        if(lines){
            ctx.beginPath()
            ctx.moveTo(data.screenX(0), data.screenY(0))

            for(let k = 1; k < data.N; k++){
            ctx.lineTo(data.screenX(k), data.screenY(k))
            }
            ctx.strokeStyle = "rgba(255, 255, 255, 1)"
            ctx.stroke()
        }
        else{
            ctx.fillStyle = "rgba(255, 255, 255, 1)"
            for(let k = 0; k < data.N; k++){
                ctx.fillRect(data.screenX(k), data.screenY(k), 2, 2)
            }
        }
    }
}
customElements.define("graph-element", Graph);