//UTILS//
// adds two string format pair of numbers. example: '1,-2' + '2,3' = '3,1'. return is a string as well//
function sumTwoStrNums (str_num1, str_num2) {
    let temp = [];
    const num1 = str_num1.split(',');
    const num2 = str_num2.split(',');
    for(i = 0; i < num1.length; i++) {
        temp[i] = parseInt(num1[i]) + parseInt(num2[i]);
    }
    return temp.toString();
}




//END UTILS//



class Piece {
    constructor (model, insert_point) {
        this.position = 0;
        this.anchor = insert_point;
        if (model === 'purplePiece') {
            this.points = [['0,-1', '1,0', '2,0'], ['1,0', '0,1', '0,2'], ['0,1', '-1,0', '-2,0'], ['-1,0', '0,-1','0,-2']];
            this.class = model;
        }
        else if (model === 'darkBluePiece') {
            this.points = [['-1,0', '0,-1', '1,-1'], ['0,-1', '1,0', '1,1']];
            this.class = model;
        }
        else if (model === 'yellowPiece') {
            this.points = [['0,-1', '-1,0', '-2,0'], ['1,0', '0,-1', '0,-2'], ['0,-1', '1,-1', '1,-2'], ['-1,0', '0,1', '0,2']];
            this.class = model;
        }
        else if (model === 'orangePiece') {
            this.points = [['-1,0', '0,-1', '-1,-1'], ['0,1', '1,0', '1,-1']];
            this.class = model;
        }
        else if (model === 'redPiece') {
            this.points = [['0,-1', '0,-2', '0,-3'], ['1,0', '2,0', '3,0']];
            this.class = model;
        }
        else if (model === 'greenPiece') {
            this.points = [['-1,0', '1,0', '0,-1'], ['0,-1', '1,0', '0,1'], ['-1,0', '1,0', '0,1'], ['0,-1', '-1,0', '0,1']];
            this.class = model;
        }
        else if (model === 'bluePiece') {
            this.points = [['0,-1', '1,-1', '1,0']];
            this.class = model;
        }
    }
    //this method MODIFY the actual points.
    //step: is the coordinates of the movement. examples: '-1,0'(left), '1,0'(right) and '0,1'(down)
    //spin: indicates if we want to spin the piece. 'false': not spin and 'true' a 90 degress spin clockwise.
    //type: indicates if the new coordinates are real or only a data to check a future movement. 'true': the modifications are real. 'false': the object piece is unchanged.
    movePiece (step, spin, type) {
        const temp_anchor = sumTwoStrNums(this.anchor, step);
        let temp_position = this.position;
        if (spin === true) {
                if (temp_position === this.points.length-1) {
                temp_position = 0;}
            else {
                temp_position++}
            }
        const result = [temp_anchor];
        for (let i = 0; i<this.points[temp_position].length; i++) {
            const temp_new_element = sumTwoStrNums(temp_anchor, this.points[temp_position][i]);
            result.push(temp_new_element);
        }
        if (type === true) {
            this.anchor = temp_anchor;
            this.position = temp_position;
        }
        return result
    }

    
}


// a = new Piece ('blue', '1,1');
// console.log(a.movePiece('0,0', true, true));
// console.log(a.anchor);
// console.log(a.position);


class PieceLoader {
    constructor() {
        this.pieces = ['purplePiece', 'darkBluePiece', 'bluePiece', 'yellowPiece', 'greenPiece', 'redPiece', 'orangePiece'];
        this.insert_point = '1,1';
        this.piece = false;
        this.RPG();

    }
    //Random Piece Generator//
    RPG ()  {
        const seed = Math.floor(Math.random()*this.pieces.length);
        if (seed === 7) {
            seed = 6;
        }
        this.piece = new Piece(this.pieces[seed], this.insert_point);
    }
    //Pop and return the piece and generate a new random piece// 
    popPiece () {
        const result = this.piece;
        this.RPG();
        return result;
    }
}

// PL = new PieceLoader();
// console.log(PL);
// console.log(PL.piece);
// PL.RPG();
// console.log(PL.piece);
// console.log(PL.popPiece());
// console.log(PL.popPiece());
// console.log(PL.popPiece());
// console.log(PL.popPiece());
// console.log(PL.popPiece());



//Cell objects are meaning to fill a object grid//
//this.cell keeps the piece in that cell, is equal a 'empty' if is unocupied//
//this.div is the html tag of a div.

class Cell {
    constructor (x_pos, y_pos) {
        //Logical data
        this.cell = 'empty';
        
        
        //Graphical data
        this.div = document.createElement ('div');
        this.div.setAttribute('class', 'celdaVacia');
        this.div.style.left = `${this.x_pos}px`;
        this.div.style.top = `${this.y_pos}px`;
    }

    setClass (new_class) {
        this.div.setAttribute('class', new_class);
    }

    isOccupied () {
        if (this.cell != 'empty') {
            return false;
        }
        return true;
    }

    setPiece (piece) {
        this.cell = piece;
    }

}

class Grid {
    constructor (width, height, insert_point) {
        this.width = width;
        this.height = height;
        this.insert_point = insert_point;
        this.active_piece = false;
        this.left = false;
        this.right = false;




        //Graphical variables//
        this.cell_obj = {};
        this.div = document.createElement('div');
        this.div.style.width = `${this.width}px`;
        this.div.style.height = `${this.height}px`;
        document.getElementById('root').appendChild(this.div);
    }


    getActualCells () {
    
        }

        

    checkMovement (futuro) {
    
    }

    getFutureCells () {

        }

            
    addPiece (new_piece) {

        }




    