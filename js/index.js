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
m1Element.createHighlightBoarder(0,0, 1, 1, "#0000ff", "test_highlight2", 6/10, "#0000ff11")
m2Element.createHighlightBoarder(0,0, 1, 2, "#ff0000", "test_highlight3", 7/10)
m2Element.createHighlightBoarder(0,0, 1, 1, "#0000ff", "test_highlight4", 6/10, "#0000ff11")
m3Element.createHighlightBoarder(0,0, 1, 1, "#00ff00", "test_highlight5", 8.5/10)
m3Element.createHighlightBoarder(0,0, 0.5, 1, "#ffff00", "test_highlight6", 8/10, "#ffff0022")