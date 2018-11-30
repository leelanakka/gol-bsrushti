const {deepEqual, equal} = require('assert');
const {
  initialGrid,
  isCoordinatesGreaterThanBoard,
  generateWorld,
  predicate,
  checkRangeForNegativeNumbers,
  cartesian,
  validNeighbors,
  findingNeighbors,
  checkForAlive,
  totalAliveNeighbors,
  checkForNextGenration,
  generateNextWorld,
  getAliveCellsOfNextGeneration,
  fillArray,
  makeCounterFromN,
  getCoordinates,
  filterInputs,
  cellCoordinates,
  getDimension
} =  require('../src/util.js'); 

describe('fillArray',()=>{
  it('should return empty array for 0 as input',()=>{
    deepEqual(fillArray()(0),[]);
  });
  it('should return array for given size and fill that as per input',()=>{
    deepEqual(fillArray(0)(1),[0]);
  });
  it('should return array for given size and fill that as per input',()=>{
    deepEqual(fillArray("a")(2),["a","a"]);
  });
});

describe('initialGrid', () => {
  it('should return the intial grid as per the length',()=>{
    let expectedOutput = [];
    deepEqual(initialGrid(0,0),expectedOutput);
  });
  it('should return the intial grid as per the length',()=>{
    let expectedOutput = [ [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ];
    deepEqual(initialGrid(4,4),expectedOutput);
  });
});

describe('generateWorld', () => {
  it('should return the grid of length one',()=>{
    let expectedOutput = [ [ 1 ] ];
    deepEqual(generateWorld(initialGrid(1,1),[[0,0]]),expectedOutput);
  });
  it('should return the grid as per the length',()=>{
    let expectedOutput = [ [ 1, 0, 0, 0 ], [ 0, 1, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ]; 
    deepEqual(generateWorld(initialGrid(4,4),[[0,0],[1,1]]),expectedOutput);
  });
});

describe('cartesian', () => {
  it('should return possible combinations for set of having 0 as an element',()=>{
    let expectedOutput = [ [ 0, 0 ] ];
    deepEqual(cartesian([0],[0]),expectedOutput);
  });
  it('should return all possible combinations of given sets',()=>{
    let expectedOutput = [ [ 1, 0 ], [ 1, 1 ], [ 0, 0 ], [ 0, 1 ] ];
    deepEqual(cartesian([1,0],[0,1]),expectedOutput);
  });
});

describe('validNeighbors', () => {
  it('should return valid neighbours for [0,0] co-ordinates',()=>{
    let expectedOutput = [];
    deepEqual(validNeighbors(cartesian([0],[0]), [0,0], [3,3]),expectedOutput);
  });
  it('should return valid neighbours for given co-ordinates',()=>{
    let expectedOutput = [ [ 1, 1 ], [ 0, 0 ], [ 0, 1 ] ]; 
    deepEqual(validNeighbors(cartesian([1,0],[0,1]), [1,0],[3, 3]),expectedOutput);
  });
});

describe('findingNeighbors', () => {
  it('should return possible neighbours for [0,0] co-ordinates',()=>{
    let expectedOutput = [ [ 0, 1 ], [ 1, 0 ], [ 1, 1 ] ]; 
    deepEqual(findingNeighbors([3,3], [0,0]),expectedOutput);
  });
  it('should return all possible neighbours for given co-ordinates',()=>{
    let expectedOutput = [ [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 0 ], [ 2, 1 ] ]; 
    deepEqual(findingNeighbors([3,3], [1,0]),expectedOutput);
  });
});

describe('totalAliveNeighbors', () => {
  it('should return total number of alive neighbours of given cell',()=>{
    let expectedOutput = 1;
    deepEqual(totalAliveNeighbors([0,0], [[1,0,0],[0,1,0],[1,0,0]]),expectedOutput);
    expectedOutput = 2; 
    deepEqual(totalAliveNeighbors([1,0], [[1,0,0],[0,1,0],[0,0,1]]),expectedOutput);
  });
});

describe('generateNextWorld', () => {
  it('should return next generation for given grid',()=>{
    let expectedOutput = [ [ 0, 0 ], [ 0, 0 ] ]; 
    deepEqual(generateNextWorld([[0,0],[1,0]]),expectedOutput);
    expectedOutput = [ [ 1, 1, 1 ], [ 1, 1, 1 ], [ 0, 1, 0 ] ]; 
    deepEqual(generateNextWorld([[0,1,0],[1,1,1],[0,0,0]]),expectedOutput);
  });
});

describe('isCoordinatesGreaterThanBoard', () => {
  it('should return true if co-ordinates lies in given board',()=>{
    deepEqual(isCoordinatesGreaterThanBoard([3,3], [2,2]), true);
    deepEqual(isCoordinatesGreaterThanBoard([2,2], [5,5]), false);
  });
});

describe('checkForAlive', () => {
  it('should return true if cell live in given board',()=>{
    deepEqual(checkForAlive([[0,0],[1,0]],[1,0]), true);
    deepEqual(checkForAlive([[0,0,0],[1,1,1],[0,0,0]],[2,2]), false);
  });
});

describe('getAliveCellsOfNextGeneration', () => {
  it('should return alive cell co-ordinates',()=>{
    deepEqual(getAliveCellsOfNextGeneration([[0,0,0],[0,0,1],[0,0,0]],3,3),[[1,2]]);
    deepEqual(getAliveCellsOfNextGeneration([[0,0,0],[1,1,1],[0,0,0]],3,3),[[1,0],[1,1],[1,2]]);
  });
});


