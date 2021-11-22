let order = [];
let clickedOrder = [];
let score = 0;
let firstPlay = true;
let pressedInTime = false;
let timer;
let timeIsOver = false;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");

//audios do game
const won = document.getElementById('won'); //audio quando ganha
const lose = document.getElementById('lose'); //audio quando perde

//cria ordem aleatória de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order){
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
    pressedInTime = false;
    checkTimer();
}

//acende a próxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number - 50);
}

//verifica o tempo para apertar os botões
let checkTimer = () => {
    timer = setTimeout(() => {
        if(!pressedInTime){
            firstPlay = false;
            timeIsOver = true;
            lose.play();
            gameOver();
        }
    }, 5000);
}

//checa se os botoes são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder){
        if(clickedOrder[i] != order[i]){
            firstPlay = false;
            pressedInTime = false;
            lose.play();
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length){
        firstPlay = false;
        won.play();
        score++;
        alert('Pontuação: ' + score + '\nVocê acertou! Iniciando próximo nível!');
        nextLevel();
    } else if(pressedInTime){
        pressedInTime = false;
        checkTimer();
    }
}

//função para o click do usuário
let click = (color) => {
    clearTimeout(timer);
    pressedInTime = true;
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
}

//função que retorna a cor
let createColorElement = (color) => {
    if(color == 0){
        return green;
    } else if(color == 1){
        return red;
    } else if(color == 2){
        return yellow;
    } else if(color == 3){
        return blue;
    }
}

//função para próximo nível do jogo
let nextLevel = () => {
    shuffleOrder();
}

//função para game over
let gameOver = () => {
    if(timeIsOver){
        alert('Pontuação: ' + score + '\nO tempo esgotou :/\nClique em OK para iniciar um novo jogo!');
    } else {
        alert('Pontuação: ' + score + '\nVocê errou a sequência :(\nClique em OK para iniciar um novo jogo!');
    }    
    order = [];
    clickedOrder = [];

    playGame();
}

//função que inicia o jogo
let playGame = () => {
    if(firstPlay){
        alert('BEM VINDO AO GENIUS! \nCLICK EM OK PARA INICIAR!');
    }
    score = 0;
    timeIsOver = false;
    nextLevel();
}

//eventos de click para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//inicio do jogo
playGame();