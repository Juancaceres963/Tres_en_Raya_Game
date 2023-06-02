import './App.css' 
import { useState } from 'react'

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

  const updateBoard = (index) => {
    //No permitimos que sobre escriba si alguno ya utilizo esa cacilla
    if (board[index] || winner) return
    // Actualizamos el tablero 
    const newBord = [...board]
    newBord[index] = turn
    setBoard(newBord)
    // Cambiamos el tablero
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // Revisamos si hay un ganador
    const newWinner = checkWinner(newBord)
    if (newWinner){
      setWinner(newWinner)
    }
  }

  return (
    <main className='board'>
      <h1>Juego de la vieja</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className='game'>
        {
          board.map((_,index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
                >
                  {board[index]}
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
