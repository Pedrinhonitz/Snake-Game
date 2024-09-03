window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    let loadingScreen = document.getElementById("loadingScreen");

    let score = 0;
    let snakeHeadImage = new Image();
    let snakeBodyImage = new Image();
    let appleImage = new Image();
    
    // Caminhos para as imagens da cabeça da cobra, corpo da cobra e maçã
    snakeHeadImage.src = './img/snake_head.png';
    snakeBodyImage.src = './img/snake_body.png';
    appleImage.src = './img/apple.png';

    // Contador de imagens carregadas
    let imagesLoaded = 0;
    let totalImages = 3;

    function checkAllImagesLoaded() {
        imagesLoaded++;
        if (imagesLoaded === totalImages) {
            loadingScreen.style.display = 'none'; // Oculta a tela de carregamento
            iniciarJogo(); // Inicia o jogo
        }
    }

    // Certifique-se de que as imagens foram carregadas
    snakeHeadImage.onload = checkAllImagesLoaded;
    snakeBodyImage.onload = checkAllImagesLoaded;
    appleImage.onload = checkAllImagesLoaded;

    function iniciarJogo() {
        snake = [];
        positionX = 10;
        positionY = 10;
        foodX = 15;
        foodY = 15;
        velX = 0;
        velY = 0;
        grid = 20; // tamanho da célula da grade
        gridX = 43;
        gridY = 23;
        tam = 3;

        setInterval(jogo, 100);

        document.addEventListener("keydown", function(e) {
            switch (e.keyCode) {
                case 39: // Seta Direita
                    if (velX === 0) { // Impede a inversão direta
                        velX = 1;
                        velY = 0;
                    }
                    break;
                case 37: // Seta Esquerda
                    if (velX === 0) { // Impede a inversão direta
                        velX = -1;
                        velY = 0;
                    }
                    break;
                case 38: // Seta para Cima
                    if (velY === 0) { // Impede a inversão direta
                        velX = 0;
                        velY = -1;
                    }
                    break;
                case 40: // Seta para baixo
                    if (velY === 0) { // Impede a inversão direta
                        velX = 0;
                        velY = 1;
                    }
                    break;
            }
        });
    }

    function jogo() {
        // Configurando Tela
        ctx.fillStyle = "#444444";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Deslocamento da Cobra
        positionX += velX;
        positionY += velY;

        // Verificar se a cobra bateu na parede (Game Over)
        if (positionX < 0 || positionX >= gridX || positionY < 0 || positionY >= gridY) {
            resetGame();
        }

        // Adicionando a nova posição da cabeça
        snake.push({ x: positionX, y: positionY });

        // Apagando o corpo da cobra
        while (snake.length > tam) {
            snake.shift();
        }

        // Configuração da Cobra
        for (let i = 0; i < snake.length; i++) {
            if (i === snake.length - 1) { // Cabeça da cobra
                drawRotatedImage(snakeHeadImage, snake[i].x * grid, snake[i].y * grid, grid * 2, grid * 2, velX, velY);
            } else { // Corpo da cobra
                // Determinando a direção do corpo
                let prevSegment = snake[i + 1] || { x: positionX, y: positionY };
                let dx = snake[i].x - prevSegment.x;
                let dy = snake[i].y - prevSegment.y;
                let angle = Math.atan2(dy, dx);

                ctx.save();
                ctx.translate(snake[i].x * grid + grid, snake[i].y * grid + grid);
                ctx.rotate(angle);
                ctx.drawImage(snakeBodyImage, -grid, -grid, grid * 2, grid * 2);
                ctx.restore();
            }
        }

        // Configurando a Comida
        ctx.drawImage(appleImage, foodX * grid, foodY * grid, grid * 2, grid * 2);

        // Comendo a Comida
        if (positionX == foodX && positionY == foodY) {
            tam++;
            score++;
            document.getElementById('score').innerText = "Pontuação: " + score;
            foodX = Math.floor(Math.random() * gridX);
            foodY = Math.floor(Math.random() * gridY);
        }
    }

    // Função para desenhar a imagem rotacionada
    function drawRotatedImage(image, x, y, width, height, velX, velY) {
        let angle = 0;

        if (velX === 1) angle = 0; // Direita
        if (velX === -1) angle = Math.PI; // Esquerda
        if (velY === 1) angle = Math.PI / 2; // Baixo
        if (velY === -1) angle = -Math.PI / 2; // Cima

        ctx.save();
        ctx.translate(x + width / 2, y + height / 2);
        ctx.rotate(angle);
        ctx.drawImage(image, -width / 2, -height / 2, width, height);
        ctx.restore();
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
};
