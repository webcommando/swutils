// SimpleRoll.js
//
// This macro does a quick roll that includes a trait roll and wild die into the
// chat window.  Great for quick extra rolls without having to create an NPC sheet.
//
// Carl Davis (copyright 2021) - asavageworldsgm@gmail.com
main();

async function main()
{

  let dieSides = 4;

  new Dialog({
    title: "Quick Roll",
    content: "Quick Roller",
    buttons: {
      d4: {
        label: "d4",
        callback: (html) => {
          doRoll(4);
        }
      },
      d6: {
        label: "d6",
        callback: (html) => {
          doRoll(6);
      }
      },
      d8: {
        label: "d8",
        callback: (html) => {
          doRoll(8);
        }
      },
      d10: {
        label: "d10",
        callback: (html) => {
          doRoll(10);
        }
      },
      d12: {
        label: "d12",
        callback: (html) => {
          doRoll(12);
        }
      },

      close: {
        label: "Close"
      }
    }
  }).render(true);

}

// Rolls the trait die passed in and a wild die. The results are sent to the chat window.
function doRoll(dieSides)
{
  //console.log(dieSides);

  // Roll Attack
  let traitRoll = `1d${dieSides}x`;
  let roll = new Roll(traitRoll).roll();
  //
  // Here is the wild die sides ... change if needed for your game.
  //
  let wildDie = 6;
  let wdRoll = new Roll("1d" + wildDie + "x").roll();

  //console.log(roll);
  //console.log(wdRoll);


  ChatMessage.create({
           speaker: {
             alias: ""
           },
           content: "<p><b>Extra Rolls</b>: [" + roll.total + "]; wild die [" + wdRoll.total + "]</p>",
           roll: roll
         });
}
