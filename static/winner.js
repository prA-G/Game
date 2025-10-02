window.onload = function() {
  // Play winner sound
  const winSound = document.getElementById("win-sound");
  if (winSound) {
    winSound.play();
  }

  // Start confetti
  startConfetti();
};

// simple confetti
function startConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({length: 150}, () => ({
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
