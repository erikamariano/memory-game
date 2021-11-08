let game = {

    //lockMode = to check the conditions
    lockMode: false,
    firstCard: null,
    secondCard: null,

    images: ["bootstrap",
    "css",
    "electron",
    "firebase",
    "html",
    "javascript",
    "jquery",
    "mongo",
    "node",
    "react"
    ],
    cards: null,

    setCard: function(id){

        let selectedCard = this.cards.filter(card => card.id === id)[0];

            if(selectedCard.flipped || this.lockMode){
                return false
            }

            if(!this.firstCard){
                this.firstCard = selectedCard;
                this.firstCard.flipped = true;
                return true;
            } else {
                this.secondCard = selectedCard;
                this.secondCard.flipped = true;
                this.lockMode = true;
                return true;
            }

    },

    checkMatch: function(){
       
        if(!this.firstCard || !this.secondCard){
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards: function(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver: function(){
        return this.cards.filter(card => !card.flipped).length == 0;
    },

    createCardsFromImages: function(){
        this.cards = [];
    
        for(let img of this.images){
            this.cards.push(this.createPairFromImage(img));
        }
    
        //flatMap disjoint an array:    
        this.cards = this.cards.flatMap(pair => pair);

        this.shuffleCards();
    },

    createPairFromImage: function(img){
        return [{
            id: this.createIdWithImg(img),
            icon: img,
            flipped: false
        }, {
            id: this.createIdWithImg(img),
            icon: img,
            flipped: false
        }];
    },
    
    createIdWithImg: function(img){
        return img + parseInt(Math.random() * 1000);
    },

    shuffleCards: function (cards) {
    
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while(currentIndex != 0){
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--;
    
            //change position:
            // let aux = cards[randomIndex];
            // cards[randomIndex] = cards[currentIndex];
            // cards[currentIndex] = aux;
    
            //or:
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }    
    }
}



