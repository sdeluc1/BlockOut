##Unblock Me

### Background

Unblock Me is a puzzle game where the player's goal is to shift the positions of rectangular blocks on a
game board in order to free up a target block and move it toward the exit point. Blocks can have different lengths
and can only be moved in one direction. The difficulty increases with the completion of each level.

The player has the option of undoing a single move or reseting the entire board to it's original state for that
particular level.


### Functionality & MVP  

With this version of Unblock Me, users will be able to:

- [ ] Reset the game board
- [ ] Undo a single move
- [ ] Choose from a list of levels, each varying in difficulty
- [ ] Alter the game's color scheme

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production README

### Wireframes

This app will consist of a single screen with game board, game controls, and nav links to the Github, my LinkedIn,
and the About modal.  Game controls will include a button to undo a single move, a button to reset the game board, and
a button that opens a modal where the player can select a different level or review the rules of the game.

!(UnblockMe.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jQuery` for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

### Implementation Timeline

**Day 1**: Complete all necessary setup and initialize `Canvas` element where the game board will
be displayed. Create classes for board, block, player and game. Goals for the day:

- Be able to render the game board on `Canvas` element
- Create files for board, block, player and game classes.

**Day 2**: Complete basic game functionality and the ability to drag blocks to valid
spots on the board. Goals for the day:

- Render all necessary blocks on a 6 x 6 grid
- Make all blocks draggable with certain restrictions
- Implement logic winning the game
- Add undo and reset buttons

**Day 3**: Create 5 - 8 different levels of varying difficulty and create modal that
displays a main menu where the player can read the rules of the game or choose a level to play.
