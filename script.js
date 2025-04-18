let tabuleiroEstado = ["", "", "", "", "", "", "", "", ""];
let jogadorAtual = "X";
let jogoAtivo = true;
let pontuacaoX = 0;
let pontuacaoO = 0;

const combinacoesVitoria = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
  [0, 4, 8], [2, 4, 6]             // Diagonais
];

const elementoTabuleiro = document.getElementById("tabuleiro");
const elementoMensagem = document.getElementById("mensagem");
const elementoPlacarX = document.getElementById("placarX");
const elementoPlacarO = document.getElementById("placarO");

function criarTabuleiro() {
  elementoTabuleiro.innerHTML = "";
  tabuleiroEstado.forEach((valor, indice) => {
    const celula = document.createElement("div");
    celula.classList.add("celula");
    celula.setAttribute("data-indice", indice);
    celula.innerText = valor;
    celula.addEventListener("click", aoClicarCelula);
    elementoTabuleiro.appendChild(celula);
  });
}

function aoClicarCelula(evento) {
  const indice = evento.target.getAttribute("data-indice");

  if (tabuleiroEstado[indice] !== "" || !jogoAtivo) return;

  tabuleiroEstado[indice] = jogadorAtual;
  evento.target.innerText = jogadorAtual;

  if (verificarVitoria()) {
    elementoMensagem.innerText = `Jogador ${jogadorAtual} venceu!`;
    atualizarPlacar(jogadorAtual);
    jogoAtivo = false;
  } else if (tabuleiroEstado.every(celula => celula !== "")) {
    elementoMensagem.innerText = "Empate!";
    jogoAtivo = false;
  } else {
    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    elementoMensagem.innerText = `Vez do jogador ${jogadorAtual}`;
  }
}

function verificarVitoria() {
  return combinacoesVitoria.some(combinacao => {
    const [a, b, c] = combinacao;
    return tabuleiroEstado[a] && tabuleiroEstado[a] === tabuleiroEstado[b] && tabuleiroEstado[a] === tabuleiroEstado[c];
  });
}

function atualizarPlacar(vencedor) {
  if (vencedor === "X") {
    pontuacaoX++;
    elementoPlacarX.innerText = pontuacaoX;
  } else {
    pontuacaoO++;
    elementoPlacarO.innerText = pontuacaoO;
  }
}

function reiniciarJogo() {
  tabuleiroEstado = ["", "", "", "", "", "", "", "", ""];
  jogadorAtual = "X";
  jogoAtivo = true;
  elementoMensagem.innerText = "";
  criarTabuleiro();
}

criarTabuleiro();
