export class ChessBoard {
  static #BOARD_SIZE = 8;
  static #NOT_VISITED_VALUE = -1;
  static #KNIGHT_VALID_MOVES = [
    [1, -2],
    [2, -1],
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
  ];

  constructor() {
    this.clear();
  }

  knightMoves(start, end) {
    this.clear();
    this.visited[start[0]][start[1]] = 0;

    if (!this.equalPosition(start, end)) {
      let cellVisited, moves, currCell;
      let queue = [];

      queue.push(start);

      while (queue.length !== 0) {
        currCell = queue[0];
        queue.shift();
        const possibleCells = this.getValidKnightMoves(currCell);

        for (const cell of possibleCells) {
          cellVisited = this.visited[cell[0]][cell[1]];
          moves = this.visited[currCell[0]][currCell[1]] + 1;

          if (
            cellVisited === ChessBoard.#NOT_VISITED_VALUE ||
            moves < cellVisited
          ) {
            this.visited[cell[0]][cell[1]] = moves;
            this.lastPos[cell[0]][cell[1]] = currCell;

            queue.push(cell); // adding cell to the search
          }

          if (this.equalPosition(cell, end)) {
            queue = [];
            break;
          }
        }
      }
    }
    const path = this.backtrack(end, start);

    console.log(
      `You've made it in ${
        this.visited[end[0]][end[1]]
      } steps! Here's your path: `
    );

    this.printPath(path);
  }

  clear() {
    this.visited = [];
    this.lastPos = [];

    for (let i = 0; i < ChessBoard.#BOARD_SIZE; i++) {
      let rowVisit = [];
      let rowLastPos = [];

      for (let j = 0; j < ChessBoard.#BOARD_SIZE; j++) {
        rowVisit.push(-1);
        rowLastPos.push(null);
      }

      this.visited.push(rowVisit);
      this.lastPos.push(rowLastPos);
    }
  }

  backtrack(end, start) {
    let curr = end;
    const steps = [];
    while (!this.equalPosition(curr, start)) {
      steps.push(curr);
      curr = this.lastPos[curr[0]][curr[1]];
    }
    steps.push(start);
    return steps.reverse();
  }

  getValidKnightMoves(pos) {
    let newPos;
    const valid = [];

    for (let move of ChessBoard.#KNIGHT_VALID_MOVES) {
      newPos = [pos[0] + move[0], pos[1] + move[1]];

      if (this.validCell(newPos)) {
        valid.push(newPos);
      }
    }

    return valid;
  }
  // board functions
  equalPosition(pos1, pos2) {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1];
  }

  validCell(cell) {
    return (
      cell[0] >= 0 &&
      cell[0] < ChessBoard.#BOARD_SIZE &&
      cell[1] >= 0 &&
      cell[1] < ChessBoard.#BOARD_SIZE
    );
  }
  printPath(path) {
    let str = "";
    for (let i = 0; i < path.length; i++) {
      str += `[${path[i][0]},${path[i][1]}]`;
      if (i != path.length - 1) str += " -> ";
    }
    console.log(str);
  }
  boardPrint(matrix) {
    for (let i = 0; i < matrix.length; i++) {
      let string = "";
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === -1) string += ". ";
        else if (matrix[i][j] === null) string += " -  ";
        else string += matrix[i][j] + " ";
      }
      console.log(string);
    }
  }
}
