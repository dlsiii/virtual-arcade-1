const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

const GRID = 20;
const TILE = canvas.width / GRID;

let snake, dir, nextDir, apple, score, alive, timer;

const scoreEl = document.getElementById("score");
const statusEl = document.getElementById("status");

function spawnApple() {
  while (true) {
    const a = { x: Math.floor(Math.random()*GRID), y: Math.floor(Math.random()*GRID) };
    if (!snake.some(s => s.x === a.x && s.y === a.y)) return a;
  }
}

function reset() {
  snake = [{x:10,y:10},{x:9,y:10},{x:8,y:10}];
  dir = {x:1,y:0};
  nextDir = {x:1,y:0};
  apple = spawnApple();
  score = 0;
  alive = true;
  statusEl.textContent = "Playing";
  scoreEl.textContent = score;
  draw();
}

function draw(over=false) {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.globalAlpha = 0.12;
  for (let i=0;i<=GRID;i++){
    ctx.beginPath(); ctx.moveTo(i*TILE,0); ctx.lineTo(i*TILE,canvas.height); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0,i*TILE); ctx.lineTo(canvas.width,i*TILE); ctx.stroke();
  }
  ctx.globalAlpha = 1;

  ctx.beginPath();
  ctx.arc((apple.x+0.5)*TILE, (apple.y+0.5)*TILE, TILE*0.35, 0, Math.PI*2);
  ctx.fill();

  snake.forEach(s => ctx.fillRect(s.x*TILE+2, s.y*TILE+2, TILE-4, TILE-4));

  if (over){
    ctx.globalAlpha=0.85; ctx.fillRect(0,canvas.height/2-55,canvas.width,110);
    ctx.globalAlpha=1; ctx.textAlign="center";
    ctx.font="bold 34px system-ui"; ctx.fillText("Game Over",canvas.width/2,canvas.height/2-8);
    ctx.font="18px system-ui"; ctx.fillText("Press Restart",canvas.width/2,canvas.height/2+26);
  }
}

function gameOver(){
  alive=false;
  statusEl.textContent="Game Over";
  clearInterval(timer);
  draw(true);
}

function tick(){
  if (!alive) return;
  dir = nextDir;

  const head = snake[0];
  const nh = { x: head.x + dir.x, y: head.y + dir.y };

  if (nh.x<0 || nh.x>=GRID || nh.y<0 || nh.y>=GRID) return gameOver();
  if (snake.some(s => s.x===nh.x && s.y===nh.y)) return gameOver();

  snake.unshift(nh);

  if (nh.x===apple.x && nh.y===apple.y) {
    score++;
    scoreEl.textContent = score;
    apple = spawnApple();
  } else {
    snake.pop();
  }

  draw();
}

function trySet(dx,dy){
  if (dx === -dir.x && dy === -dir.y) return;
  nextDir = {x:dx,y:dy};
}

document.addEventListener("keydown",(e)=>{
  const k = e.key.toLowerCase();
  if (k==="arrowup"||k==="w") trySet(0,-1);
  if (k==="arrowdown"||k==="s") trySet(0,1);
  if (k==="arrowleft"||k==="a") trySet(-1,0);
  if (k==="arrowright"||k==="d") trySet(1,0);
});

document.getElementById("start").addEventListener("click", ()=>{
  if (timer) clearInterval(timer);
  reset();
  timer = setInterval(tick, 120);
});

draw();
