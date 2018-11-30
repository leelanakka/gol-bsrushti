const {deepEqual, equal} = require('assert');
let horizontalCharacter = String.fromCharCode(9473);
let verticalCharacter = String.fromCharCode(9475);
const {
  initialGrid,
  isCoordinatesGreaterThanBoard,
  generateWorld,
  cartesian,
  validNeighbors,
  findingNeighbors,
  checkForAlive,
  totalAliveNeighbors,
  generateNextWorld,
  getAliveCellsOfNextGeneration,
  cellCoordinates,
  getDimension,
  printBoard
} =  require('../src/util.js'); 

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
    let expectedOutput = [ [ "*" ] ];
    deepEqual(generateWorld(initialGrid(1,1),[[0,0]]),expectedOutput);
  });
  it('should return the grid as per the length',()=>{
    let expectedOutput = [ [ "*", " ", " ", " " ], [ " ", "*", " ", " " ], [ " ", " ", " ", " " ], [ " ", " ", " ", " " ] ]; 
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
    deepEqual(totalAliveNeighbors([0,0], [["*"," "," "],[" ","*"," "],["*"," "," "]]),expectedOutput);
    expectedOutput = 2; 
    deepEqual(totalAliveNeighbors([1,0], [["*"," "," "],[" ","*"," "],[" "," ","*"]]),expectedOutput);
  });
});

describe('generateNextWorld', () => {
  it('should return next generation for given grid',()=>{
    let expectedOutput = [ [ " ", " " ], [ " ", " " ] ]; 
    deepEqual(generateNextWorld([[" "," "],["*"," "]]),expectedOutput);
    expectedOutput = [ [ "*", "*", "*" ], [ "*", "*", "*" ], [ " ", "*", " " ] ]; 
    deepEqual(generateNextWorld([[" ","*"," "],["*","*","*"],[" "," "," "]]),expectedOutput);
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
    deepEqual(checkForAlive([[" "," "],["*"," "]],[1,0]), true);
    deepEqual(checkForAlive([[" "," "," "],["*","*","*"],[" "," "," "]],[2,2]), false);
  });
});

describe('getAliveCellsOfNextGeneration', () => {
  it('should return alive cell co-ordinates',()=>{
    deepEqual(getAliveCellsOfNextGeneration([[" "," "," "],[" "," ","*"],[" "," "," "]],3,3),[[1,2]]);
    deepEqual(getAliveCellsOfNextGeneration([[" "," "," "],["*","*","*"],[" "," "," "]],3,3),[[1,0],[1,1],[1,2]]);
  });
});

describe('cellCoordinates', () => {
  it('should return nothing for giving empty bounds',() => {
    deepEqual(cellCoordinates({topLeft: [], bottomRight: []}),[]);
  });
  it('should return all the cell coordinates which lies in given bound',() => {
    deepEqual(cellCoordinates({topLeft: [0,0], bottomRight: [1,1]}),[[0,0],[0,1],[1,0],[1,1]]);
    let expectedOutput = [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
    deepEqual(cellCoordinates({topLeft: [0,0], bottomRight: [2,2]}), expectedOutput);
  });
});

describe('getDimension', () => {
  it('should return dimension of given board',() => {
    deepEqual(getDimension({topLeft: [0,0], bottomRight: [0,0]}),{height:1, width:1});
    deepEqual(getDimension({topLeft: [0,0], bottomRight: [2,2]}),{height:3, width:3});
  });
});
