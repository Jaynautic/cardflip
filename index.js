var firstCard;

var numOfCards = 0;

var cardValues = [];

const cardList = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];

const cardSize = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

let dealerHand = Math.floor(Math.random() * 6) + 15;

document.getElementById("result").innerHTML = `The dealer's hand is ${dealerHand}.`;

for (let i = 0; i < 2; i++) {
  let ranNum = Math.floor(Math.random() * cardList.length);
  const cardId = cardList[ranNum];
  cardValues.push(cardSize[ranNum]);
  let newCard = `<div class="card-inner" id="cardinner${cardId}-${i}" onclick="resultCard('${cardId}','${i}')">
                  <div class="card-front"></div>
                  <div class="card-back" id="cardface${cardId}"></div>
                </div>`;
  document.getElementById(`card${i+1}`).innerHTML = newCard;
  numOfCards++;
}

function resultCard(data, cardNum) {
  if(firstCard == undefined) {
    // document.getElementById("result").innerHTML = `You chose ${data}`;
    // document.getElementById("heading").innerHTML = `Pick another card.`;
    document.getElementById(`cardinner${data}-${cardNum}`).style.transform = "rotateY(180deg)";

    firstCard = data;

  } else {
    // document.getElementById("heading").innerHTML = `Your cards are ${firstCard} and ${data}.`;
    // document.getElementById("result").innerHTML = `Your pair ID is ${firstCard + data}.`;
    document.getElementById(`cardinner${data}-${cardNum}`).style.transform = "rotateY(180deg)";
  }
}

function hitFunction() {

  let ranNum = Math.floor(Math.random() * cardList.length);
  const cardId = cardList[ranNum];
  cardValues.push(cardSize[ranNum]);
  numOfCards++;

  let newCard = `<div class="card-inner" id="cardinner${cardId}-${numOfCards}" onclick="resultCard('${cardId}','${numOfCards}')">
                  <div class="card-front"></div>
                  <div class="card-back" id="cardface${cardId}"></div>
                </div>`;

  let cardContainer = document.getElementById("cardContainer");

  var newCardDiv = document.createElement('div');
  newCardDiv.id = `card${numOfCards}`;
  newCardDiv.setAttribute('class', 'card');

  cardContainer.appendChild(newCardDiv);

  document.getElementById(`card${numOfCards}`).innerHTML = newCard;

  console.log(cardValues);
}

function standFunction() {
  let cardSum = cardValues.reduce((a, b) => a + b, 0);

  for (let i = 0; i < cardValues.length; i++) {
    if (cardValues[i] == 11 && cardSum > 21) {
      cardValues[i] = 1;
    }
  }
  cardSum = cardValues.reduce((a, b) => a + b, 0);

  if (cardSum <= 21 && cardSum > dealerHand) {
    document.getElementById("result").innerHTML = `Your hand is ${cardSum}. You won!`;
  } else {
    document.getElementById("result").innerHTML = `You hand is ${cardSum}. You lost!`;
  }
}
