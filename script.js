let deckID;

const dealBtn = $("#deal-btn");
const shuffleBtn = $("#shuffle-btn");
let cards = document.querySelectorAll(".card");
let handArray = [];

let isFOAK = false;
let isTOAK = false;
let isFullHouse = false;
let isStraight = false;
let isFlush = false;
let isTwoPair = false;
let isPair = false;
let currentHand = "";

let handSize = 40;
let possibleNumbers = [2,3,4,5,6,7,8,9,10,11,12,13,14];
let numberOfCardsSelected = 0;
let enoughCards = true;

dealBtn.click(dealCards);
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

function resetHands() {
    isFOAK = false;
    isTOAK = false;
    isFullHouse = false;
    isStraight = false;
    isFlush = false;
    isTwoPair = false;
    isPair = false;
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
}

function checkHands() {

    console.log("Checking hand...")

    checkStraightFlush();
    checkFOAK();
    checkFullHouse();
    checkTOAK();
    checkTwoPair();
    checkPair();

    if (isFlush && isStraight) {
        currentHand = "Straight Flush";
        updateHandStatus(currentHand);
    } else if (isFOAK) {
        currentHand = "Four of a Kind";
        updateHandStatus(currentHand);
    } else if (isFullHouse) {
        currentHand = "Full House";
        updateHandStatus(currentHand);
    } else if (isFlush) {
        currentHand = "Flush";
        updateHandStatus(currentHand);
    } else if (isStraight) {
        currentHand = "Straight";
        updateHandStatus(currentHand);
    } else if (isTOAK) {
        currentHand = "Three of a Kind";
        updateHandStatus(currentHand);
    } else if (isTwoPair) {
        currentHand = "Two Pair";
        updateHandStatus(currentHand);
    } else if (isPair) {
        currentHand = "Pair";
        updateHandStatus(currentHand);
    } else {
        currentHand = "High Card";
        updateHandStatus(currentHand);
    }
}

function updateHandStatus(hand) {
    $(".hand").text(hand);
}

function checkStraightFlush() {
    checkStraight();
    checkFlush();
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

function checkFullHouse() {
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

    if (arrayOfNumbers.length < 5) return;

    function getOccurrence(array, value) {
        var count = 0;
        array.forEach((v) => (v === value && count++));
        return count;
    }

    let gotTwo = false;
    let gotThree = false;
    $(possibleNumbers).each(function(number) {
        repeatNumber = getOccurrence(arrayOfNumbers, number);
        if (repeatNumber == 2) {
            gotThree = true;
        } else if (repeatNumber == 3) {
            gotTwo = true;
        }
    });
    if (gotTwo && gotThree) {
        isFullHouse = true;
    }
}

function checkFlush() {
    if (handArray < 5) return;
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

    if (arrayOfNumbers.length < 5) return;

    if (arrayOfNumbers[0] == arrayOfNumbers[1]-1 && arrayOfNumbers[0] == arrayOfNumbers[2]-2 && arrayOfNumbers[0] == arrayOfNumbers[3]-3 &&arrayOfNumbers[0] == arrayOfNumbers[4]-4) {
        isStraight = true;
    }
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
        if (repeatNumber == 3) {
            isTOAK = true;
        }
    });
}

function checkTwoPair() {
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

    if (handArray < 4) return;

    let numberOfPairs = 0;
    $(possibleNumbers).each(function(number) {
        repeatNumber = getOccurrence(arrayOfNumbers, number);
        if (repeatNumber == 2) {
            numberOfPairs++;
        }
    });

    if (numberOfPairs == 2) {
        isTwoPair = true;
    }
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
        if (repeatNumber == 2) {
            isPair = true;
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
                $(".card-container").empty();
                for (let i = 0; i < handSize; i++) {
                    $(".card-container").append(`<img class="card" src="${data.cards[i].image}" data-suit="${data.cards[i].suit}" data-number="${data.cards[i].value}">`)
                }
            } else {
                $("#alert-text").text("Not enough cards. Please shuffle deck.");
            }
            cards = document.querySelectorAll(".card");
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
            $(".card-container").empty();
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