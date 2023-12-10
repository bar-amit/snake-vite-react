import { useState, useEffect } from 'react'
import './App.css'

let cell_types = {empty: 0, snake: 1, food: 2};
let board_size = 10;
let init_board = Array.from(Array(board_size), row=>Array.from(Array(board_size), cell => cell_types['empty']));

function drawCell(cell, i){
  return <div className={`cell cell_${cell}`} key={i}></div>;
}

function drawBoard(board){
  return board.map((row, i)=><div className='row' key={i}>{row.map(drawCell)}</div>);
}

function randomFood(board){
  let empty_cells = board.reduce((acc, row, i)=>{
    row.forEach((cell, j)=>{ if(cell==cell_types['empty']) acc.push([i, j]) });
    return acc;
  }, []);
  let random = Math.floor(Math.random()*empty_cells.length);
  let food = empty_cells[random];
  board[food[0]][food[1]] = cell_types['food'];
  console.log(food);
  return board;
}

function App() {
  const [board, setBoard] = useState(randomFood(init_board));

  return (
      <div className='container'>
        {
          drawBoard(board)
        }
      </div>
  )
}

export default App
