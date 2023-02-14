//UTILS//
function sumTwoStrNums (str_num1, str_num2) {
    let temp = [];
    const num1 = str_num1.split(',');
    const num2 = str_num2.split(',');
    for(let i = 0; i < num1.length; i++) {
        temp[i] = parseInt(num1[i]) + parseInt(num2[i]);
    }
    return temp.toString();
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
    constructor(width, invisible_height, visible_height, insert_point,css_grid, css_empty_cell, tab_index) {
        
        this.width = width;
        this.invisible_height = invisible_height;
        this.visible_height = visible_height;
        this.insert_point = insert_point;
        this.cells_map = new Map();
        this.css_empty_cell = css_empty_cell;
        this.css_grid = css_grid;
        this.active_piece = null;
        this.active_controller = null;
        this.piece_loader = null;
        this.animation_counter = 0;
        this.animation_speed = 4;
        this.div = document.createElement('div');
        this.div.setAttribute('class', this.css_grid);
        document.getElementById('root').appendChild(this.div);
        this.div.tabIndex = tab_index;
        this.div.focus({preventScroll: true});
        let new_cell = null;
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.invisible_height + this.visible_height; j++) {
                if ((j < 5) && (this.css_grid != 'nextPieceGrid')) {
                    new_cell = new Cell('invisibleGridCell');
                    this.addCell(new_cell, `${i},${j}`);
                }
                else {
                    new_cell = new Cell(css_empty_cell);
                    this.addCell(new_cell, `${i},${j}`);
                }
            }
        }
    }
    addCell(new_cell, position) {
        this.cells_map.set(position, new_cell);
        let temp = position.split(',');
        let top = parseInt(temp[1])*35;
        top.toString();
        top = top + 'px'
        let left = parseInt(temp[0])*35;
        left.toString();
        left = left + 'px';
        this.div.appendChild(new_cell.div);
        new_cell.div.style.top = top;
        new_cell.div.style.left = left;

    }
    addPiece(new_piece) {
        this.active_piece = new_piece;
        this.active_piece.anchor = this.insert_point;
    }
    displayPiece(new_piece) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                this.cells_map.get(`${i},${j}`).setClass('nextPieceGridCell');
            }
        }
        this.active_piece = new_piece;
        this.active_piece.anchor = this.insert_point;
        this.active_piece.getMoveStep('0,0', false).forEach((point) => {
            this.cells_map.get(point).setClass(this.active_piece.model);
        })
    }
    addController(new_controller) {
        this.active_controller = new_controller;
    }
    addPieceLoader(new_piece_loader) {
        this.piece_loader = new_piece_loader;
    }
    isValidCoordinates(new_points) {
        let result = true
        new_points.forEach((point) => {
            
            if (!(this.cells_map.has(point))) {
                result = false;
            }
            else if (this.cells_map.get(point).piece != null) {
                if (this.cells_map.get(point).piece.piece_id != this.active_piece.piece_id) {result = false}
            }
        })
        return result;
    }
    updateGrid() {
        const parameters = this.active_controller.getParameters();
        if (parameters['left'] === true) {
            if (this.isValidCoordinates(this.active_piece.getMoveStep('-1,0', false))) {
                this.active_piece.getMoveStep('0,0', false).forEach((point) => {
                    if (parseInt(point.split(',')[1]) > 4) {
                        this.cells_map.get(point).piece = null;
                        this.cells_map.get(point).setClass('emptyGridCell');
                    }
                })
                this.active_piece.getMoveStep('-1,0', true).forEach((point) => {
                    if (parseInt(point.split(',')[1]) > 4) {
                        this.cells_map.get(point).piece = this.active_piece;
                        this.cells_map.get(point).setClass(this.active_piece.model);
                    }
                })
            }
        }
        if (parameters['right'] === true) {
            if (this.isValidCoordinates(this.active_piece.getMoveStep('1,0', false))) {
                this.active_piece.getMoveStep('0,0', false).forEach((point) => {
                    if (parseInt(point.split(',')[1]) > 4) {
                        this.cells_map.get(point).piece = null;
                        this.cells_map.get(point).setClass('emptyGridCell');
                    }
                })
                this.active_piece.getMoveStep('1,0', true).forEach((point) => {
                    if (parseInt(point.split(',')[1]) > 4) {
                        this.cells_map.get(point).piece = this.active_piece;
                        this.cells_map.get(point).setClass(this.active_piece.model);
                    }
                })
            }
        }
        if (parameters['space'] === true) {
            if (this.isValidCoordinates(this.active_piece.getSpinMove(false))) {
                this.active_piece.getMoveStep('0,0', false).forEach((point) => {
                    if (parseInt(point.split(',')[1]) > 4) {
                        this.cells_map.get(point).piece = null;
                        this.cells_map.get(point).setClass('emptyGridCell');
                    }
                })
                this.active_piece.getSpinMove(true).forEach((point) => {
                    if (parseInt(point.split(',')[1]) > 4) {
                        this.cells_map.get(point).piece = this.active_piece;
                        this.cells_map.get(point).setClass(this.active_piece.model);
                    }
                })
            }
        }
        if (parameters['down'] === true) {
            this.animation_counter = 4;
        }
        if (this.animation_counter === this.animation_speed) {
            if (this.isValidCoordinates(this.active_piece.getMoveStep('0,1', false))) {
                this.active_piece.getMoveStep('0,0', false).forEach((point) => {
                    if (parseInt(point.split(',')[1]) > 4) {
                        this.cells_map.get(point).piece = null;
                        this.cells_map.get(point).setClass('emptyGridCell');
                    }
                })
                this.active_piece.getMoveStep('0,1', true).forEach((point) => {
                    if (parseInt(point.split(',')[1]) > 4) {
                        this.cells_map.get(point).piece = this.active_piece;
                        this.cells_map.get(point).setClass(this.active_piece.model);
                    }
                })
            }
            else {
                this.checkAndClearLines();
                this.addPiece(this.piece_loader.popPiece());
            }
            this.animation_counter = 0;
        }
        else {
            this.animation_counter++;
        }
    }
    checkAndClearLines() {
        for (let j = 24; j > 4; j--) {
            let flag = true;
            for (let i = 0; i < 10; i++) {
                if (this.cells_map.get(`${i},${j}`).piece === null) {flag = false;}
            }
            if (flag === true) {
                for (let i = 0; i < 10; i++) {
                    this.cells_map.get(`${i},${j}`).piece = null;
                    this.cells_map.get(`${i},${j}`).setClass('whiteGridCell')
                }
                for (let jj = j; jj > 4; jj--) {
                    for (let ii = 0; ii < 10; ii++) {
                        this.cells_map.get(`${ii},${jj}`).piece = this.cells_map.get(`${ii},${jj-1}`).piece;
                        if (this.cells_map.get(`${ii},${jj-1}`).piece === null) {
                            this.cells_map.get(`${ii},${jj}`).setClass('emptyGridCell');
                        }
                        else {
                            this.cells_map.get(`${ii},${jj}`).setClass(this.cells_map.get(`${ii},${jj-1}`).piece.model);
                        }
                    }
                }
                j = j + 1;
            }   
        }
    }
}



class Piece {
    static models = {
            'purplePiece': [['0,-1', '1,0', '2,0'], ['1,0', '0,1', '0,2'], ['0,1', '-1,0', '-2,0'], ['-1,0', '0,-1','0,-2']],
            'darkBluePiece': [['-1,0', '0,-1', '1,-1'], ['0,-1', '1,0', '1,1']],
            'yellowPiece': [['0,-1', '-1,0', '-2,0'], ['1,0', '0,-1', '0,-2'], ['0,-1', '1,-1', '2,-1'], ['-1,0', '0,1', '0,2']],
            'orangePiece': [['-1,-1', '0,-1', '1,0'], ['1,-1', '1,0', '0,1']],
            'redPiece': [['0,-1', '0,-2', '0,-3'], ['1,0', '2,0', '3,0']],
            'greenPiece': [['-1,0', '1,0', '0,-1'], ['0,-1', '1,0', '0,1'], ['-1,0', '1,0', '0,1'], ['0,-1', '-1,0', '0,1']],
            'bluePiece': [['0,-1', '1,-1', '1,0']]};
    constructor(model) {
        this.model = model;
        this.points = Piece.models[this.model];
        this.piece_id = Symbol('id');
        this.position = 0;
        this.anchor = null
    }
    getMoveStep(step, type) {
        let result = [];
        if (type === true) {
            this.anchor = sumTwoStrNums(this.anchor, step);
            result.push(this.anchor);
            this.points[this.position].forEach((point) => {
                result.push(sumTwoStrNums(this.anchor, point));
            })
        }
        else {
            let temp_anchor = sumTwoStrNums(this.anchor, step);
            result.push(temp_anchor);
            this.points[this.position].forEach((point) => {
                result.push(sumTwoStrNums(temp_anchor, point));
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
                result.push(sumTwoStrNums(this.anchor, point))
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
                result.push(sumTwoStrNums(this.anchor, point));
            })
            return result;
        }
    }
    pullPoint(removed_point) {
        //To do//
    }
}
class PieceLoader {
    constructor(main_grid, secondary_grid) {
        this.main_grid = main_grid;
        this.secondary_grid = secondary_grid;
        this.models = ['purplePiece', 'darkBluePiece', 'bluePiece', 'yellowPiece', 'greenPiece', 'redPiece', 'orangePiece'];
        this.piece = this.RPG();
        this.main_grid.addPiece(this.popPiece());
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
        this.secondary_grid.displayPiece(this.piece);
        return piece;
    }
}
class Controller {
    constructor(main_grid) {
        this.main_grid = main_grid;
        this.left = false;
        this.right = false;
        this.down = false;
        this.space = false;
        this.active = false;
        this.key_down_function = (event) => {
            if (this.main_grid.active_piece != null) {
                if (event.code === "ArrowLeft") {this.left = true;}
                else if (event.code === "ArrowRight"){this.right = true;}
                else if (event.code === "ArrowDown"){this.down = true;}
                else if (event.code === 'Space') {this.space = true;}
            }
            document.querySelector('.mainGrid').addEventListener("keyup", this.key_up_function, {once:true});
        }
        this.key_up_function = (event) => {
            if (this.main_grid.active_piece != null) {
                if (event.code === "ArrowLeft") {this.left = false;} 
                else if (event.code === "ArrowRight"){this.right = false;}
                else if (event.code === "ArrowDown"){this.down = false;}
                else if (event.code === 'Space') {this.space = false;}
            }
            document.querySelector('.mainGrid').addEventListener("keydown", this.key_down_function, {once:true});
        }
        document.querySelector('.mainGrid').addEventListener("keydown", this.key_down_function, {once:true});
        document.querySelector('.mainGrid').focus();
    }
    getParameters() {
        if (this.active === false) {
            return {'left': false, 'right': false, 'down': false, 'space': false}; 
        }
        else {
            return {'left': this.left, 'right': this.right, 'down': this.down, 'space': this.space}
        }
    }
    setState(new_state) {
        this.active = new_state;
    }
}





document.addEventListener('DOMContentLoaded', main);
//Main script//
function main() {
    let secondary_grid = new Grid(6, 0, 6, '3,3', 'nextPieceGrid', 'NextPieceGridCell', -1);
    let main_grid = new Grid(10, 5, 20, '4,4', 'mainGrid', 'emptyGridCell', 1);
    
    let piece_loader = new PieceLoader(main_grid, secondary_grid);
    // secondary_grid.addPiece(piece_loader.popPiece());
    let main_controller = new Controller(main_grid);
    main_grid.addPieceLoader(piece_loader);
    main_grid.addController(main_controller);
    main_grid.addPiece(piece_loader.popPiece());
    main_grid.active_controller.setState(true);
 // SetInterval script//
    let main_grid_interval = setInterval(() => {main_grid.updateGrid();}, 100);

}