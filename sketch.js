//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 8;
let raqueteAltura = 80;

let colidiu = false;
let chanceErro = 0;

//variáveis raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;

//placar
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
  trilha = loadSound("trilha.mp3");
  
}
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  //verificaColisaoRaquete();
  colisaoRaqueteGit(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  colisaoRaqueteGit(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();

}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro)
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaRaquete() {
  if(keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  
  if(keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function colisaoRaqueteGit(x, y) {
  colidiu =  collideRectCircle( x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
     velocidadeXBolinha *= -1
     raquetada.play();
  }
  
}

function movimentaRaqueteOponente() {
  velocidadeYOponente  = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceErro;
  calculaChanceErro();
}

function incluiPlacar() {
  stroke (255);
  textAlign(CENTER);
  textSize(16);
  fill(color(0,0,255));
  rect(150, 10, 40, 20);
  fill (255);
  text(meusPontos, 170, 26);
  fill(color(0,0,255));
  rect(450, 10, 40, 20)
  fill (255);
  text(pontosOponente, 470, 26);
}

function marcaPonto() {
  if (xBolinha < 10) {
    pontosOponente += 1;
    ponto.play();
  } 
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
}

function calculaChanceErro() {
  if (pontosOponente >= meusPontos) {
    chanceErro += 1
    if (chanceErro >= 39){
    chanceErro = 40
    }
  } else {
    chanceErro -= 1
    if (chanceErro <= 35){
    chanceErro = 35
    }
  }
}