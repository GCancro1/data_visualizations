const DEAD = 0
const ALIVE = 1
const DYING = -2
const LIVING = 2

export default class Life {
    constructor(b){
        this.board = b
    }


    print_board(){
        console.log("Printing board:");
        for(let r of this.board) {
            console.log(r)
        }
        console.log("end");
        // for(let r in this.board) {
        //     for(let c in this.board[r]){
        //         console.log(r,c)
        //     }
        // }
        
    }
        
    is_alive(row, col){
        if(row < 0 || row > this.board.length-1|| col < 0 || col > this.board[0].length -1)
            return false;
        
        return this.board[row][col] === ALIVE; 
        }

    transition_tile(row, col, step_board){
        if(step_board[row][col] == LIVING){
            // console.log("Coming back to life at:", row, col);
            // anything with living transition goes here
            return 1;
        }
        else if(step_board[row][col] == DYING){
            // console.log("Dying at:", row, col);
            // anything with dying transition goes here
            return 0;
        }
        else 
            return step_board[row][col];
    }


    // returns an array where index correlates to position in 3x3 grid
    // 0    1   2
    // 3    x   4
    // 5    6   7
    get_neighbors(row, col){
        var count = 0;
        // up
        if(this.is_alive(row - 1, col)) {
            count++;
        }
        // down
        if(this.is_alive(row + 1, col)) {
            count++;
        }
        // left
        if(this.is_alive(row, col - 1)) {
            count++;
        }
        // right
        if(this.is_alive(row, col + 1)) {
            count++;
        }
        // up left diagonal
        if(this.is_alive(row - 1, col - 1)) {
            count++;
        }
        // up right diagonal
        if(this.is_alive(row - 1, col + 1)) {
            count++;
        }
        // down left diagonal
        if(this.is_alive(row + 1, col - 1)) {
            count++;
        }
        // down right diagonal
        if(this.is_alive(row + 1, col + 1)) {
            count++;
        }
        return count;
    }

    check_tile(row, col){
        let count = this.get_neighbors(row, col);
        let live = this.is_alive(row, col);
        if(live){
            if(count < 2 | count > 3)
                return DYING;
            else
                return ALIVE;
        }
        else if(count == 3)
            return LIVING;  
        else
            return DEAD;
    }

    run_step(){
        var step_board = [];
        for(let r in this.board) {
            let row = []
            for(let c in this.board[r]){
                // console.log(r, c);
                let tile = this.check_tile(parseInt(r), parseInt(c))
                row.push(tile);
            }
            step_board.push(row);
        }

        return step_board;
    }
// returns new instance of life
    next_state(){
        var step_board = this.run_step();
        var new_board = [];
        for(let r in step_board) {
            let row = []
            for(let c in step_board[r]){
                let tile = this.transition_tile(parseInt(r), parseInt(c), step_board);
                row.push(tile);
            }
            new_board.push(row);
        }
        let new_life =  new Life(new_board);
        return new_life

    }

     empty_board(){
        for(let r in this.board) {
            let row = []
            for(let c in this.board[r]){
                if(this.check_tile(parseInt(r), parseInt(c)) == ALIVE)
                    return false;
            }

        }
        return true;
    }


}


// let board = [[1,2,3], [4,5,6], [7, 8, 9]];
// let board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
// let output = [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
// let life = new Life(board);

// life.print_board();
// let step = life.run_step();
// let new_b = life.next_state(step);

// console.log(step)
// console.log(new_b);

// if( JSON.stringify(new_b) === JSON.stringify(output))
//     console.log("success matched output")