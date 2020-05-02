### ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) General Assembly, Software Engineering Immersive

## Pac-Man

### Overview

My first project of the Software Engineering bootcamp at GA London. Given a list of options from GA, I chose to recreate my own version of the classic game, Pac-Man. In addition to the project brief, I made it a challenge of my own to develop an end product which was as close to the original as possible.

* **Project Duration:** 1 week
* **Work Environment:** Individual project

You can launch the game on [GitHub pages](https://seangpachareonsub.github.io/pac-man/src/index.html), or find the [GitHub repository](https://github.com/seangpachareonsub/pac-man).

#### Technical Requirements:
* Render a game in the browser
* Design logic for winning 
* Include separate HTML / CSS / JavaScript files
* Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
* Use Javascript for DOM manipulation
* Deploy your game online, where the rest of the world can access it
* Use semantic markup for HTML and CSS (adhere to best practices)

#### Technologies Used:
* HTML5
* CSS3
* JavaScript (ES6)
* Git and GitHub
* Google Fonts

## Approach

### Grid and Character Design

The foundation of each map in the game consists of a grid based layout. In JavaScript, a for loop was used to render individual cells by creating divs and then appending it to a parent container. 

I designed the maps with an overlay image from the game's original mazes to visually represent the grid. Each overlay image differed in size which resulted in a slight width x height variation for individual cells.

The for loop assigned each cell a corresponding index number. As well as appending cells to the container, they were also pushed into a maze array. The structure of the maze array gave the ability to define the exact positions of the following:

* Characters in the game, Pac-Man and four ghosts
* The boundaries that restrict movement, specific turning points on the maze
* The pellets and energisers that Pac-Man eats during gameplay


``` 
let pacman = 783
let ghost1 = 395
const foodPlacements = [66, 67, 68, 69 ...]
const noUp = [217, 218, 291 ...]
const noDown = [687, 689, 690 ...]

for (let i = 0; i < mazeCount; i++) {
  const oneGrid = document.createElement('div')
  oneGrid.classList.add('cell')
  
  if (i === pacman) {
    oneGrid.classList.add('pacman')
  }
  if (foodPlacements.includes(i)) {
    oneGrid.classList.add('food')
  }
  if (i === ghost1) {
    oneGrid.classList.remove('cell')
    oneGrid.classList.add('ghost-1')
  }
  grid.appendChild(oneGrid)
  maze.push(oneGrid)
  }
}
```

**NOTE:** `const noUp` and `const noDown` are two of four arrays which represent the walls of the maze. The arrays consist of specific cell indexes that restrict the movement of characters depending on whether the adjacent cells to their current position are walls
	  
#### Map One:

* Cell dimensions: 18.5px x 19.7px

![](progression/Screenshot%202020-05-02%20at%2017.32.36.png)

#### Map Two:
* Cell dimensions: 17.8px x 19px

![](progression/Screenshot%202020-05-02%20at%2017.35.58.png)

### Pac-Man Movement

Pac-Man's movement listens for player controlled keydown events. Designed for both left and right handed users, WASD and arrow keys are events the function listens out for. 

```
if (event.key === 'ArrowRight' || event.key === 'd') {
  playerMovement = 2
} else if (event.key === 'ArrowLeft' || event.key === 'a') {
  playerMovement = 4
} else if (event.key === 'ArrowUp' || event.key === 'w') {
  playerMovement = 1
} else if (event.key === 'ArrowDown' || event.key === 's') {
  playerMovement = 3
}
```

Once player controls are determined by the event listener, Pac-Man's functionality thereafter, is a repeatable snippet of code that follows the following steps:

1. Checks if the adjacent cell to Pac-Man's current position is a wall. If so, return from the function.
2. If the next cell is an allowed path then add or subtract to Pac-Man's current position to move
    * Move up: `maze[pacman - (width - 1)]` 
    * Move down: `maze[pacman + (width - 1)]`
    * Move right: `maze[pacman + 1]` 
    * Move left: `maze[pacman - 1]` 
3. Removes Pac-Man's CSS class from the previous cell and removes the food pellet from new position and replaces it with Pac-Man's class. 

```
function movePacman() {
  playerInterval = setInterval(() => {
    if (playerMovement === 1) {
      if (noUp.includes(pacman)) {
        return
      } else if (maze[pacman - (width - 1)].classList.contains('food')) {
        removePacman()
        pacman -= (width - 1)
        removeFood('pacman-up')
      }
    }
  }, 115)
}
```

**NOTE:** `removeFood('pacman-up')` is a generic function that removes the 'food' class and replaces it with the class passed in as an argument. This gives the visual effect of Pac-Man consuming the pellets.

#### Smooth Animated Movement

With the game being designed on a grid, the simultaneous removing and adding of classes represented character movements. This gave a 'jumping' effect where characters would disappear from one cell and reappear in the next. To solve this and to replicate the original game's smooth transition, I created four CSS keyframes which translated Pac-Man across the XY axis depending on the direction. 

```
.pacman-right {
  animation: move-right 0.115s linear

@keyframes move-right {
  0% {transform: translate(-100%, 0%)}
  100% {transform: translate(0%, 0%)}
}
```

The adding and removing of the animation class functioned within `playerInterval = setInterval()`. By doing so, Pac-Man moves across the maze automatically until the path ends or until the player triggers a directional change at an intersection. As a result, Pac-Man's movements are not caused by continuos keydown events which was the initial state of the game. 


### Ghost Movement

#### Preparing the move

The four ghosts included in the game, each function in their own `setInterval()` which consists of the following repeatable block of code. As in the original game, ghosts only look one move ahead. The function starts from considering the four possible directional moves and narrows down the options taking into consideration boundary wall cells.

```
if (!noRight.includes(ghost) && ghost + 1 !== ghostPositionsLog[ghostPositionsLog.length - 2]) {
  ghostDirections.push(1)
}
if (!noLeft.includes(ghost) && ghost - 1 !== ghostPositionsLog[ghostPositionsLog.length - 2]) {
  ghostDirections.push(-1)
}
if (!noUp.includes(ghost) && ghost + ((width - 1) * - 1) !== ghostPositionsLog[ghostPositionsLog.length - 2]) {
  ghostDirections.push((width - 1) * -1)
}
if (!noDown.includes(ghost) && ghost + (width - 1) !== ghostPositionsLog[ghostPositionsLog.length - 2]) {
  ghostDirections.push(width - 1)
}
```

Each if statement represents a possible direction. The condition checks that the ghost's current position does not have a wall adjacent to it and that the desired cell is not the cell it just came from. This ensures that ghosts can only move forwards. The possible movements are pushed into a `ghostDirections` array when the conditions prove to be true.

Determining the next move for each ghost utilises the Math object in JavaScript which selects a random element from the `ghostDirections` array and stores it in a variable called `ghostMoves`. Since ghosts do not consume food pellets, we store the class name of the next cell in a variable called `ghostPrevious`. This allows us to add back the original state and class name of the cell once the ghost moves away. 

```
const ghostMoves = ghostDirections[Math.floor(Math.random() * ghostDirections.length)]
const ghostPrevious = maze[ghost + ghostMoves].className
```

#### Time to move 

Ghost movements replicate those of Pac-Man, adding to their current position visually represents their next move. Therefore, the functionality of movement in each direction follows a similar structure:

1. Remove the ghost class from their current position
2. The value stored inside the `ghostMoves` variable is added to the current position which moves the ghost
3. The ghost class is added onto the new cell position alongside the animated CSS keyframes class giving it a smooth transition
4. The class stored inside the `ghostPrevious` variable is added back to the previous cell position that the ghost came from

```
if (ghostMoves === 1) {
  removeGhosts(ghost, 'ghost')
  ghost += ghostMoves
  maze[ghost].classList.add('ghost')
  maze[ghost].classList.add('ghost-right')
  maze[ghost - ghostMoves].classList.add(ghostPrevious)
}
```

### Collision Logic

Such as the original game, Pac-Man starts off with three lives and loses one per collision with a ghost. Although a seperate function in itself, the logic is handled as part of the functionality for each ghost. This is ran inside a `setInterval()` which checks for a collision every 10 milliseconds. This ensures accurate timing and negates the chance of Pac-Man 'passing through' a ghost, allowing the game to catch every collision that occurs.

1. The if statement checks if there's been a collision, by definition a collision will occur if the current position of a ghost also contains Pac-Man's class
2. When a collision occurs, each `setInterval()` clears. This stops the ghosts from moving and also disables any player controls
3. A short animation is added to the characters to represent the loss of a life. The ghosts and Pac-Man are removed from their current positions.
4. Keeping track of remaining lives, the code subtracts 1 from the `lives` variable which is also visually represented on the screen
5. `characterAppear()` function returns all the characters back to their original starting positions and re-runs the intervals

```
if (maze[pacman].classList.contains('ghost')) {

  clearInterval(collisionInterval)
  clearInterval(ghostLogic)
  clearInterval(playerInterval)

  maze[ghost].style.animation = 'blinking 0.1s alternate 5'

  setTimeout(() => {
    maze[ghost].classList.remove('ghost')
  }, 1500)

  setTimeout(() => {
    maze[pacman].style.visibility = 'hidden'
    maze[pacman].classList.remove('pacman')
  }, 2000)

  lives -= 1
  livesIcon[lives].src = ''
  characterAppear()
}
```

#### Scared mode collision

When Pac-Man consumes an energiser, it toggles a boolean variable `chase` from false to true, lasting seven seconds. In addition, all ghosts change form and are assigned the `scared-ghost` class. A collision with Pac-Man whilst in this scared state will only affect the ghost that Pac-Man consumes. 

1. When a collision occurs, we run the `scaredGhostCollision()` function which clears the specific ghost interval and also animates the ghost
2. The ghost is removed from its current position and placed back into its original starting position by adding the class
3. The intervals then reset again and the ghost functions as before

```
if (maze[pacman].classList.contains('scared-ghost-2')) {

   scaredGhostCollision(ghostLogic2, ghost2)

   setTimeout(() => {
     ghost2 = 397
     maze[ghost2].classList.add('ghost-2')
   }, 1 

   setTimeout(() => {
     ghostTwo()
     collisionInterval = setInterval(() => {
       collision()
     }, 10)
   }, 1600) }
}
```
**NOTE:** The code block above is specific to ghost two

### Variables

At all times numerous variables are used to keep track of things happening in the game:

*`pacman`: the index of the cell the player is on
*`ghost`: each ghost has it's own variable which holds the value of the cell index
*`ghostDirections`: holds the possible next movements for ghosts. Each ghosts has their own
*`ghostPrevious`: stores the previous class of a cell which is used to render the cell back to its original state after the ghost moves away. Each ghosts has their own
*`ghostPositionsLog`: is an array that keeps track of all ghost movements. Utilised to ensure that ghosts do not move backwards and only forwards
*`chase`: boolean variable starting off as false but toggles to true for 7 seconds when energiser is consumed
*`lives`: the player has three lives and loses one per collision with a ghost
*`gameTimer`: the game is played against the clock, the variable counts down from 45 seconds
*`score`: keeps track of the score, a pellet is worth 10 points, energiser is worth 40 points and consuming a ghost in scared form is 80 points

### Non-game screens

Aside from the main game page which displays a player scoreboard and the game map itself, there are also two additional screens which are rendered before and after gameplay

1. A screen which counts down from 3 and prompts the start of the game

```
function countDown() {
  let count = 3
  setInterval(() => {
    const screen = document.getElementsByClassName('count')[0]
    if (count > 1) {
      count -= 1
      screen.innerText = count
    } else {
      screen.innerText = 'START GAME'
    }
  }, 1000)
}
window.onLoad = countDown()
```
2. The game over screen that is displayed over the main page as a modal

Once the game ends, the game over screen allows players to input their name. This, along with their score are saved into local storage and rendered on the scoreboard on the main page. The scoreboard is rendered on window load and also on a keydown event once the player submits their score. The array of saved player scores displays in descending order using a sort method passed with a comparison function.

```
 function displayScore() {
    let scores = []
    const scoresList = document.querySelector('ol')

    if (localStorage) {
      const players = JSON.parse(localStorage.getItem('mapOne'))

      if (players) {
        scores = players
        const array = scores.sort((a, b) => b.score - a.score).map((player, i) => {
          return `<li> ${i + 1}. ${player.name}: ${player.score} points </li>`
        })

        scoresList.innerHTML = array.join('')
      }
    }

    submitButton.addEventListener('mouseup', () => {
      const player = { name: name.value, score: scoreCount }
      scores.push(player)

      if (localStorage) {
        localStorage.setItem('mapOne', JSON.stringify(scores))
      }

      gameOver.style.display = 'none'
      container.style.opacity = '1'
      displayScore()
    })
  }
```

### Screenshots

![](progression/Screenshot%202020-05-02%20at%2018.51.01.png)
![](progression/Screenshot%202020-05-02%20at%2018.50.10.png)
![](progression/Screenshot%202020-05-02%20at%2018.49.59.png)
![](progression/Screenshot%202020-05-02%20at%2018.49.36.png)

### Bugs

Despite clearing and resetting intervals for ghosts upon collisions with Pac-Man, the clearing of intervals have about a 95% success rate. A few times during testing, the intervals do not get cleared. Therefore, attempting to reset intervals turns into doubling up on them instead and the ghosts move at a much higher speed than originally set.

### Potential future features and improvements

* Server-side saved scoreboard
* Mobile-compatibility
* Implement search algorithms for ghosts. For example, A* algorithm or Dijkstra's algorithm
* Cleaner code, there's a lot of repetition that could have been refactored into reusable functions. I treated the task as the first try-out of my JavaScript knowledge and focused more on building something that worked

### Lessons learned
Plan better. I have the tendency to dive right into the code and sometimes miss out on key factors that I may not have considered. The grid was originally constructed using a number structure. Numbers 1 - 5 were used similar to Binary code, to create a maze where each number represented a different aspect of the game. However, I quickly found this to be a challenge when moving Pac-Man on the Y axis and reverted to the original (final) construction.