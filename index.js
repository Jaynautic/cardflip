var firstCard;

const cardList = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k']

for (let i = 0; i < 3; i++) {
  let ranNum = Math.floor(Math.random() * cardList.length);
  const cardId = cardList[ranNum];
  let newCard = `<div class="card-inner" id="cardinner${cardId}-${i}" onclick="resultCard('${cardId}','${i}')">
                  <div class="card-front"></div>
                  <div class="card-back" id="cardface${cardId}"></div>
                </div>`;
  document.getElementById(`card${i+1}`).innerHTML = newCard;
}

function resultCard(data, cardNum) {
  if(firstCard == undefined) {
    document.getElementById("result").innerHTML = `You chose ${data}`;
    document.getElementById("heading").innerHTML = `Pick another card.`;
    document.getElementById(`cardinner${data}-${cardNum}`).style.transform = "rotateY(180deg)";

    firstCard = data;

  } else {
    document.getElementById("heading").innerHTML = `Your cards are ${firstCard} and ${data}.`;
    document.getElementById("result").innerHTML = `Your pair ID is ${firstCard + data}.`;
    document.getElementById(`cardinner${data}-${cardNum}`).style.transform = "rotateY(180deg)";
  }
}