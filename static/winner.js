window.onload = function() {
  // play win sound
  const winSound = document.getElementById("win-sound");
  if (winner !== "Draw" && winSound) {
    winSound.play();
  }

  // trigger confetti
  startConfetti();

  // animate battle
  animateBattle(p1Choice, p2Choice, winner);
};

function animateBattle(p1, p2, winner) {
  const p1Img = document.getElementById("p1-img");
  const p2Img = document.getElementById("p2-img");

  if (winner === "Draw") return;

  if (p1 === "Scissor" && p2 === "Paper") {
    p1Img.classList.add("attack");
    setTimeout(() => p2Img.classList.add("hit"), 800);
    document.getElementById("scissor-sound").play();
  }
  else if (p2 === "Scissor" && p1 === "Paper") {
    p2Img.classList.add("attack");
    setTimeout(() => p1Img.classList.add("hit"), 800);
    document.getElementById("scissor-sound").play();
  }

  else if (p1 === "Paper" && p2 === "Stone") {
    p1Img.classList.add("attack");
    setTimeout(() => p2Img.classList.add("hit"), 800);
    document.getElementById("paper-sound").play();
  }
  else if (p2 === "Paper" && p1 === "Stone") {
    p2Img.classList.add("attack");
    setTimeout(() => p1Img.classList.add("hit"), 800);
    document.getElementById("paper-sound").play();
  }

  else if (p1 === "Stone" && p2 === "Scissor") {
    p1Img.classList.add("attack");
    setTimeout(() => p2Img.classList.add("hit"), 800);
    document.getElementById("stone-sound").play();
  }
  else if (p2 === "Stone" && p1 === "Scissor") {
    p2Img.classList.add("attack");
    setTimeout(() => p1Img.classList.add("hit"), 800);
    document.getElementById("stone-sound").play();
  }
}

// same confetti function
function startConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({length: 120}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 200
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ff0";
    ctx.beginPath();
    for (let p of pieces) {
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
    }
    ctx.fill();
    update();
  }

  function update() {
    for (let p of pieces) {
      p.y += Math.cos(p.d) + 1 + p.r/2;
      p.x += Math.sin(p.d);
      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    }
  }

  (function animate() {
    draw();
    requestAnimationFrame(animate);
  })();
}
