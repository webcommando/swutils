// AlienDice.js
//
// Dice roller for the Alien RPG.  It rolls both the base dice and the stress dice.
// Type '!adsetup help' for instructions on using the script.  To install use !adinstall, select each
// graphic and then click the appropriate button.
//
// by: Carl Daivs
// https://app.roll20.net/users/2505097/carl-d
//
// See other gaming tools at http://www.webcommando.com/savageworlds/
// .
//
var AlienDice = AlienDice || (function() {
    'use strict';

    // Change these blank strings to the links to the images you want to use.  Otherwise can use
    // the !adinstall command.  Remember, you must use AWS linked images only.

/**   If you know your images you can just add to start and adinstall is not necessary.
    var stressAlienIcon = "https://s3.amazonaws.com/files.d20.io/images/136244607/3meqGiU3JSjGWQDrLP1Edg/max.png?1589914816";
    var stressSuccessIcon = "https://s3.amazonaws.com/files.d20.io/images/136244544/RLWEkluzgYj_icTkdVVG1A/max.png?1589914800";
    var stressBlankIcon = "https://s3.amazonaws.com/files.d20.io/images/136244579/LnwkrEXGdiFyOLTn0X26Ug/max.png?1589914809";
    var baseSuccessIcon = "https://s3.amazonaws.com/files.d20.io/images/136244701/eNX2VvC0NRlTVEME0h9_rw/max.png?1589914839";
    var baseBlankIcon = "https://s3.amazonaws.com/files.d20.io/images/136244765/TqL_-ZeFmReg2pMnXYEy5Q/max.png?1589914850";
**/
    var stressAlienIcon = "";
    var stressSuccessIcon = "";
    var stressBlankIcon = "";
    var baseSuccessIcon = "";
    var baseBlankIcon = "";


    var STRESSALIEN = "sa";
    var STRESSSUCC = "ss";
    var STRESSBLANK = "sb";
    var BASEBLANK = "bb";
    var BASESUCC = "bs";


    var version = '1.0.0', lastUpdate = 1597698996530,

	  checkInstall = function() {
        log('-=> AlienDice v'+version+' <=-  ['+(new Date(lastUpdate))+']');
        if (state.AlienDice == undefined)
        {
           state.AlienDice = {"version": 1.0, STRESSALIEN: stressAlienIcon, STRESSSUCC: stressSuccessIcon, STRESSBLANK: stressBlankIcon, BASEBLANK: baseBlankIcon, BASESUCC: baseSuccessIcon };

        }

	  },

    //
    // Handle input coming from message
    //
    handleInput = function(msg) {

      var args,
      who = msg.who;

      // Only do work if this is an API call.
  		if (msg.type !== "api") {
  			return;
  		}

      // Split the space separated arguments into an args array,.
  		args = msg.content.split(/\s+/);

      // Grab first parameter
      var parameter = args.shift();

      if (parameter == "!adroll")
      {


        var baseDice = args.shift();
        if (baseDice == undefined)
        {

          sendChat("", "** No base dice defined. **");
          return;
        }

        var stressDice = args.shift();
        if (stressDice == undefined)
        {
          stressDice = 0;
        }

        var diceResults = args.shift();
        var showDice = false;

        if (diceResults == "show") {
          showDice = true;
        }

        var baseRolls = rollDice(baseDice);
        var stressRolls = rollDice(stressDice);

        outputDice(who, baseRolls, stressRolls, showDice);
        return;

      }
      // this is the cammand to do an install
      if (parameter == "!adinstall")
      {

        displayMenu();
        return;
      }

      if (parameter == "!adsetup")
      {

        var iconType = args.shift();
        if (iconType == undefined)
        {
          sendChat("", "** No icon type defined. **");
          return;
        }
        if (iconType == "help")
        {
          displayHelp();
          return;
        }
        // This clears everything to the default (if you setup these yourself)
        if (iconType == "clear")
        {
          setProperty("version", "1.0");
          setProperty(STRESSALIEN, stressAlienIcon);
          setProperty(STRESSSUCC, stressSuccessIcon);
          setProperty(STRESSBLANK, stressBlankIcon);
          setProperty(BASEBLANK, baseBlankIcon);
          setProperty(BASESUCC, baseSuccessIcon);
          return;
        }

        var iconURL = args.shift();
        if (iconURL == undefined)
        {
          iconURL = getURLFromSelection(msg);
          if (iconURL == "")
          {
            sendChat("", "** No graphic selected. **");
            return;

          }

        }

        sendChat("", "Setting " + iconType + " to " + iconURL);

        switch (iconType) {
          case "sa":
            setProperty(STRESSALIEN, iconURL);
            //stressAlienIcon = iconURL;
            break;
          case "ss":
            setProperty(STRESSSUCC, iconURL);
            //stressSuccessIcon = iconURL;
            break;
          case "sb":
            setProperty(STRESSBLANK, iconURL);
            //stressBlankIcon = iconURL;
            break;
          case "bs":
            setProperty(BASESUCC, iconURL);
            //baseSuccessIcon = iconURL;
            break;
          case "bb":
            setProperty(BASEBLANK, iconURL);
            break;

          default:
            sendChat("", "** Only sa,ss,sb,bs,bb are recongized icon types. **");
            return;
        }

      }

    },

    //
    // Roll a set of d6s and then return an array of results.
    //
    rollDice = function(number) {
      var result = [];

      for (var i = 0; i < number; i++)
      {
        var roll = randomInteger(6);
        result.push(roll);
      }

      return (result);

    },

    //
    // Output the dice images based on rolls.
    //
    outputDice = function (who, base, stress, show) {

      // This is the style for a border on the graphics
      var style = "style='border: 1px solid black; border-radius: 2px; padding: 2px; width: 30'"

      var outputString = "<div style='border-stle: solid'> <h3 style='background-color:blue;color: white; width:100%; padding: 5px'>"+ who + ":</h3><p>";
      var rollString = "[ ";

      base.forEach ((baseRoll, index) => {

        rollString = rollString + baseRoll + " ";
        if (baseRoll == 6)
        {
          outputString = outputString + "<img " + style + " src='" + getProperty(BASESUCC)  + "'> "
        } else {
          outputString = outputString + "<img " + style + " src='" + getProperty(BASEBLANK) + "'> "

        }

      });

      if (show)
      {
        outputString = outputString + "<p>" + rollString + "]</p>";
      }
      outputString = outputString + "</p><p>"

      rollString = "[ ";

      stress.forEach((stressRoll, index) => {
        rollString = rollString + stressRoll + " ";
        if (stressRoll == 1)
        {
          outputString = outputString + "<img " + style + " src='" + getProperty(STRESSALIEN) + "'> "

        } else if (stressRoll == 6)
        {
          outputString = outputString + "<img " + style + " src='" + getProperty(STRESSSUCC) + "' alt='"
           + stressRoll + "'> "

        } else {
          outputString = outputString + "<img " + style + "  src='" + getProperty(STRESSBLANK) + "'> "

        }

      });

      if (show)
      {
        outputString = outputString + "<p>" + rollString + "]</p>";
      }
      outputString = outputString + "</p></div>";

      sendChat(who, outputString);

    },

    //
    // displayMenu
    //
    displayMenu = function()
    {
       var instructions = "<p>Instructions:</p><p>Upload images from the git repository (images directory) and then drag to the tabletop. For each die face, select the appropriate graphic and then click the corresponding button below:"
       var menuString = "<a href='!adsetup sa'>Stress Alien Face</a><br><a href='!adsetup sb'>Stress Blank Face</a><br><a href='!adsetup ss'>Stress Success Face</a><br><a href='!adsetup bb'>Base Blank Face</a><br><a href='!adsetup bs'>Base Success Face</a><br>"
       sendChat("Alien Dice Installation", instructions + menuString);
    },

    //
    // return the URL string for a selected graphic.
    //
    getURLFromSelection = function(msg)
    {
      var selectedGraphics = msg.selected;
      if (selectedGraphics == undefined)
      {
        return "";
      }
    //  log ("selected:" + msg.selected[0]);
      if (selectedGraphics.length > 0)
      {
        log ("id:" + selectedGraphics[0]._id)
        var token = getObj('graphic', selectedGraphics[0]._id);
        return token.get('imgsrc');
      }
      return "";
    },

    //
    // Set a state property for maintaining between executions.
    //
    setProperty = function(key, value) {
      var currentValue = state.AlienDice[key];

      state.AlienDice[key] = value;

      return currentValue;  // undefined if undefined
    },

    //
    // Get a value from the global state variable.
    //
    getProperty = function(key) {
      var currentValue = state.AlienDice[key];

      return currentValue;  // return undefined if undefined
    },

    //
    // Display help for our script!
    //
    displayHelp = function () {

      var outputString = "<p>!adinstall - use to install the application (link graphics).  Run before anything else.</p><p>!adroll BASE STRESS [show]- Do a roll for the Alien RPG where BASE is the number of dice to roll and STRESS is the number of stress dice. Adding 'show' will display the actual rolls allong with the dice images.</p><p>!adsetup [sa|sb|ss|bs|bb] [URL]- set a custom image for the face of a die (stress alien, stress blank, stress success, base success, base blank respectively).  Use the command !adinstall to make it easier to setup the system by simply clicking on images and then the menu item.  The image is whatever graphic item is selected when the command is issued or a URL can be passed in.</p><p>!adsetup help - displays this message.</p><p>!adsetup clear - clears the custom dice images and returns to the default ones.</p>";

      sendChat('', outputString);
    },

    registerEventHandlers = function() {
        on('chat:message', handleInput);
    };

    return {
        CheckInstall: checkInstall,
        RegisterEventHandlers: registerEventHandlers
    };

}());

// Ready event fires at the end of loading the campaign.
on('ready',function() {
    'use strict';

    AlienDice.CheckInstall();
    AlienDice.RegisterEventHandlers();
});
