// StatusCheck.js
//
// This macro reports the current status of the token selected. The statuses reported are
// those that have checkboxes on the character sheet (bound, entangeled, distracted, etc...).
// The dialog box also provides a little description of the status as well.
//
// Carl Davis (copyright 2021) - asavageworldsgm@gmail.com
//
main();

async function main()
{
  // Only One Toke!
  if(canvas.tokens.controlled.length == 0 || canvas.tokens.controlled.length > 1)
  {
    ui.notifications.error("Please select a single token.");
    return;
  }

  // Get the current actor selected.
  let actor = canvas.tokens.controlled[0].actor;
  let stats = actor.data.data.status;

  let statuses = [];

  if (stats.isShaken) statuses.push("<b>Shaken</b>: Only move and free actions. Spirit roll to recover.");
  if (stats.isBound) statuses.push("<b>Bound</b>: Both Distracted and Vulnerable; no physical actions except breaking free.");
  if (stats.isDistracted) statuses.push("<b>Distracted</b>: -2 on all Trait rolls until end of next turn.");
  if (stats.isStunned) statuses.push("<b>Stunned</b>: Distracted, fall prone, no actions or move. Attacks get The Drop.  Roll Vigor to revive to distracted and vulnerable (no effects on raise).");
  if (stats.isVulnerable) statuses.push("<b>Vulnerable</b>: Actions against are at +2 until end of next turn.");
  if (stats.isEntangled) statuses.push("<b>Entangled</b>: Cannot move and is Distracted.");

  let bodyText = ""
  console.log(statuses);

  for(let stat of statuses)
  {

    bodyText += "<div><p>" + stat + "</p></div>";

  }


  let dialogTemplate = `
  <h1> Current Effects: </h1>
  <div>
    ${bodyText}
    </div>
  `;

  new Dialog({
    title: "Token Status",
    content: dialogTemplate,
    buttons: {

      close: {
        label: "Close"
      }
    }
  }).render(true);



}
