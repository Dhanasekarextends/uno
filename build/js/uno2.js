var arrayCount = 0;
var turn = 1;
var cardColors = ["red", "blue", "green", "yellow"];
var cardNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9",  "s", "r", "+2"];
var cards = [];
var playerCards = [];
var botCards = [];
var thrownDeck = [];
var knownDeck;
var unknownDeck;
var thrownCard;
var timer;
var mm,se;
var timerTag;
var selectedCard;
var noChoise=1;
var playerUNO = 0;
var playerPoints = 0;
var botPoints = 0;
mm=se=0;

function init() {
	declareCards();
}

function declareCards() {
	arrayCount = 0;
	cards = [];
	for (i = 0; i<cardColors.length;i++) {
		for(j = 0; j<cardNumbers.length;j++){
			cards[arrayCount] = [cardColors[i], cardNumbers[j]];
			arrayCount++;
		}
	}
	cards[cards.length] = ["black", "w"];
	cards[cards.length] = ["black", "+4"];
	cards = cards.concat(cards);
	cards = cards.concat(cards);
	cards = cards.concat(cards);
	cards = shuffle(cards);

	for (i=0; i<7; i++) {
		playerCards[i] = cards[i];
	}
	cards.splice(0,7);
	for (i=0; i<7; i++) {
		botCards[i] = cards[i];
	}
	cards.splice(0,7);

	thrownDeck[0]=cards[0];
	cards.splice(0,1);

	startKnownCards();
	startUnknownCards();
	throwCards();
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function startKnownCards() {
	var i;
	var color;
	var value;
	knownDeck = document.getElementById("knownDeck");
	for(i=0; i<playerCards.length;i++){
		color = "'"+playerCards[i][0]+"'";
		value = "'"+playerCards[i][1]+"'";
		knownDeck.innerHTML+='<div class="known-card" onclick="fnReturnId('+color+', '+value+')" style="background-color: '+ playerCards[i][0] +'";><div class="known-card-top" ><span>'+ playerCards[i][1] +'</span></div><div class="oval-known"><p class="card-mid-text" style="color: '+ playerCards[i][0] +'";>'+ playerCards[i][1] +'</p></div><div class="known-card-bottom"><span>'+ playerCards[i][1] +'</span></div></div>';
	}
}

function startUnknownCards() {
	unKnownDeck = document.getElementById("unKnownDeck");
	for(i=0; i<botCards.length;i++){
		unKnownDeck.innerHTML+='<div class="unknown-card"><div class="oval-unknown"><p class="uno-text">UNO</p></div></div>';
	}
}

function throwCards() {
	thrownCard = document.getElementById("thrownCard");
	thrownCard.innerHTML+='<div class="thrown-card" style="background-color: '+thrownDeck[0][0]+'";><div class="known-card-top"><span>'+thrownDeck[0][1]+'</span></div><div class="oval-known"><p class="card-mid-text" style="color: '+ thrownDeck[0][0] +'";>'+thrownDeck[0][1]+'</p></div><div class="known-card-bottom"><span>'+thrownDeck[0][1]+'</span></div></div>';

	if(playerCards.length==1) {
		console.log("Player didnt press UNO")
		addACard();
		addACard();
	}

	if(botCards.length==1) {
		console.log("UNO!!")
	}
	playerUNO=0;
}

function unoButton() {
	if(turn==1){
		if (playerCards.length==2){
			playerUNO=1;
			console.log("UNO Button pressed")
		} else {
			alert("You cannot press UNO now");
		}
	} else {
		alert ("This is not your turn")
	}
}

function addACard() {
	playerCards.splice(0,0, cards[0]);
	cards.splice(0,1);
	var color = "'"+playerCards[0][0]+"'";
	var value = "'"+playerCards[0][1]+"'";
	knownDeck.innerHTML+='<div class="known-card" onclick="fnReturnId('+color+', '+value+')" style="background-color: '+ playerCards[0][0]+'";><div class="known-card-top" ><span>'+ playerCards[0][1] +'</span></div><div class="oval-known"><p class="card-mid-text" style="color: '+ playerCards[0][0] +'";>'+  playerCards[0][1]  +'</p></div><div class="known-card-bottom"><span>'+ playerCards[0][1] +'</span></div></div>';	
}

function addCard() {
	if(turn==1 && noChoise == 1){
		addACard();
		noChoise = 0;

		if (thrownDeck[0][0]==playerCards[0][0] || thrownDeck[0][1]==playerCards[0][1]) {
			noChoise = 0;
		} else {
			changeTurn();
		}
	} else if(turn==0){
		unKnownDeck.innerHTML+='<div class="unknown-card"><div class="oval-unknown"><p class="uno-text">UNO</p></div></div>';
		botCards.splice(0,0,cards[0]);
		cards.splice(0,1);
		console.log(botCards.length)
	}

	if (cards.length==0) {
		document.getElementById("tableCards").style.visibility = "hidden";
		endGame();
	}

	if (playerCards.length==0) {
		alert("UNO!. Hooman has won the game!!");
	}
	if (botCards.length==0) {
		alert("UNO!. Bot has won the game!!");
	}
}

function fnReturnId(color, val) {
	if (thrownDeck[0][0]==color || thrownDeck[0][1]==val) {
		for(i=0; i<playerCards.length;i++) {
			if (playerCards[i][0]==color && playerCards[i][1]==val){
				thrownDeck[0]=playerCards[i];
				playerCards.splice(i,1);
				knownDeck.innerHTML = "";
				thrownDeck.innerHTML = "";
				startKnownCards();
				throwCards();
				timer = setInterval(timer, 1000);
				break;
			}
		}
		console.log("turn is being changed by hooman")
		changeTurn();
	} else { 

	}
}

function playBot() {
	for(i=0; i<botCards.length;i++) {
		if (botCards[i][0]==thrownDeck[0][0] || botCards[i][1]==thrownDeck[0][1]){
			thrownDeck[0]=botCards[i];
			botCards.splice(i,1);
			unKnownDeck.innerHTML = "";
			thrownDeck.innerHTML = "";
			console.log("Bot is playing")
			startUnknownCards();
			throwCards();
			console.log("turn is being changed bot first play")
			changeTurn();
			return;
		}
	}
	addCard();
	console.log("Bot card added");
	if (botCards[0][0]==thrownDeck[0][0] || botCards[0][1]==thrownDeck[0][1]){
	    thrownDeck[0]=botCards[i];
	    botCards.splice(i,1);
	    unKnownDeck.innerHTML = "";
	    thrownDeck.innerHTML = "";
	    console.log("Bot picked a card and playing")
	    startUnknownCards();
	    throwCards();
		console.log("turn is being changed bot playing")
		changeTurn();
	} else {	
	   	console.log("Bot picked a card but not playing")
	  	console.log("turn is being changed bot not playing")
	  	changeTurn();
	}
}

function timer() {
	se++;
	if (se == 60) {
		se=0;
		mm+=1;

		if(mm==2) {
			clearInterval(timer);
			endGame();
		}
	}
	timerTag = document.getElementById("timer");
	timerTag.innerHTML = (("0" + mm).slice(-2) + " : " + ("0" + se).slice(-2));
}

function endGame() {
	calcPoints();
	if (playerPoints>botPoints){
		alert("Time Over. Hooman has won the game!!<br>Player "+playerPoints+" and Bot is "+ botPoints);
	}else if(botPoints>playerPoints){
		alert("Time Over. Bot has won the game!!<br>Player "+playerPoints+" and Bot is "+ botPoints);
	}else {
		alert("This game is a tie")
	} 
	document.location.reload(true)
}

function changeTurn() {
	turn==1 ? turn=0 : turn=1;
	noChoise = 1;
	if (turn == 0) {
		setTimeout(playBot(), 2000);
	}
}

function calcPoints() {
	for(i=0; i<playerCards.length; i++) {
		if(playerCards[0][1]=="+2" || playerCards[0][1]=="r" || playerCards[0][1]=="s") {
			playerPoints+=20;
		}if(playerCards[0][1]=="w") {
			playerPoints+=50;
		}if(playerCards[0][1]=="+4") {
			playerPoints+=40;
		}else {
		playerPoints+=playerCards[i][1];
		}
	}
	for(i=0; i<botCards.length; i++) {
	  	if(botCards[0][1]=="+2" || botCards[0][1]=="r" || botCards[0][1]=="s") {
	  		botPoints+=20;
	  	}if(botCards[0][1]=="w") {
	  		botPoints+=50;
	  	}if(botCards[0][1]=="+4") {
	  		botPoints+=40;
	  	}else {
	  	botPoints+=botCards[i][1];
	  	}
	}
	console.log(playerPoints, botPoints)
}

function cardConditions(var) {

	if (var == "s" && var == "r") {
		turn==1 ? turn=0 : turn=1;
	}

	if (var == w) {
		turn==1 ? turn=0 : turn=1;
		addCard();
		addCard();
		addCard();
		addCard();
	}

	if (var == "+2") {
		turn==1 ? turn=0 : turn=1;
		addCard();
		addCard();
		turn==1 ? turn=0 : turn=1;
	}

	if (var == "+4") {
		turn==1 ? turn=0 : turn=1;
		addCard();
		addCard();
		addCard();
		addCard();
	}
}

init();

