// Import Adventure Deck.
// Super simple script to load the adventure cards into Foundry into "Deck"
// Folder (assumes have the folder module installed).
//
// Assumes using the official swade VTT bundle with names
// 'Adventure_Deck_nn.png' where nn is a number from 01 to 53
//
// By: Carl Davis
//

// Change to the path where your adventure cards are stored.  (testsw in this case
// is the name of my world's top level folder and I have the cards in a folder called Adventure)

let myPath = 'worlds/testsw/Adventure/';

// Chamnge 'Deck' to the name of the folder you created in the Journal tab.
let folder = game.folders.find(item => item.data.name == "Deck");

for (let i=1; i<54; i++)
{
  let text = "";
  if (i<10)
  {
    text = "0";
  }

  let actor = JournalEntry.create({
    name: "Adventure Card " + i,

    img: myPath + "Adventure_Deck_" + text + i + ".png",
    folder: folder.data._id,
    //sort: 12000,
    data: {},
    //token: {},
    items: [],
    flags: {}
  });
};
