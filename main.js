const readline = require('readline-sync').question;
const { nextGeneration,returnGrid } = require('./src/gameOfLife.js');
const { printBoard } = require('./src/util.js'); 
const main = function() { 
  let currentGeneration = readline("enter the current generation co-ordinates: ");
  let bounds = readline("enter the bounds: ");
  console.log(printBoard(returnGrid(JSON.parse(currentGeneration), JSON.parse(bounds))).join("\n")); 
};

main();
