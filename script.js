let deckID;

const dealBtn = $("#deal-btn");
const aceBtn = $("#ace-btn")
const shuffleBtn = $("#shuffle-btn");
// const initiativeBtn = $("#initiative-btn");
const cardOne = $("#card-one");
const cardTwo = $("#card-two");
const cardThree = $("#card-three");
const cardFour = $("#card-four");
const cardFive = $("#card-five");
const cardSix = $("#card-six");
const extraCardOne = $("#extra-card-one")
const extraCardTwo = $("#extra-card-two")

let enoughCards = true;

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
    let dealURL = "https://deckofcardsapi.com/api/deck/" +
    deckID +
    "/draw/?count=6";

    fetch(dealURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            if (data.remaining >= 0){
                enoughCards = true;
            } else {
                enoughCards = false;
            }
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
            // if (data.remaining > 5){
            //     enoughCards = true;
            // } else {
            //     enoughCards = false;
            // }
        })
}

function aceDeal(){
    let dealURL = "https://deckofcardsapi.com/api/deck/" +
    deckID +
    "/draw/?count=2";
    
    fetch(dealURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            if (data.remaining >= 0){
                enoughCards = true;
            } else {
                enoughCards = false;
            }
            $("#alert-text").text("Cards Remaining: " + data.remaining);
            if (enoughCards){
                extraCardOne.attr("src", data.cards[0].image);
                extraCardTwo.attr("src", data.cards[1].image);
            } else {
                $("#alert-text").text("Not enough cards. Please shuffle deck.");
            }
            // if (data.remaining > 1){
            //     enoughCards = true;
            // } else {
            //     enoughCards = false;
            // }
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