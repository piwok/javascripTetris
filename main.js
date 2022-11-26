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
            this.drop_counter = 0;
            this.active_piece = false;
            this.left = false;
            this.right = false;
            document.getElementById('root').appendChild(this.div);
            this.intervals = setInterval( () => {
                    let actual = false;
                    let futuro = false;
                if (this.left === true && this.right === false) {
                    actual = this.getActualCells();
                    futuro = this.getLeftFutureCells();
                    if (this.checkMovement(futuro) === true) {
                    //check future cells are all empty and in the grid before movement
                        for (let i = 0; i < actual.length; i++) {
                            this.cell_obj[actual[i]].cell.setAttribute('class', 'celdaVacia');
                            this.cell_obj[actual[i]].occupied = false;
                        }
                        for (let i = 0; i < futuro.length; i++) {
                            this.cell_obj[futuro[i]].cell.setAttribute('class', this.active_piece.class);
                            this.cell_obj[futuro[i]].occupied = true;
                        }
                        this.active_piece.anchor = sumTwoStrNumArrays(this.active_piece.anchor, '-1,0'); 
                    }
                
                }

                
                else if (this.right === true && this.left === false) {
                    actual = this.getActualCells();
                    futuro = this.getRightFutureCells();
                    if (this.checkMovement(futuro) === true) {
                        for (let i = 0; i < actual.length; i++) {
                            this.cell_obj[actual[i]].cell.setAttribute('class', 'celdaVacia');
                            this.cell_obj[futuro[i]].occupied = false;
                        }   
                        for (let i = 0; i < futuro.length; i++) {
                            this.cell_obj[futuro[i]].cell.setAttribute('class', this.active_piece.class);
                            this.cell_obj[futuro[i]].occupied = true;
                        }
                        this.active_piece.anchor = sumTwoStrNumArrays(this.active_piece.anchor, '1,0'); 
                    }
                }
                //al final se hace el movimiento vertical en relacion 4 a 1//
                this.drop_counter++;
                if (this.drop_counter === 4) {
                    actual = this.getActualCells();
                    futuro = this.getDownFutureCells();
                    this.drop_counter = 0;
                    if (this.checkMovement(futuro) === true) {
                        for (let i = 0; i < actual.length; i++) {
                            this.cell_obj[actual[i]].cell.setAttribute('class', 'celdaVacia');
                            this.cell_obj[actual[i]].occupied = false;
                        }
                        for (let i = 0; i < futuro.length; i++) {
                            this.cell_obj[futuro[i]].cell.setAttribute('class', this.active_piece.class);
                            this.cell_obj[futuro[i]].occupied = true;
                        }
                    this.active_piece.anchor = sumTwoStrNumArrays(this.active_piece.anchor, '0,1');
                    }
                    else {
                        this.active_piece = '';
                    }
                }
            }, 100);
            
    }

        getActualCells () {
            const result = [this.active_piece.anchor];
            for (let i = 0; i< this.active_piece.points[this.active_piece.position]['points'].length ; i++) {
                result.push(sumTwoStrNumArrays(this.active_piece.points[this.active_piece.position]['points'][i], this.active_piece.anchor));
            }
            return result;
        }

        getSpinFutureCells () {
            const result = [this.active_piece.anchor];
            const new_position = this.active_piece.nextPosition();
            for (let i = 0; i< this.active_piece.points[new_position]['points'].length ; i++) {
                result.push(sumTwoStrNumArrays(this.active_piece.points[new_position]['points'][i], this.active_piece.anchor));
            }
            return result;
        }
        
        getLeftFutureCells () {
            let temp_anchor = sumTwoStrNumArrays(this.active_piece.anchor, '-1,0')
            const result = [temp_anchor];
            for (let i = 0; i< this.active_piece.points[this.active_piece.position]['points'].length ; i++) {
                result.push(sumTwoStrNumArrays(this.active_piece.points[this.active_piece.position]['points'][i], temp_anchor));
            }
            return result;
        }

        getRightFutureCells () {
            let temp_anchor = sumTwoStrNumArrays(this.active_piece.anchor, '1,0');
            const result = [temp_anchor];
            for (let i = 0; i< this.active_piece.points[this.active_piece.position]['points'].length ; i++) {
                result.push(sumTwoStrNumArrays(this.active_piece.points[this.active_piece.position]['points'][i], temp_anchor));
            }
            return result;
        }
        
        checkMovement (futuro) {
        for (let i = 0; i < futuro.length; i++) {
            let temp = futuro[i].split(',');
            let x_futuro = parseInt(temp[0]);
            let y_futuro = parseInt(temp[1]);
            if (x_futuro < 0 || x_futuro > 9) {
                return false;
            }
            if (y_futuro < 0 || y_futuro > 19 ) {
                return false;
            }
        //         if (this.cell_obj[futuro[i]].occupied === true) {
        //             return false;
               
        //     }
            
        }
        return true;
    }
        
        getDownFutureCells () {
            let temp_anchor = sumTwoStrNumArrays(this.active_piece.anchor, '0,1');
            const result = [temp_anchor];
            for (let i = 0; i < this.active_piece.points[this.active_piece.position]['points'].length ; i++) {
                result.push(sumTwoStrNumArrays(this.active_piece.points[this.active_piece.position]['points'][i], temp_anchor));
            }
            return result;
        }
    
        addCell (new_cell) {
            this.cell_obj[new_cell.coordinates.toString()] = new_cell;
            this.div.appendChild(new_cell.cell);
        }

        addPiece (new_piece) {
            this.active_piece = new_piece;
            this.cell_obj[new_piece.anchor].cell.setAttribute('class', new_piece.class);
            this.cell_obj[new_piece.anchor].occupied = true;
            //this.cell_obj[new_piece.anchor].addPiece(new_piece);
            for (let i = 0; i < new_piece.points[new_piece.position]['points'].length; i++) {
                let temp = sumTwoStrNumArrays(new_piece.points[new_piece.position]['points'][i], new_piece.anchor);
                this.cell_obj[temp].cell.setAttribute('class', new_piece.class);
                this.cell_obj[new_piece.anchor].occupied = true;
                this.cell_obj[temp].addPiece(new_piece);

            }
        }

        spinPiece () {
            //calculo futuros espacios ocupados
            const actual = this.getActualCells();
            const futuro = this.getSpinFutureCells();
            if (this.checkMovement(futuro) === true) {
                this.active_piece.position = this.active_piece.nextPosition();
                for (let i = 0; i < actual.length; i++) {
                    this.cell_obj[actual[i]].cell.setAttribute('class', 'celdaVacia');
                    this.cell_obj[futuro[i]].occupied = false;
                }
                for (let i = 0; i < futuro.length; i++) {
                    this.cell_obj[futuro[i]].cell.setAttribute('class', this.active_piece.class);
                    this.cell_obj[futuro[i]].occupied = true;
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

class PieceLoader {
    constructor () {
        this.pieces = ['purple', 'blue', 'green', 'orange'];
        this.insert_point_next_piece_grid = '1,1';
        this.new_piece = ''
        
        }
    
    randomPieceGenerator () {
        let index = Math.floor(this.pieces.length*Math.random());
        if (this.pieces[index] === 'purple') {
            this.new_piece = new PurplePiece (this.insert_point_next_piece_grid);
        }
        else if (this.pieces[index] === 'blue') {
            this.new_piece = new BluePiece (this.insert_point_next_piece_grid);
        }
        else if (this.pieces[index] === 'green') {
            this.new_piece = new GreenPiece (this.insert_point_next_piece_grid);
        }
        else if (this.pieces[index] === 'orange') {
            this.new_piece = new OrangePiece (this.insert_point_next_piece_grid);
        }

    }

    getRandomPiece () {
        let result = this.new_piece;
        this.randomPieceGenerator();
        return result;

    }


    }



class PurplePiece {
    constructor (insert_point) {
        this.class = 'piezaPurpura';
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

class BluePiece {
    constructor (insert_point) {
        this.class = 'piezaAzul';
        this.anchor = insert_point;
        this.points =   [{'anchor': this.anchor, 'points': ['1,0', '1,-1' , '2,-1']},
                         {'anchor': this.anchor, 'points': ['0,1' , '1,1'  , '1,2']},
                         ];
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

class GreenPiece {
    constructor (insert_point) {
        this.class = 'piezaVerde';
        this.anchor = insert_point;
        this.points =   [{'anchor': this.anchor, 'points': ['-1,0', '1,0' , '0,-1']},
                         {'anchor': this.anchor, 'points': ['0,-1' , '1,0'  , '0,1']},
                         {'anchor': this.anchor, 'points': ['-1,0' , '1,0' , '0,1']},
                         {'anchor': this.anchor, 'points': ['0,1', '-1,0', '0,-1']}];
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

class OrangePiece {
    constructor (insert_point) {
        this.class = 'piezaNaranja';
        this.anchor = insert_point;
        this.points =   [{'anchor': this.anchor, 'points': ['-1,0', '0,1' , '1,1']},
                         {'anchor': this.anchor, 'points': ['-1,1' , '-1,0'  , '0,-1']}];
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
    grid.div.setAttribute('class', 'main_grid');
    let purple_piece = new PurplePiece(grid.insert_point);
    let blue_piece = new BluePiece(grid.insert_point);
    let orange_piece = new OrangePiece(grid.insert_point);
    let green_piece = new GreenPiece(grid.insert_point);
    
    for (let i = 0; i<10; i++) {
        for (let j = 0; j<20; j++) {
            new_cell = new Cell (i, j, 35*i, 35*j);
            grid.addCell(new_cell);
        }
    }
    let next_piece_grid = new Grid (175, 175);
    next_piece_grid.div.setAttribute('class', 'nextPieceGrid');
    for (let i = 0; i<5; i++) {
        for (let j = 0; j<5; j++) {
            new_cell = new Cell (i, j, 35*i, 35*j);
            new_cell.cell.setAttribute('class', 'celdaNextPieceGrid');
            next_piece_grid.addCell(new_cell);
        }
    }

    grid.addPiece(purple_piece);
    next_piece_grid.addPiece (green_piece);
    window.addEventListener("keydown", function(event) {
        // console.log(event);
        
        // if (event.defaultPrevented) {
        //     return;
        //}
        if (event.code === "Space") {
            grid.spinPiece();
            
        }

        if (event.code === 'ArrowLeft') {
            grid.left = true;
                   
        }

        if (event.code === 'ArrowRight') {
            grid.right = true;
                   
        }

        event.preventDefault();
        });
    
    window.addEventListener("keyup", function(event) {
        if (event.code === 'ArrowLeft') {
            grid.left = false;}
        if (event.code === 'ArrowRight') { 
            grid.right = false;}
    });

    












}