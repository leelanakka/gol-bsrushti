const assert = require('assert');
const {nextGeneration} = require('../src/gameOfLife.js');

const contains = (list,element) => list.some(e=>e[0]===element[0] && e[1]===element[1]);
const isSame = (actualList,expectedList) => actualList.every(contains.bind(null,expectedList));
const isSameArity = (actualList,expectedList) => actualList.length == expectedList.length;

describe('nextGeneration',() => {
  it('should generate an empty generation for a current generation that contains only one live cell',() => {
    let currentGeneration = [[0,1]];
    let bounds = {topLeft: [0,0], bottomRight: [3,3]};
    let actualNextGen = nextGeneration(currentGeneration,bounds);
    assert.deepEqual(actualNextGen,[]);
  });

  it('should generate next generation as per the current generation',()=> {
    let currentGeneration = [[0,1],[0,2],[333,444],[443,447],[445,447],[444,448]];
    let bounds = { topLeft: [443,447], bottomRight: [445,449]};
    let expectedNextGen = [[444,447],[444,448]];
    let actualNextGen = nextGeneration(currentGeneration,bounds);
    assert.deepEqual(actualNextGen, expectedNextGen);
  });

  it('should handle for negative co-ordinates ',()=> {
    let currentGeneration = [[-1,0],[0,-1],[0,0]];
    let bounds = { topLeft: [-1,-1], bottomRight: [0,0]};
    let expectedNextGen = [[-1,-1],[-1,0],[0,-1],[0,0]];
    let actualNextGen = nextGeneration(currentGeneration,bounds);
    assert.deepEqual(actualNextGen, expectedNextGen);
  });

  it('should handle for negative co-ordinates for rectangle',()=> {
    let currentGeneration = [[-2,-5],[-1,-6],[-1,-4]];
    let bounds = { topLeft: [-2,-6], bottomRight: [-1,-4]};
    let expectedNextGen = [[-2,-5],[-1,-5]];
    let actualNextGen = nextGeneration(currentGeneration,bounds);
    assert.deepEqual(actualNextGen, expectedNextGen);
  });

  it('should generate next generation as same as the present generation',()=>{
    let currentGeneration = [[0,1],[0,2],[1,0],[1,3],[2,1],[2,2]];
    let bounds = { topLeft: [0,0], bottomRight: [3,3]};
    let expectedNextGen = [[0,1],[0,2],[1,0],[1,3],[2,1],[2,2]];
    let actualNextGen = nextGeneration(currentGeneration,bounds);
    assert.deepEqual(actualNextGen, expectedNextGen);
  });
  it('should generate next generation as same as the present generation',()=>{
    let currentGeneration = [[1,2],[1,3],[2,1],[2,4],[3,2],[3,3]];
    let bounds = { topLeft: [0,0], bottomRight: [4,4]};
    let expectedNextGen =  [[1,2],[1,3],[2,1],[2,4],[3,2],[3,3]];
    let actualNextGen = nextGeneration(currentGeneration,bounds);
    assert.deepEqual(actualNextGen, expectedNextGen);
  });
  it('should generate a vertical blinker as the next step of a horizontal blinker',() => {
    let currentGeneration = [[0,1],[1,1],[2,1]];
    let expectedNextGen = [[1,0],[1,1],[1,2]]
    let bounds = {topLeft: [0,0], bottomRight: [3,3]};
    let actualNextGen = nextGeneration(currentGeneration,bounds);
    assert.ok(isSame(actualNextGen,expectedNextGen));
    assert.ok(isSameArity(actualNextGen,expectedNextGen));
  });
  it('should generate next generation for rectangle pattern of 2*4',()=>{
    let currentGeneration = [[0,1],[0,2],[1,0],[1,3],[2,1],[2,2]];
    let bounds = { topLeft: [0,0], bottomRight: [2,3]};
    let expectedNextGen =   [[0,1],[0,2],[1,0],[1,3],[2,1],[2,2]];
    let actualNextGen = nextGeneration(currentGeneration,bounds);
    assert.deepEqual(actualNextGen, expectedNextGen);
  });

  it('should kill cells not within bounds',() => {
    let currentGeneration = [[0,1],[0,2],[0,3]];
    let expectedNextGen = []
    let bounds = {topLeft: [1,1], bottomRight: [3,3]};
    let actualNextGen = nextGeneration(currentGeneration,bounds);
    assert.ok(isSame(actualNextGen,expectedNextGen));
    assert.ok(isSameArity(actualNextGen,expectedNextGen));
  });
});
