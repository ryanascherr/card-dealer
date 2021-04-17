var deckID;
var dealBtn = $("#deal-btn");
var aceBtn = $("#ace-btn")
var shuffleBtn = $("#shuffle-btn");
var initiativeBtn = $("#initiative-btn");
var cardOne = $("#card-one");
var cardTwo = $("#card-two");
var cardThree = $("#card-three");
var cardFour = $("#card-four");
var cardFive = $("#card-five");
var cardSix = $("#card-six");
var extraCardOne = $("#extra-card-one")
var extraCardTwo = $("#extra-card-two")
var enoughCards = true;

// initiativeBtn.click(dealInitiative);
dealBtn.click(dealCards);
aceBtn.click(aceDeal);
shuffleBtn.click(shuffleCards);

// function dealInitiative(){
//     var initiativeURL = "https://deckofcardsapi.com/api/deck/" +
//     deckID +
//     "/draw/?count=1";

//     fetch(initiativeURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//             $("#alert-text").text("Cards Remaining: " + data.remaining);
//             $("#card-one").attr("src", "");
//             $("#card-two").attr("src", "");
//             $("#card-three").attr("src", "");
//             $("#card-four").attr("src", "");
//             $("#card-five").attr("src", "");
//             $("#card-six").attr("src", "");
//             $("#card-one").attr("src", data.cards[0].image);
//         })
// }

function dealCards(){
    var dealURL = "https://deckofcardsapi.com/api/deck/" +
    deckID +
    "/draw/?count=6";

    fetch(dealURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            $("#alert-text").text("Cards Remaining: " + data.remaining);
            if (enoughCards){
                cardOne.attr("src", data.cards[0].image);
                cardTwo.attr("src", data.cards[1].image);
                cardThree.attr("src", data.cards[2].image);
                cardFour.attr("src", data.cards[3].image);
                cardFive.attr("src", data.cards[4].image);
                cardSix.attr("src", data.cards[5].image);
                extraCardOne.attr("src", "");
                extraCardTwo.attr("src", "");
            } else {
                $("#alert-text").text("Not enough cards. Please shuffle deck.");
            }
            if (data.remaining > 5){
                enoughCards = true;
            } else {
                enoughCards = false;
            }
        })
}

function aceDeal(){
    var dealURL = "https://deckofcardsapi.com/api/deck/" +
    deckID +
    "/draw/?count=2";

    fetch(dealURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            $("#alert-text").text("Cards Remaining: " + data.remaining);
            if (enoughCards){
                extraCardOne.attr("src", data.cards[0].image);
                extraCardTwo.attr("src", data.cards[1].image);
            } else {
                $("#alert-text").text("Not enough cards. Please shuffle deck.");
            }
            if (data.remaining > 1){
                enoughCards = true;
            } else {
                enoughCards = false;
            }
        })
}

function shuffleCards(){
    var shuffleURL = "https://deckofcardsapi.com/api/deck/" +
    deckID +
    "/shuffle/";

    fetch(shuffleURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            enoughCards = true;
            $("#alert-text").text("The deck has been shuffled!");
            cardOne.attr("src", "");
            cardTwo.attr("src", "");
            cardThree.attr("src", "");
            cardFour.attr("src", "");
            cardFive.attr("src", "");
            cardSix.attr("src", "");
            extraCardOne.attr("src", "");
            extraCardTwo.attr("src", "");
        })
}

function initialize(){
    fetch("https://deckofcardsapi.com/api/deck/new/")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                deckID = data.deck_id;
                $("#alert-text").text("Cards Remaining: " + data.remaining);
                shuffleCards();
            })
}

cardOne.click(function(){
    $(this).attr("src", "");
})

cardTwo.click(function(){
    $(this).attr("src", "");
})

cardThree.click(function(){
    $(this).attr("src", "");
})

cardFour.click(function(){
    $(this).attr("src", "");
})

cardFive.click(function(){
    $(this).attr("src", "");
})

cardSix.click(function(){
    $(this).attr("src", "");
})

extraCardOne.click(function(){
    $(this).attr("src", "");
})

extraCardTwo.click(function(){
    $(this).attr("src", "");
})

initialize();