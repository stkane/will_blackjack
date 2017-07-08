var myDeck;
var playerHandArr = [];
var playerHandTotalArr = 0;
var compHandArr = [];
var compHandTotalArr = 0;
var compDisplayHandTotalArr = 0;
var newGameButton = document.getElementById('newgame');
var dealButton = document.getElementById('deal');
var hitButton = document.getElementById('hit');
var stayButton = document.getElementById('stay');
var getPlayerTotal = document.getElementById('playerTotal');
var getCompTotal = document.getElementById('compTotal');
var staySwitch = 0;

var playerCardDivs = document.querySelectorAll('.playerCards');
var compCardDivs = document.querySelectorAll('.compCards')

var compCardTwo = document.querySelectorAll('compCardTwo');
var compCardTwo = document.getElementById('compCardTwo');

newGameButton.addEventListener('click', () => {
	newGame();
});

hitButton.addEventListener('click', () => {
	playerHit();
	playerTotal();
})

stayButton.addEventListener('click', () => {
	staySwitch += 1;
	compCardDivs[0].innerHTML = compHandArr[0].name + " " + compHandArr[0].suit;
	displayCards();
	compLogic();
})

function card(value, name, suit) {
	this.value = value;
	this.name = name;
	this.suit = suit;
}

function deck() {
	this.names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	this.suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
	var cards = [];
	for (var s = 0; s < this.suits.length; s++) {
		for(var n = 0; n < this.names.length; n++) {
			cards.push(new card(n+1, this.names[n], this.suits[s]));
		}
	}

	return cards;
}

function createDeck() {
	myDeck = deck();
	for(i = 0; i < myDeck.length; i++) {
		if(myDeck[i].name === 'J') {
			myDeck[i].value = 10;
		}
		else if (myDeck[i].name === 'Q') {
			myDeck[i].value = 10;
		}
		else if (myDeck[i].name === 'K') {
			myDeck[i].value = 10;
		}
	}
}

function playerTotal() {
	playerHandTotalArr = 0;
	for(i=0; i < playerHandArr.length; i++) {
		playerHandTotalArr += playerHandArr[i].value;
	}
}

function newGame() {
	clearCards();
	playerHandArr.length = 0;
	compHandArr.length = 0;
	staySwitch = 0;
	createDeck();
	playerHit();
	playerHit();
	compHit();
	compHit();
	playerTotal();
	compTotal();
	compDisplayTotal();
	displayCards();
	displayTotals();
}

function displayTotals() {
	getPlayerTotal.innerHTML = "Player Total: " + playerHandTotalArr;
	if (staySwitch == 0) {
		getCompTotal.innerHTML = "Computer (Visible) Total: " + compDisplayHandTotalArr;
	}
	else if (staySwitch == 1) {
		getCompTotal.innerHTML = "Computer (Visible) Total: " + compHandTotalArr;
	}
}


function displayCards() {
	for(i=0; i < playerHandArr.length; i++) {
		playerCardDivs[i].innerHTML = playerHandArr[i].name + " " + playerHandArr[i].suit;
	}
	if (staySwitch == 0) {
		compCardDivs[0].innerHTML = "????????";
		for(i=1; i < compHandArr.length; i++) {
			compCardDivs[i].innerHTML = compHandArr[i].name + " " + compHandArr[i].suit;
		}	
	}
	else {
		for(i=0; i < compHandArr.length; i++) {
			compCardDivs[i].innerHTML = compHandArr[i].name + " " + compHandArr[i].suit;
		}
	}
}

function clearCards() {
	for(i=0; i < playerHandArr.length; i++) {
		playerCardDivs[i].innerHTML =  " ";
	}
	for(i=1; i < compHandArr.length; i++) {
		compCardDivs[i].innerHTML =  " " ;
	}	
}

function randCard() {
	cardNum = Math.floor(Math.random() * myDeck.length);
	return myDeck[cardNum];
}

function playerHit() {
	var newCard = randCard();
	playerHandArr.push(newCard);
	displayCards();
	playerTotal();
	displayTotals();
	myDeck.splice(cardNum, 1);
	if (playerHandTotalArr >= 21 || playerHandArr.length == 5) {
		gameLogic();
	}
}

function findAces() {
	for(i = 0; i < playerHandArr.length; i++) {
		if (playerHandArr[i].value == 1 || playerHandArr[i].value == 11) {

		}
	} 
}

function compLogic() {
	while (compHandTotalArr < 17) {
		compHit();
	}
	compStay();
	displayTotals();
}

function compStay() {
	gameLogic();
}

function compHit() {
	var newCard = randCard();
	compHandArr.push(newCard);
	displayCards();
	playerTotal();
	compTotal();
	displayTotals();
	myDeck.splice(cardNum, 1);
}

function compTotal() {
	compHandTotalArr = 0;
	for(i=0; i < compHandArr.length; i++) {
		compHandTotalArr += compHandArr[i].value;
	}
}

function compDisplayTotal() {
	compDisplayHandTotalArr = 0;
	
	for(i=1; i < compHandArr.length; i++) {
		compDisplayHandTotalArr += compHandArr[i].value;
	}
}

//fill this with a dialog box that asks if you wanna play another game
function playAnotherGame() {
	newGame();
}

function gameLogic() {
	if (playerHandTotalArr > 21) {
		window.alert("You Suck");
		displayCards();
		displayTotals();
	}

	else if (playerHandArr.length == 5 && playerHandTotalArr < 21) {
		window.alert("you win");
		displayCards();
		displayTotals();
	}

	else if (playerHandTotalArr < compHandTotalArr && compHandTotalArr <= 21 && staySwitch > 0) {
		window.alert("you lose: rise of the machines");
		displayCards();
		displayTotals();
	}

	else if (compHandTotalArr > 21) {
		window.alert("the computer has busted, you win");
		displayCards();
		displayTotals();
	}

	else if (playerHandTotalArr == 21 && compHandTotalArr != 21 && staySwitch > 0) {
		window.alert("you win!");
		displayCards();
		displayTotals();
		//bug in this one
	}
	
	else if (playerHandTotalArr == 21 && compHandTotalArr == 21) {
		window.alert("tie goes to dealer, you lose!");
		displayCards();
		displayTotals();
	}

	else if (playerHandTotalArr > compHandTotalArr && staySwitch > 0) {
		window.alert("you win!");
		displayCards();
		displayTotals();
	}

	else if (compHandArr.length == 5 && compHandTotalArr <= 21 && staySwitch > 0) {
		window.alert("computer wins");
		displayCards();
		displayTotals();
	}

	else if (compHandTotalArr == playerHandTotalArr) {
		window.alert("it's a tie :(");
		displayCards();
		displayTotals();
	}
}

//use case if to make the cards to symbol for suit
