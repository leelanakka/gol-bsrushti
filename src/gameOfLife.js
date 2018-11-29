const initialGrid = function(height,width) {
  let grid = new Array(width).fill(height).map(x => new Array(x).fill(0));
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
  for(let rowIndex = 0; rowIndex < set1.length; rowIndex++) {
    for(let columnIndex = 0; columnIndex < set2.length; columnIndex++) {
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
  let rules = [0,0,currentCellState,1,0,0,0,0,0];
  return rules[neighbourLength];
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

const getAliveCellsOfNextGeneration = function(nextWorld,width,height) { 
  let result = [];
  for(let rowIndex = 0; rowIndex < width; rowIndex++) {
    for(let colomnIndex = 0; colomnIndex < height; colomnIndex++) {
      if(nextWorld[rowIndex][colomnIndex] == 1) {
        result.push([rowIndex,colomnIndex]);
      };
    };
  };
  return result;
};

const fillArray = function(filler){
  return function(length) {
    return new Array(length).fill(filler);
  }
};

const makeCounterFromN = function(start) {
  let counter = start;
  return function (){
    return counter++;
  }
};

const getCoordinates = function(length, initial) { 
  let result = [];
  for(let index = 0; index < length; index++ ) { 
    result.push(initial);
    initial += 1;
  };
  return result;
};

const filterInputs = function(array,list) { 
  return list.some((element) => {
    let result1 = element.every(x=> array.includes(x));
    let result2 = array.every(x=> element.includes(x));
    return result1 && result2;
  });
};

const cellCoordinates = function(bounds){
  let {height, width} = getDimension(bounds);
  let rowCoordinate = getCoordinates(height, bounds.topLeft[0]);
  let columnCoordinate = getCoordinates(width, bounds.topLeft[1]);
  let result  = cartesian(rowCoordinate, columnCoordinate);
  return result;
};

const getDimension = function(bounds) { 
  return {
    height : bounds.bottomRight[0]-bounds.topLeft[0]+1,
    width : bounds.bottomRight[1]-bounds.topLeft[1]+1
  }
};

const nextGeneration = function(currGeneration,bounds) {
  let {topLeft, bottomRight} = bounds;
  let {height, width} = getDimension(bounds);
  let filteredCurrentGeneration = currGeneration.filter((x) => filterInputs(x,cellCoordinates(bounds)));
  filteredCurrentGeneration = filteredCurrentGeneration.map(cell => [cell[0]-topLeft[0],cell[1]-topLeft[1]]);
  let grid = generateWorld(initialGrid(width,height),filteredCurrentGeneration);
  let nextWorld = generateNextWorld(grid);
  return getAliveCellsOfNextGeneration(nextWorld, height, width).map(cell => [cell[0]+topLeft[0],cell[1]+topLeft[1]]);
}

module.exports = { nextGeneration };
