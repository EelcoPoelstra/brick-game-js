var canvas = document.getElementById('canvasGame'),
    context = canvas.getContext('2d'),
    ballX = 400,
    ballY = 150,
    ballMoveX = 1,
    ballMoveY = 1,
    pressLeft = false,
    pressRight = false,
    paddlePositionX = 300,
    paddlePositionY = canvas.height - 60,
    ballSize = 20,
    paddleWidth = 250,
    paddleHeight = 30,
    startPositionBlock = 50;

function draw() {
    positionBlockArray = [];
    context.clearRect(0, 0, 800, 500); // 0 and 0 are top and left, 800 and 500 are bot and right
    ball();
    ballX += ballMoveX; // same as ballX = ballX + ballMoveX 
    ballY += ballMoveY;   
    paddle();
    var calcBallY = ballY + ballMoveY,
        calcBallX = ballX + ballMoveX;
    //check if ball hits paddle
    if (calcBallY === (paddlePositionY - ballSize)) {
        // console.log("Hoogte ball:" + calcBallY);
        if (calcBallX >= paddlePositionX && calcBallX <= (paddlePositionX + paddleWidth)) {
            ballMoveY = -ballMoveY;
        }
    }        
    //top
    if(calcBallY < (0 +ballSize)) {
        ballMoveY = -ballMoveY;
    }
    //bot
    if(calcBallY === (canvas.height - ballSize)) {
        // console.log('Game overrr');
        // document.location.reload();
        ballMoveY = -ballMoveY;
        // console.log("Noooo");
        // document.location.reload();
    }      
    //left and right
    if(calcBallX > (canvas.width -ballSize) || calcBallX < (0 + ballSize)) {
        ballMoveX = -ballMoveX;
    }
    if(pressLeft) {
        paddlePositionX -= 12; 
        pressLeft = false;
        var newPaddlePositionX = paddlePositionX + 120;
        // console.log('New position paddle x :', newPaddlePositionX);
    }

    if(pressRight) {
        paddlePositionX += 12; 
        pressRight = false;
        var newPaddlePositionX = paddlePositionX +120;
        // console.log('New position paddle x :', newPaddlePositionX);
    }  

    
    var adjustHeightBlock = 30,
        blockPositionX = startPositionBlock,
        blockPositionY = 32,
        blockSpacing = 20,
        blockWidth = 60,
        blockHeight = 10;    
    
    for (i = 0; i < 27; i++) { 
        if(blockPositionX > (canvas.width -blockWidth)) {
            blockPositionX = startPositionBlock;
            adjustHeightBlock += 30;
            blockPositionY = adjustHeightBlock;
        }
        positionBlockArray.push({
            x : blockPositionX,
            y : blockPositionY,
            width : blockWidth,
            height : blockHeight     
        });
        blockPositionX += (blockWidth + blockSpacing);
    }

    for (i = 0; i < positionBlockArray.length; i++) {
        var positionBlockItem = positionBlockArray[i];
        block(positionBlockItem.x, positionBlockItem.y, positionBlockItem.width, positionBlockItem.height);
    }
}

function paddle() {
    context.beginPath();
    context.rect(paddlePositionX, paddlePositionY, paddleWidth, paddleHeight);
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
}

function ball() {
    context.beginPath();
    context.arc(ballX, ballY, ballSize, 0, Math.PI*2);
    context.fillStyle = 'green';
    context.fill();
    context.closePath(); 
}

function block(blockPositionX, blockPositionY, blockWidth, blockHeight) {
    context.beginPath();
    context.rect(blockPositionX, blockPositionY, blockWidth, blockHeight);
    context.fillStyle = 'blue';
    context.fill();
    context.closePath();
}

//keydown is triggered when the user presses a key
//keyup is triggered when the user releases a key.
document.addEventListener('keydown', KeyDownFunction, false);

function KeyDownFunction(event) {
    console.log('event:', event);
    if (event.keyCode === 37) {
        pressLeft = true;
    }
    else if (event.keyCode === 39) {
        pressRight = true;
    }
}

setInterval(draw, 10); // 10 is speed of refresh