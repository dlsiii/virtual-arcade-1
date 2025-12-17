const board = document.getElementById("board");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let cells = Array(9).fill("");
let gameOver = false;

function winner(b){
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (const [a,c,d] of lines){
    if (b[a] && b[a]===b[c] && b[a]===b[d]) return b[a];
  }
  if (b.every(x=>x)) return "draw";
  return null;
}

function aiMove(){
  // super simple AI: first empty cell
  for (let i=0;i<9;i++){
    if (!cells[i]) { cells[i]="O"; return; }
  }
}

function render(){
  board.innerHTML = "";
  cells.forEach((v,i)=>{
    const el = document.createElement("div");
    el.className = "cell";
    el.textContent = v || "";
    el.onclick = () => {
      if (gameOver || cells[i]) return;
      cells[i] = "X";
      let w = winner(cells);
      if (!w){
        aiMove();
        w = winner(cells);
      }
      if (w){
        gameOver = true;
        statusEl.textContent = w === "draw" ? "Draw!" : `${w} wins!`;
      } else {
        statusEl.textContent = "Your turn (X)";
      }
      render();
    };
    board.appendChild(el);
  });
}

resetBtn.onclick = () => {
  cells = Array(9).fill("");
  gameOver = false;
  statusEl.textContent = "Your turn (X)";
  render();
};

render();
