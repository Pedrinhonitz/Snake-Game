window.onload  = function(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

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
            // Seta Direita = 39
            case 39:
                velX = 1;
                velY = 0;
                break;
            // Seta Esquerda = 37
            case 37:
                velX = -1;
                velY = 0;
                break;
            // Seta para Cima = 38
            case 38:
                velX = 0;
                velY = -1;
                break;
            // Seta para baixo = 40
            case 40:
                velX = 0;
                velY = 1;
                break;

            // D para Direita = 68
            case 68:
                velX = 1;
                velY = 0;
                break;

            // A para Esquerda = 65
            case 65:
                velX = -1;
                velY = 0;
                break;

            // W para cima = 87
            case 87:
                velX = 0;
                velY = -1;
                break;
                
            // S para baixo = 83
            case 83:
                velX = 0;
                velY = 1;
                break; 
        }
    });
}
function jogo(){
    // Configurando Tela
    ctx.fillStyle = "#851E3E";
    
    // Distancia  borda h, distancia borda v, largura, altura
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // Deslocamento da Cobra
    positionX += velX;
    positionY += velY;

    // Espelhamento da Cobra
    if(positionX < 0){
        positionX = 45;
    }
    else if (positionX > 44){
        positionX = 0;
    }
    if (positionY < 0){
        positionY = 24;
    }
    else if(positionY > 24){
        positionY = 0;
    }

    // Configuração da Cobra
    ctx.fillStyle = "#1E312B";
    for(let i=0; i < snake.length; i++){
        ctx.fillRect(snake[i].x*grid, snake[i].y*grid, grid-1, grid-1);
        if(snake[i].x == positionX && snake[i].y == positionY){
            tam = 3;
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
    ctx.fillRect(foodX*grid, foodY*grid, grid-1, grid-1);

    // Comendo a Comida
     if(positionX == foodX && positionY ==  foodY){
        tam++;
        foodX = Math.floor(Math.random()*gridX);    
        foodY = Math.floor(Math.random()*gridY);
     }
}


