//UTILS//
function sumTwoArrays(array1, array2) {
    return [array1[0] + array2[0], array1[1] + array2[1]];
}

//CLASSES//
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
        this.piece_id = Symbol();
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
            seed = 6;
        }
        return new Piece(this.models[seed]);
    }
    popPiece() {
        const piece = this.piece;
        this.piece = this.RPG();
        return piece;
    }
}



document.addEventListener('DOMContentLoaded', main);
//Main script//
function main() {
    console.log('weeeeee');















// SetInterval script//



}