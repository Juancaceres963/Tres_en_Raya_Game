import './App.css' 
import { useState } from 'react'
import confetti from 'canvas-confetti'

const TURNS = {
  X: "x",
  O: "o"
}

const Square = ({ children, isSelected, updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) // Null no hay ganador y false es que hay un empate

  const checkWinner = (boardToCheck) => {
    // Revisamos todas las combinaciones ganadoras a ver si 'x' o 'o' ganan
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
        ) {
          return boardToCheck[a]
        }
    }
    // Si no hay ganador 
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    //Revisamos si hay un empate viendo 
    //Si no hay mas espacion vacios en el tablero
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) => {
    //No permitimos que sobre escriba si alguno ya utilizo esa cacilla
    if (board[index] || winner) return
    // Actualizamos el tablero 
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // Cambiamos el tablero
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // Revisamos si hay un ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Juego de la vieja</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className='game'>
        {
          board.map((square,index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
                >
                  {square}
                </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false 
                  ? 'Empate'
                  : 'Gano: '
                }
              </h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <button onClick={resetGame}>Empezar de nuevo</button>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
