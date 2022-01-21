import { useEffect, useState } from "react"
import { Icon } from "@iconify/react";
import ScoreBoard from "./components/ScoreBoard"
import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'
import blank from './images/blank.png'


const width = 8
const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
]

const App = () => {
    const [currentColorArrangement, setCurrentColorArrangement] = useState([])
    const [squareBeingDragged, setSquareBeingDragged] = useState(null)
    const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
    const [scoreDisplay, setScoreDisplay] = useState(0)

// eslint-disable-next-line
    const checkForColumnOfFour = () => {
      for (let i = 0; i <= 39; i++ ){
        const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
        const decidedColor = currentColorArrangement[i]
        const isblank = currentColorArrangement[i] === blank

        if ( columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isblank)){
          setScoreDisplay((score) => score + 4)
          columnOfFour.forEach(square => currentColorArrangement[square] = blank)
          return true
        }
      }
    }
// eslint-disable-next-line
    const checkForRowOfFour = () => {
      for (let i = 0; i < 64; i++ ){
        const rowOfFour = [i, i + 1, i + 2, i + 3]
        const decidedColor = currentColorArrangement[i]
        const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
        const isblank = currentColorArrangement[i] === blank

        if (notValid.includes(i)) continue

        if ( rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isblank)){
          setScoreDisplay((score) => score + 4)
          rowOfFour.forEach(square => currentColorArrangement[square] = blank)
          return true
        }
      }
    }
// eslint-disable-next-line
    const checkForColumnOfThree = () => {
      for (let i = 0; i <= 47; i++ ){
        const columnOfThree = [i, i + width, i + width * 2]
        const decidedColor = currentColorArrangement[i]
        const isblank = currentColorArrangement[i] === blank

        if ( columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isblank)){
          setScoreDisplay((score) => score + 3)
          columnOfThree.forEach(square => currentColorArrangement[square] = blank)
          return true
        }
      }
    }
// eslint-disable-next-line
    const checkForRowOfThree = () => {
      for (let i = 0; i < 64; i++ ){
        const rowOfThree = [i, i + 1, i + 2]
        const decidedColor = currentColorArrangement[i]
        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
        const isblank = currentColorArrangement[i] === blank

        if (notValid.includes(i)) continue

        if ( rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isblank)){
          setScoreDisplay((score) => score + 3)
          rowOfThree.forEach(square => currentColorArrangement[square] = blank)
          return true
        }
      }
    }
// eslint-disable-next-line
    const moveIntoSquareBellow = () => {
      for(let i = 0; i <= 55; i++){
        const firstRow = [0,1,2,3,4,5,6,7]
        const isFirstRow = firstRow.includes(i)

        if (isFirstRow && currentColorArrangement[i] === blank) {
          let randomNumber = Math.floor(Math.random() * candyColors.length)
          currentColorArrangement[i] = candyColors[randomNumber]
        }

        if (currentColorArrangement[i + width] === blank){
          currentColorArrangement[i + width] = currentColorArrangement[i]
          currentColorArrangement[i] = blank
        }
      }
    }

    const dragStart = (e) => {
      setSquareBeingDragged(e.target)
    }

    const dragDrop = (e) => {
      setSquareBeingReplaced(e.target)
    }
    
    const dragEnd = () => {

      const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
      const squareBeingReplacedId = parseInt(squareBeingReplaced?.getAttribute('data-id'))

      const validMoves = [
        squareBeingDraggedId - 1,
        squareBeingDraggedId - width,
        squareBeingDraggedId + 1,
        squareBeingDraggedId + width
    ]

      const validMove = validMoves.includes(squareBeingReplacedId)

      if (validMove) {
        currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
        currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')
        const isAColumnOfFour = checkForColumnOfFour()
        const isARowOfFour = checkForRowOfFour()
        const isAColumnOfThree = checkForColumnOfThree()
        const isARowOfThree = checkForRowOfThree()
        if (squareBeingReplacedId &&
            (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
            setSquareBeingDragged(null)
            setSquareBeingReplaced(null)
        } else {
            currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
            currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
        }
    }

  }

    const createBoard = () => {
      const randomColorArrangement = []
      for (let i = 0; i < width * width; i++){
        const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
        randomColorArrangement.push(randomColor)
      }
      setCurrentColorArrangement(randomColorArrangement)
    }
    useEffect(() => {
      createBoard()
    }, [])

    useEffect(() => {
      const timer = setInterval(()=>{
        checkForColumnOfFour()
        checkForRowOfFour()
        checkForColumnOfThree()
        checkForRowOfThree()
        moveIntoSquareBellow()
        setCurrentColorArrangement([...currentColorArrangement])
      }, 100)
      return () => clearInterval(timer)
    }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBellow, currentColorArrangement])


  return (
    <div className="app d-flex flex-column h-100">
      <div className="flex-shrink-0 mb-0">
        <div className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
          <a className="navbar-brand mx-auto" href="/">
            Candy Crush Project
          </a>
        </div>
        <main className="d-flex container justify-content-around">
          <div>
              <ScoreBoard score={scoreDisplay} reset={createBoard}/>
          </div>
          <div className="game mb-4">
            {currentColorArrangement.map((candyColor, index) => (
              <img 
                key={index}
                src={candyColor}
                alt={candyColor}
                data-id={index}
                draggable={true}
                onDragStart={dragStart}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onDragLeave={(e) => e.preventDefault()}
                onDrop={dragDrop}
                onDragEnd={dragEnd}

              />
            ))}
          </div>
        </main>
      </div>
      <footer className="mt-auto py-2 bg-primary">
        <div className="container d-flex justify-content-center mx-2 text-center">
          <p className="text-light my-2">
            Project developed by{" "}
            <a
              href="https://github.com/pedrohbs00/Candy-Crush-Project"
              target="_blank"
              rel="noreferrer"
              className="list-group-item-action link-light"
            >
              <Icon icon="akar-icons:github-fill" />
              Pedro
            </a>
            {" "}in support of the tutorial from Ania Kubów found{" "}
            <a
              href="https://youtu.be/PBrEq9Wd6_U"
              target="_blank"
              rel="noreferrer"
              className="list-group-item-action link-light"
            >
              here.
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
