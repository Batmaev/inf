class DataFor1Graph{
    constructor(Xarr, Yarr, width, height, userMinY, userMaxY){
        this.width = width
        this.height = height

        this.Xarr = Xarr
        this.Yarr = Yarr

        this.N = Math.min(Xarr.length, Yarr.length)
        this.maxX = Math.max.apply(null, Xarr)
        this.minX = Math.min.apply(null, Xarr)
        this.maxY = Math.max.apply(null, Yarr)
        this.minY = Math.min.apply(null, Yarr)
        if(userMaxY !== undefined){
            this.maxY = Math.max(this.maxY, userMaxY)
        }
        if(userMinY !== undefined){
            this.minY = Math.min(this.minY, userMinY)
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
        const head = this.querySelector(".head")
        katex.render(this.getAttribute("name"), head, {
            strict: false
        })
    }

    drawGraph(XYpair, lines, minY, maxY){
        const cnv = this.querySelector("canvas")
        let ctx = cnv.getContext("2d")
        
        const width = cnv.getBoundingClientRect().width
        const height = cnv.getBoundingClientRect().height
        cnv.height = height
        cnv.width = width

        let data = new DataFor1Graph(XYpair.X, XYpair.Y, width, height, minY, maxY)

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
            const HALF_DOT_SIZE = 0.5
            for(let k = 0; k < data.N; k++){
                ctx.fillRect(data.screenX(k) - HALF_DOT_SIZE, data.screenY(k) - HALF_DOT_SIZE, 2 * HALF_DOT_SIZE, 2 * HALF_DOT_SIZE)
            }
        }
    }
}
customElements.define("graph-element", Graph);