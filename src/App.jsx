import { useState } from 'react'
import './App.css'

let cell_types = {empty: 0, snake: 1, food: 2};
let board_size = 10;
let init_board = Array.from(Array(board_size), row=>Array.from(Array(board_size), cell => cell_types['empty']));

function drawCell(cell, i){
  return <div className={`cell_${cell}`} key={i}></div>;
}

function drawBoard(board){
  return board.map((row, i)=><div className='row' key={i}>{row.map(drawCell)}</div>);
}

function App() {
  const [board, setBoard] = useState(init_board);

  return (
      <div className='container'>
        {
          drawBoard(board)
        }
      </div>
  )
}

export default App
