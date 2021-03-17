// GiveBenny.js
//
// This macro gives a benny to all the selected tokens (linked actor).  Select the
// tokens and click on the macro to increase the actor's bennies by one without needing
// to open the sheet.
//
// Carl Davis (copyright 2021) - asavageworldsgm@gmail.com
//
main()

async function main(){

  //console.log("Tokens: ", canvas.tokens.controlled)
  if(canvas.tokens.controlled.length == 0)
  {
    ui.notifications.error("Please select a token or tokens.");
    return;
  }

  // Loop through every selected token and get the actor to change.
  for (let i=0; i< canvas.tokens.controlled.length; i++)
  {
    let actor = canvas.tokens.controlled[i].actor;

    let bennies = actor.data.data.bennies.value;

    bennies = bennies + 1;

    // GiveBenny.js
    //
    // This macro gives a benny to all the selected tokens (linked actor).  Select the
    // tokens and click on the macro to increase the actor's bennies by one without needing
    // to open the sheet.
    //
    // Carl Davis (copyright 2021) - asavageworldsgm@gmail.com
    //
    main()

    async function main(){

      //console.log("Tokens: ", canvas.tokens.controlled)
      if(canvas.tokens.controlled.length == 0)
      {
        ui.notifications.error("Please select a token or tokens.");
        return;
      }

      // Loop through every selected token and get the actor to change.
      for (let i=0; i< canvas.tokens.controlled.length; i++)
      {
        let actor = canvas.tokens.controlled[i].actor;

        let bennies = actor.data.data.bennies.value;
        bennies = bennies + 1;

        actor.update({
        data: {
            bennies: {
                value: bennies
            }
        }
      });


        //actor.data.data.bennies.value = bennies;
        //console.log("Bennies After: ", actor.data.data.bennies.value);

        ui.notifications.info("Added Benny for: " + actor.data.name);

        let chatTemplate = `
        <p> Gave ${actor.name} a benny for total of ${bennies} bennies. </p>

        `

        ChatMessage.create({
        speaker: {
          alias: actor.name
        },
        content: chatTemplate,

      });


      }

    }


    actor.data.data.bennies.value = bennies;
    //console.log("Bennies After: ", actor.data.data.bennies.value);

    ui.notifications.info("Added Benny for: " + actor.data.name);

    let chatTemplate = `
    <p> Gave ${actor.name} a benny for total of ${bennies} bennies. </p>

    `

    ChatMessage.create({
    speaker: {
      alias: actor.name
    },
    content: chatTemplate,

  });


  }

}
