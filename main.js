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
        if (model === 'purple') {
            this.points = [['0,-1', '1,0', '2,0'], ['1,0', '0,1', '0,2'], ['0,1', '-1,0', '-2,0'], ['-1,0', '0,-1','0,-2']];
            this.class = 'purplePiece' 
        }
        else if (model === 'darkBlue') {
            this.points = [['-1,0', '0,-1', '1,-1'], ['0,-1', '1,0', '1,1']];
            this.class = 'darkBluePiece'
        }
        else if (model === 'yellow') {
            this.points = [['0,-1', '-1,0', '-2,0'], ['1,0', '0,-1', '0,-2'], ['0,-1', '1,-1', '1,-2'], ['-1,0', '0,1', '0,2']];
            this.class = 'yellowPiece';
        }
        else if (model === 'orange') {
            this.points = [['-1,0', '0,-1', '-1,-1'], ['0,1', '1,0', '1,-1']];
            this.class = 'orangePiece';
        }
        else if (model === 'red') {
            this.points = [['0,-1', '0,-2', '0,-3'], ['1,0', '2,0', '3,0']];
            this.class = 'redPiece';
        }
        else if (model === 'green') {
            this.points = [['-1,0', '1,0', '0,-1'], ['0,-1', '1,0', '0,1'], ['-1,0', '1,0', '0,1'], ['0,-1', '-1,0', '0,1']];
            this.class = 'greenPiece'
        }
        else if (model === 'blue') {
            this.points = [['0,-1', '1,-1', '1,0']];
            this.class = 'bluePiece';
        }
    }
    //this method MODIFY the actual points.
    //step: is the coordinates of the movement. examples: '1,0'(left), '0,1'(right) and '0,1'(down)
    //spin: indicates if we want to spin the piece. 'false': not spin and 'true' a 90 degress spin clockwise.
    //type: indicates if the new coordinates are real or only a data to check a future movement. 'true': the modifications are real. 'false': the object piece is unchanged.
    movePiece (step, spin, type) {
        const temp_anchor = sumTwoStrNums(this.anchor, step);
        let temp_position = this.position;
        if (spin === true) {
            console.log(temp_position);
            console.log(this.points[0]);
            if (temp_position === this.points.length-1) {
                temp_position = 0;}
            else {
                temp_position++}
            }
        const result = [temp_anchor];
        for (let i = 0; i<this.points[temp_position].length; i++) {
            let temp_new_element = sumTwoStrNums(temp_anchor, this.points[temp_position][i]);
            result.push(temp_new_element);
        }
        if (type === true) {
            this.anchor = temp_anchor;
            this.position = temp_position;
        }
        return result
    }

    
}


a = new Piece ('blue', '1,1');
console.log(a.movePiece('0,0', true, true));
console.log(a.anchor);
console.log(a.position);




