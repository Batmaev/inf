// class DataFor1Graph{
//     constructor(Xarr, Yarr, width, height, userMinY, userMaxY){
//         this.width = width
//         this.height = height

//         this.Xarr = Xarr
//         this.Yarr = Yarr

//         this.N = Math.min(Xarr.length, Yarr.length)
//         this.maxX = Math.max.apply(null, Xarr)
//         this.minX = Math.min.apply(null, Xarr)
//         this.maxY = Math.max.apply(null, Yarr)
//         this.minY = Math.min.apply(null, Yarr)
//         if(userMaxY !== undefined){
//             this.maxY = Math.max(this.maxY, userMaxY)
//         }
//         if(userMinY !== undefined){
//             this.minY = Math.min(this.minY, userMinY)
//         }
//         this.ampX = this.maxX - this.minX
//         this.ampY = this.maxY - this.minY
//     }
//     screenX(n){
//         return (this.Xarr[n] - this.minX) / this.ampX * this.width
//     }
//     screenY(n){
//         return (1 - (this.Yarr[n] - this.minY) / this.ampY) * this.height
//     }
// }

class DataForGraphList{
    constructor(XYpairs, width, height, userMinY, userMaxY){
        this.width = width
        this.height = height

        this.maxX = this.minX = XYpairs[0].X[0]
        this.maxY = this.minY = XYpairs[0].Y[0]
       for(let k = 0; k < XYpairs.length; k++){
           let Xarr = XYpairs[k].X
           let Yarr = XYpairs[k].Y
           for(let l = 0; l < Xarr.length; ++l){
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
        // katex.render(this.getAttribute("name"), head, {
        //     strict: false
        // })
        head.innerHTML = this.getAttribute("name")
    }

    drawGraph(XYCLs, minY, maxY){
        //XYLs = [{X, Y, color, lines or dots}]
        const cnv = this.querySelector("canvas")
        let ctx = cnv.getContext("2d")
        
        const width = cnv.getBoundingClientRect().width
        const height = cnv.getBoundingClientRect().height
        cnv.height = height
        cnv.width = width

        let data = new DataForGraphList(XYCLs, width, height, minY, maxY)

        for(let k = 0; k < XYCLs.length; k++){
            let Xarr = XYCLs[k].X
            let Yarr = XYCLs[k].Y

            if(XYCLs[k].lines){
                ctx.beginPath()
                ctx.moveTo(data.screenX(Xarr, 0), data.screenY(Yarr, 0))
    
                for(let k = 1; k < Xarr.length; k++){
                ctx.lineTo(data.screenX(Xarr, k), data.screenY(Yarr, k))
                }

                ctx.strokeStyle = XYCLs[k].color
                ctx.stroke()
            }
            else{
                ctx.fillStyle = XYCLs[k].color
                const HALF_DOT_SIZE = 0.5
                for(let k = 0; k < data.N; k++){
                    ctx.fillRect(data.screenX(Xarr, k) - HALF_DOT_SIZE, data.screenY(Yarr, k) - HALF_DOT_SIZE,
                     2 * HALF_DOT_SIZE, 2 * HALF_DOT_SIZE)
                }
            }
        
        }
    }
}
customElements.define("graph-element", Graph);