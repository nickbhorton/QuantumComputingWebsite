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
    constructor(matrix, id, parent_id, matrixWidth_px, matrixHeight_px){
        this.cols = matrix.cols
        this.rows = matrix.rows
        this.id = id
        this.parent_id = parent_id
        this.matrixWidth = matrixWidth_px
        this.matrixHeight = matrixHeight_px
        this.matrixNumberHeight = this.matrixHeight/this.cols
        this.matrixNumberWidth = this.matrixWidth/this.rows
        // Set up parent-child relationship
        this.parent = document.getElementById(parent_id)
        this.div = document.createElement("div")
        this.div.id = this.id
        this.div.classList.add("matrix")
        this.div.style = `
        width: ${this.matrixWidth}px;
        height: ${this.matrixHeight}px;`
        this.parent.appendChild(this.div)

        // init numberMatrix to zeros
        this.numberMatrix = matrix.m

        // Adding The matrix sides with a svg file
        const matrixSide_svg = document.createElement("div")
        matrixSide_svg.innerHTML = `
        <svg 
            width=${matrixWidth_px}
            height=${matrixHeight_px}
            viewBox="0 0 100 100" 
            fill="none" 
            preserveAspectRatio="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
        <g id="Frame 1" clip-path="url(#clip0_0_1)">
            <rect width="100" height="100" fill="white"/>
            <g id="right">
                <line id="right-mid" y1="-0.5" x2="100" y2="-0.5" transform="matrix(0 1 1 0 100 0)" stroke="black"/>
                <line id="right-top" y1="-0.5" x2="15" y2="-0.5" transform="matrix(-1 0 0 1 100 1)" stroke="black"/>
                <line id="right-bottom" y1="-0.5" x2="15" y2="-0.5" transform="matrix(-1 0 0 1 99 100)" stroke="black"/>
            </g>
            <g id="left">
                <line id="left-mid" x1="0.5" x2="0.5" y2="100" stroke="black"/>
                <line id="left-top" y1="0.5" x2="15" y2="0.5" stroke="black"/>
                <line id="left-bottom" x1="1" y1="99.5" x2="16" y2="99.5" stroke="black"/>
            </g>
        </g>
        <defs>
        <clipPath id="clip0_0_1">
        <rect width="100" height="100" fill="white"/>
        </clipPath>
        </defs>
        </svg>
        `
        this.div.appendChild(matrixSide_svg)

        this.initializeMatrixDivElementArray()
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

let m1Element = new MatrixElement(m1, "matrix1", "matrix-eq-1", 128, 128)

let m2Element = new MatrixElement(m2, "matrix2", "matrix-eq-1", 128, 128)

let m3Element = new MatrixElement(m3, "matrix3", "matrix-eq-1", 256+64, 128)