var firstCard;

var numOfCards = 0;

var cardHand = [];

var cardValues = [];

const cardList = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];

const cardSize = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

var dealerHand = 0;

var dealerIndex = 0;

var dealerValues = [];



for (let i = 0; i < 2; i++) {
  let ranNum = Math.floor(Math.random() * cardList.length);
  const cardId = cardList[ranNum];
  const cardValue = cardSize[ranNum];
  dealerValues.push(cardId);

  let newCard = `<div class="dealer-card-inner" id="dealerCardinner${cardId}-${dealerIndex}">
                  <div class="card-front"></div>
                  <div class="dealer-card-back" id="cardface${cardId}"></div>
                </div>`;

  let dealerContainer = document.getElementById("dealerContainer");

  var newDealerCard = document.createElement('div');
  newDealerCard.id = `dealerCard${dealerIndex}`;
  newDealerCard.setAttribute('class', 'dealer-card');

  dealerContainer.appendChild(newDealerCard);

  document.getElementById(`dealerCard${dealerIndex}`).innerHTML = newCard;

  dealerHand = dealerHand + cardValue;
  dealerIndex++

  if (dealerIndex == 1) {
    document.getElementById(`dealerCardinner${cardId}-${dealerIndex - 1}`).style.transform = "rotateY(180deg)";
    document.getElementById("heading").innerHTML = `The dealer's hand starts with ${cardValue}.`;
  }
}



for (let i = 0; i < 2; i++) {
  let ranNum = Math.floor(Math.random() * cardList.length);
  const cardId = cardList[ranNum];
  cardValues.push(cardSize[ranNum]);
  cardHand.push(cardId);
  let newCard = `<div class="card-inner" id="cardinner${cardId}-${i+1}">
                  <div class="card-front"></div>
                  <div class="card-back" id="cardface${cardId}"></div>
                </div>`;
  document.getElementById(`card${i+1}`).innerHTML = newCard;
  numOfCards++;
  setTimeout(function(){
    resultCard(cardId, i+1);
  }, 200)
}



function resultCard(data, cardNum) {
  
  console.log(`cardinner${data}-${cardNum}`);

  document.getElementById(`cardinner${data}-${cardNum}`).style.transform = "rotateY(180deg)";

}

function resultDealerCard(data, cardNum) {

  document.getElementById(`dealerCardinner${data}-${cardNum}`).style.transform = "rotateY(180deg)";

}



function hitFunction() {

  let ranNum = Math.floor(Math.random() * cardList.length);
  const cardId = cardList[ranNum];
  cardValues.push(cardSize[ranNum]);
  cardHand.push(cardId);
  numOfCards++;

  let newCard = `<div class="card-inner" id="cardinner${cardId}-${numOfCards}">
                  <div class="card-front"></div>
                  <div class="card-back" id="cardface${cardId}"></div>
                </div>`;

  let cardContainer = document.getElementById("cardContainer");

  var newCardDiv = document.createElement('div');
  newCardDiv.id = `card${numOfCards}`;
  newCardDiv.setAttribute('class', 'card');

  cardContainer.appendChild(newCardDiv);

  document.getElementById(`card${numOfCards}`).innerHTML = newCard;

  setTimeout(function(){
    resultCard(cardId, numOfCards);
  }, 200)

  if (numOfCards == 5) {
    standFunction();
  }
}



function standFunction() {

  while (dealerHand < 16) {
    let ranNum = Math.floor(Math.random() * cardList.length);
    const cardId = cardList[ranNum];
    const cardValue = cardSize[ranNum];
    dealerValues.push(cardId);
  
    let newCard = `<div class="dealer-card-inner" id="dealerCardinner${cardId}-${dealerIndex}">
                    <div class="card-front"></div>
                    <div class="dealer-card-back" id="cardface${cardId}"></div>
                  </div>`;
  
    let dealerContainer = document.getElementById("dealerContainer");
  
    var newDealerCard = document.createElement('div');
    newDealerCard.id = `dealerCard${dealerIndex}`;
    newDealerCard.setAttribute('class', 'dealer-card');
  
    dealerContainer.appendChild(newDealerCard);
  
    document.getElementById(`dealerCard${dealerIndex}`).innerHTML = newCard;
  
    dealerHand = dealerHand + cardValue;
    dealerIndex++

    document.getElementById(`dealerCardinner${cardId}-${dealerIndex - 1}`).style.transform = "rotateY(0deg)";

  }

  let cardSum = cardValues.reduce((a, b) => a + b, 0);

  for (let i = 0; i < cardValues.length; i++) {
    if (cardValues[i] == 11 && cardSum > 21) {
      cardValues[i] = 1;
    }
  }
  cardSum = cardValues.reduce((a, b) => a + b, 0);

  if ((cardSum <= 21 && cardSum > dealerHand) || (cardSum <= 21 && dealerHand > 21)) {
    document.getElementById("result").innerHTML = `Your hand is ${cardSum}. You won!`;
  } else {
    document.getElementById("result").innerHTML = `You hand is ${cardSum}. You lost!`;
  }

  setTimeout(function(){
    for (let i = 0; i < dealerValues.length; i++) {
      document.getElementById(`dealerCardinner${dealerValues[i]}-${i}`).style.transform = "rotateY(180deg)";
    }
  }, 100)

  setTimeout(function(){
    for (let i = 1; i < (cardHand.length+1); i++) {
      let dataCard = cardHand[i-1];
      let numberOfCards = i;
      resultCard(dataCard, numberOfCards);
    }
  }, 100)

  document.getElementById("heading").innerHTML = `The dealer's hand is ${dealerHand}.`;
}
