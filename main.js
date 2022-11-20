// // UTILIDADES // //
function sumTwoStrNumArrays (array1, array2) {
    let temp = [];
    array1 = array1.split(',');
    array2 = array2.split(',');
    for(i = 0; i < array1.length; i++) {
        temp[i] = parseInt(array1[i]) + parseInt(array2[i]);
    }
    return temp.toString();
}

// // FIN UTILIDADES // //

class Grid {

    constructor (width, height) {
            this.cell_obj = {};
            this.div = document.createElement('div');
            this.div.setAttribute('id', 'grid');
            this.width = width;
            this.height = height;
            this.div.style.width = `${this.width}px`;
            this.div.style.height = `${this.height}px`;
            this.insert_point = '4,4';
            this.intervals = {'timer fruta': ''};
            this.active_piece = false;
            document.getElementById('root').appendChild(this.div);
                    
        }

        getActualCells () {
            const result = [this.active_piece.anchor];
            for (let i = 0; i< this.active_piece.points[this.active_piece.position]['points'].length ; i++) {
                result.push(sumTwoStrNumArrays(this.active_piece.points[this.active_piece.position]['points'][i], this.active_piece.anchor));
            }
            return result;
        }

        getFutureCells () {
            const result = [this.active_piece.anchor];
            const new_position = this.active_piece.nextPosition();
            for (let i = 0; i< this.active_piece.points[new_position]['points'].length ; i++) {
                console.log(this.active_piece.anchor);
                console.log(this.active_piece.points[new_position]['points'][i]);
                result.push(sumTwoStrNumArrays(this.active_piece.points[new_position]['points'][i], this.active_piece.anchor));
            }
            return result;
        }
    
        addCell (new_cell) {
            this.cell_obj[new_cell.coordinates.toString()] = new_cell;
            this.div.appendChild(new_cell.cell);
        }

        addPiece (new_piece) {
            this.active_piece = new_piece;
            this.cell_obj[new_piece.anchor].cell.setAttribute('class', 'piezaPurpura');
            this.cell_obj[new_piece.anchor].addPiece(new_piece);
            for (let i = 0; i < new_piece.points[new_piece.position]['points'].length; i++) {
                let temp = sumTwoStrNumArrays(new_piece.points[new_piece.position]['points'][i], new_piece.anchor);
                this.cell_obj[temp].cell.setAttribute('class', 'piezaPurpura');
                this.cell_obj[temp].addPiece(new_piece);

            }


        }

        spinPiece () {
            //calculo futuros espacios ocupados
            const actual = this.getActualCells();
            const futuro = this.getFutureCells();
            this.active_piece.position = this.active_piece.nextPosition();
            for (let i = 0; i < actual.length; i++) {
                this.cell_obj[actual[i]].cell.setAttribute('class', 'celdaVacia');
            for (let i = 0; i < futuro.length; i++) {
                this.cell_obj[futuro[i]].cell.setAttribute('class', 'piezaPurpura');
            }
            }
        }

}

class Cell {
    
    constructor (x_index, y_index, x_pos, y_pos) {
        this.coordinates = [x_index, y_index].toString();
        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.cell = document.createElement('div');
        this.cell.setAttribute('class', 'celdaVacia');
        this.cell.style.left = `${this.x_pos}px`;
        this.cell.style.top = `${this.y_pos}px`;
        this.occupied = false;
    }
    
    addPiece (new_piece) {
        this.occupied = new_piece;
    }

}

class PurplePiece {

    constructor (insert_point) {
        this.anchor = insert_point;
        this.points =   [{'anchor': this.anchor, 'points': ['0,-1', '1,-1' , '2,-1']},
                         {'anchor': this.anchor, 'points': ['1,0' , '1,1'  , '1,2']},
                         {'anchor': this.anchor, 'points': ['0,1' , '-1,1' , '-2,1']},
                         {'anchor': this.anchor, 'points': ['-1,0', '-1,-1', '-1,-2']}];
        this.position = 0
    }

    nextPosition() {
        if (this.position != this.points.length-1) {
            return this.position+1;
        }
        else {
            return 0;
        }
    }
}

window.onload = function init() {
    //tablero de 10 por 20.
    let grid = new Grid (350, 700);
    let prueba_pieza = new PurplePiece(grid.insert_point);
    
    for (let i = 0; i<10; i++) {
        for (let j = 0; j<20; j++) {
            new_cell = new Cell (i, j, 35*i, 35*j);
            grid.addCell(new_cell);
        }
    }

    grid.addPiece(prueba_pieza);
    window.addEventListener("keydown", function(event) {
        console.log(event);
        if (event.defaultPrevented) {
            return;
        }
        if (event.code === "Space") {
            grid.spinPiece();
            
        }

        else if (event.code === 'ArrowLeft') {
            grid.intervals['movimiento_izquierda'] = setInterval()

        }
                
        event.preventDefault();
        }, true);
    
    window.addEventListener("keyup", function(event) {
        console.log(event);
        this.clearInterval(this.intervals['movimiento_izquierda']);
        this.clearInterval(this.intervals['movimiento_derecha']);
    })
    
}












