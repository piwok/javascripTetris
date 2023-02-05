//UTILS//
function sumTwoArrays(array1, array2) {
    return [array1[0] + array2[0], array1[1] + array2[1]];
}

//CLASSES//
class Cell {
    constructor(css_template) {
        this.piece = null;
        this.div = document.createElement('div');
        this.div.style.width = '35px';
        this.div.style.height = '35px';
        this.div.setAttribute('class', css_template);
    }
    setClass(css_template) {
        this.div.setAttribute('class', css_template);
    } 
}




class Grid {
    constructor(width, invisible_height, visible_height, insert_point,css_grid, css_empty_cell) {
        this.width = width;
        this.invisible_height = invisible_height;
        this.visible_height = visible_height;
        this.insert_point = insert_point;
        this.cells_map = new Map();
        this.css_empty_cell = css_empty_cell;
        this.css_grid = css_grid;
        this.active_piece = null;
        this.active_controller = null;
        this.div = document.createElement('div');
        this.div.setAttribute('class', this.css_grid);
        document.getElementById('root').appendChild(this.div);
        let new_cell = null;
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.invisible_height + this.visible_height; j++) {
                if (j < 5) {
                    new_cell = new Cell('invisibleGridCell');
                    this.addCell(new_cell, [i, j]);
                }
                else {
                    new_cell = new Cell(css_empty_cell);
                    this.addCell(new_cell, [i, j]);
                }
            }
        }
    }
    addCell(new_cell, position) {
        this.cells_map.set(position, new_cell);
        this.div.appendChild(new_cell.div);
        new_cell.div.style.top = `${position[1]*35}px`;
        new_cell.div.style.left =`${position[0]*35}px`;

    }
    addPiece(new_piece) {
        this.active_piece = new_piece;
        this.active_piece.anchor = this.insert_point;
    }
    addController(new_controller) {
        this.active_controller = new_controller;
        this.div.addEventListener()
    }
    updateGrid() {
        //to_do//
    }
    checkAndClearLines() {
        //to_do//
    }
}



class Piece {
    static models = {
            'purplePiece': [[[0,-1], [1,0], [2,0]], [[1,0], [0,1], [0,2]], [[0,1], [-1,0], [-2,0]], [[-1,0], [0,-1],[0,-2]]],
            'darkBluePiece': [[[-1,0], [0,-1], [1,-1]], [[0,-1], [1,0], [1,1]]],
            'yellowPiece': [[[0,-1], [-1,0], [-2,0]], [[1,0], [0,-1], [0,-2]], [[0,-1], [1,-1], [2,-1]], [[-1,0], [0,1], [0,2]]],
            'orangePiece': [[[-1,-1], [0,-1], [1,0]], [[1,-1], [1,0], [0,1]]],
            'redPiece': [[[0,-1], [0,-2], [0,-3]], [[1,0], [2,0], [3,0]]],
            'greenPiece': [[[-1,0], [1,0], [0,-1]], [[0,-1], [1,0], [0,1]], [[-1,0], [1,0], [0,1]], [[0,-1], [-1,0], [0,1]]],
            'bluePiece': [[[0,-1], [1,-1], [1,0]]]};
    constructor(model) {
        this.model = model;
        this.points = Piece.models[this.model];
        this.piece_id = Symbol('id');
        this.position = 0;
        this.anchor = null
    }
    getMoveStep(step, type) {
        if (type === true) {
            this.anchor = sumTwoArrays(this.anchor, step);
            const result = [this.anchor];
            this.points[this.position].forEach((point) => {
                result.push(sumTwoArrays(this.anchor, point));
            })
        }
        else {
            const temp_anchor = sumTwoArrays(this.anchor, step);
            const result = [temp_anchor];
            this.points[this.position].forEach((point) => {
                result.push[sumTwoArrays(temp_anchor, point)];
            })
        }
        return result;
        }
    
    getSpinMove(type) {
        if (type === true) {
            if (this.position === this.points.length-1) {
                this.position = 0;
            }
            else {
                this.position++
            }
            const result = [this.anchor];
            this.points[this.position].forEach((point) => {
                result.push(sumTwoArrays(this.anchor, point))
            })
            return result;
        }
        else {
            let temp_position = this.position;
            if (temp_position === this.points.length-1) {
                temp_position = 0;
            }
            else {
                temp_position++;
            }
            const result = [this.anchor];
            this.points[temp_position].forEach((point) => {
                result.push(sumTwoArrays(this.anchor, point));
            })
            return result;
        }
    }
    pullPoint(removed_point) {
        //To do//
    }
    
}
class PieceLoader {
    constructor() {
        this.models = ['purplePiece', 'darkBluePiece', 'bluePiece', 'yellowPiece', 'greenPiece', 'redPiece', 'orangePiece'];
        this.piece = this.RPG();
    }
    RPG() {
        const seed = Math.floor(Math.random() * (this.models.length));
        if (seed === this.models.length) {
            seed = this.models.length-1;
        }
        return new Piece(this.models[seed]);
    }
    popPiece() {
        const piece = this.piece;
        this.piece = this.RPG();
        return piece;
    }
}
class Controller {
    constructor(grid) {
        this.left = false;
        this.right = false;
        this.down = false;
        
    }
}



document.addEventListener('DOMContentLoaded', main);
//Main script//
function main() {
    console.log('weeeeee');
    let grid = new Grid(10, 5, 20, [4, 4], 'mainGrid', 'emptyGridCell');
    let piece_loader = new PieceLoader();
    grid.addPiece(piece_loader.popPiece());


// SetInterval script//
    const main_grid_interval = setInterval(function () {grid.updateGrid();}, 500);

}