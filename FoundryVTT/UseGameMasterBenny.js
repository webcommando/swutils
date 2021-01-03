// UseGameMasterBenny.js
//
// This macro uses a benny from an actor called 'GameMaster'.  Create an Actor called GameMaster,
// give the appropriate amount of bennies and then use this macro to use them.  This is designed for the
// official PEG character sheet and module.
//
// Carl Davis (Copyright 2021) - asavageworldsgm@gmail.com
//
main()

async function main(){

  let actor = game.actors.filter(item => item.data.name == "GameMaster");

  if (actor.length == 0 || actor.length >1)
  {
    console.log ("UseGameMasterBenny: Need only one GameMaster actor.");
    ui.notifications.error("Need exactly one actor defined call 'GameMaster' to use a benny.");
  }

  let bennies = actor[0].data.data.bennies.value;
  console.log ("GM Has Bennies:" + bennies);

  if (bennies == 0)
  {
    ui.notifications.error("Game Master is out of GM bennies.");
  }
  else {
    bennies--;
    actor[0].data.data.bennies.value = bennies;


    let chatTemplate = `
    <p> GM Used benny and has ${bennies} bennies.</p>

    `

    ChatMessage.create({
    speaker: {
      alias: ""
    },
    content: chatTemplate,

    });
  }

}
