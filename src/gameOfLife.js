const initialGrid = function(size) {
  let grid = new Array(size).fill(size).map(x => new Array(x).fill(0));
  return grid;
};

const isCoordinatesGreaterThanBoard = function(boardSize, cell) {
  return (cell[0] < boardSize && cell[1] < boardSize);
};

const generateWorld  = function(grid,aliveCells) {
  for(let aliveCell of aliveCells) {
    grid[aliveCell[0]][aliveCell[1]] = 1;
  };
  return grid;
};

const predicate = function(cell, neighbour) {
  return !(cell[0]==neighbour[0] && cell[1]==neighbour[1]);
};

const checkRangeForNegativeNumbers = function(cell) {
  return (cell[0] >= 0 && cell[1] >= 0);
};

const cartesian = function(set1,set2) {
  let resultSet = [];
  let length = set1.length;
  for(let rowIndex = 0; rowIndex < length; rowIndex++) {
    for(let columnIndex = 0; columnIndex < length; columnIndex++) {
      resultSet.push([set1[rowIndex],set2[columnIndex]]);
    };
  };
  return resultSet;
};

const validNeighbors = function(possibleNeighbors, cell, size) {
  let isVallid = predicate.bind(null,cell);
  let validNeighbors = possibleNeighbors.filter(isVallid);
  validNeighbors = validNeighbors.filter(checkRangeForNegativeNumbers);
  let checkGreaterThanBoard = isCoordinatesGreaterThanBoard.bind(null,size);
  validNeighbors = validNeighbors.filter(checkGreaterThanBoard);
  return validNeighbors;
};

const findingNeighbors = function(size, cell) {
  let rowCoordinates = [cell[0]-1, cell[0], cell[0]+1];
  let coloumnCoordinates = [cell[1]-1, cell[1], cell[1]+1];
  let possibleNeighbors = cartesian(rowCoordinates, coloumnCoordinates);
  let neighbors = validNeighbors(possibleNeighbors, cell, size);
  return neighbors;
};

const checkForAlive = function(grid, neighbour) {
  return grid[neighbour[0]][neighbour[1]] == 1;
};

const totalAliveNeighbors = function(cell, grid) {
  let neighbors = findingNeighbors(grid.length, cell);
  let isAlive = checkForAlive.bind(null, grid);
  let aliveNeighbor = neighbors.filter(isAlive);
  return aliveNeighbor.length;
};

const checkForNextGenration = function(currentCellState,neighbourLength) {
  let rules = [[0,0,0,1,0,0,0,0,0],[0,0,1,1,0,0,0,0,0]];
  return rules[currentCellState][neighbourLength];
};

const generateNextWorld  = function(initialWorld) {
  let nextWorld = initialWorld.map(x=>x.slice());
  for( let index = 0; index < initialWorld.length; index ++) {
    for(let i = 0; i < initialWorld.length; i++ ) {
      let noOfAliveNeighbours = totalAliveNeighbors([index,i],initialWorld);
      let nextState = checkForNextGenration(initialWorld[index][i],noOfAliveNeighbours);
      nextWorld[index][i] = nextState;
    };
  };
  return nextWorld;
}

const getAliveCellsOfNextGeneration = function(nextWorld, size) { 
  let result = [];
  for(let rowIndex = 0; rowIndex < size; rowIndex++) {
    for(let colomnIndex = 0; colomnIndex < size; colomnIndex++) {
      if(nextWorld[rowIndex][colomnIndex] == 1) {
        result.push([rowIndex,colomnIndex]);
      };
    };
  };
  return result;
};

const nextGeneration = function(currGeneration,bounds) {
  let size = bounds.bottomRight[0];
  let grid = generateWorld(initialGrid(size),currGeneration);
  let nextWorld = generateNextWorld(grid);
  return getAliveCellsOfNextGeneration(nextWorld, size);
}

module.exports = { nextGeneration };
