const style = getComputedStyle(document.querySelector("body"))
const backgroundColor = style.backgroundColor
const textColor = style.color

class Matrix {
    m = []
    rows = null
    cols = null
    constructor(matrixAsArray){
        this.m = matrixAsArray;
        this.rows = this.m.length
        this.cols = this.m[0].length
    }
}

class MatrixElement {
    numberMatrix = []
    divElementMatrix = []
    rows = null
    cols = null
    matrixWidth = null
    matrixHeight = null
    matrixNumberWidth = null
    matrixNumberHeight = null
    parent = null
    parent_id = null
    div = null
    id = null
    borderWidth = 4
    matrixSide_svg_div = null
    constructor(matrix, id, parent_id, matrixWidth_px, matrixHeight_px){
        this.cols = matrix.cols
        this.rows = matrix.rows
        this.id = id
        this.parent_id = parent_id
        this.matrixWidth = matrixWidth_px
        this.matrixHeight = matrixHeight_px
        this.matrixNumberHeight = this.matrixHeight/this.cols
        this.matrixNumberWidth = this.matrixWidth/this.rows
        this.numberMatrix = matrix.m
        this.highlightArray = []

        // Set up parent-child relationship
        this.parent = document.getElementById(this.parent_id)
        this.div = document.createElement("div")
        this.div.id = this.id
        this.div.classList.add("matrix")
        this.div.style = `
        width: ${this.matrixWidth}px;
        height: ${this.matrixHeight}px;`

        this.initializeMatrixDivElementArray()
        this.createMatrixSides()
        this.addMatrixSides()
    }

    initializeMatrixDivElementArray() {
        for (let i = 0; i < this.rows; i++) {
            let divElementRow = []
            for (let j = 0; j < this.cols; j++){
                let div_item = document.createElement("div")
                div_item.classList.add("matrixBox")
                div_item.id = `${this.id}-${i}-${j}`

                div_item.style = `left: ${(this.matrixWidth/this.cols)*(j)}px;
                top: ${(this.matrixHeight/this.rows)*(i)}px;
                width: ${this.matrixNumberWidth}px;
                height: ${this.matrixNumberHeight}px;`
                
                let p_item = document.createElement("p")
                p_item.textContent = "$$" + this.numberMatrix[i][j] + "$$"
                p_item.classList.add("p-element-matrix")
                div_item.appendChild(p_item)

                this.div.appendChild(div_item)
                divElementRow.push(div_item)
            }
            this.divElementMatrix.push(divElementRow)
        }
    }

    createHighlightBoarder(pos_x, pos_y, width, height, color, id, dimention_frac){
        let h = document.createElement("div")
        let h_internal = document.createElement("div")
        h_internal.style = `
        width: ${this.matrixNumberWidth*(dimention_frac) + (width-1)*this.matrixNumberWidth}px;
        height: ${this.matrixNumberHeight*(dimention_frac) + (height-1)*this.matrixNumberHeight}px;
        border: 2px solid ${color};
        margin: auto;
        `
        h.id = id
        h.style = `
        position: absolute;
        flex: 0 0 auto;
        width: ${width*this.matrixNumberWidth}px;
        height: ${height*this.matrixNumberHeight}px;
        left: ${this.matrixNumberWidth*pos_x}px;
        top: ${this.matrixNumberHeight*pos_y}px;
        background-color: transparent;
        `
        h.appendChild(h_internal)
        this.div.appendChild(h)
    }

    createMatrixSides(){
        // Adding The matrix sides with a svg file
        this.matrixSide_svg_div = document.createElement("div")
        this.matrixSide_svg_div.innerHTML = `
        <svg 
            width=${this.matrixWidth}
            height=${this.matrixHeight}
            viewBox="0 0 ${100*(this.matrixWidth/this.matrixHeight)} 100" 
            fill="none" 
            preserveAspectRatio="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
        <g id="Frame 1">
            <rect width="${100*(this.matrixWidth/this.matrixHeight)}" height="100" fill="${backgroundColor}"/>
            <g id="right">
                <line id="right-mid" x1="${100*(this.matrixWidth/this.matrixHeight) - 0.5}" y1="0" x2="${100*(this.matrixWidth/this.matrixHeight) - 0.5}" y2="100" stroke="${textColor}"/>
                <line id="right-top" x1="${100*(this.matrixWidth/this.matrixHeight)}" y1="99.5" x2="${100*(this.matrixWidth/this.matrixHeight) - 15}" y2="99.5" stroke="${textColor}"/>
                <line id="right-bottom" x1="${100*(this.matrixWidth/this.matrixHeight)}" y1="0.5" x2="${100*(this.matrixWidth/this.matrixHeight) - 15}" y2="0.5" stroke="${textColor}"/>
            </g>
            <g id="left">
                <line id="left-mid" x1="0.5" y1="0" x2="0.5" y2="100" stroke="${textColor}"/>
                <line id="left-top" x1="0" y1="0.5" x2="15" y2="0.5" stroke="${textColor}"/>
                <line id="left-bottom" x1="0" y1="99.5" x2="15" y2="99.5" stroke="${textColor}"/>
            </g>
        </g>
        <defs>
        </defs>
        </svg>
        `
    }

    addMatrixSides(){
        this.div.appendChild(this.matrixSide_svg_div)
    }

    addToMatrixEquation(){
        this.parent.appendChild(this.div)
    }
}

class MatrixEquation {
    elementArray = []
    id = null
    div = null
    constructor(id) {
        this.id = id
        this.div = document.getElementById(this.id)
    }

    renderEquation(){
        for (let i = 0; i < this.elementArray.length; i++){
            if (this.elementArray[i] instanceof MatrixElement){
                this.elementArray[i].addToMatrixEquation()
            }
            else if (typeof this.elementArray[i] == "string") {
                let elm = document.createElement("p")
                elm.classList.add("matrix_element_string")
                elm.textContent = this.elementArray[i]
                this.div.appendChild(elm)
            }
        }
    }

    addElement(element){
        if (element instanceof MatrixElement){
            this.elementArray.push(element)
        }
        else if (typeof element == "string"){
            this.elementArray.push(element)
        }
        else {
            console.log("hmm")
        }
    }

    getId(){
        return this.id
    }
}

m1 = new Matrix(
    [
        ["a", "b"],
        ["c", "d"],
    ]
)

m2 = new Matrix(
    [
        ["w", "x"],
        ["y", "z"],
    ]
)

m3 = new Matrix(
    [
        ["aw+by", "ax+bz"],
        ["cw+dy", "cx+dz"],
    ]
)

m4 = new Matrix (
    [
        ["\\alpha^{2}", "\\alpha \\beta^{*}"],
        ["\\alpha^{*} \\beta", "\\beta^{2}"]
    ]
)

let mEq1 = new MatrixEquation("matrix-eq-1")
let m1Element = new MatrixElement(m1, "matrix1", mEq1.getId(), 128, 128)
let m2Element = new MatrixElement(m2, "matrix2", mEq1.getId(), 128, 128)
let m3Element = new MatrixElement(m3, "matrix3", mEq1.getId(), 256+64, 128)

mEq1.addElement(m1Element)
mEq1.addElement(m2Element)
mEq1.addElement("$$=$$")
mEq1.addElement(m3Element)
mEq1.renderEquation()

m1Element.createHighlightBoarder(0,0, 2, 1, "#ff0000", "test_highlight1", 7/10)
m1Element.createHighlightBoarder(0,0, 1, 1, "#0000ff", "test_highlight2", 6/10)
m2Element.createHighlightBoarder(0,0, 1, 2, "#ff0000", "test_highlight3", 7/10)
m2Element.createHighlightBoarder(0,0, 1, 1, "#0000ff", "test_highlight4", 6/10)
m3Element.createHighlightBoarder(0,0, 1, 1, "#00ff00", "test_highlight5", 8.5/10)