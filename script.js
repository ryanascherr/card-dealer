let deckID;
let cards = document.querySelectorAll(".card");
let handArray = [];

let isFOAK = false;
let isTOAK = false;
let isStraight = false;
let isFlush = false;
let isPair = false;
let currentHand = "";

let handSize = 10;
let possibleNumbers = [2,3,4,5,6,7,8,9,10,11,12,13,14];
let numberOfCardsSelected = 0;
let enoughCards = true;

dealBtn.click(dealCards);
shuffleBtn.click(shuffleCards);

$(cards).click(function() {

    if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
        numberOfCardsSelected--;
    } else {
        if (numberOfCardsSelected >= 5) return;
        $(this).addClass("selected");
        numberOfCardsSelected++;
    }
    makeHandArray();
    checkHands();
});

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
}

function checkHands() {

    checkStraightFlush();
    if (isFlush && isStraight) {
        currentHand = "Straight Flush"
        updateHandStatus(currentHand);
        return;
    }
    checkFOAK();
    if (isFOAK) {
        currentHand = "Four of a Kind"
        updateHandStatus(currentHand);
        return;
    };
    // checkFullHouse();
    if (isFlush) {
        currentHand = "Flush"
        updateHandStatus(currentHand);
        return;
    }
    if (isStraight) {
        currentHand = "Straight"
        updateHandStatus(currentHand);
        return;
    }
    checkTOAK();
    if (isTOAK) {
        currentHand = "Three of a Kind"
        updateHandStatus(currentHand);
        return;
    }
    // checkTwoPair();
    checkPair();
    if (isPair) {
        currentHand = "Pair"
        updateHandStatus(currentHand);
        return;
    }

    currentHand = "High Card"
    updateHandStatus(currentHand);
}

function updateHandStatus(hand) {
    $(".hand").text(hand);
}

function checkStraightFlush() {
    checkStraight();
    checkFlush();
}

function checkFlush() {
    let currentSuit = "";
    let number = 0;
    $(handArray).each(function() {
        if (this.suit == currentSuit) {
            number++;
            console.log(number);
            if (number == 4) {
                isFlush = true;
            }
        } 
        currentSuit = this.suit;
    });
}

function checkStraight() {
    let arrayOfNumbers = [];
    $(handArray).each(function() {
        let number = this.number;
        if (number == "ACE") {
            number = 14;
        } else if (number == "KING") {
            number = 13;
        } else if (number == "QUEEN") {
            number = 12;
        } else if (number == "JACK") {
            number = 11;
        }
        number = parseInt(number);
        arrayOfNumbers.push(number);
    });


    arrayOfNumbers.sort(function(a, b) {
        return a - b;
    })

    let currentNumber;
    $(arrayOfNumbers).each(function(index, num) {
        if (currentNumber == null) {
            currentNumber = num;
        } else {
            currentNumber++;
            if (currentNumber == num && arrayOfNumbers == 5) {
                console.log("it's a straight");
                isStraight = true;
            }
        }
    })
}

function checkFOAK() {
    let arrayOfNumbers = [];
    $(handArray).each(function() {
        let number = this.number;
        if (number == "ACE") {
            number = 14;
        } else if (number == "KING") {
            number = 13;
        } else if (number == "QUEEN") {
            number = 12;
        } else if (number == "JACK") {
            number = 11;
        }
        number = parseInt(number);
        arrayOfNumbers.push(number);
    });


    arrayOfNumbers.sort(function(a, b) {
        return a - b;
    })

    function getOccurrence(array, value) {
        var count = 0;
        array.forEach((v) => (v === value && count++));
        return count;
    }

    $(possibleNumbers).each(function(number) {
        repeatNumber = getOccurrence(arrayOfNumbers, number);
        if (repeatNumber == 4) {
            isFOAK = true;
        }
    });
}

function checkTOAK() {
    let arrayOfNumbers = [];
    $(handArray).each(function() {
        let number = this.number;
        if (number == "ACE") {
            number = 14;
        } else if (number == "KING") {
            number = 13;
        } else if (number == "QUEEN") {
            number = 12;
        } else if (number == "JACK") {
            number = 11;
        }
        number = parseInt(number);
        arrayOfNumbers.push(number);
    });


    arrayOfNumbers.sort(function(a, b) {
        return a - b;
    })

    function getOccurrence(array, value) {
        var count = 0;
        array.forEach((v) => (v === value && count++));
        return count;
    }

    $(possibleNumbers).each(function(number) {
        repeatNumber = getOccurrence(arrayOfNumbers, number);
        if (repeatNumber == 2) {
            isPair = true;
        }
    });
}

function checkPair() {
    let arrayOfNumbers = [];
    $(handArray).each(function() {
        let number = this.number;
        if (number == "ACE") {
            number = 14;
        } else if (number == "KING") {
            number = 13;
        } else if (number == "QUEEN") {
            number = 12;
        } else if (number == "JACK") {
            number = 11;
        }
        number = parseInt(number);
        arrayOfNumbers.push(number);
    });


    arrayOfNumbers.sort(function(a, b) {
        return a - b;
    })

    function getOccurrence(array, value) {
        var count = 0;
        array.forEach((v) => (v === value && count++));
        return count;
    }

    $(possibleNumbers).each(function(number) {
        repeatNumber = getOccurrence(arrayOfNumbers, number);
        if (repeatNumber == 3) {
            isTOAK = true;
        }
    });
}

function dealCards(){
    let dealURL = "https://deckofcardsapi.com/api/deck/" +
    deckID +
    `/draw/?count=${handSize}`;

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
            $("#alert-text").text("Cards Remaining: " + data.remaining);
            if (enoughCards){

                for (let i = 0; i < handSize; i++) {
                    console.log(data.cards[i]);
                    $(".card-container").append(`<img class="card" src="${data.cards[i].image}" data-suit="${data.cards[i].suit}" data-number="${data.cards[i].value}">`)
                }
            } else {
                $("#alert-text").text("Not enough cards. Please shuffle deck.");
            }
        })
}

function shuffleCards(){
    let shuffleURL = "https://deckofcardsapi.com/api/deck/" +
    deckID +
    "/shuffle/";

    fetch(shuffleURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            enoughCards = true;
            $("#alert-text").text("The deck has been shuffled!");
            cardOne.attr("src", "", );
            cardTwo.attr("src", "");
            cardThree.attr("src", "");
            cardFour.attr("src", "");
            cardFive.attr("src", "");
            cardSix.attr("src", "");
            cardSeven.attr("src", "");
            cardEight.attr("src", "");
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
            })
}

// cardOne.click(function(){
//     $(this).attr("src", "");
// })

// cardTwo.click(function(){
//     $(this).attr("src", "");
// })

// cardThree.click(function(){
//     $(this).attr("src", "");
// })

// cardFour.click(function(){
//     $(this).attr("src", "");
// })

// cardFive.click(function(){
//     $(this).attr("src", "");
// })

// cardSix.click(function(){
//     $(this).attr("src", "");
// })

initialize();