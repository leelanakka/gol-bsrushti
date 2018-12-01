const readline = require('readline-sync').question;
const { nextGeneration,returnGrid } = require('./src/gameOfLife.js');
const { printBoard } = require('./src/util.js'); 
let currentGeneration = readline("enter the current generation co-ordinates: ");
let bounds = readline("enter the bounds: ");
currentGeneration = JSON.parse(currentGeneration);
bounds = JSON.parse(bounds);
const main = function() {
  console.clear();
  let result = returnGrid(currentGeneration, bounds); 
  currentGeneration = nextGeneration(currentGeneration, bounds);
  console.log(printBoard(result).join("\n")); 
};

setInterval(main, 500);
