//HTML classes:
const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";


startGame();

function startGame(){
    game.createCardsFromImages();
   
    initialize(game.cards);
}

function initialize(cards){
    let gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = "";
    
    game.cards.forEach(card => {

        let cardElementHtml = document.createElement('div');
        cardElementHtml.id = card.id;
        cardElementHtml.classList.add(CARD);
        cardElementHtml.dataset.icon = card.icon;

        createCardContent(card, cardElementHtml);

        cardElementHtml.addEventListener("click", flipCard);
        gameBoard.appendChild(cardElementHtml);
    })
}

function createCardContent(card, cardElementHtml){
    createCardFace(FRONT, card, cardElementHtml);
    createCardFace(BACK, card, cardElementHtml);
}

function createCardFace(face, card, element){
    cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if(face === FRONT){
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/images/" + card.icon + ".png";

        cardElementFace.appendChild(iconElement);
    } else{
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace);
}

function flipCard(){

    if(game.setCard(this.id)){
        this.classList.add('flip');
        
        if(game.secondCard){
            if(game.checkMatch()){
                game.clearCards();
                if(game.checkGameOver()){
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = 'flex';
                }
            } else{
                
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);
        
                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip'); 
                    game.unflipCards();
                }, 1000);
                
            };
        }
        
    }   
}

function restart(){
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';
}