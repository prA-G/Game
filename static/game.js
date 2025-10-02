const p1Btn = document.getElementById('p1-btn');
const p2Btn = document.getElementById('p2-btn');
const p1ChoiceBox = document.getElementById('p1-choice');
const p2ChoiceBox = document.getElementById('p2-choice');
const gotoResult = document.getElementById('go-to-result');

async function play(player) {
  const btn = player === 'p1' ? p1Btn : p2Btn;
  const box = player === 'p1' ? p1ChoiceBox : p2ChoiceBox;

  btn.disabled = true;
  box.textContent = '...';

  await new Promise(r => setTimeout(r, 600));

  const resp = await fetch(`/api/play/${player}`, { method: 'POST' });
  const data = await resp.json();

  box.textContent = data.choice;

  // play choice sound
  playChoiceSound(data.choice);

  if (data.p1_choice && data.p2_choice) {
    gotoResult.style.display = 'inline-block';
    gotoResult.href = '/result';
  }
}

function playChoiceSound(choice) {
  const id = choice.toLowerCase() + "-sound";
  const sound = document.getElementById(id);
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}

p1Btn.addEventListener('click', () => play('p1'));
p2Btn.addEventListener('click', () => play('p2'));
