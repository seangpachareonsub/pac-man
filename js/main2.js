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

  const width = 35
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
  let pacman = 907

  let ghost1 = 507
  let ghost2 = 509
  let ghost3 = 512
  let ghost4 = 514

  const foodPlacements =
    [
      108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 141, 144, 151, 154, 174, 177, 184, 187, 220, 217, 216,
      215, 212, 211, 210, 207, 240, 248, 253, 292, 291, 290, 289, 288, 287, 286, 281, 278, 267, 268, 269, 270, 271, 272, 273, 302,
      309, 310, 311, 312, 313, 314, 315, 316, 323, 356, 335, 366, 367, 368, 369, 370, 371, 372, 375, 382, 385, 386, 387, 388, 389,
      390, 391, 399, 405, 408, 409, 410, 413, 414, 415, 418, 424, 457, 451, 446, 443, 438, 432, 465, 466, 467, 468, 471,
      484, 487, 488, 489, 490, 520, 504, 517, 501, 534, 553, 589, 586, 567, 564, 597, 600, 601, 602,
      603, 616, 617, 618, 619, 622, 655, 652, 633, 630, 663, 664, 665, 666, 685, 686, 687, 688, 721, 702, 715,
      696, 699, 729, 732, 748, 754, 787, 784, 781, 768, 765, 762, 795, 798, 801, 802, 803, 804, 805, 806, 809, 810, 811, 812, 813,
      814, 817, 820, 850, 842, 839, 831, 864, 872, 875, 883, 894, 895, 896, 897, 898, 899, 900, 901, 902, 903, 904, 905,
      909, 910, 911, 912, 913, 914, 915, 916, 917, 918, 919, 952, 949, 930, 927, 960, 963, 993, 996, 1029, 1026, 1059, 1060,
      1061, 1062, 985, 982, 1015, 1048, 1081, 1082, 1083, 1084, 1051, 1018, 342, 735, 718, 754, 751, 349, 245

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
      oneGrid.classList.add('ghost-1')
    }
    if (i === ghost2) {
      oneGrid.classList.add('ghost-2')
    }
    if (i === ghost3) {
      oneGrid.classList.add('ghost-3')
    }
    if (i === ghost4) {
      oneGrid.classList.add('ghost-4')
    }
    // CREATING
    grid.appendChild(oneGrid)
    maze.push(oneGrid)
  }




  //  DEFINING THE WALLS
  const noUp =
    [
      108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 211, 212, 215, 216, 267, 268, 269,
      270, 271, 272, 287, 288, 289, 290, 291, 292, 309, 310, 315, 316, 366, 367, 369, 370, 371, 372, 385, 386,
      387, 388, 390, 391, 413, 414, 409, 410, 413, 414, 487, 488, 489, 466, 467, 468, 564, 589, 615, 616, 617,
      618, 601, 602, 603, 604, 664, 665, 686, 687, 702, 703, 705, 706, 707, 708, 709, 710, 711, 712, 714, 715,
      809, 810, 811, 812, 813, 802, 803, 804, 805, 806, 894, 895, 896, 898, 899, 900, 901, 902, 903, 904, 909,
      910, 911, 912, 913, 914, 915, 917, 918, 919, 1060, 1061, 1082, 1083, 906, 907, 312, 313,
      505, 506, 507, 508, 510, 511, 513, 514, 515, 516
    ]

  const noDown =
    [
      109, 110, 112, 113, 114, 115, 116, 117, 119, 120, 210, 211, 216, 217, 286, 287, 288, 289, 292, 270, 271,
      272, 273, 267, 268, 310, 311, 312, 313, 314, 315, 367, 368, 369, 370, 386, 387, 388, 389, 390, 465, 466,
      467, 408, 409, 414, 415, 488, 489, 490, 504, 505, 507, 508, 509, 510, 511, 512, 513, 514, 516, 517, 601,
      602, 603, 604, 615, 616, 617, 618, 664, 665, 686, 687, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712,
      713, 714, 795, 801, 802, 803, 804, 805, 810, 811, 812, 813, 814, 820, 895, 896, 898, 899, 900, 901, 902,
      903, 904, 904, 905, 905, 906, 906, 907, 907, 908, 908, 909, 909, 910, 910, 911, 911, 912, 912, 913, 913,
      914, 914, 915, 915, 917, 917, 918, 918, 1059, 1059, 1060, 1060, 1061, 1061, 1062, 1062, 1081, 1081, 1082,
      1082, 1083, 1083, 1084, 371, 291
    ]

  const noLeft =
    [
      267, 366, 399, 432, 465, 564, 597, 630, 663, 696, 729, 762, 795, 894, 927, 960, 993, 1026, 1059, 302, 335,
      501, 534, 567, 600, 633, 699, 732, 765, 798, 831, 864, 930, 963, 996, 1029, 108, 141, 174, 207, 240, 405,
      438, 471, 504, 702, 735, 768, 801, 539, 572, 638, 671, 144, 177, 210, 309, 342, 375, 408, 245, 278, 443, 476,
      839, 872, 215, 248, 281, 413, 446, 479, 809, 842, 875, 151, 184, 349, 382, 548, 581, 614, 647, 680, 154, 187,
      220, 253, 286, 385, 418, 451, 484, 748, 781, 487, 520, 553, 586, 652, 685, 718, 751, 784, 817, 850, 883, 949,
      982, 1015, 1048, 1081, 323, 356, 424, 457, 589, 622, 655, 721, 754, 787, 820, 952, 985, 1018, 1051
    ]

  const noRight =
    [
      399, 432, 564, 597, 630, 696, 729, 762, 795, 927, 960, 993, 1026, 302, 335, 468, 501, 534, 567, 633, 666, 699,
      732, 765, 798, 831, 864, 930, 963, 996, 1029, 1062, 141, 174, 207, 240, 273, 372, 405, 438, 471, 735, 768, 539,
      572, 605, 638, 671, 144, 177, 342, 375, 212, 245, 278, 410, 443, 476, 806, 839, 872, 248, 281, 446, 479, 842,
      875, 151, 184, 217, 316, 349, 382, 415, 548, 581, 647, 680, 121, 154, 187, 220, 253, 418, 451, 484, 517, 715,
      748, 781, 814, 520, 553, 586, 619, 652, 718, 751, 784, 817, 850, 883, 949, 982, 1015, 1048, 323, 356, 1084,
      1051, 1018, 985, 952, 919, 820, 787, 754, 721, 688, 655, 622, 589, 490, 457, 424, 391, 292
    ]



  const score = document.querySelector('.score')
  let scoreCount = 0

  const winner = document.querySelector('.gameEnd')
  const displayWin = document.querySelector('.final')






  // USER MOVEMENTS
  document.addEventListener('keydown', pacmanMove)

  function pacmanMove() {

    if (scoreCount === 2270) {
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

    if (event.key === 'ArrowRight' || event.key === 'd') {
      if (noRight.includes(pacman)) {
        return
      } else {
        if (maze[pacman + 1].classList.contains('food')) {
          maze[pacman].classList.remove('pacman')
          pacman += 1
          maze[pacman].classList.remove('food')
          maze[pacman].classList.add('pacman')
          scoreCount += 10
          score.innerHTML = scoreCount
          audio.src = 'audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
          audio.play()
        } else {
          maze[pacman].classList.remove('pacman')
          pacman += 1
          maze[pacman].classList.add('pacman')
          audio.src = 'audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
          audio.play()
        }
      }

    } else if (event.key === 'ArrowLeft' || event.key === 'a') {
      if (noLeft.includes(pacman)) {
        return
      } else {
        if (maze[pacman - 1].classList.contains('food')) {
          maze[pacman].classList.remove('pacman')
          pacman -= 1
          maze[pacman].classList.remove('food')
          maze[pacman].classList.add('pacman')
          scoreCount += 10
          score.innerHTML = scoreCount
          audio.src = 'audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
          audio.play()
        } else {
          maze[pacman].classList.remove('pacman')
          pacman -= 1
          maze[pacman].classList.add('pacman')
          audio.src = 'audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
          audio.play()
        }
      }

    } else if (event.key === 'ArrowUp' || event.key === 'w') {
      if (noUp.includes(pacman)) {
        return
      } else if (maze[pacman - (width - 2)].classList.contains('food')) {
        maze[pacman].classList.remove('pacman')
        pacman -= (width - 2)
        maze[pacman].classList.remove('food')
        maze[pacman].classList.add('pacman')
        scoreCount += 10
        score.innerHTML = scoreCount
        audio.src = 'audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
        audio.play()
      } else {
        maze[pacman].classList.remove('pacman')
        pacman -= (width - 2)
        maze[pacman].classList.add('pacman')
        audio.src = 'audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
        audio.play()
      }

    } else if (event.key === 'ArrowDown' || event.key === 's') {
      if (noDown.includes(pacman)) {
        return
      } else if (maze[pacman + (width - 2)].classList.contains('food')) {
        maze[pacman].classList.remove('pacman')
        pacman += (width - 2)
        maze[pacman].classList.remove('food')
        maze[pacman].classList.add('pacman')
        scoreCount += 10
        score.innerHTML = scoreCount
        audio.src = 'audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
        audio.play()
      } else {
        maze[pacman].classList.remove('pacman')
        pacman += (width - 2)
        maze[pacman].classList.add('pacman')
        audio.src = 'audio/8d82b5_Pacman_Waka_Waka_Sound_Effect.mp3'
        audio.play()
      }
    }
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

      // GHOST ONE
      if (!noRight.includes(ghost1) && ghost1 + 1 !== ghostOnePositionsLog[ghostOnePositionsLog.length - 2]) {
        ghostOneDirections.push(1)
      }
      if (!noLeft.includes(ghost1) && ghost1 - 1 !== ghostOnePositionsLog[ghostOnePositionsLog.length - 2]) {
        ghostOneDirections.push(-1)
      }
      if (!noUp.includes(ghost1) && ghost1 + ((width - 2) * - 1) !== ghostOnePositionsLog[ghostOnePositionsLog.length - 2]) {
        ghostOneDirections.push((width - 2) * -1)
      }
      if (!noDown.includes(ghost1) && ghost1 + (width - 2) !== ghostOnePositionsLog[ghostOnePositionsLog.length - 2]) {
        ghostOneDirections.push(width - 2)
      }


      //GHOST ONE

      const ghostOneMoves = ghostOneDirections[Math.floor(Math.random() * ghostOneDirections.length)]
      const ghostOnePrevious = maze[ghost1 + ghostOneMoves].className

      maze[ghost1].classList.remove('ghost-1')
      ghost1 += ghostOneMoves
      maze[ghost1].classList.add('ghost-1')
      maze[ghost1 - ghostOneMoves].classList.add(ghostOnePrevious)
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
      if (!noUp.includes(ghost2) && ghost2 + ((width - 2) * - 1) !== ghostTwoPositionsLog[ghostTwoPositionsLog.length - 2]) {
        ghostTwoDirections.push((width - 2) * -1)
      }
      if (!noDown.includes(ghost2) && ghost2 + (width - 2) !== ghostTwoPositionsLog[ghostTwoPositionsLog.length - 2]) {
        ghostTwoDirections.push(width - 2)
      }



      //GHOST TWO
      const ghostTwoMoves = ghostTwoDirections[Math.floor(Math.random() * ghostTwoDirections.length)]
      const ghostTwoPrevious = maze[ghost2 + ghostTwoMoves].className

      maze[ghost2].classList.remove('ghost-2')
      ghost2 += ghostTwoMoves
      maze[ghost2].classList.add('ghost-2')
      maze[ghost2 - ghostTwoMoves].classList.add(ghostTwoPrevious)

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
      if (!noUp.includes(ghost3) && ghost3 + ((width - 2) * - 1) !== ghostThreePositionsLog[ghostThreePositionsLog.length - 2]) {
        ghostThreeDirections.push((width - 2) * -1)
      }
      if (!noDown.includes(ghost3) && ghost3 + (width - 2) !== ghostThreePositionsLog[ghostThreePositionsLog.length - 2]) {
        ghostThreeDirections.push(width - 2)
      }


      // GHOST 3
      const ghostThreeMoves = ghostThreeDirections[Math.floor(Math.random() * ghostThreeDirections.length)]
      const ghostThreePrevious = maze[ghost3 + ghostThreeMoves].className

      maze[ghost3].classList.remove('ghost-3')
      ghost3 += ghostThreeMoves
      maze[ghost3].classList.add('ghost-3')
      maze[ghost3 - ghostThreeMoves].classList.add(ghostThreePrevious)

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
      if (!noUp.includes(ghost4) && ghost4 + ((width - 2) * - 1) !== ghostFourPositionsLog[ghostFourPositionsLog.length - 2]) {
        ghostFourDirections.push((width - 2) * -1)
      }
      if (!noDown.includes(ghost4) && ghost4 + (width - 2) !== ghostFourPositionsLog[ghostFourPositionsLog.length - 2]) {
        ghostFourDirections.push(width - 2)
      }


      // GHOST 4
      const ghostFourMoves = ghostFourDirections[Math.floor(Math.random() * ghostFourDirections.length)]
      const ghostFourPrevious = maze[ghost4 + ghostFourMoves].className

      maze[ghost4].classList.remove('ghost-4')
      ghost4 += ghostFourMoves
      maze[ghost4].classList.add('ghost-4')
      maze[ghost4 - ghostFourMoves].classList.add(ghostFourPrevious)
    }, 150)

  }

  ghostOne()
  ghostTwo()
  ghostThree()
  ghostFour()


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


        pacman = 907
        maze[pacman].classList.add('pacman')
        ghost1 = 507
        maze[ghost1].classList.add('ghost-1')
        ghost2 = 509
        maze[ghost2].classList.add('ghost-2')
        ghost3 = 512
        maze[ghost3].classList.add('ghost-3')
        ghost4 = 514
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