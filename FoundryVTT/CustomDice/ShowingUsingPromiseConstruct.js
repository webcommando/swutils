let stresstable = game.tables.getName("My Dice");

let numDice = 1;

stresstable.drawMany(numDice);

// complex call if you want to use the results of the draw.
// the roll() function is easier if that is what you need.
/**
let p = stresstable.drawMany(numDice);
p.then(
  function(result) { console.log(result.results); },
  function(error) { }
);
**/
