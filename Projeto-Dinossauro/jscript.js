const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let pulando = false;
let fim = false;
let posicao = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!pulando) {
      pular();
    }
  }
}

function pular() {
  pulando = true;
  let intervaloSubida = setInterval(() => {

    if (posicao >= 200) {
      clearInterval (intervaloSubida);
      let intervaloDescida = setInterval(() => {
        if (posicao <= 0) {
          clearInterval(intervaloDescida);
          pulando = false;
        } 
        else {
          posicao -= 25;
          dino.style.bottom = posicao + 'px';
        }
      }, 30);
    } 
    else {
      posicao += 25;
      dino.style.bottom = posicao + 'px';
    }
  }, 20);
}

function criaCactus() {
  const cactus = document.createElement('div');
  let pocisaoCactus = 1000;
  let randomTime = Math.random() * 6500;

  if (fim) return;
  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = pocisaoCactus + 'px';
  let leftTimer = setInterval(() => {
    
    if (pocisaoCactus < -60) {
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } 
    else if (pocisaoCactus > 0 && pocisaoCactus < 60 && posicao < 60) {

      clearInterval(leftTimer);
      GameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else 
    {
      pocisaoCactus -= 10;
      cactus.style.left = pocisaoCactus + 'px';
    }
  }, 20);
  setTimeout(criaCactus, randomTime);
}
criaCactus();
document.addEventListener('keyup', handleKeyUp);