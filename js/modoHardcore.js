

const limite = 1000;
let numeroAleatorio = Math.floor(Math.random() * limite) + 1; 
let inputNumero = document.getElementById('numero');
const resultadoTexto = document.getElementById('resultado');
let contadorTrocas = 0;
let frase = document.getElementById('frase');
let dicas = document.getElementById('dicas');
let botao = document.getElementById('botao');
let timerInterval; 
let tempoRestante = 10; 
const tempoRestanteElement = document.getElementById('tempoRestante'); 
let timerRunning = false; 
const cortinaEsquerda = document.getElementById('cortina-esquerda');
const cortinaDireita = document.getElementById('cortina-direita');


function verificarNumero(numeroEscolhido, resultadoElement) {
    if (numeroEscolhido < 1 || numeroEscolhido > limite || isNaN(numeroEscolhido)) {
        alert("Por favor, insira um número entre 1 e 1000.");
        resultadoElement.style.color = "orange";
        return false;
    }
    return true;
}

function reiniciarJogo() {
    numeroAleatorio = Math.floor(Math.random() * limite) + 1;
    inputNumero.value = "";
    resultadoTexto.textContent = "";
    contadorTrocas = 0;
    botao.textContent = "Iniciar o jogo";
    clearInterval(timerInterval);
    tempoRestante = 10; 
    tempoRestanteElement.textContent = tempoRestante; 
    timerRunning = false; 
}

function atualizarTimer() {
    if (tempoRestante > 0) {
        tempoRestante--;
        tempoRestanteElement.textContent = tempoRestante;

        const porcentagem = ((10 - tempoRestante ) / 10) * 40; 
        cortinaEsquerda.style.width = `${porcentagem}%`;
        cortinaDireita.style.width = `${porcentagem}%`;
    } else {
        cortinaEsquerda.style.width = '50%';
        cortinaDireita.style.width = '50%';
        Swal.fire({
            title: 'Você Perdeu!',
            text: `Tempo Esgotado! O número secreto era ${numeroAleatorio}, tente novamente.`,
            icon: 'error',
            confirmButtonText: 'Tentar Novamente'
        });
        reiniciarJogo();
        cortinaEsquerda.style.width = '0%';
        cortinaDireita.style.width = '0%';
    }
}


function verificarChute() {
    let numeroEscolhido = parseInt(inputNumero.value, 10);
    if (!verificarNumero(numeroEscolhido, resultadoTexto)) return;

    if (contadorTrocas > -1){
        botao.textContent = "Tentar Novamente";
    }

    if (numeroEscolhido === numeroAleatorio) {
        frase.textContent = "Muito Bom, você joga muito!";
        dicas.textContent = "";
        resultadoTexto.textContent = `Você acertou! O número de tentativas foi ${contadorTrocas + 1}.`;
        resultadoTexto.style.color = "green";
        contadorTrocas++; 
        clearInterval(timerInterval);
    } else if (numeroEscolhido > numeroAleatorio) {
        resultadoTexto.textContent = "Número inserido é maior que o gerado.";
        resultadoTexto.style.color = "blue";
        contadorTrocas++; 
    } else {
        resultadoTexto.textContent = "Número inserido é menor que o número aleatório";
        resultadoTexto.style.color = "red";
        contadorTrocas++; 
    }

    if (!timerRunning) {
        timerRunning = true; 
        timerInterval = setInterval(atualizarTimer, 1000); 
    }
}

reiniciarJogo();    

document.getElementById('numero').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        verificarChute();
    }
});