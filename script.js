var deckID;
var dealBtn = $("#deal-btn");
var shuffleBtn = $("#shuffle-btn");
var initiativeBtn = $("#initiative-btn");
var cardOne = $("#card-one");
var cardTwo = $("#card-two");
var cardThree = $("#card-three");
var cardFour = $("#card-four");
var cardFive = $("#card-five");
var enoughCards = true;

initiativeBtn.click(dealInitiative);
dealBtn.click(dealCards);
shuffleBtn.click(shuffleCards);

function dealInitiative(){
    var initiativeURL = "https://deckofcardsapi.com/api/deck/" +
    deckID +
    "/draw/?count=1";

    fetch(initiativeURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            $("#alert-text").text("Cards Remaining: " + data.remaining);
            $("#card-one").attr("src", "");
            $("#card-two").attr("src", "");
            $("#card-three").attr("src", "");
            $("#card-four").attr("src", "");
            $("#card-five").attr("src", "");
            $("#card-one").attr("src", data.cards[0].image);
        })
}

function dealCards(){
    var dealURL = "https://deckofcardsapi.com/api/deck/" +
    deckID +
    "/draw/?count=5";

    fetch(dealURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            $("#alert-text").text("Cards Remaining: " + data.remaining);
            if (enoughCards){
                $("#card-one").attr("src", data.cards[0].image);
                $("#card-two").attr("src", data.cards[1].image);
                $("#card-three").attr("src", data.cards[2].image);
                $("#card-four").attr("src", data.cards[3].image);
                $("#card-five").attr("src", data.cards[4].image);
            } else {
                $("#alert-text").text("Not enough cards. Please shuffle deck.");
            }
            if (data.remaining > 4){
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
            $("#card-one").attr("src", "");
            $("#card-two").attr("src", "");
            $("#card-three").attr("src", "");
            $("#card-four").attr("src", "");
            $("#card-five").attr("src", "");
        })
}

function initialize(){
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1", {
            "method": "GET",
            "jokers_enabled=true": "GET"
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                deckID = data.deck_id;
                $("#alert-text").text("Cards Remaining: " + data.remaining);;
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

initialize();