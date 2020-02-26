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

  audio.src = 'audio/8d82b5_Pacman_Opening_Song_Sound_Effect.mp3'
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

  const foodPlacements =
    [
      66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 98, 103, 109, 112, 118, 123,
      155, 150, 144, 141, 135, 130, 162, 167, 173, 176, 182, 187, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204,
      205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 226, 231, 234, 243, 246, 251, 283, 278, 275,
      266, 263, 258, 290, 291, 292, 293, 294, 295, 298, 299, 300, 301, 304, 305, 306, 307, 310, 311, 312, 313, 314, 315, 327,
      342, 359, 374, 406, 391, 423, 438, 455, 470, 502, 487, 519, 534, 566, 630, 662, 694,
      726, 758, 790, 822, 854, 886, 487, 519, 551, 583, 615, 647, 679, 711, 743, 775, 807, 839, 871, 674, 675, 676, 677, 678,
      679, 680, 681, 682, 683, 684, 685, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 770, 771, 772, 775, 776,
      777, 778, 779, 780, 781, 782, 784, 785, 786, 787, 788, 789, 790, 793, 794, 795, 886, 887, 888, 889, 890, 891, 962,
      963, 964, 965, 966, 967, 968, 969, 970, 971, 972, 973, 974, 975, 976, 977, 978, 979, 980, 981, 982, 983, 984, 985, 986,
      987, 866, 867, 868, 869, 870, 871, 898, 930, 962, 923, 955, 987, 874, 875, 876, 877, 880, 881, 882, 883, 909, 941, 912,
      944, 706, 738, 804, 836, 819, 851, 825, 857, 731, 763, 598, 810, 842, 717, 749, 720, 752
    ]

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

  function pacmanMove() {




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
      document.removeEventListener('keydown', pacmanMove)

      setTimeout(() => {
        audio.src = 'audio/zapsplat_multimedia_male_voice_processed_says_you_win_001_21572.mp3'
        audio.play()
      }, 500)
    }


    // USER
    if (event.key === 'ArrowRight' || event.key === 'd') {
      if (noRight.includes(pacman)) {
        return
      } else {
        if (pacman === 508) {
          maze[pacman].classList.remove('pacman')
          pacman = 481
          maze[pacman].classList.add('pacman')
          audio.src = 'audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
          audio.play()
          pacmanMoves.push(pacman)
        } else if (maze[pacman + 1].classList.contains('food')) {
          maze[pacman].classList.remove('pacman')
          pacman += 1
          maze[pacman].classList.remove('food')
          maze[pacman].classList.add('pacman')
          scoreCount += 10
          score.innerHTML = scoreCount
          audio.src = 'audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
          audio.play()
          pacmanMoves.push(pacman)
        } else {
          maze[pacman].classList.remove('pacman')
          pacman += 1
          maze[pacman].classList.add('pacman')
          audio.src = 'audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
          audio.play()
          pacmanMoves.push(pacman)
        }
      }

    } else if (event.key === 'ArrowLeft' || event.key === 'a') {
      if (noLeft.includes(pacman)) {
        return
      } else {
        if (pacman === 481) {
          maze[pacman].classList.remove('pacman')
          pacman = 508
          maze[pacman].classList.add('pacman')
          audio.src = 'audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
          audio.play()
          pacmanMoves.push(pacman)
        } else if (maze[pacman - 1].classList.contains('food')) {
          maze[pacman].classList.remove('pacman')
          pacman -= 1
          maze[pacman].classList.remove('food')
          maze[pacman].classList.add('pacman')
          scoreCount += 10
          score.innerHTML = scoreCount
          audio.src = 'audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
          audio.play()
          pacmanMoves.push(pacman)
        } else {
          maze[pacman].classList.remove('pacman')
          pacman -= 1
          maze[pacman].classList.add('pacman')
          audio.src = 'audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
          audio.play()
          pacmanMoves.push(pacman)
        }
      }

    } else if (event.key === 'ArrowUp' || event.key === 'w') {
      if (noUp.includes(pacman)) {
        return
      } else if (maze[pacman - (width - 1)].classList.contains('food')) {
        maze[pacman].classList.remove('pacman')
        pacman -= (width - 1)
        maze[pacman].classList.remove('food')
        maze[pacman].classList.add('pacman')
        scoreCount += 10
        score.innerHTML = scoreCount
        audio.src = 'audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
        audio.play()
        pacmanMoves.push(pacman)
      } else {
        maze[pacman].classList.remove('pacman')
        pacman -= (width - 1)
        maze[pacman].classList.add('pacman')
        audio.src = 'audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
        audio.play()
        pacmanMoves.push(pacman)
      }

    } else if (event.key === 'ArrowDown' || event.key === 's') {
      if (noDown.includes(pacman)) {
        return
      } else if (maze[pacman + (width - 1)].classList.contains('food')) {
        maze[pacman].classList.remove('pacman')
        pacman += (width - 1)
        maze[pacman].classList.remove('food')
        maze[pacman].classList.add('pacman')
        scoreCount += 10
        score.innerHTML = scoreCount
        audio.src = 'audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
        audio.play()
        pacmanMoves.push(pacman)
      } else {
        maze[pacman].classList.remove('pacman')
        pacman += (width - 1)
        maze[pacman].classList.add('pacman')
        audio.src = 'audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
        audio.play()
        pacmanMoves.push(pacman)
      }
    }
    console.log(pacmanMoves)
  }




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

  let collisionInterval

  function ghostOne() {

    collisionInterval = setInterval(() => {
      collision()
    }, 75)

    ghostLogic1 = setInterval(() => {

      const ghostOneDirections = []
      ghostOnePositionsLog.push(ghost1)

      // const ghostOnePath1 = []

      // if (pacman > ghost1) {
      //   if (!noRight.includes(ghost1)) {
      //     maze[ghost1].classList.remove('ghost-1')
      //     ghostOnePath1.push(ghost1 + 1)
      //     ghost1 += 1
      //     maze[ghost1].classList.add('ghost-1')
      //   } else if (!noDown.includes(ghost1)) {
      //     maze[ghost1].classList.remove('ghost-1')
      //     ghostOnePath1.push(ghost1 + (width - 1))
      //     ghost1 += (width - 1)
      //     maze[ghost1].classList.add('ghost-1')
      //   }
      // } else if (ghost1 > pacman) {
      //   if (!noLeft.includes(ghost1)) {
      //     if (!noUp.includes(ghost1)) {
      //       maze[ghost1].classList.remove('ghost-1')
      //       ghostOnePath1.push(ghost1 - (width - 1))
      //       ghost1 -= (width - 1)
      //       maze[ghost1].classList.add('ghost-1')
      //     } else {
      //       maze[ghost1].classList.remove('ghost-1')
      //       ghostOnePath1.push(ghost1 - 1)
      //       ghost1 -= 1
      //       maze[ghost1].classList.add('ghost-1')
      //     }
      //   } else if (!noUp.includes(ghost1)) {
      //     maze[ghost1].classList.remove('ghost-1')
      //     ghostOnePath1.push(ghost1 - (width - 1))
      //     ghost1 -= (width - 1)
      //     maze[ghost1].classList.add('ghost-1')
      //   } else {
      //     return
      //   }
      // }


      // GHOST ONE
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
        maze[ghost1].classList.remove('ghost-1')
        ghost1 = 508
        maze[ghost1].classList.add('ghost-1')
      } else if (ghost1 === 508 && ghostOnePositionsLog[ghostOnePositionsLog.length - 2] !== 482) {
        maze[ghost1].classList.remove('ghost-1')
        ghost1 = 482
        maze[ghost1].classList.add('ghost-1')

      } else {
        maze[ghost1].classList.remove('ghost-1')
        ghost1 += ghostOneMoves
        maze[ghost1].classList.add('ghost-1')
        maze[ghost1 - ghostOneMoves].classList.add(ghostOnePrevious)
      }
    }, 150)
  }

  function ghostTwo() {
    ghostLogic2 = setInterval(() => {

      const ghostTwoDirections = []
      ghostTwoPositionsLog.push(ghost2)


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
        ghost2 = 507
        maze[ghost2].classList.add('ghost-2')
      } else if (ghost2 === 508 && ghostTwoPositionsLog[ghostTwoPositionsLog.length - 2] !== 482) {
        maze[ghost2].classList.remove('ghost-2')
        ghost2 = 482
        maze[ghost2].classList.add('ghost-2')
      } else {
        maze[ghost2].classList.remove('ghost-2')
        ghost2 += ghostTwoMoves
        maze[ghost2].classList.add('ghost-2')
        maze[ghost2 - ghostTwoMoves].classList.add(ghostTwoPrevious)
      }


    }, 150)
  }








  function ghostThree() {
    ghostLogic3 = setInterval(() => {

      const ghostThreeDirections = []
      ghostThreePositionsLog.push(ghost3)

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



      // GHOST 3


      const ghostThreeMoves = ghostThreeDirections[Math.floor(Math.random() * ghostThreeDirections.length)]
      const ghostThreePrevious = maze[ghost3 + ghostThreeMoves].className

      if (ghost3 === 482 && ghostThreePositionsLog[ghostThreePositionsLog.length - 2] !== 507) {
        maze[ghost3].classList.remove('ghost-3')
        ghost3 = 507
        maze[ghost3].classList.add('ghost-3')
      } else if (ghost3 === 507 && ghostThreePositionsLog[ghostThreePositionsLog.length - 2] !== 482) {
        maze[ghost3].classList.remove('ghost-3')
        ghost3 = 482
        maze[ghost3].classList.add('ghost-3')
      } else {
        maze[ghost3].classList.remove('ghost-3')
        ghost3 += ghostThreeMoves
        maze[ghost3].classList.add('ghost-3')
        maze[ghost3 - ghostThreeMoves].classList.add(ghostThreePrevious)
      }

    }, 150)

  }



  function ghostFour() {


    ghostLogic4 = setInterval(() => {

      const ghostFourDirections = []
      ghostFourPositionsLog.push(ghost4)
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
        ghost4 = 507
        maze[ghost4].classList.add('ghost-4')
      } else if (ghost4 === 507 && ghostFourPositionsLog[ghostFourPositionsLog.length - 2] !== 482) {
        maze[ghost4].classList.remove('ghost-4')
        ghost4 = 482
        maze[ghost4].classList.add('ghost-4')
      } else {
        maze[ghost4].classList.remove('ghost-4')
        ghost4 += ghostFourMoves
        maze[ghost4].classList.add('ghost-4')
        maze[ghost4 - ghostFourMoves].classList.add(ghostFourPrevious)
      }

    }, 150)

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
      document.removeEventListener('keydown', pacmanMove)
      container.style.opacity = '0.2'
      gameOver.style.display = 'flex'
      finalScore.innerHTML = scoreCount
      audio.src = 'audio/zapsplat_human_male_voice_says_game_over_001_15726.mp3'
      audio.play()
    } else if (gameTimer < 11) {
      gameTimer -= 1
      timer.innerHTML = gameTimer
      timer.style.color = 'red'
    } else {
      gameTimer -= 1
      timer.innerHTML = gameTimer
    }
  }, 1000)


  function collision() {


    if (maze[pacman].classList.contains('ghost-1') ||
      maze[pacman].classList.contains('ghost-2') ||
      maze[pacman].classList.contains('ghost-3') ||
      maze[pacman].classList.contains('ghost-4')) {

      audio.src = 'audio/8d82b5_Pacman_Dies_Sound_Effect.mp3'
      audio.play()

      clearInterval(collisionInterval)
      clearInterval(ghostLogic1)
      clearInterval(ghostLogic2)
      clearInterval(ghostLogic3)
      clearInterval(ghostLogic4)

      document.removeEventListener('keydown', pacmanMove)

      maze[ghost1].style.animation = 'blinking 0.13s alternate 6'
      maze[ghost2].style.animation = 'blinking 0.13s alternate 6'
      maze[ghost3].style.animation = 'blinking 0.13s alternate 6'
      maze[ghost4].style.animation = 'blinking 0.13s alternate 6'



      setTimeout(() => {
        maze[ghost1].classList.remove('ghost-1')
        maze[ghost2].classList.remove('ghost-2')
        maze[ghost3].classList.remove('ghost-3')
        maze[ghost4].classList.remove('ghost-4')
      }, 2000)

      setTimeout(() => {
        maze[pacman].style.visibility = 'hidden'
        maze[pacman].classList.remove('pacman')
      }, 3000)

      setTimeout(() => {

        //  LIVES 
        if (lives === 1) {
          container.style.opacity = '0.2'
          gameOver.style.display = 'flex'
          finalScore.innerHTML = scoreCount
          audio.src = 'audio/zapsplat_human_male_voice_says_game_over_001_15726.mp3'
          audio.play()
        } else {
          lives -= 1
          livesIcon[lives].src = ''
        }

        document.addEventListener('keydown', pacmanMove)

        maze[ghost1].classList.add('cell')
        maze[ghost2].classList.add('cell')
        maze[ghost3].classList.add('cell')
        maze[ghost4].classList.add('cell')
        maze[ghost1].style.animation = ''
        maze[ghost2].style.animation = ''
        maze[ghost3].style.animation = ''
        maze[ghost4].style.animation = ''
        maze[ghost1].style.visibility = 'visible'
        maze[ghost2].style.visibility = 'visible'
        maze[ghost3].style.visibility = 'visible'
        maze[ghost4].style.visibility = 'visible'


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
      }, 5000)
    }

  }

  const submitButton = document.querySelector('.submit')
  const name = document.querySelector('input')
  const mapNo = document.getElementById('mapNo')

  submitButton.addEventListener('mousedown', () => {
    submitButton.style.transform = 'scale(0.9)'

  })

  function displayScore() {

    let scores = []
    const scoresList = document.querySelector('ol')

    if (localStorage) {

      const players = JSON.parse(localStorage.getItem('players'))
      if (players) {
        scores = players

        const array = scores.sort((playerA, playerB) => playerB.score - playerA.score).map(player => {
          return `<li> ${player.name} - ${player.score} points - map: ${player.map} </li>`
        })
        scoresList.innerHTML = array.join('')
      }


    }

    submitButton.addEventListener('mouseup', () => {
      submitButton.style.transform = ''

      //LEADER BOARD AND SCORING WINNERS
      const player = { name: name.value, score: scoreCount, map: mapNo.value }

      scores.push(player)
      console.log(localStorage)

      if (localStorage) {
        localStorage.setItem('players', JSON.stringify(scores))
      }

      gameOver.style.display = 'none'
      container.style.opacity = '1'

      displayScore()
    })
  }








  window.onLoad = displayScore()



}, 4500)



window.addEventListener('DOMContentLoaded', main)


