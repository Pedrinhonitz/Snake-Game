window.onload  = function(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    let score = 0;
    let snakeImage = new Image();
    snakeImage.src = './img/snake.png'; 
    let appleImage = new Image();
    appleImage.src = './img/apple.png'; 

    snake = [];
    positionX = 10;
    positionY = 10;
    foodX = 15;
    foodY = 15;
    velX = 0;
    velY = 0;
    grid = 20;
    gridX = 43;
    gridY = 23;
    tam = 3;

    setInterval(jogo, 100);

    document.addEventListener("keydown",function(e){
        switch(e.keyCode){
            case 39: // Seta Direita
                velX = 1;
                velY = 0;
                break;
            case 37: // Seta Esquerda
                velX = -1;
                velY = 0;
                break;
            case 38: // Seta para Cima
                velX = 0;
                velY = -1;
                break;
            case 40: // Seta para baixo
                velX = 0;
                velY = 1;
                break;
            case 68: // D para Direita
                velX = 1;
                velY = 0;
                break;
            case 65: // A para Esquerda
                velX = -1;
                velY = 0;
                break;
            case 87: // W para cima
                velX = 0;
                velY = -1;
                break;
            case 83: // S para baixo
                velX = 0;
                velY = 1;
                break; 
        }
    });
}

function jogo(){
    // Configurando Tela
    ctx.fillStyle = "#851E3E";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Deslocamento da Cobra
    positionX += velX;
    positionY += velY;

    // Verificar se a cobra bateu na parede (Game Over)
    if (positionX < 0 || positionX >= gridX || positionY < 0 || positionY >= gridY) {
        resetGame();
    }

    // Configuração da Cobra
    ctx.fillStyle = "#1E312B";
    for(let i = 0; i < snake.length; i++){
        ctx.fillRect(snake[i].x * grid, snake[i].y * grid, grid - 1, grid - 1);
        if(snake[i].x == positionX && snake[i].y == positionY){
            resetGame();
        }
    }

    // Posicionando a Cobra
    snake.push({x: positionX, y: positionY});
    
    // Apagando a Cobra
    while(snake.length > tam){
        snake.shift();
    }

    // Configurando a Comida
    ctx.fillStyle = "#B2910D";
    ctx.fillRect(foodX * grid, foodY * grid, grid - 1, grid - 1);

    // Comendo a Comida
    if(positionX == foodX && positionY == foodY){
        tam++;
        score++;
        document.getElementById('score').innerText = "Pontuação: " + score;
        foodX = Math.floor(Math.random() * gridX);    
        foodY = Math.floor(Math.random() * gridY);
    }
}

// Função para reiniciar o jogo
function resetGame() {
    score = 0;
    document.getElementById('score').innerText = "Pontuação: " + score;
    snake = [];
    tam = 3;
    positionX = 10;
    positionY = 10;
    velX = 0;
    velY = 0;
}
