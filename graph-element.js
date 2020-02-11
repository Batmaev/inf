class Graph extends HTMLElement{
    constructor(){
        super()
        this.append(graphTempl.content.cloneNode(true))
    } 

    drawGraph(Xarr, Yarr){
        const cnv = this.querySelector("canvas")
        let ctx = cnv.getContext("2d")

        // const rect = cnv.parentElement.getBoundingClientRect()
        // cnv.width = rect.width - 20 //padding rect
        // alert("w")
        // cnv.height = rect.height - 20

        
        const width = cnv.getBoundingClientRect().width
        const height = cnv.getBoundingClientRect().height
        cnv.height = height
        cnv.width = width
        alert(width)
        const N = Xarr.length
        let maxX = Math.max.apply(null, Xarr)
        let maxY = Math.max.apply(null, Yarr)
        let minX = Math.min.apply(null, Xarr)
        let minY = Math.min.apply(null, Yarr)
        let ampX = maxX - minX
        let ampY = maxY - minY

        function screenX(abs){
            return (abs - minX) / ampX * width
        }
        function screenY(abs){
            return (1 - (abs - minY) / ampY) * height
        }

        ctx.beginPath()
        ctx.moveTo(screenX(Xarr[0]), screenY(Yarr[0]))

        for(let k = 1; k < N; k++){
            ctx.lineTo(screenX(Xarr[k]), screenY(Yarr[k]))
        }
        ctx.strokeStyle = "rgba(255, 255, 255, 1)"
        ctx.stroke()
    }
}
customElements.define("graph-element", Graph);