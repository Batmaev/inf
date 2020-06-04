var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DataForGraphList = /** @class */ (function () {
    function DataForGraphList(XYpairs, width, height, userMinY, userMaxY) {
        this.width = width;
        this.height = height;
        this.lengths = new Array(XYpairs.length);
        this.maxX = this.minX = XYpairs[0].X[0];
        this.maxY = this.minY = XYpairs[0].Y[0];
        for (var k = 0; k < XYpairs.length; k++) {
            var Xarr = XYpairs[k].X;
            var Yarr = XYpairs[k].Y;
            this.lengths[k] = Math.min(Xarr.length, Yarr.length);
            for (var l = 0; l < this.lengths[k]; ++l) {
                var currentX = Xarr[l];
                var currentY = Yarr[l];
                this.maxX = currentX > this.maxX ? currentX : this.maxX;
                this.minX = currentX < this.minX ? currentX : this.minX;
                this.maxY = currentY > this.maxY ? currentY : this.maxY;
                this.minY = currentY < this.minY ? currentY : this.minY;
            }
        }
        if (userMaxY !== undefined) {
            this.maxY = Math.max(this.maxY, userMaxY);
        }
        if (userMinY !== undefined) {
            this.minY = Math.min(this.minY, userMinY);
        }
        this.ampX = this.maxX - this.minX;
        this.ampY = this.maxY - this.minY;
    }
    DataForGraphList.prototype.screenX = function (Xarr, n) {
        return (Xarr[n] - this.minX) / this.ampX * this.width;
    };
    DataForGraphList.prototype.screenY = function (Yarr, n) {
        return (1 - (Yarr[n] - this.minY) / this.ampY) * this.height;
    };
    return DataForGraphList;
}());
var Graph = /** @class */ (function (_super) {
    __extends(Graph, _super);
    function Graph() {
        var _this = _super.call(this) || this;
        _this.append(graphTempl.content.cloneNode(true));
        return _this;
    }
    Graph.prototype.connectedCallback = function () {
        var head = this.querySelector(".head");
        // katex.render(this.getAttribute("name"), head, {
        //     strict: false
        // })
        head.innerHTML = this.getAttribute("name");
        this.svg = this.querySelector("svg");
    };
    Graph.prototype.drawGraph = function (XYCLs, minY, maxY) {
        //XYLs = [{X, Y, color, lines or dots}]
        var width = this.svg.getBoundingClientRect().width;
        var height = this.svg.getBoundingClientRect().height;
        // MysvgElement.setAttribute("width", `${Math.round(width)}`)
        // MysvgElement.setAttribute("height", `${Math.round(height)}`)
        var data = new DataForGraphList(XYCLs, width, height, minY, maxY);
        for (var k = 0; k < XYCLs.length; k++) {
            var Xarr = XYCLs[k].X;
            var Yarr = XYCLs[k].Y;
            if (XYCLs[k].lines) {
                var polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                var str = "";
                for (var l = 1; l < data.lengths[k]; l++) {
                    str += (data.screenX(Xarr, l)) + "," + (data.screenY(Yarr, l)) + " ";
                }
                polyline.setAttributeNS(null, "points", str);
                polyline.setAttributeNS(null, "stroke", XYCLs[k].color);
                this.svg.append(polyline);
            }
            else {
                ctx.fillStyle = XYCLs[k].color;
                var HALF_DOT_SIZE = 3;
                for (var l = 0; l < data.lengths[k]; l++) {
                    ctx.fillRect(data.screenX(Xarr, l) - HALF_DOT_SIZE, data.screenY(Yarr, l) - HALF_DOT_SIZE, 2 * HALF_DOT_SIZE, 2 * HALF_DOT_SIZE);
                }
            }
        }
    };
    Graph.prototype.clear = function () {
        this.svg.textContent = "";
    };
    return Graph;
}(HTMLElement));
customElements.define("graph-element", Graph);
