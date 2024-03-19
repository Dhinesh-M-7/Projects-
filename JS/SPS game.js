function makeMove(){
    let move = '';
    let num = Math.random();
    if(num < 1/3){
        move = 'rock';
    }else if(num > 2/3){
        move = 'scissors';
    }else{
        move = 'paper';
    }
    return move;
}

function playGame(playerMove){
    if(playerMove === 'reset'){
        localStorage.removeItem('result');
        let result = JSON.parse(localStorage.getItem('result'));
        if(!result){
            result = {
                wins : 0,
                losses :0,
                tie : 0
            };
        }
        document.querySelector('.js-final-result').innerHTML = `Wins: ${result.wins}, Losses: ${result.losses}, Ties: ${result.tie}`;
        return;
    }
    
    let result = JSON.parse(localStorage.getItem('result'));
    if(!result){
        result = {
            wins : 0,
            losses :0,
            tie : 0
        };
    }
    let gameResult = '';
    const computerMove = makeMove();
    if(playerMove === 'rock'){
        if(computerMove === 'scissors'){
            gameResult = 'You win.'
        }else if(computerMove === 'paper'){
            gameResult = 'You lose.'
        }else{
            gameResult = 'Tie.'
        }
    }

    if(playerMove === 'paper'){
        if(computerMove === 'rock'){
            gameResult = 'You win.'
        }else if(computerMove === 'scissors'){
            gameResult = 'You lose.'
        }else{
            gameResult = 'Tie.'
        }
    }

    if(playerMove === 'scissors'){
        if(computerMove === 'paper'){
            gameResult = 'You win.'
        }else if(computerMove === 'rock'){
            gameResult = 'You lose.'
        }else{
            gameResult = 'Tie.'
        }
    }

    if(gameResult === 'You win.'){
        result.wins++;
    }else if(gameResult === 'You lose.'){
        result.losses++;
    }else if(gameResult === 'Tie.'){
        result.tie++;
    }

    localStorage.setItem('result',JSON.stringify(result));

    document.querySelector('.js-result').innerHTML = `${gameResult}`;
    document.querySelector('.js-image-result').innerHTML = 
    `
    You
    <img src="Images/${playerMove}-emoji.png" style="height:50px;width:50px">
    <img src="Images/${computerMove}-emoji.png" style="height:50px;width:50px">
    Computer
    `;
    document.querySelector('.js-final-result').innerHTML = `Wins: ${result.wins}, Losses: ${result.losses}, Ties: ${result.tie}`;
}
