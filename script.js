let isInTestingMode = true;

let deckID;
let isDiscard = false;

const dealBtn = $("#deal-btn");
const shuffleBtn = $("#shuffle-btn");
let cards = document.querySelectorAll(".card");
let handArray = [];
let arrayOfNumbers = [];

let isFOAK = false;
let isTOAK = false;
let isFullHouse = false;
let isStraight = false;
let isFlush = false;
let isTwoPair = false;
let isPair = false;
let currentHand = "";

let handSize = 8;
let possibleNumbers = [2,3,4,5,6,7,8,9,10,11,12,13,14];
let possibleStrings = ['14', '13', '12', '11', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
let numberOfCardsSelected = 0;
let enoughCards = true;

$(dealBtn).click(function() {
    dealCards(handSize);
})
shuffleBtn.click(shuffleCards);

$('body').on('click', '.card', function () {
    if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
        numberOfCardsSelected--;
    } else {
        if (numberOfCardsSelected >= 5) return;
        $(this).addClass("selected");
        numberOfCardsSelected++;
    }
    resetHands();
    makeHandArray();
    checkHands();
});

function makeInitialHandArray() {
    handArray = [];
    let cards = document.querySelectorAll(".card");
    $(selectedHand).each(function( index ) {
        let currentCard = {
            'suit': $(this).attr("data-suit"),
            'number': $(this).attr("data-number")
        }
        handArray.push(currentCard);
    });
}

$("#discard-btn").click(function() {
    let selectedCards = $(".selected");
    selectedCards.remove();
    isDiscard = true;
    let cardsToDeal = selectedCards.length
    dealCards(cardsToDeal);
})

function resetHands() {
    isFOAK = false;
    isTOAK = false;
    isFullHouse = false;
    isStraight = false;
    isFlush = false;
    isTwoPair = false;
    isPair = false;

    if (isInTestingMode) {
        console.log("--------------------")
        console.log("--<> Step 1: All hand types set to false")
    }
}

function makeHandArray() {
    handArray = [];
    let selectedHand = document.querySelectorAll(".selected");
    $(selectedHand).each(function( index ) {
        let currentCard = {
            'suit': $(this).attr("data-suit"),
            'number': $(this).attr("data-number")
        }
        handArray.push(currentCard);
    });

    console.log("--<> Step 2: Make hand array:");
    console.log(handArray);
}

function checkHands() {

    if (isInTestingMode) {
        console.log("--<> Step 3: Check hand types");
    }

    
    
    checkStraightFlush();
    checkFOAK();
    checkFullHouse();
    checkTOAK();
    checkTwoPair();
    checkPair();

    if (isFlush && isStraight) {
        currentHand = "Straight Flush";
        updateHandStatus(currentHand);

        if (isInTestingMode) {
            console.log("   --- Is a straight flush!");
        }
    } else if (isFOAK) {
        currentHand = "Four of a Kind";
        updateHandStatus(currentHand);

        if (isInTestingMode) {
            console.log("   --- Is a four of a kind!");
        }
    } else if (isFullHouse) {
        currentHand = "Full House";
        updateHandStatus(currentHand);

        if (isInTestingMode) {
            console.log("   --- Is a full house!");
        }
    } else if (isFlush) {
        currentHand = "Flush";
        updateHandStatus(currentHand);

        if (isInTestingMode) {
            console.log("   --- Is a flush!");
        }
    } else if (isStraight) {
        currentHand = "Straight";
        updateHandStatus(currentHand);

        if (isInTestingMode) {
            console.log("   --- Is a straight!");
        }
    } else if (isTOAK) {
        currentHand = "Three of a Kind";
        updateHandStatus(currentHand);

        if (isInTestingMode) {
            console.log("   --- Is a three of a kind!");
        }
    } else if (isTwoPair) {
        currentHand = "Two Pair";
        updateHandStatus(currentHand);

        if (isInTestingMode) {
            console.log("   --- Is a two pair!");
        }
    } else if (isPair) {
        currentHand = "Pair";
        updateHandStatus(currentHand);

        if (isInTestingMode) {
            console.log("   --- Is a pair!");
        }
    } else {
        currentHand = "High Card";
        updateHandStatus(currentHand);

        if (isInTestingMode) {
            console.log("   --- Is a high card!");
        }
    }
}

function checkStraightFlush() {

    if (isInTestingMode) {
        console.log(" --- Checking for straight flush")
    }

    checkStraight();
    checkFlush();
}

function checkFOAK() {

    if (isInTestingMode) {
        console.log(" --- Checking for four of a kind")
    }

    convertFaceCards();

    if (isInTestingMode) {
        if (arrayOfNumbers.length < 4) {
            console.log("   --- Less than 4 cards - > cannot be a four of a kind");
        }
    }

    if (arrayOfNumbers.length < 4) return;
     
    const itemCounter = (value, index) => {
        return value.filter((x) => x == index).length;
    };

    $(possibleStrings).each(function() {
        if(itemCounter(arrayOfNumbers, this) == 4) {
            isFOAK = true;
        }
    })
}

function checkFullHouse() {

    if (isInTestingMode) {
        console.log(" --- Checking for full house")
    }

    convertFaceCards();

    if (isInTestingMode) {
        if (arrayOfNumbers.length < 5) {
            console.log("   --- Less than 5 cards -> cannot be a full house")
        }
    }

    if (arrayOfNumbers.length < 5) return;
     
    const itemCounter = (value, index) => {
        return value.filter((x) => x == index).length;
    };

    let foundAPair = false;
    let foundATOAK = false;
    $(possibleStrings).each(function() {
        if(itemCounter(arrayOfNumbers, this) == 2) {
            foundAPair = true;
        }
        if(itemCounter(arrayOfNumbers, this) == 3) {
            foundATOAK = true;
        }
    })

    if (foundAPair && foundATOAK) {
        isFullHouse = true;
    }
}

function checkFlush() {

    if (isInTestingMode) {
        console.log(" --- Checking for flush");
        if (handArray.length < 5) {
            console.log("   --- Less than 5 cards -> cannot be a flush");
        }
    }

    if (handArray.length < 5) return;

    let currentSuit = "";
    let number = 0;
    $(handArray).each(function() {
        if (this.suit == currentSuit) {
            number++;
            if (number == 4) {
                isFlush = true;
            }
        } 
        currentSuit = this.suit;
    });

    if (isInTestingMode) {
        if (isFlush) {
            console.log("   --- Is a flush!")
        } else {
            console.log("   --- Is not a flush")
        }
    }
}

function checkStraight() {

    if (isInTestingMode) {
        console.log(" --- Checking for straight");
    }

    convertFaceCards();

    var nums = arrayOfNumbers.map(function(str) {
        return parseInt(str); 
    });

    arrayOfNumbers.sort(function(a, b) {
        return a - b;
    })

    if (isInTestingMode) {
        if (arrayOfNumbers.length < 5) {
            console.log("   --- Less than 5 cards -> cannot be a straight")
        }
    }

    if (arrayOfNumbers.length < 5) return;

    if (arrayOfNumbers[0] == arrayOfNumbers[1]-1 && arrayOfNumbers[0] == arrayOfNumbers[2]-2 && arrayOfNumbers[0] == arrayOfNumbers[3]-3 &&arrayOfNumbers[0] == arrayOfNumbers[4]-4) {
        isStraight = true;
    }

    if (arrayOfNumbers[0] == 2 && arrayOfNumbers[1] == 3 && arrayOfNumbers[2] == 4 && arrayOfNumbers[3] == 5 && arrayOfNumbers[4] == 14) {
        isStraight = true;
    }

    if (isInTestingMode) {
        if (isStraight) {
            console.log("   --- Is a straight!")
        } else {
            console.log("   --- Is not a straight");
        }
    }

}

function checkTOAK() {

    if (isInTestingMode) {
        console.log(" --- Checking for three of a kind")
    }

    convertFaceCards();

    if (isInTestingMode) {
        if (arrayOfNumbers.length < 3) {
            console.log("   --- Less than 3 cards -> cannot be a three of a kind")
        }
    }

    if (arrayOfNumbers.length < 3) return;

     
    const itemCounter = (value, index) => {
        return value.filter((x) => x == index).length;
    };

    $(possibleStrings).each(function() {
        if(itemCounter(arrayOfNumbers, this) == 3) {
            isTOAK = true;
        }
    })
}

function checkTwoPair() {

    if (isInTestingMode) {
        console.log(" --- Checking for two pair");
        if (handArray.length < 4) {
            console.log("   --- Less than 4 cards -> cannot be a two pair");
        }
    }

    if (handArray.length < 4) return;

    convertFaceCards();
     
    const itemCounter = (value, index) => {
        return value.filter((x) => x == index).length;
    };

    let numberOfPairs = 0;
    $(possibleStrings).each(function() {
        if(itemCounter(arrayOfNumbers, this) == 2) {
            numberOfPairs++;
        }
    })

    if (numberOfPairs == 2) {
        isTwoPair = true;
    }
    
}

function checkPair() {

    if (isInTestingMode) {
        console.log(" --- Checking for pair");
        if (handArray.length < 2) {
            console.log("   --- Less than 2 cards -> cannot be a pair");
        }
    }

    if (handArray.length < 2) return;

    convertFaceCards();
     
    const itemCounter = (value, index) => {
        return value.filter((x) => x == index).length;
    };

    let numberOfPairs = 0;
    $(possibleStrings).each(function() {
        if(itemCounter(arrayOfNumbers, this) == 2) {
            numberOfPairs++;
        }
    })

    if (numberOfPairs == 1) {
        isPair = true;
    }
}

function convertFaceCards() {
    arrayOfNumbers = [];
    $(handArray).each(function() {
        let number = this.number;
        if (number == "ACE") {
            number = "14";
        } else if (number == "KING") {
            number = "13";
        } else if (number == "QUEEN") {
            number = "12";
        } else if (number == "JACK") {
            number = "11";
        } 
        arrayOfNumbers.push(number);
    });
}

function updateHandStatus(hand) {
    $(".hand").text(hand);
}

function dealCards(cardsToDeal){

    if (isInTestingMode) {
        console.log("-- Dealing " + cardsToDeal + " cards")
    }

    let dealURL = "https://deckofcardsapi.com/api/deck/" +
    deckID +
    `/draw/?count=${cardsToDeal}`;

    fetch(dealURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.remaining >= 0){
                enoughCards = true;
            } else {
                enoughCards = false;
            }

            let arrayOfCardObjects = [];

            $("#alert-text").text("Cards Remaining: " + data.remaining);
            if (enoughCards){
                if (!isDiscard) {
                    $(".card-container").empty();
                } else {
                    let currentCards = $(".card");
                    console.log(currentCards);
                    $(currentCards).each(function( index ) {
                        console.log(this);
                        let number = parseInt($(this).attr("data-number"));
                        let suit = $(this).attr("data-suit");
                        let image = $(this).attr("src");
                        let card = {
                            "number": number,
                            "suit": suit,
                            "image": image
                        }
                        arrayOfCardObjects.push(card);
                    });
                    isDiscard = false;
                    numberOfCardsSelected = 0;
                }

                for (let i = 0; i < cardsToDeal; i++) {
                    let trueValue;
                    if (data.cards[i].value == "ACE") {
                        trueValue = 14;
                    } else if (data.cards[i].value == "JACK") {
                        trueValue = 11;
                    } else if (data.cards[i].value == "QUEEN") {
                        trueValue = 12;
                    } else if (data.cards[i].value == "KING") {
                        trueValue = 13;
                    } else {
                        trueValue = parseInt(data.cards[i].value);
                    }

                    let currentObject = {
                        suit: data.cards[i].suit,
                        number: trueValue,
                        image: data.cards[i].image
                    }

                    arrayOfCardObjects.push(currentObject);
                    arrayOfCardObjects?.sort((a, b) => (a.number > b.number ? -1 : 1))
                }

                if (isInTestingMode) {
                    console.log("-- Array of cards dealt:");
                    console.log(arrayOfCardObjects);
                };

                $(".card-container").empty();

                $.each(arrayOfCardObjects, function(index, card) {
                    $(".card-container").append(`<img class="card" src="${card.image}" data-suit="${card.suit}" data-number="${card.number}">`)
                 });

            } else {
                $("#alert-text").text("Not enough cards. Please shuffle deck.");
            }
            cards = document.querySelectorAll(".card");
        })
}

function shuffleCards(){
    let shuffleURL = "https://deckofcardsapi.com/api/deck/" + deckID + "/shuffle/";

    fetch(shuffleURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            enoughCards = true;
            $("#alert-text").text("The deck has been shuffled!");
            $(".card-container").empty();

            if (isInTestingMode) {
                console.log("-- Shuffing cards");
            }
        })
}

function initialize(){
    fetch("https://deckofcardsapi.com/api/deck/new/")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                deckID = data.deck_id;
                $("#alert-text").text("Cards Remaining: " + data.remaining);
                shuffleCards();

                if (isInTestingMode) {
                    console.log("--> Initializing... <--");
                    console.log("-- Making deck. Deck ID: " + deckID);
                }

            })
            setTimeout(function(){
                dealCards(handSize);
            }, 500); 
}

initialize();