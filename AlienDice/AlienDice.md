# Alien Dice Roller

This script performs dice pool rolls for the Alien RPG and displays a graphical representation of the results.  It displays the graphic faces of the base and stress dice at the same time.  

## Command Format

__!adinstall__ =>
Installs the script.  You first must upload the images from the images directory (or create your own). Drag each image onto the screen like you would any other graphic.  Run the !adinstall command. A menu will be displayed that allows you to set the graphic for each face (a blank, success and the stress success, blank, and alien).  Select the graphic and then press the appropriate button to set the graphic.


__!adsetup [sa|sb|ss|bs|bb] [URL]__ =>
This command does the heavy lifting of assigning the graphics to buttons.  It takes a number of parameters and should not be used alone.  The !adinstall script uses this command.

__!adsetup help__
Shows script help in the chat window.  

__!adroll [base] [stess] [show]__ =>
This command rolls the dice and displays the appropriate graphics!  The "base" parameter sets the number of base dice and "stress" defines the number of stress dice.  The "show" parameter is optional and will tell the script to display the actual values of the dice in addition to the graphical representation of the roll.
