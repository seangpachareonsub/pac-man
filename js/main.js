function main() {

  //  binary maze array (29sqs across x 33 sqs down)
  // 0 = whitespace/non-grid, 1 = wall, 3 = food, 4 = super seed, 5 = pacman
  // ghosts --- 6 = ghost-1,   7 = ghost-2,   8 = ghost-3,   9 = ghost-4

  const maze = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 3, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 3, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 1, 3, 3, 3, 1, 1, 3, 3, 3, 1, 1, 3, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 1],
    [0, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1],
    [0, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1],
    [0, 1, 3, 3, 3, 3, 3, 3, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 1],
    [0, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 3, 3, 3, 1, 1, 3, 3, 3, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1],
    [0, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1],
    [0, 1, 3, 3, 3, 3, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 3, 1, 1, 3, 3, 3, 3, 1],
    [0, 1, 1, 1, 1, 3, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 3, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1, 1, 1, 1],
    [0, 1, 3, 1, 1, 3, 1, 1, 1, 1, 0, 1, 0, 6, 0, 0, 7, 0, 1, 0, 1, 1, 1, 1, 3, 1, 1, 3, 1],
    [0, 1, 3, 1, 1, 3, 3, 3, 3, 0, 0, 1, 0, 9, 0, 0, 8, 0, 1, 0, 0, 3, 3, 3, 3, 1, 1, 3, 1],
    [0, 1, 3, 1, 1, 3, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 3, 1, 1, 3, 1],
    [0, 1, 3, 3, 3, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 3, 3, 3, 1],
    [0, 1, 3, 1, 1, 3, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 3, 1, 1, 3, 1],
    [0, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1],
    [0, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1],
    [0, 1, 3, 1, 1, 3, 1, 1, 3, 3, 3, 3, 3, 3, 1, 1, 3, 3, 3, 3, 3, 3, 1, 1, 3, 1, 1, 3, 1],
    [0, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1],
    [0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 5, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [0, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 3, 1],
    [0, 1, 3, 1, 1, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 1, 3, 1],
    [0, 1, 3, 1, 1, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 1, 3, 1],
    [0, 1, 3, 1, 1, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 1, 3, 1],
    [0, 1, 3, 3, 3, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 3, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
  ]


  // map out coordinates and create visual representation of maze
  // grid creation

  const section = document.getElementsByTagName('section')[0]

  function createWorld() {
    section.innerHTML = ''
    for (let i = 0; i < maze.length; i++) {
      for (let j = 0; j < maze[i].length; j++) {
        if (maze[i][j] === 0) {
          // whitespace and empty space after food is eaten
          const oneGrid = document.createElement('div')
          oneGrid.className = 'whiteSpace'
          section.appendChild(oneGrid)
        } else if (maze[i][j] === 1) {
          // wall / maze border
          const oneGrid = document.createElement('div')
          oneGrid.className = 'grid'
          section.appendChild(oneGrid)
        } else if (maze[i][j] === 3) {
          // food
          const oneGrid = document.createElement('div')
          oneGrid.className = 'seed'
          section.appendChild(oneGrid)
        } else if (maze[i][j] === 5) {
          // pacman
          const oneGrid = document.createElement('div')
          oneGrid.className = 'pacman'
          section.appendChild(oneGrid)
        } else if (maze[i][j] === 6) {
          // ghost 1
          const oneGrid = document.createElement('div')
          oneGrid.className = 'ghost-1'
          section.appendChild(oneGrid)
        } else if (maze[i][j] === 7) {
          // ghost 2
          const oneGrid = document.createElement('div')
          oneGrid.className = 'ghost-2'
          section.appendChild(oneGrid)
        } else if (maze[i][j] === 8) {
          // ghost 3
          const oneGrid = document.createElement('div')
          oneGrid.className = 'ghost-3'
          section.appendChild(oneGrid)
        } else if (maze[i][j] === 9) {
          // ghost 4
          const oneGrid = document.createElement('div')
          oneGrid.className = 'ghost-4'
          section.appendChild(oneGrid)
        }
      }
    }
  }

  // map pacmans position
  const pacman = {
    x: 15,
    y: 26
  }

  // algorithm for user & pacman

  let intervalId
  let score = 0
  let scoreBoard = document.getElementById('score-count')

  document.addEventListener('keydown', (e) => {

    //move up
    if (e.key === 'ArrowUp') {
      clearInterval(intervalId)
      intervalId = setInterval(() => {
        if (maze[pacman.y - 1][pacman.x] === 1) {
          return
        } else {
          maze[pacman.y][pacman.x] = 0
          pacman.y -= 1
          maze[pacman.y][pacman.x] = 5
          createWorld()
          if (maze[pacman.y - 1][pacman.x] === 3) {
            score += 10
            scoreBoard.innerText = score
          }
        }
      }, 130)

      //move right
    } else if (e.key === 'ArrowRight') {
      clearInterval(intervalId)
      intervalId = setInterval(() => {
        if (maze[pacman.y][pacman.x + 1] === 1) {
          return
        } else {
          maze[pacman.y][pacman.x] = 0
          pacman.x += 1
          maze[pacman.y][pacman.x] = 5
          createWorld()
          if (maze[pacman.y][pacman.x + 1] === 3) {
            score += 10
            scoreBoard.innerText = score
          }
        }
      }, 130)

      //move down
    } else if (e.key === 'ArrowDown') {
      clearInterval(intervalId)
      intervalId = setInterval(() => {
        if (maze[pacman.y + 1][pacman.x] === 1) {
          return
        } else {
          maze[pacman.y][pacman.x] = 0
          pacman.y += 1
          maze[pacman.y][pacman.x] = 5
          createWorld()
          if (maze[pacman.y + 1][pacman.x] === 3) {
            score += 10
            scoreBoard.innerText = score
          }
        }
      }, 130)

      //move left
    } else if (e.key === 'ArrowLeft') {
      clearInterval(intervalId)
      intervalId = setInterval(() => {
        if (maze[pacman.y][pacman.x - 1] === 1) {
          return
        } else {
          maze[pacman.y][pacman.x] = 0
          pacman.x -= 1
          maze[pacman.y][pacman.x] = 5
          createWorld()
          if (maze[pacman.y][pacman.x - 1] === 3) {
            score += 10
            scoreBoard.innerText = score
          }
        }
      }, 130)
    }
  })


  createWorld()

}




window.addEventListener('DOMContentLoaded', main)