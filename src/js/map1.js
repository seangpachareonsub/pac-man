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


const main = setTimeout(() => {

  const width = 33
  const mazeCount = width * width
  const grid = document.querySelector('.grid')
  const container = document.querySelector('.container')
  const header = document.getElementsByTagName('header')[0]
  const audio = document.getElementsByTagName('audio')[0]

  audio.src = '../media/audio/8d82b5_Pacman_Opening_Song_Sound_Effect.mp3'
  audio.play()

  header.style.display = 'none'
  grid.style.display = 'flex'
  container.style.display = 'flex'

  const maze = []

  let pacman = 783
  let ghost1 = 395
  let ghost2 = 397
  let ghost3 = 400
  let ghost4 = 402

  let chase = true

  const foodPlacements =
    [
      66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 98, 103, 109, 112, 118, 123,
      144, 141, 135, 162, 167, 173, 176, 182, 187, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204,
      205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 226, 231, 234, 243, 246, 251, 283, 278, 275,
      266, 263, 258, 290, 291, 292, 293, 294, 295, 298, 299, 300, 301, 304, 305, 306, 307, 310, 311, 312, 313, 314, 315, 327,
      342, 359, 374, 406, 391, 423, 438, 455, 470, 502, 487, 519, 534, 566, 630, 662, 694,
      726, 758, 790, 822, 854, 886, 487, 519, 551, 583, 615, 647, 679, 711, 743, 775, 807, 839, 871, 674, 675, 676, 677, 678,
      679, 680, 681, 682, 683, 684, 685, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 771, 772, 775, 776,
      777, 778, 779, 780, 781, 782, 784, 785, 786, 787, 788, 789, 790, 793, 794, 886, 887, 888, 889, 890, 891, 962,
      963, 964, 965, 966, 967, 968, 969, 970, 971, 972, 973, 974, 975, 976, 977, 978, 979, 980, 981, 982, 983, 984, 985, 986,
      987, 866, 867, 868, 869, 870, 871, 898, 930, 962, 923, 955, 987, 874, 875, 876, 877, 880, 881, 882, 883, 909, 941, 912,
      944, 706, 738, 804, 836, 819, 851, 825, 857, 731, 763, 598, 810, 842, 717, 749, 720, 752, 150
    ]

  const superFood = [130, 155, 770, 795]


  for (let i = 0; i < mazeCount; i++) {
    const oneGrid = document.createElement('div')
    oneGrid.classList.add('cell')
    // oneGrid.innerText = i
    // PACMAN
    if (i === pacman) {
      oneGrid.classList.add('pacman')
    }
    // FOOD
    if (foodPlacements.includes(i)) {
      oneGrid.classList.add('food')
    }
    // SUPER FOOD
    if (superFood.includes(i)) {
      oneGrid.classList.add('superFood')
    }
    // GHOSTS
    if (i === ghost1) {
      oneGrid.classList.remove('cell')
      oneGrid.classList.add('ghost-1')
    }
    if (i === ghost2) {
      oneGrid.classList.remove('cell')
      oneGrid.classList.add('ghost-2')
    }
    if (i === ghost3) {
      oneGrid.classList.remove('cell')
      oneGrid.classList.add('ghost-3')
    }
    if (i === ghost4) {
      oneGrid.classList.remove('cell')
      oneGrid.classList.add('ghost-4')
    }
    // CREATING
    grid.appendChild(oneGrid)
    maze.push(oneGrid)
  }



  //  DEFINING THE WALLS
  const noUp =
    [
      66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
      90, 91, 195, 196, 197, 198, 200, 201, 202, 203, 204, 206, 207, 209, 210, 211, 212, 213, 215, 216,
      217, 218, 291, 292, 293, 294, 299, 300, 301, 304, 305, 306, 311, 312, 313, 314, 394, 395, 398, 399,
      401, 402, 403, 481, 482, 483, 484, 485, 486, 488, 489, 500, 501, 503, 504, 505, 506, 507, 508, 587,
      588, 589, 590, 591, 592, 593, 594, 674, 675, 676, 677, 678, 680, 681, 683, 684, 685, 688, 689, 690,
      692, 693, 695, 696, 697, 698, 699, 771, 772, 776, 777, 778, 779, 780, 782, 783, 785, 786, 787, 788,
      789, 793, 794, 866, 867, 869, 870, 875, 876, 877, 880, 881, 882, 887, 888, 890, 891, 963, 964, 965,
      966, 967, 968, 969, 970, 971, 972, 974, 975, 977, 978, 979, 980, 981, 982, 983, 984, 985, 986, 396,
      509, 510, 511, 480
    ]

  const noDown =
    [
      67, 68, 69, 70, 72, 73, 74, 75, 76, 78, 79, 81, 82, 83, 84, 85, 87, 88, 89, 90, 195, 196, 197, 198,
      200, 201, 203, 204, 205, 206, 207, 208, 209, 210, 212, 213, 215, 216, 217, 218, 290, 291, 292, 293,
      294, 296, 297, 298, 299, 300, 302, 303, 305, 306, 307, 308, 309, 311, 312, 313, 314, 315, 395, 396,
      397, 398, 399, 400, 401, 402, 481, 482, 483, 484, 485, 486, 488, 489, 500, 501, 503, 504, 505, 506,
      507, 508, 587, 588, 589, 590, 591, 592, 593, 594, 675, 676, 677, 678, 680, 681, 682, 683, 684, 686,
      687, 689, 690, 691, 692, 693, 695, 696, 697, 698, 771, 776, 777, 779, 780, 781, 782, 783, 784, 785,
      786, 788, 789, 791, 792, 794, 795, 867, 868, 869, 870, 871, 872, 873, 874, 875, 876, 878, 879, 881,
      882, 883, 884, 885, 886, 887, 888, 889, 890, 962, 963, 964, 965, 966, 967, 968, 969, 970, 971, 972,
      973, 974, 975, 976, 977, 978, 979, 980, 981, 982, 983, 984, 985, 986, 987, 770, 509, 510, 511, 480
    ]

  const noLeft =
    [
      66, 98, 130, 162, 194, 226, 258, 290, 103, 135, 167, 231, 263, 327, 359, 391, 423, 455, 519, 551, 583,
      615, 647, 711, 743, 775, 807, 839, 674, 706, 738, 770, 866, 898, 930, 962, 234, 266, 298, 394, 426, 458,
      522, 554, 586, 618, 650, 810, 842, 874, 109, 141, 173, 333, 365, 717, 749, 909, 941, 80, 112, 144, 176, 304,
      336, 368, 688, 720, 752, 880, 912, 944, 243, 275, 435, 467, 499, 531, 563, 627, 659, 819, 851, 118, 150, 182,
      246, 278, 310, 342, 374, 406, 438, 470, 534, 566, 598, 630, 662, 726, 758, 822, 854, 886, 123, 155, 187, 251,
      283, 731, 763, 923, 955, 793, 825, 857, 836, 804
    ]

  const noRight =
    [
      98, 130, 162, 226, 258, 706, 738, 898, 930, 103, 135, 167, 231, 263, 295, 327, 359, 391, 423, 455, 519, 551,
      583, 615, 647, 711, 743, 807, 839, 871, 234, 266, 426, 458, 490, 522, 554, 618, 650, 810, 842, 77, 109, 141,
      173, 301, 333, 365, 685, 717, 749, 877, 909, 941, 112, 144, 176, 336, 368, 720, 752, 912, 944, 243, 275, 307,
      403, 435, 467, 531, 563, 595, 627, 659, 819, 851, 883, 118, 150, 182, 246, 278, 342, 374, 406, 438, 470, 534,
      566, 598, 630, 662, 726, 758, 790, 822, 854, 91, 123, 155, 187, 219, 251, 283, 315, 699, 731, 763, 795, 891,
      923, 955, 987, 825, 857, 772, 804, 836
    ]


  const score = document.querySelector('.score')
  let scoreCount = 0

  const winner = document.querySelector('.gameEnd')
  const displayWin = document.querySelector('.final')

  const pacmanMoves = []



  // USER MOVEMENTS
  document.addEventListener('keydown', pacmanMove)


  let playerMovement
  let playerInterval

  function pacmanMove() {


    if ((event.key === 'ArrowRight' || event.key === 'd') && !noRight.includes(pacman)) {
      playerMovement = 2
    } else if ((event.key === 'ArrowLeft' || event.key === 'a') && !noLeft.includes(pacman)) {
      playerMovement = 4
    } else if ((event.key === 'ArrowUp' || event.key === 'w') && !noUp.includes(pacman)) {
      playerMovement = 1
    } else if ((event.key === 'ArrowDown' || event.key === 's') && !noDown.includes(pacman)) {
      playerMovement = 3
    }

    // WINNER

    if (scoreCount === 2450) {
      clearInterval(ghostLogic1)
      clearInterval(ghostLogic2)
      clearInterval(ghostLogic3)
      clearInterval(ghostLogic4)
      container.style.opacity = '0.2'
      gameOver.style.display = 'flex'
      winner.innerText = 'YOU\'VE WON!'
      finalScore.innerHTML = scoreCount
      displayWin.style.marginLeft = '30px'
      clearInterval(playerInterval)

      setTimeout(() => {
        audio.src = '../media/audio/zapsplat_multimedia_male_voice_processed_says_you_win_001_21572.mp3'
        audio.play()
      }, 500)
    }
  }

  function removePacman() {
    maze[pacman].classList.remove('pacman')
    maze[pacman].classList.remove('pacman-right')
    maze[pacman].classList.remove('pacman-down')
    maze[pacman].classList.remove('pacman-up')
    maze[pacman].classList.remove('pacman-left')
  }

  function removeFood(pacmanSmooth) {
    maze[pacman].classList.remove('food')
    maze[pacman].classList.add('pacman')
    maze[pacman].classList.add(pacmanSmooth)
    scoreCount += 10
    score.innerHTML = scoreCount
    audio.src = '../media/audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
    audio.play()
    pacmanMoves.push(pacman)
  }

  function movePacman() {
    playerInterval = setInterval(() => {

      // USER
      if (playerMovement === 2) {

        if (noRight.includes(pacman)) {
          return
        } else {
          if (pacman === 508) {
            removePacman()
            pacman = 481
            maze[pacman].classList.add('pacman')
            maze[pacman].classList.add('pacman-right')
            audio.src = '../media/audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
            audio.play()
            pacmanMoves.push(pacman)
          } else if (maze[pacman + 1].classList.contains('food')) {
            removePacman()
            pacman += 1
            removeFood('pacman-right')
          } else if (maze[pacman + 1].classList.contains('superFood')) {
            chase = true
            chase = false
            setTimeout(() => {
              chase = true
            }, 10000)
            removePacman()
            pacman += 1
            maze[pacman].classList.remove('superFood')
            maze[pacman].classList.add('pacman')
            maze[pacman].classList.add('pacman-right')
            scoreCount += 40
            score.innerHTML = scoreCount
            audio.src = '../media/audio/8d82b5_Pacman_Eating_Cherry_Sound_Effect.mp3'
            audio.play()
          } else {
            removePacman()
            pacman += 1
            maze[pacman].classList.add('pacman')
            maze[pacman].classList.add('pacman-right')
            audio.src = '../media/audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
            audio.play()
            pacmanMoves.push(pacman)
          }
        }

      } else if (playerMovement === 4) {

        if (noLeft.includes(pacman)) {
          return
        } else {
          if (pacman === 481) {
            removePacman()
            pacman = 508
            maze[pacman].classList.add('pacman')
            maze[pacman].classList.add('pacman-left')
            audio.src = '../media/audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
            audio.play()
            pacmanMoves.push(pacman)
          } else if (maze[pacman - 1].classList.contains('food')) {
            removePacman()
            pacman -= 1
            removeFood('pacman-left')
          } else if (maze[pacman - 1].classList.contains('superFood')) {
            chase = true
            chase = false
            setTimeout(() => {
              chase = true
            }, 10000)
            removePacman()
            pacman -= 1
            maze[pacman].classList.remove('superFood')
            maze[pacman].classList.add('pacman')
            maze[pacman].classList.add('pacman-left')
            scoreCount += 40
            score.innerHTML = scoreCount
            audio.src = '../media/audio/8d82b5_Pacman_Eating_Cherry_Sound_Effect.mp3'
            audio.play()
          } else {
            removePacman()
            pacman -= 1
            maze[pacman].classList.add('pacman')
            maze[pacman].classList.add('pacman-left')
            audio.src = '../media/audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
            audio.play()
            pacmanMoves.push(pacman)
          }
        }

      } else if (playerMovement === 1) {

        if (noUp.includes(pacman)) {
          return
        } else if (maze[pacman - (width - 1)].classList.contains('food')) {
          removePacman()
          pacman -= (width - 1)
          removeFood('pacman-up')
        } else if (maze[pacman - (width - 1)].classList.contains('superFood')) {
          chase = true
          chase = false
          setTimeout(() => {
            chase = true
          }, 10000)
          removePacman()
          pacman -= (width - 1)
          maze[pacman].classList.remove('superFood')
          maze[pacman].classList.add('pacman')
          maze[pacman].classList.add('pacman-up')
          scoreCount += 40
          score.innerHTML = scoreCount
          audio.src = '../media/audio/8d82b5_Pacman_Eating_Cherry_Sound_Effect.mp3'
          audio.play()
        } else {
          removePacman()
          pacman -= (width - 1)
          maze[pacman].classList.add('pacman')
          maze[pacman].classList.add('pacman-up')
          audio.src = '../media/audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
          audio.play()
          pacmanMoves.push(pacman)
        }

      } else if (playerMovement === 3) {

        if (noDown.includes(pacman)) {
          return
        } else if (maze[pacman + (width - 1)].classList.contains('food')) {
          removePacman()
          pacman += (width - 1)
          removeFood('pacman-down')
        } else if (maze[pacman + (width - 1)].classList.contains('superFood')) {
          chase = true
          chase = false
          setTimeout(() => {
            chase = true
          }, 7000)
          removePacman()
          pacman += (width - 1)
          maze[pacman].classList.remove('superFood')
          maze[pacman].classList.add('pacman')
          maze[pacman].classList.add('pacman-down')
          scoreCount += 40
          score.innerHTML = scoreCount
          audio.src = '../media/audio/8d82b5_Pacman_Eating_Cherry_Sound_Effect.mp3'
          audio.play()
        } else {
          removePacman()
          pacman += (width - 1)
          maze[pacman].classList.add('pacman')
          maze[pacman].classList.add('pacman-down')
          audio.src = '../media/audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
          audio.play()
          pacmanMoves.push(pacman)
        }
      }
    }, 115)
  }
  movePacman()


  // GHOST MOVEMENTS 
  // -1 = LEFT, +1 = RIGHT, 
  // + (WIDTH - 1) = DOWN, - (WIDTH - 1) = UP

  const ghostOnePositionsLog = []
  const ghostTwoPositionsLog = []
  const ghostThreePositionsLog = []
  const ghostFourPositionsLog = []

  let ghostLogic1
  let ghostLogic2
  let ghostLogic3
  let ghostLogic4


  // COLLISION LOGIC
  let collisionInterval

  function removeGhosts(ghost, ghostClass) {
    maze[ghost].classList.remove(ghostClass)
    maze[ghost].classList.remove('ghost-left')
    maze[ghost].classList.remove('ghost-down')
    maze[ghost].classList.remove('ghost-up')
    maze[ghost].classList.remove('ghost-right')
  }

  function ghostOne() {

    collisionInterval = setInterval(() => {
      collision()
    }, 5)

    ghostLogic1 = setInterval(() => {
      const ghostOneDirections = []
      ghostOnePositionsLog.push(ghost1)

      // CHASE IS TRUE 
      if (chase) {
        maze[ghost1].classList.remove('scared-ghost-1')
        maze[ghost1].classList.add('ghost-1')

        if (!noRight.includes(ghost1) && ghost1 + 1 !== ghostOnePositionsLog[ghostOnePositionsLog.length - 2]) {
          ghostOneDirections.push(1)
        }
        if (!noLeft.includes(ghost1) && ghost1 - 1 !== ghostOnePositionsLog[ghostOnePositionsLog.length - 2]) {
          ghostOneDirections.push(-1)
        }
        if (!noUp.includes(ghost1) && ghost1 + ((width - 1) * - 1) !== ghostOnePositionsLog[ghostOnePositionsLog.length - 2]) {
          ghostOneDirections.push((width - 1) * -1)
        }
        if (!noDown.includes(ghost1) && ghost1 + (width - 1) !== ghostOnePositionsLog[ghostOnePositionsLog.length - 2]) {
          ghostOneDirections.push(width - 1)
        }

        const ghostOneMoves = ghostOneDirections[Math.floor(Math.random() * ghostOneDirections.length)]
        const ghostOnePrevious = maze[ghost1 + ghostOneMoves].className

        if (ghost1 === 482 && ghostOnePositionsLog[ghostOnePositionsLog.length - 2] !== 508) {
          removeGhosts(ghost1, 'ghost-1')
          ghost1 = foodPlacements[Math.floor(Math.random() * foodPlacements.length)]
          maze[ghost1].classList.add('ghost-1')
          maze[ghost1].classList.add('ghost-right')
        } else if (ghost1 === 508 && ghostOnePositionsLog[ghostOnePositionsLog.length - 2] !== 482) {
          removeGhosts(ghost1, 'ghost-1')
          ghost1 = foodPlacements[Math.floor(Math.random() * foodPlacements.length)]
          maze[ghost1].classList.add('ghost-1')
          maze[ghost1].classList.add('ghost-right')
        } else {

          if (ghostOneMoves === 1) {
            removeGhosts(ghost1, 'ghost-1')
            ghost1 += ghostOneMoves
            maze[ghost1].classList.add('ghost-1')
            maze[ghost1].classList.add('ghost-right')
            maze[ghost1 - ghostOneMoves].classList.add(ghostOnePrevious)
          } else if (ghostOneMoves === -1) {
            removeGhosts(ghost1, 'ghost-1')
            ghost1 += ghostOneMoves
            maze[ghost1].classList.add('ghost-1')
            maze[ghost1].classList.add('ghost-left')
            maze[ghost1 - ghostOneMoves].classList.add(ghostOnePrevious)
          } else if (ghostOneMoves === -32) {
            removeGhosts(ghost1, 'ghost-1')
            ghost1 += ghostOneMoves
            maze[ghost1].classList.add('ghost-1')
            maze[ghost1].classList.add('ghost-up')
            maze[ghost1 - ghostOneMoves].classList.add(ghostOnePrevious)
          } else if (ghostOneMoves === 32) {
            removeGhosts(ghost1, 'ghost-1')
            ghost1 += ghostOneMoves
            maze[ghost1].classList.add('ghost-1')
            maze[ghost1].classList.add('ghost-down')
            maze[ghost1 - ghostOneMoves].classList.add(ghostOnePrevious)
          }
        }

        //CHASE IS FALSE
      } else if (!chase) {
        maze[ghost1].classList.remove('ghost-1')
        maze[ghost1].classList.add('scared-ghost-1')
        if (!noRight.includes(ghost1) && ghost1 + 1 !== ghostOnePositionsLog[ghostOnePositionsLog.length - 2]) {
          ghostOneDirections.push(1)
        }
        if (!noLeft.includes(ghost1) && ghost1 - 1 !== ghostOnePositionsLog[ghostOnePositionsLog.length - 2]) {
          ghostOneDirections.push(-1)
        }
        if (!noUp.includes(ghost1) && ghost1 + ((width - 1) * - 1) !== ghostOnePositionsLog[ghostOnePositionsLog.length - 2]) {
          ghostOneDirections.push((width - 1) * -1)
        }
        if (!noDown.includes(ghost1) && ghost1 + (width - 1) !== ghostOnePositionsLog[ghostOnePositionsLog.length - 2]) {
          ghostOneDirections.push(width - 1)
        }


        const ghostOneMoves = ghostOneDirections[Math.floor(Math.random() * ghostOneDirections.length)]
        const ghostOnePrevious = maze[ghost1 + ghostOneMoves].className

        if (ghost1 === 482 && ghostOnePositionsLog[ghostOnePositionsLog.length - 2] !== 508) {
          maze[ghost1].classList.remove('scared-ghost-1')
          ghost1 = foodPlacements[Math.floor(Math.random() * foodPlacements.length)]
          maze[ghost1].classList.add('scared-ghost-1')
        } else if (ghost1 === 508 && ghostOnePositionsLog[ghostOnePositionsLog.length - 2] !== 482) {
          maze[ghost1].classList.remove('scared-ghost-1')
          ghost1 = foodPlacements[Math.floor(Math.random() * foodPlacements.length)]
          maze[ghost1].classList.add('scared-ghost-1')
        } else {
          if (ghostOneMoves === 1) {
            removeGhosts(ghost1, 'scared-ghost-1')
            ghost1 += ghostOneMoves
            maze[ghost1].classList.add('scared-ghost-1')
            maze[ghost1].classList.add('ghost-right')
            maze[ghost1 - ghostOneMoves].classList.add(ghostOnePrevious)
          } else if (ghostOneMoves === -1) {
            removeGhosts(ghost1, 'scared-ghost-1')
            ghost1 += ghostOneMoves
            maze[ghost1].classList.add('scared-ghost-1')
            maze[ghost1].classList.add('ghost-left')
            maze[ghost1 - ghostOneMoves].classList.add(ghostOnePrevious)
          } else if (ghostOneMoves === -32) {
            removeGhosts(ghost1, 'scared-ghost-1')
            ghost1 += ghostOneMoves
            maze[ghost1].classList.add('scared-ghost-1')
            maze[ghost1].classList.add('ghost-up')
            maze[ghost1 - ghostOneMoves].classList.add(ghostOnePrevious)
          } else if (ghostOneMoves === 32) {
            removeGhosts(ghost1, 'scared-ghost-1')
            ghost1 += ghostOneMoves
            maze[ghost1].classList.add('scared-ghost-1')
            maze[ghost1].classList.add('ghost-down')
            maze[ghost1 - ghostOneMoves].classList.add(ghostOnePrevious)
          }
        }
      }
    }, 120)
  }

  function ghostTwo() {
    ghostLogic2 = setInterval(() => {

      const ghostTwoDirections = []
      ghostTwoPositionsLog.push(ghost2)

      if (chase) {
        maze[ghost2].classList.remove('scared-ghost-2')
        maze[ghost2].classList.add('ghost-2')

        //GHOST TWO
        if (!noRight.includes(ghost2) && ghost2 + 1 !== ghostTwoPositionsLog[ghostTwoPositionsLog.length - 2]) {
          ghostTwoDirections.push(1)
        }
        if (!noLeft.includes(ghost2) && ghost2 - 1 !== ghostTwoPositionsLog[ghostTwoPositionsLog.length - 2]) {
          ghostTwoDirections.push(-1)
        }
        if (!noUp.includes(ghost2) && ghost2 + ((width - 1) * - 1) !== ghostTwoPositionsLog[ghostTwoPositionsLog.length - 2]) {
          ghostTwoDirections.push((width - 1) * -1)
        }
        if (!noDown.includes(ghost2) && ghost2 + (width - 1) !== ghostTwoPositionsLog[ghostTwoPositionsLog.length - 2]) {
          ghostTwoDirections.push(width - 1)
        }

        //GHOST TWO
        const ghostTwoMoves = ghostTwoDirections[Math.floor(Math.random() * ghostTwoDirections.length)]
        const ghostTwoPrevious = maze[ghost2 + ghostTwoMoves].className

        if (ghost2 === 482 && ghostTwoPositionsLog[ghostTwoPositionsLog.length - 2] !== 507) {
          maze[ghost2].classList.remove('ghost-2')
          ghost2 = foodPlacements[Math.floor(Math.random() * foodPlacements.length)]
          maze[ghost2].classList.add('ghost-2')
        } else if (ghost2 === 508 && ghostTwoPositionsLog[ghostTwoPositionsLog.length - 2] !== 482) {
          maze[ghost2].classList.remove('ghost-2')
          ghost2 = foodPlacements[Math.floor(Math.random() * foodPlacements.length)]
          maze[ghost2].classList.add('ghost-2')
        } else {

          if (ghostTwoMoves === 1) {
            removeGhosts(ghost2, 'ghost-2')
            ghost2 += ghostTwoMoves
            maze[ghost2].classList.add('ghost-2')
            maze[ghost2].classList.add('ghost-right')
            maze[ghost2 - ghostTwoMoves].classList.add(ghostTwoPrevious)
          } else if (ghostTwoMoves === -1) {
            removeGhosts(ghost2, 'ghost-2')
            ghost2 += ghostTwoMoves
            maze[ghost2].classList.add('ghost-2')
            maze[ghost2].classList.add('ghost-left')
            maze[ghost2 - ghostTwoMoves].classList.add(ghostTwoPrevious)
          } else if (ghostTwoMoves === -32) {
            removeGhosts(ghost2, 'ghost-2')
            ghost2 += ghostTwoMoves
            maze[ghost2].classList.add('ghost-2')
            maze[ghost2].classList.add('ghost-up')
            maze[ghost2 - ghostTwoMoves].classList.add(ghostTwoPrevious)
          } else if (ghostTwoMoves === 32) {
            removeGhosts(ghost2, 'ghost-2')
            ghost2 += ghostTwoMoves
            maze[ghost2].classList.add('ghost-2')
            maze[ghost2].classList.add('ghost-down')
            maze[ghost2 - ghostTwoMoves].classList.add(ghostTwoPrevious)
          }
        }
        // SCARED MODE
      } else if (!chase) {
        maze[ghost2].classList.remove('ghost-2')
        maze[ghost2].classList.add('scared-ghost-2')

        //GHOST TWO
        if (!noRight.includes(ghost2) && ghost2 + 1 !== ghostTwoPositionsLog[ghostTwoPositionsLog.length - 2]) {
          ghostTwoDirections.push(1)
        }
        if (!noLeft.includes(ghost2) && ghost2 - 1 !== ghostTwoPositionsLog[ghostTwoPositionsLog.length - 2]) {
          ghostTwoDirections.push(-1)
        }
        if (!noUp.includes(ghost2) && ghost2 + ((width - 1) * - 1) !== ghostTwoPositionsLog[ghostTwoPositionsLog.length - 2]) {
          ghostTwoDirections.push((width - 1) * -1)
        }
        if (!noDown.includes(ghost2) && ghost2 + (width - 1) !== ghostTwoPositionsLog[ghostTwoPositionsLog.length - 2]) {
          ghostTwoDirections.push(width - 1)
        }

        //GHOST TWO
        const ghostTwoMoves = ghostTwoDirections[Math.floor(Math.random() * ghostTwoDirections.length)]
        const ghostTwoPrevious = maze[ghost2 + ghostTwoMoves].className

        if (ghost2 === 482 && ghostTwoPositionsLog[ghostTwoPositionsLog.length - 2] !== 507) {
          maze[ghost2].classList.remove('scared-ghost-2')
          ghost2 = foodPlacements[Math.floor(Math.random() * foodPlacements.length)]
          maze[ghost2].classList.add('scared-ghost-2')
        } else if (ghost2 === 508 && ghostTwoPositionsLog[ghostTwoPositionsLog.length - 2] !== 482) {
          maze[ghost2].classList.remove('scared-ghost-2')
          ghost2 = foodPlacements[Math.floor(Math.random() * foodPlacements.length)]
          maze[ghost2].classList.add('scared-ghost-2')
        } else {

          if (ghostTwoMoves === 1) {
            removeGhosts(ghost2, 'scared-ghost-2')
            ghost2 += ghostTwoMoves
            maze[ghost2].classList.add('scared-ghost-2')
            maze[ghost2].classList.add('ghost-right')
            maze[ghost2 - ghostTwoMoves].classList.add(ghostTwoPrevious)
          } else if (ghostTwoMoves === -1) {
            removeGhosts(ghost2, 'scared-ghost-2')
            ghost2 += ghostTwoMoves
            maze[ghost2].classList.add('scared-ghost-2')
            maze[ghost2].classList.add('ghost-left')
            maze[ghost2 - ghostTwoMoves].classList.add(ghostTwoPrevious)
          } else if (ghostTwoMoves === -32) {
            removeGhosts(ghost2, 'scared-ghost-2')
            ghost2 += ghostTwoMoves
            maze[ghost2].classList.add('scared-ghost-2')
            maze[ghost2].classList.add('ghost-up')
            maze[ghost2 - ghostTwoMoves].classList.add(ghostTwoPrevious)
          } else if (ghostTwoMoves === 32) {
            removeGhosts(ghost2, 'scared-ghost-2')
            ghost2 += ghostTwoMoves
            maze[ghost2].classList.add('scared-ghost-2')
            maze[ghost2].classList.add('ghost-down')
            maze[ghost2 - ghostTwoMoves].classList.add(ghostTwoPrevious)
          }
        }
      }
    }, 120)
  }

  function ghostThree() {
    ghostLogic3 = setInterval(() => {

      const ghostThreeDirections = []
      ghostThreePositionsLog.push(ghost3)

      if (chase) {
        maze[ghost3].classList.remove('scared-ghost-3')
        maze[ghost3].classList.add('ghost-3')
        //GHOST THREE
        if (!noRight.includes(ghost3) && ghost3 + 1 !== ghostThreePositionsLog[ghostThreePositionsLog.length - 2]) {
          ghostThreeDirections.push(1)
        }
        if (!noLeft.includes(ghost3) && ghost3 - 1 !== ghostThreePositionsLog[ghostThreePositionsLog.length - 2]) {
          ghostThreeDirections.push(-1)
        }
        if (!noUp.includes(ghost3) && ghost3 + ((width - 1) * - 1) !== ghostThreePositionsLog[ghostThreePositionsLog.length - 2]) {
          ghostThreeDirections.push((width - 1) * -1)
        }
        if (!noDown.includes(ghost3) && ghost3 + (width - 1) !== ghostThreePositionsLog[ghostThreePositionsLog.length - 2]) {
          ghostThreeDirections.push(width - 1)
        }

        const ghostThreeMoves = ghostThreeDirections[Math.floor(Math.random() * ghostThreeDirections.length)]
        const ghostThreePrevious = maze[ghost3 + ghostThreeMoves].className

        if (ghost3 === 482 && ghostThreePositionsLog[ghostThreePositionsLog.length - 2] !== 507) {
          maze[ghost3].classList.remove('ghost-3')
          ghost3 = foodPlacements[Math.floor(Math.random() * foodPlacements.length)]
          maze[ghost3].classList.add('ghost-3')
        } else if (ghost3 === 507 && ghostThreePositionsLog[ghostThreePositionsLog.length - 2] !== 482) {
          maze[ghost3].classList.remove('ghost-3')
          ghost3 = foodPlacements[Math.floor(Math.random() * foodPlacements.length)]
          maze[ghost3].classList.add('ghost-3')
        } else {

          if (ghostThreeMoves === 1) {
            removeGhosts(ghost3, 'ghost-3')
            ghost3 += ghostThreeMoves
            maze[ghost3].classList.add('ghost-3')
            maze[ghost3].classList.add('ghost-right')
            maze[ghost3 - ghostThreeMoves].classList.add(ghostThreePrevious)
          } else if (ghostThreeMoves === -1) {
            removeGhosts(ghost3, 'ghost-3')
            ghost3 += ghostThreeMoves
            maze[ghost3].classList.add('ghost-3')
            maze[ghost3].classList.add('ghost-left')
            maze[ghost3 - ghostThreeMoves].classList.add(ghostThreePrevious)
          } else if (ghostThreeMoves === -32) {
            removeGhosts(ghost3, 'ghost-3')
            ghost3 += ghostThreeMoves
            maze[ghost3].classList.add('ghost-3')
            maze[ghost3].classList.add('ghost-up')
            maze[ghost3 - ghostThreeMoves].classList.add(ghostThreePrevious)
          } else if (ghostThreeMoves === 32) {
            removeGhosts(ghost3, 'ghost-3')
            ghost3 += ghostThreeMoves
            maze[ghost3].classList.add('ghost-3')
            maze[ghost3].classList.add('ghost-down')
            maze[ghost3 - ghostThreeMoves].classList.add(ghostThreePrevious)
          }
        }

        // SCARED MODE
      } else if (!chase) {
        maze[ghost3].classList.remove('ghost-3')
        maze[ghost3].classList.add('scared-ghost-3')

        if (!noRight.includes(ghost3) && ghost3 + 1 !== ghostThreePositionsLog[ghostThreePositionsLog.length - 2]) {
          ghostThreeDirections.push(1)
        }
        if (!noLeft.includes(ghost3) && ghost3 - 1 !== ghostThreePositionsLog[ghostThreePositionsLog.length - 2]) {
          ghostThreeDirections.push(-1)
        }
        if (!noUp.includes(ghost3) && ghost3 + ((width - 1) * - 1) !== ghostThreePositionsLog[ghostThreePositionsLog.length - 2]) {
          ghostThreeDirections.push((width - 1) * -1)
        }
        if (!noDown.includes(ghost3) && ghost3 + (width - 1) !== ghostThreePositionsLog[ghostThreePositionsLog.length - 2]) {
          ghostThreeDirections.push(width - 1)
        }

        const ghostThreeMoves = ghostThreeDirections[Math.floor(Math.random() * ghostThreeDirections.length)]
        const ghostThreePrevious = maze[ghost3 + ghostThreeMoves].className

        if (ghost3 === 482 && ghostThreePositionsLog[ghostThreePositionsLog.length - 2] !== 507) {
          maze[ghost3].classList.remove('scared-ghost-3')
          ghost3 = foodPlacements[Math.floor(Math.random() * foodPlacements.length)]
          maze[ghost3].classList.add('scared-ghost-3')
        } else if (ghost3 === 507 && ghostThreePositionsLog[ghostThreePositionsLog.length - 2] !== 482) {
          maze[ghost3].classList.remove('scared-ghost-3')
          ghost3 = foodPlacements[Math.floor(Math.random() * foodPlacements.length)]
          maze[ghost3].classList.add('scared-ghost-3')
        } else {
          if (ghostThreeMoves === 1) {
            removeGhosts(ghost3, 'scared-ghost-3')
            ghost3 += ghostThreeMoves
            maze[ghost3].classList.add('scared-ghost-3')
            maze[ghost3].classList.add('ghost-right')
            maze[ghost3 - ghostThreeMoves].classList.add(ghostThreePrevious)
          } else if (ghostThreeMoves === -1) {
            removeGhosts(ghost3, 'scared-ghost-3')
            ghost3 += ghostThreeMoves
            maze[ghost3].classList.add('scared-ghost-3')
            maze[ghost3].classList.add('ghost-left')
            maze[ghost3 - ghostThreeMoves].classList.add(ghostThreePrevious)
          } else if (ghostThreeMoves === -32) {
            removeGhosts(ghost3, 'scared-ghost-3')
            ghost3 += ghostThreeMoves
            maze[ghost3].classList.add('scared-ghost-3')
            maze[ghost3].classList.add('ghost-up')
            maze[ghost3 - ghostThreeMoves].classList.add(ghostThreePrevious)
          } else if (ghostThreeMoves === 32) {
            removeGhosts(ghost3, 'scared-ghost-3')
            ghost3 += ghostThreeMoves
            maze[ghost3].classList.add('scared-ghost-3')
            maze[ghost3].classList.add('ghost-down')
            maze[ghost3 - ghostThreeMoves].classList.add(ghostThreePrevious)
          }
        }
      }
    }, 120)
  }

  function ghostFour() {
    ghostLogic4 = setInterval(() => {

      const ghostFourDirections = []
      ghostFourPositionsLog.push(ghost4)

      if (chase) {
        maze[ghost4].classList.remove('scared-ghost-4')
        maze[ghost4].classList.add('ghost-4')

        //GHOST FOUR
        if (!noRight.includes(ghost4) && ghost4 + 1 !== ghostFourPositionsLog[ghostFourPositionsLog.length - 2]) {
          ghostFourDirections.push(1)
        }
        if (!noLeft.includes(ghost4) && ghost4 - 1 !== ghostFourPositionsLog[ghostFourPositionsLog.length - 2]) {
          ghostFourDirections.push(-1)
        }
        if (!noUp.includes(ghost4) && ghost4 + ((width - 1) * - 1) !== ghostFourPositionsLog[ghostFourPositionsLog.length - 2]) {
          ghostFourDirections.push((width - 1) * -1)
        }
        if (!noDown.includes(ghost4) && ghost4 + (width - 1) !== ghostFourPositionsLog[ghostFourPositionsLog.length - 2]) {
          ghostFourDirections.push(width - 1)
        }

        // GHOST 4
        const ghostFourMoves = ghostFourDirections[Math.floor(Math.random() * ghostFourDirections.length)]
        const ghostFourPrevious = maze[ghost4 + ghostFourMoves].className

        if (ghost4 === 482 && ghostFourPositionsLog[ghostFourPositionsLog.length - 2] !== 507) {
          maze[ghost4].classList.remove('ghost-4')
          ghost4 = foodPlacements[Math.floor(Math.random() * foodPlacements.length)]
          maze[ghost4].classList.add('ghost-4')
        } else if (ghost4 === 507 && ghostFourPositionsLog[ghostFourPositionsLog.length - 2] !== 482) {
          maze[ghost4].classList.remove('ghost-4')
          ghost4 = foodPlacements[Math.floor(Math.random() * foodPlacements.length)]
          maze[ghost4].classList.add('ghost-4')
        } else {
          if (ghostFourMoves === 1) {
            removeGhosts(ghost4, 'ghost-4')
            ghost4 += ghostFourMoves
            maze[ghost4].classList.add('ghost-4')
            maze[ghost4].classList.add('ghost-right')
            maze[ghost4 - ghostFourMoves].classList.add(ghostFourPrevious)
          } else if (ghostFourMoves === -1) {
            removeGhosts(ghost4, 'ghost-4')
            ghost4 += ghostFourMoves
            maze[ghost4].classList.add('ghost-4')
            maze[ghost4].classList.add('ghost-left')
            maze[ghost4 - ghostFourMoves].classList.add(ghostFourPrevious)
          } else if (ghostFourMoves === -32) {
            removeGhosts(ghost4, 'ghost-4')
            ghost4 += ghostFourMoves
            maze[ghost4].classList.add('ghost-4')
            maze[ghost4].classList.add('ghost-up')
            maze[ghost4 - ghostFourMoves].classList.add(ghostFourPrevious)
          } else if (ghostFourMoves === 32) {
            removeGhosts(ghost4, 'ghost-4')
            ghost4 += ghostFourMoves
            maze[ghost4].classList.add('ghost-4')
            maze[ghost4].classList.add('ghost-down')
            maze[ghost4 - ghostFourMoves].classList.add(ghostFourPrevious)
          }
        }

        // SCARED MODE
      } else if (!chase) {
        maze[ghost4].classList.remove('ghost-4')
        maze[ghost4].classList.add('scared-ghost-4')

        //GHOST FOUR
        if (!noRight.includes(ghost4) && ghost4 + 1 !== ghostFourPositionsLog[ghostFourPositionsLog.length - 2]) {
          ghostFourDirections.push(1)
        }
        if (!noLeft.includes(ghost4) && ghost4 - 1 !== ghostFourPositionsLog[ghostFourPositionsLog.length - 2]) {
          ghostFourDirections.push(-1)
        }
        if (!noUp.includes(ghost4) && ghost4 + ((width - 1) * - 1) !== ghostFourPositionsLog[ghostFourPositionsLog.length - 2]) {
          ghostFourDirections.push((width - 1) * -1)
        }
        if (!noDown.includes(ghost4) && ghost4 + (width - 1) !== ghostFourPositionsLog[ghostFourPositionsLog.length - 2]) {
          ghostFourDirections.push(width - 1)
        }


        // GHOST 4
        const ghostFourMoves = ghostFourDirections[Math.floor(Math.random() * ghostFourDirections.length)]
        const ghostFourPrevious = maze[ghost4 + ghostFourMoves].className

        if (ghost4 === 482 && ghostFourPositionsLog[ghostFourPositionsLog.length - 2] !== 507) {
          maze[ghost4].classList.remove('scared-ghost-4')
          ghost4 = foodPlacements[Math.floor(Math.random() * foodPlacements.length)]
          maze[ghost4].classList.add('scared-ghost')
        } else if (ghost4 === 507 && ghostFourPositionsLog[ghostFourPositionsLog.length - 2] !== 482) {
          maze[ghost4].classList.remove('scared-ghost-4')
          ghost4 = foodPlacements[Math.floor(Math.random() * foodPlacements.length)]
          maze[ghost4].classList.add('scared-ghost-4')
        } else {
          if (ghostFourMoves === 1) {
            removeGhosts(ghost4, 'scared-ghost-4')
            ghost4 += ghostFourMoves
            maze[ghost4].classList.add('scared-ghost-4')
            maze[ghost4].classList.add('ghost-right')
            maze[ghost4 - ghostFourMoves].classList.add(ghostFourPrevious)
          } else if (ghostFourMoves === -1) {
            removeGhosts(ghost4, 'scared-ghost-4')
            ghost4 += ghostFourMoves
            maze[ghost4].classList.add('scared-ghost-4')
            maze[ghost4].classList.add('ghost-left')
            maze[ghost4 - ghostFourMoves].classList.add(ghostFourPrevious)
          } else if (ghostFourMoves === -32) {
            removeGhosts(ghost4, 'scared-ghost-4')
            ghost4 += ghostFourMoves
            maze[ghost4].classList.add('scared-ghost-4')
            maze[ghost4].classList.add('ghost-up')
            maze[ghost4 - ghostFourMoves].classList.add(ghostFourPrevious)
          } else if (ghostFourMoves === 32) {
            removeGhosts(ghost4, 'scared-ghost-4')
            ghost4 += ghostFourMoves
            maze[ghost4].classList.add('scared-ghost-4')
            maze[ghost4].classList.add('ghost-down')
            maze[ghost4 - ghostFourMoves].classList.add(ghostFourPrevious)
          }
        }
      }
    }, 120)
  }
  ghostOne()
  ghostTwo()
  ghostThree()
  ghostFour()


  //COLLISION LOGIC

  let lives = 3
  const livesIcon = document.getElementsByClassName('lives')
  const gameOver = document.getElementsByTagName('footer')[0]
  const finalScore = document.getElementsByClassName('finalScore')[0]

  const timer = document.getElementsByClassName('timer')[0]
  let gameTimer = 45

  const gameCount = setInterval(() => {
    if (gameTimer === 0) {
      clearInterval(gameCount)
      clearInterval(ghostLogic1)
      clearInterval(ghostLogic2)
      clearInterval(ghostLogic3)
      clearInterval(ghostLogic4)

      clearInterval(playerInterval)

      container.style.opacity = '0.2'
      gameOver.style.display = 'flex'
      finalScore.innerHTML = scoreCount
      audio.src = '../media/audio/zapsplat_human_male_voice_says_game_over_001_15726.mp3'
      audio.play()
    } else if (gameTimer < 11) {
      gameTimer -= 1
      timer.innerHTML = gameTimer
      timer.style.color = 'red'
      timer.style.animation = 'pulsing 0.5s linear alternate 20'
    } else {
      gameTimer -= 1
      timer.innerHTML = gameTimer
    }
  }, 1000)

  // CHARACTER REAPPEAR AFTER ANY COLLISION

  function characterAppear() {

    const ghosts = [ghost1, ghost2, ghost3, ghost4]

    setTimeout(() => {

      ghosts.map(el => {
        maze[el].classList.add('cell')
        maze[el].style.animation = ''
        maze[el].style.visibility = 'visible'
      })

      pacman = 783
      maze[pacman].classList.add('pacman')
      ghost1 = 395
      maze[ghost1].classList.add('ghost-1')
      ghost2 = 397
      maze[ghost2].classList.add('ghost-2')
      ghost3 = 400
      maze[ghost3].classList.add('ghost-3')
      ghost4 = 402
      maze[ghost4].classList.add('ghost-4')

    }, 4000)

    setTimeout(() => {
      ghostOne()
      ghostTwo()
      ghostThree()
      ghostFour()
      movePacman()
    }, 5000)

  }

  function scaredGhostCollision(ghostLogic, ghost) {
    scoreCount += 80
    score.innerHTML = scoreCount
    gameTimer += 5
    timer.innerHTML = gameTimer

    clearInterval(collisionInterval)
    clearInterval(ghostLogic) //1,2,3,4
    maze[ghost].style.animation = 'blinking 0.1s alternate 5'
  }


  function collision() {

    if (chase) {
      if (maze[pacman].classList.contains('ghost-1') ||
        maze[pacman].classList.contains('ghost-2') ||
        maze[pacman].classList.contains('ghost-3') ||
        maze[pacman].classList.contains('ghost-4')) {

        audio.src = '../media/audio/8d82b5_Pacman_Dies_Sound_Effect.mp3'
        audio.play()

        clearInterval(collisionInterval)
        clearInterval(ghostLogic1)
        clearInterval(ghostLogic2)
        clearInterval(ghostLogic3)
        clearInterval(ghostLogic4)

        clearInterval(playerInterval)

        maze[ghost1].style.animation = 'blinking 0.1s alternate 5'
        maze[ghost2].style.animation = 'blinking 0.1s alternate 5'
        maze[ghost3].style.animation = 'blinking 0.1s alternate 5'
        maze[ghost4].style.animation = 'blinking 0.1s alternate 5'


        setTimeout(() => {
          maze[ghost1].classList.remove('ghost-1')
          maze[ghost2].classList.remove('ghost-2')
          maze[ghost3].classList.remove('ghost-3')
          maze[ghost4].classList.remove('ghost-4')
        }, 1500)

        setTimeout(() => {
          maze[pacman].style.visibility = 'hidden'
          maze[pacman].classList.remove('pacman')
        }, 2000)


        //  LIVES 
        if (lives === 1) {
          clearInterval(gameCount)
          setTimeout(() => {
            container.style.opacity = '0.2'
            gameOver.style.display = 'flex'
            finalScore.innerHTML = scoreCount
            audio.src = '../media/audio/zapsplat_human_male_voice_says_game_over_001_15726.mp3'
            audio.play()
          }, 3000)
        } else {
          lives -= 1
          livesIcon[lives].src = ''
          characterAppear()
        }
      }


    } else {

      if (maze[pacman].classList.contains('scared-ghost-1')) {
    
        scaredGhostCollision(ghostLogic1, ghost1)

        setTimeout(() => {
          maze[ghost1].classList.remove('ghost-left')
          maze[ghost1].classList.remove('ghost-down')
          maze[ghost1].classList.remove('ghost-up')
          maze[ghost1].classList.remove('ghost-right')
          maze[ghost1].classList.remove('scared-ghost-1')
        }, 700)

        setTimeout(() => {
          document.addEventListener('keydown', pacmanMove)
        }, 900)

        setTimeout(() => {
          ghost1 = 395
          maze[ghost1].classList.add('ghost-1')
        }, 1400)

        setTimeout(() => {
          ghostOne()
          collisionInterval = setInterval(() => {
            collision()
          }, 10)
        }, 1600)


        // SCARED GHOST 2
      } else if (maze[pacman].classList.contains('scared-ghost-2')) {
  
        scaredGhostCollision(ghostLogic2, ghost2)

        setTimeout(() => {
          maze[ghost2].classList.remove('ghost-left')
          maze[ghost2].classList.remove('ghost-down')
          maze[ghost2].classList.remove('ghost-up')
          maze[ghost2].classList.remove('ghost-right')
          maze[ghost2].classList.remove('scared-ghost-2')
        }, 700)

        setTimeout(() => {
          document.addEventListener('keydown', pacmanMove)
        }, 900)

        setTimeout(() => {
          ghost2 = 397
          maze[ghost2].classList.add('ghost-2')
        }, 1400)

        setTimeout(() => {
          ghostTwo()
          collisionInterval = setInterval(() => {
            collision()
          }, 10)
        }, 1600)

        // SCARED GHOST 3
      } else if (maze[pacman].classList.contains('scared-ghost-3')) {
        scaredGhostCollision('scared-ghost-3', ghostLogic3, ghost3)

        setTimeout(() => {
          maze[ghost3].classList.remove('ghost-left')
          maze[ghost3].classList.remove('ghost-down')
          maze[ghost3].classList.remove('ghost-up')
          maze[ghost3].classList.remove('ghost-right')
          maze[ghost3].classList.remove('scared-ghost-3')
        }, 700)

        setTimeout(() => {
          document.addEventListener('keydown', pacmanMove)
        }, 900)

        setTimeout(() => {
          ghost3 = 400
          maze[ghost3].classList.add('ghost-3')
        }, 1400)

        setTimeout(() => {
          ghostThree()
          collisionInterval = setInterval(() => {
            collision()
          }, 10)
        }, 1600)


        // SCARED GHOST 4
      } else if (maze[pacman].classList.contains('scared-ghost-4')) {
        scaredGhostCollision(ghostLogic4, ghost4)

        setTimeout(() => {
          maze[ghost4].classList.remove('ghost-left')
          maze[ghost4].classList.remove('ghost-down')
          maze[ghost4].classList.remove('ghost-up')
          maze[ghost4].classList.remove('ghost-right')
          maze[ghost4].classList.remove('scared-ghost-4')
        }, 700)

        setTimeout(() => {
          document.addEventListener('keydown', pacmanMove)
        }, 900)

        setTimeout(() => {
          ghost4 = 402
          maze[ghost4].classList.add('ghost-4')
        }, 1400)

        setTimeout(() => {
          ghostFour()
          collisionInterval = setInterval(() => {
            collision()
          }, 10)
        }, 1600)
      }
    }
  }

  // GAME END FOOTER SCREEN

  const submitButton = document.querySelector('.submit')
  const name = document.querySelector('input')

  submitButton.addEventListener('mousedown', () => {
    submitButton.style.transform = 'scale(0.9)'
  })

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
      submitButton.style.transform = ''
      //LEADER BOARD AND SCORING WINNERS
      const player = { name: name.value, score: scoreCount }
      scores.push(player)
      localStorage ? localStorage.setItem('mapOne', JSON.stringify(scores)) : null
      gameOver.style.display = 'none'
      container.style.opacity = '1'
      displayScore()
    })
  }
  window.onLoad = displayScore()
}, 4500)

window.addEventListener('DOMContentLoaded', main)


