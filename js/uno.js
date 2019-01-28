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
var playerName = "";
var mm,se;
var timerTag;
var selectedCard;
var noChoise=1;
var playerUNO = 0;
var playerPoints = 0;
var botPoints = 0;
var botBg, playerBg;
var modal
mm=se=0;

function init() {
	thrownCard = document.getElementById("thrownCard");
	botBg = document.getElementById("bot-bg");
	playerBg = document.getElementById("player-bg");
	playerBg.style.backgroundImage= "radial-gradient(white, transparent)";
	declareCards();
	modal = document.getElementById('myModal');
 	modal.style.display = "none";
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
	for(i=0; i<=cards.length-1;i++) {
		if (cards[0][1]!="s" && cards[0][1]!="w" && cards[0][1]!="r" && cards[0][1]!="+2" && cards[0][1]!="+4" ){
		console.log(cards[0][1])
		thrownDeck[0]=cards[0];
		cards.splice(0,1);
		break;
		} else {
			cards = shuffle(cards);
		}
	}
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
	thrownCard.innerHTML+='<div class="thrown-card" style="background-color: '+thrownDeck[0][0]+'";><div class="known-card-top"><span>'+thrownDeck[0][1]+'</span></div><div class="oval-known"><p class="card-mid-text" style="color: '+ thrownDeck[0][0] +'";>'+thrownDeck[0][1]+'</p></div><div class="known-card-bottom"><span>'+thrownDeck[0][1]+'</span></div></div>';
	cardConditions(thrownDeck[0][1]);
	if(playerCards.length==1 && playerUNO==0) {
		console.log("Player didnt press UNO")
		addACard();
		addACard();
	}
	console.log(playerUNO + " UNO NUMBER")
	playerUNO=0;

	if(botCards.length==1) {
		console.log("UNO!!")
	}
	if (playerCards.length==0) {
		alert("UNO!. "+playerName+ " has won the game!!");
		document.location.reload(true)
	}
	if (botCards.length==0) {
		alert("UNO!. Bot has won the game!!");
		document.location.reload(true)
	}
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

	if (turn==1) {
		playerCards.splice(0,0, cards[0]);
		cards.splice(0,1);
		//add card for bot.
		var color = "'"+playerCards[0][0]+"'";
		var value = "'"+playerCards[0][1]+"'";
		knownDeck.innerHTML+='<div class="known-card" onclick="fnReturnId('+color+', '+value+')" style="background-color: '+ playerCards[0][0]+'";><div class="known-card-top" ><span>'+ playerCards[0][1] +'</span></div><div class="oval-known"><p class="card-mid-text" style="color: '+ playerCards[0][0] +'";>'+  playerCards[0][1]  +'</p></div><div class="known-card-bottom"><span>'+ playerCards[0][1] +'</span></div></div>';	
	} else if (turn==0){
		botCards.splice(0,0, cards[0]);
		cards.splice(0,1);
	}
}

function addCard() {
	if(turn==1 && noChoise == 1){
		addACard();
		noChoise = 0;

		if (thrownDeck[0][0]==playerCards[0][0] || thrownDeck[0][1]==playerCards[0][1]) {
			noChoise = 0;
		} else {
			changeTurn();
			noChoise = 0;
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
}

function fnReturnId(color, val) {
	if (turn == 1) {
		if (thrownDeck[0][0]==color || thrownDeck[0][1]==val) {
		for(i=0; i<playerCards.length;i++) {
			if (playerCards[i][0]==color && playerCards[i][1]==val){
				thrownDeck[0]=playerCards[i];
				playerCards.splice(i,1);
				knownDeck.innerHTML = "";
				thrownDeck.innerHTML = "";
				startKnownCards();
				console.log("card thrown from normal retfn")
				throwCards();
				changeTurn();
				timer = setInterval(timer, 1000);
				break;
			}
		}
	  	} else if (color == "black") {
	  		for(i=0; i<playerCards.length;i++) {
	  			if (playerCards[i][0]==color && playerCards[i][1]==val){
	  				thrownDeck[0]=playerCards[i];
	  				playerCards.splice(i,1);
	  				knownDeck.innerHTML = "";
	  				thrownDeck.innerHTML = "";
	  				startKnownCards();
	  				console.log("card thrown from normal ret blackfn")
	  				throwCards();
	  				timer = setInterval(timer, 1000);
	  				break;
	  			}
	  		}
	  	}
	  	console.log("turn is being changed by hooman")
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
			console.log("card thrown from bot first")
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
		console.log("card thrown from bot second")
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
	if (playerPoints<botPoints){
		alert("Time Over. "+playerName+" has won the game!! "+playerName+ " "+playerPoints+" and Bot is "+ botPoints);
	}else if(botPoints<playerPoints){
		alert("Time Over. Bot has won the game!!"+playerName+ " "+playerPoints+" and Bot is "+ botPoints);
	}else {
		alert("This game is a tie!! "+playerName+ " "+playerPoints+" and Bot is "+ botPoints);
	} 
	document.location.reload(true)
}

function changeTurn() {
	turn==1 ? turn=0 : turn=1;
	noChoise = 1;
	if (turn == 0) {
		setTimeout(playBot, 2000);
		playerBg.style.backgroundImage= "none";
		botBg.style.backgroundImage= "radial-gradient(white, transparent)";
		document.getElementById("tableCards").style.pointerEvents="none";
	} else {
		botBg.style.backgroundImage= "none";
		playerBg.style.backgroundImage= "radial-gradient(white, transparent)";
		document.getElementById("tableCards").style.pointerEvents="auto";
	}
}

function calcPoints() {
	for(i=0; i<playerCards.length; i++) {
		switch(playerCards[i][1]) {
			case "+2" :
			case "r" :
			case "s" :
				playerPoints+=parseInt("20");
				break;
			case "w" :
				playerPoints+=parseInt("50");
				break;
			case "+4" :
				playerPoints+=parseInt("40");
				break;
			default :
				playerPoints+=parseInt(playerCards[i][1]);
				break;
		}
	}
	for(i=0; i<botCards.length; i++) {
	  	switch(botCards[i][1]) {
			case "+2" :
			case "r" :
			case "s" :
				botPoints+=parseInt("20");
				break;
			case "w" :
				botPoints+=parseInt("50");
				break;
			case "+4" :
				botPoints+=parseInt("40");
				break;
			default :
				botPoints+=parseInt(botCards[i][1]);
				break;
		}
	}
	console.log(playerPoints, botPoints)
}

function cardConditions(s) {
	console.log("ssssss" + s)
	if (s == "s" || s == "r") {
		turn==1 ? turn=0 : turn=1;
		console.log("skipped "+ turn)
	} else if (s == "w") {
		console.log("added w cards to "+ turn)
		colorChange();
	} else if (s == "+2") {
		turn==1 ? turn=0 : turn=1;
		console.log("added 2 cards to "+ turn)
		addACard();
		addACard();
	} else if (s == "+4") {
		turn==1 ? turn=0 : turn=1;
		console.log("added 4 cards to "+ turn)
		addACard();
		addACard();
		addACard();
		addACard();
		turn==1 ? turn=0 : turn=1;
		colorChange();
		turn==1 ? turn=0 : turn=1;
	}
}

function colorChange() {
	var x = Math.floor((Math.random() * 4) + 0);
	var colors = ["red", "blue", "green", "yellow"];
	if (turn==1) {
 		modal.style.display = "block";
	} else if (turn==0) {
		thrownDeck[0][0] = colors[x];
		thrownCard.innerHTML+='<div class="thrown-card" style="background-color: '+thrownDeck[0][0]+'";><div class="known-card-top"><span>'+thrownDeck[0][1]+'</span></div><div class="oval-known"><p class="card-mid-text" style="color: '+ thrownDeck[0][0] +'";>'+thrownDeck[0][1]+'</p></div><div class="known-card-bottom"><span>'+thrownDeck[0][1]+'</span></div></div>';
		console.log("card thrown from bot random")
	}
}

function red() {
	thrownDeck[0][0] = "red";
		console.log("card thrown from red")
 	modal.style.display = "none";
 	thrownDeck[0][0] = "red";
	thrownCard.innerHTML+='<div class="thrown-card" style="background-color: '+thrownDeck[0][0]+'";><div class="known-card-top"><span>'+thrownDeck[0][1]+'</span></div><div class="oval-known"><p class="card-mid-text" style="color: '+ thrownDeck[0][0] +'";>'+thrownDeck[0][1]+'</p></div><div class="known-card-bottom"><span>'+thrownDeck[0][1]+'</span></div></div>';
	changeTurn();
}

function blue() {
	thrownDeck[0][0] = "blue";
		console.log("card thrown from blue")
 	modal.style.display = "none"; 	
 	thrownDeck[0][0] = "blue";
	thrownCard.innerHTML+='<div class="thrown-card" style="background-color: '+thrownDeck[0][0]+'";><div class="known-card-top"><span>'+thrownDeck[0][1]+'</span></div><div class="oval-known"><p class="card-mid-text" style="color: '+ thrownDeck[0][0] +'";>'+thrownDeck[0][1]+'</p></div><div class="known-card-bottom"><span>'+thrownDeck[0][1]+'</span></div></div>';
	changeTurn();
}

function green() {
	thrownDeck[0][0] = "green";
		console.log("card thrown from green")
 	modal.style.display = "none";
 	thrownDeck[0][0] = "green";
 	thrownCard.innerHTML+='<div class="thrown-card" style="background-color: '+thrownDeck[0][0]+'";><div class="known-card-top"><span>'+thrownDeck[0][1]+'</span></div><div class="oval-known"><p class="card-mid-text" style="color: '+ thrownDeck[0][0] +'";>'+thrownDeck[0][1]+'</p></div><div class="known-card-bottom"><span>'+thrownDeck[0][1]+'</span></div></div>';
 	changeTurn();
}

function yellow() {
	thrownDeck[0][0] = "yellow";
		console.log("card thrown from yellow")
 	modal.style.display = "none";
 	thrownDeck[0][0] = "yellow";
	thrownCard.innerHTML+='<div class="thrown-card" style="background-color: '+thrownDeck[0][0]+'";><div class="known-card-top"><span>'+thrownDeck[0][1]+'</span></div><div class="oval-known"><p class="card-mid-text" style="color: '+ thrownDeck[0][0] +'";>'+thrownDeck[0][1]+'</p></div><div class="known-card-bottom"><span>'+thrownDeck[0][1]+'</span></div></div>';
	changeTurn();
}

function skipTurn() {
	if (turn==1) {
		changeTurn();
	}
}

function starterSubmit() {
	var starter = document.getElementById("starter");
	starter.style.display = "none";
	playerName = document.getElementById("userName").value;
}

init();
