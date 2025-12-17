const arena = document.getElementById("arena");
const scoreEl = document.getElementById("score");
const statusEl = document.getElementById("status");
const startBtn = document.getElementById("start");

let score = 0;
let running = false;
let stopTimer = null;

function spawn(){
  arena.innerHTML = "";
  const t = document.createElement("div");
  t.className = "target";
  t.style.left = Math.random()*(arena.clientWidth-50) + "px";
  t.style.top  = Math.random()*(arena.clientHeight-50) + "px";
  t.style.background = `hsl(${Math.random()*360}, 85%, 60%)`;
  t.onclick = () => {
    if (!running) return;
    score++;
    scoreEl.textContent = score;
    spawn();
  };
  arena.appendChild(t);
}

startBtn.onclick = () => {
  score = 0;
  running = true;
  scoreEl.textContent = "0";
  statusEl.textContent = "Go!";
  spawn();

  clearTimeout(stopTimer);
  stopTimer = setTimeout(()=>{
    running = false;
    arena.innerHTML = "<div class='muted' style='padding:16px;'>Time!</div>";
    statusEl.textContent = "Done";
  }, 15000);
};
