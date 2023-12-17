import { useState, useEffect, useRef } from 'react'
import './App.css'

let cell_types = {empty: '0', snake: '1', food: '2'};
let board_size = 10;
let init_board = Array.from(Array(board_size), row=>Array.from(Array(board_size), cell => cell_types['empty']));
let init_snake = [[0, 0], [0, 1], [0, 2]];
let interval_delta = 500;

function draw_cell(cell, i){
  return <div className={`cell cell_${cell}`} key={i}></div>;
}

function draw_board(){
  return board.map((row, i)=><div className='row' key={i}>{row.map(draw_cell)}</div>);
}

function draw_snake(){
  for(let c of snake){
    board[c[0]][c[1]] = cell_types['snake'];
  }
}

function random_food(){
  let empty_cells = board.reduce((acc, row, i)=>{
    row.forEach((cell, j)=>{ if(cell==cell_types['empty']) acc.push([i, j]) });
    return acc;
  }, []);
  let random = Math.floor(Math.random()*empty_cells.length);
  let food = empty_cells[random];
  board[food[0]][food[1]] = cell_types['food'];
}

function remove_snake(){
  board = board.map(row=>row.map(cell=>cell==cell_types['snake'] ? cell_types['empty'] : cell));
}

function game_over(){
  lost = true;
  clearInterval(game_interval);
  start_ref.current.disabled = false;
}

function is_lost(new_cell){
  return new_cell[0]>=board_size || new_cell[0]<0 ||
  new_cell[1]>=board_size || new_cell[1]<0 ||
  board[new_cell[0]][new_cell[1]]==cell_types['snake'];
}

function add_new_cell(new_cell){
  remove_snake();
  if(board[new_cell[0]][new_cell[1]]!=cell_types['food'])
  {
    snake.shift();
    snake.push(new_cell);
    draw_snake();
  }
  else
  {
    snake.push(new_cell);
    draw_snake();
    random_food();
  }
}

function move_snake(){
  let new_cell = Array.from(snake[snake.length-1]);
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
  if(is_lost(new_cell))
  {
    game_over();
    return;
  }
  add_new_cell(new_cell);
}

function handle_arrow(e){
  switch(e.key){
    case 'ArrowUp':
      direction = 'up';
      break;
    case 'ArrowDown':
      direction = 'down';
      break;
    case 'ArrowLeft':
      direction = 'left';
      break;
    case 'ArrowRight':
      direction = 'right';
      break;
  }
}

let board = init_board;
let snake;
let direction;
let game_interval;
let lost;
let start_ref;

function App() {
  const [game_board, set_game_board] = useState(draw_board());
  start_ref = useRef(null);

  function handle_start(event){
    event.currentTarget.disabled = true;
    event.currentTarget.blur();
    board = init_board;
    snake = Array.from(init_snake);
    direction = 'right';
    lost = false;
    remove_snake();
    draw_snake();
    random_food();
    set_game_board(draw_board());
    game_interval = setInterval(()=>{
      move_snake();
      set_game_board(draw_board());
    }, interval_delta);
  }

  useEffect(()=>{
    window.addEventListener('keydown', handle_arrow);
  }, []);

  return (
    <>
      <div className='container'>
        {game_board}
      </div>
      {lost && <div className='game_over_overlay'>Game Over</div>}
      <button type="button" onClick={handle_start} ref={start_ref}>Start</button>
    </>
  )
}

export default App
