function removeGhosts(ghost) {
  maze[ghost].classList.remove(ghost)
  maze[ghost].classList.remove('ghost-left')
  maze[ghost].classList.remove('ghost-down')
  maze[ghost].classList.remove('ghost-up')
  maze[ghost].classList.remove('ghost-right')
}

function addGhosts(ghost, ghostSmooth, ghostMove, ghostPrevious) {
  maze[ghost].classList.add(toString(ghost))
  maze[ghost].classList.add(toString(ghostSmooth))
  maze[ghost - ghostMove].classList.add(ghostPrevious)
}


function ghosts(ghost, ghostPositionsLog, ghostDirections, ghostMoves, ghostPrevious, ghostClass, ghostLogic, scaredGhost) {

  ghostLogic = setInterval(() => {
    ghostDirections = []
    ghostPositionsLog.push(ghost)

    if (chase) {
      maze[ghost].classList.remove(scaredGhost)
      maze[ghost].classList.add('ghost')

      // eslint-disable-next-line no-inner-declarations
      function assessDirections() {
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
      }

      //GHOST TWO
      ghostMoves = ghostDirections[Math.floor(Math.random() * ghostDirections.length)]
      ghostPrevious = maze[ghost + ghostMoves].className

      if (ghost === 482 && ghostPositionsLog[ghostPositionsLog.length - 2] !== 507) {
        maze[ghost].classList.remove('ghost')
        ghost = 507
        maze[ghost].classList.add('ghost')
      } else if (ghost === 508 && ghostPositionsLog[ghostPositionsLog.length - 2] !== 482) {
        maze[ghost].classList.remove(ghost)
        ghost = 482
        maze[ghost].classList.add('ghost')
      } else {

        if (ghostMoves === 1) {
          removeGhosts()
          ghost += ghostMoves
          addGhosts()
        } else if (ghostMoves === -1) {
          removeGhosts()
          ghost += ghostMoves
          addGhosts()
        } else if (ghostMoves === -32) {
          removeGhosts()
          ghost += ghostMoves
          addGhosts()
        } else if (ghostMoves === 32) {
          removeGhosts()
          ghost += ghostMoves
          addGhosts()
        }
      }
      // SCARED MODE
    } else if (!chase) {
      maze[ghost].classList.remove('ghost')
      maze[ghost].classList.add('scaredGhost')

      assessDirections()

      //GHOST TWO
      const ghostMoves = ghostDirections[Math.floor(Math.random() * ghostDirections.length)]
      const ghostPrevious = maze[ghost + ghostMoves].className

      if (ghost === 482 && ghostPositionsLog[ghostPositionsLog.length - 2] !== 507) {
        maze[ghost].classList.remove('scaredGhost')
        ghost = 507
        maze[ghost].classList.add('scaredGhost')
      } else if (ghost === 508 && ghostPositionsLog[ghostPositionsLog.length - 2] !== 482) {
        maze[ghost].classList.remove('scaredGhost')
        ghost = 482
        maze[ghost].classList.add('scaredGhost')
      } else {

        if (ghostMoves === 1) {
          removeGhosts()
          ghost += ghostMoves
          addGhosts()
        } else if (ghostMoves === -1) {
          removeGhosts()
          ghost += ghostMoves
          addGhosts()
        } else if (ghostMoves === -32) {
          removeGhosts()
          ghost += ghostMoves
          addGhosts()
        } else if (ghostMoves === 32) {
          removeGhosts()
          ghost += ghostMoves
          addGhosts()
        }
      }
    }
  }, 120)
}