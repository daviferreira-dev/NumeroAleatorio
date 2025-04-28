let numeroAleatorio = Math.floor(Math.random() * 100) + 1; 
const inputNumero = document.getElementById('numero');
const resultadoTexto = document.getElementById('resultado');
let contadorTrocas = 0;
let frase = document.getElementById('frase');
let dicas = document.getElementById('dicas');
let botao = document.getElementById('botao');

function verificarNumero(numeroEscolhido, resultadoElement) {
    if (numeroEscolhido < 1 || numeroEscolhido > 100 || isNaN(numeroEscolhido)) {
        alert("Por favor, insira um número entre 1 e 100.");
        resultadoElement.style.color = "orange";
        return false;
    }
    return true;
}

function verificarChute() {
    let numeroEscolhido = parseInt(inputNumero.value, 10);

    if (!verificarNumero(numeroEscolhido, resultadoTexto)) return;

    if (contadorTrocas > -1){
        botaoTexto = document.getElementById('botao').innerHTML = "Tentar Novamente";
    }

    if (numeroEscolhido === numeroAleatorio) {
        frase.textContent = "Muito Bom, você joga muito";
        dicas.textContent = ""
        resultadoTexto.textContent = `Você acertou! O número de tentativas foi ${contadorTrocas}.`;
        resultadoTexto.style.color = "green";
        numeroAleatorio = Math.floor(Math.random() * 100) + 1;
        inputNumero.value = "";
        botao.textContent = "Acertou!"
        contadorTrocas++; 
        somAcerto.play();
    } else if (numeroEscolhido > numeroAleatorio) {
        resultadoTexto.textContent = "Número inserido é maior que o gerado.";
        resultadoTexto.style.color = "blue";
        contadorTrocas++; 
        somErro.play();
    } else {
        resultadoTexto.textContent = "Número inserido é menor que o número aleatório";
        resultadoTexto.style.color = "red";
        contadorTrocas++; 
        somErro.play();
    }
}
