import { useState, useEffect, useCallback } from 'react'
import './App.css'

let cell_types = {empty: 0, snake: 1, food: 2};
let board_size = 10;
let init_board = Array.from(Array(board_size), row=>Array.from(Array(board_size), cell => cell_types['empty']));
let init_snake = [[0, 0], [0, 1], [0, 2]];
let interval_delta = 900;

function draw_cell(cell, i){
  return <div className={`cell cell_${cell}`} key={i}></div>;
}

function draw_board(board){
  return board.map((row, i)=><div className='row' key={i}>{row.map(draw_cell)}</div>);
}

function draw_snake({board, snake}){
  console.log('snake',snake)
  for(let c of snake){
    console.log(c)
    board[c[0]][c[1]] = cell_types['snake'];
  }
  return board;
}

function random_food(board){
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

function move_snake(){
  board = board.map(cell=>
    cell==cell_types['snake']?cell_types['empty']:cell);
  let new_cell = snake[snake.length-1];
  switch(direction){
    case 'left':
      new_cell[1]--;
      break;
    case 'right':
      new_cell[1]++;
      break;
    case 'up':
      new_cell[0]--;
      break;
    case 'down':
      new_cell[0]++;
      break;
  }
  snake.shift();
  snake.push(new_cell);
  return draw_snake({board, snake});
}

let board = init_board;
let snake = init_snake;
let direction = 'right';
let game_interval;

function App() {
  const [game_board, set_game_board] = useState(draw_board(board));

  function handle_start(){
    board = random_food(draw_snake({board, snake}));
    console.log(board)
    set_game_board(draw_board(board));
    game_interval = setInterval(()=>{
      board = move_snake();
      set_game_board(draw_board(board));
    }, interval_delta);
  }

  return (
    <>
      <div className='container'>
        {game_board}
      </div>
      <button type="button" onClick={handle_start}>Start</button>
    </>
  )
}

export default App
