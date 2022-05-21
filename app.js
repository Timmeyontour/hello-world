const gridDisplay = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result');
const headerDisplay = document.querySelector('#typewriter');
let cardsChosen = []; //Array of the name properties of cards 
let cardsChosenIds = []; //Array of the id properties of img 
let cardsFront = []; //Array of the cards' front img
let cardsOrder = []; //Array of the cards' flex order
const cardsFound = []; //Array of matches
// an array of objects for all memory cards

let testVar = false;
let memory = document.querySelector('#memory');
let counter = 0;

let beginTime = 1000;
let endTime = 2000;

let bkSound = document.querySelector('#backgroundsound');
let correctSound = document.querySelector('#correct');
let wrongSound = document.querySelector('#wrong');

const cardArray = [
    //get img front 2
    {
        name: '1',
        img: 'img/1_1.png',
        imgFront: 'img/1_1f.png',
        imgEnd: 'img/1_1e.png',
        order: 1
    },
    {
        name: '2',
        img: 'img/1_2.png',
        imgFront: 'img/1_2f.png',
        imgEnd: 'img/1_2e.png',
        order: 2
    },
    {
        name: '3',
        img: 'img/1_3.png',
        imgFront: 'img/1_3f.png',
        imgEnd: 'img/1_3e.png',
        order: 3
    },
    {
        name: '4',
        img: 'img/1_4.png',
        imgFront: 'img/1_4f.png',
        imgEnd: 'img/1_4e.png',
        order: 4
    },
    {
        name: '5',
        img: 'img/2_1.png',
        imgFront: 'img/2_1f.png',
        imgEnd: 'img/2_1e.png',
        order: 5
    },
    {
        name: '6',
        img: 'img/2_2.png',
        imgFront: 'img/2_2f.png',
        imgEnd: 'img/2_2e.png',
        order: 6
    },
    {
        name: '7',
        img: 'img/2_3.png',
        imgFront: 'img/2_3f.png',
        imgEnd: 'img/2_3e.png',
        order: 7
    },
    {
        name: '8',
        img: 'img/2_4.png',
        imgFront: 'img/2_4f.png',
        imgEnd: 'img/2_4e.png',
        order: 8
    },
    {   name: '1',
        img: 'img/1_1.png',
        imgFront: 'img/3_1f.png',
        imgEnd: 'img/3_1e.png',
        order: 9
    },
    {
        name: '2',
        img: 'img/1_2.png',
        imgFront: 'img/3_2f.png',
        imgEnd: 'img/3_2e.png',
        order: 10
    },
    {
        name: '3',
        img: 'img/1_3.png',
        imgFront: 'img/3_3f.png',
        imgEnd: 'img/3_3e.png',
        order: 11
    },
    {
        name: '4',
        img: 'img/1_4.png',
        imgFront: 'img/3_4f.png',
        imgEnd: 'img/3_4e.png',
        order: 12
    },
    {
        name: '5',
        img: 'img/2_1.png',
        imgFront: 'img/4_1f.png',
        imgEnd: 'img/4_1e.png',
        order: 13
    },
    {
        name: '6',
        img: 'img/2_2.png',
        imgFront: 'img/4_2f.png',
        imgEnd: 'img/4_2e.png',
        order: 14
    },
    {
        name: '7',
        img: 'img/2_3.png',
        imgFront: 'img/4_3f.png',
        imgEnd: 'img/4_3e.png',
        order: 15
    },
    {
        name: '8',
        img: 'img/2_4.png',
        imgFront: 'img/4_4f.png',
        imgEnd: 'img/4_4e.png',
        order: 16
    }
]

//creating the randomisation of array items

//cardArray.sort(() => 0.5 - Math.random());

function fisherYatesShuffle(arr){
    for(var i =arr.length-1 ; i>0 ;i--){
        var j = Math.floor( Math.random() * (i + 1) ); //random index
        [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
    }
}

fisherYatesShuffle(cardArray);

//console.log(cardArray);

//create html img per cardArray-object and append it to the grid element
function createBoard () {
    for(let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img'); //create html img
        card.setAttribute('src', cardArray[i].imgFront); //create front imgs
        card.setAttribute('data-id', i);
        //card.setAttribute('order', cardArray[i].order); ERST SPÄTER
		card.setAttribute('style', `order: ${i+1};`);
        //console.log(card, i);
        card.addEventListener('click', flipCard) //adding an event listener, not calling the function
        card.classList.add('grid-item');
        gridDisplay.appendChild(card);//append img to grid
    }   
}



//checking whether items match
function checkMatch() {
    const cards = document.querySelectorAll('#grid img'); //all img in the div with the id of grid
    const optionOneId = cardsChosenIds[0];
    const optionTwoId = cardsChosenIds[1];
    //console.log(cards);
    //console.log('checkMatch');

    if (cardsChosen[0] === cardsChosen[1] && optionOneId != optionTwoId) {
        correctSound.play();
        cards[optionOneId].setAttribute('src', cardArray[optionOneId].imgFront); // //flip back to front img
        cards[optionTwoId].setAttribute('src', cardArray[optionTwoId].imgFront); //flip back to front img
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        /*cards[optionOneId].setAttribute('style', 'order: -1');
        switch statement - if "name", then order "x". 
        //have one round of tiles around for a border.
        */
		//move imgs to correct order
		cards[optionOneId].setAttribute('style', `order: ${cardArray[optionOneId].order};`);
		cards[optionTwoId].setAttribute('style', `order: ${cardArray[optionTwoId].order};`);
        cards[optionOneId].classList.add('found');
		cards[optionTwoId].classList.add('found');
		//TODO: make visible that cards are used. Maybe smarter to do it via id CSS
        cardsFound.push(cardsChosen);
        //alert('match found'); 

        for(let i = 0; i < cards.length; i++) {
            if (!cards[i].classList.contains('found')){
            cards[i].addEventListener('click', flipCard);
                }
            }
        }

    //if same card
    if (optionOneId === optionTwoId) {
        wrongSound.play();
        cards[optionOneId].setAttribute('src', cardArray[optionOneId].imgFront); //back to front img
        cards[optionTwoId].setAttribute('src', cardArray[optionTwoId].imgFront); //back to front img
        //alert('clicked same img');
        cards[optionOneId].classList.remove('found');
        cards[optionTwoId].classList.remove('found');
    }


    else if(cardsChosen[0] != cardsChosen[1]){ // if not the same card nor a match
        wrongSound.play();
        cards[optionOneId].setAttribute('src', cardArray[optionOneId].imgFront); //back to front img
        cards[optionTwoId].setAttribute('src', cardArray[optionTwoId].imgFront); //back to front img
        //alert('nope');
        cards[optionOneId].classList.remove('found');
        cards[optionTwoId].classList.remove('found');
    }
    //resultDisplay.textContent = cardsFound.length;
    cardsChosen = []; //reset the array
    cardsChosenIds = [];

    for(let i = 0; i < cards.length; i++) {
    if (!cards[i].classList.contains('found')){
    cards[i].addEventListener('click', flipCard);
        }
    }

    if(cardsFound.length === cardArray.length / 2) {
        //resultDisplay.textContent = 'Congratulations';

        setTimeout(doEndImg, 3000);
        setTimeout(noBorderEnd, 22000);
    }
}

function noBorderEnd() {
    const cards = document.querySelectorAll('#grid img');
    for(let i = 0; i < cards.length; i++){
        const card = cards[i];
        card.classList.remove('grid-item');
        card.classList.add('grid-done');
        gridDisplay.classList.add('grid-end');
        headerDisplay.classList.add('hide-header');
        }
}

function doEndImg(){

    const cards = document.querySelectorAll('#grid img'); //all img in the div with the id of grid
    for(i=0; i < cards.length; i++) {
        let currentCard = cards[i];
        let countImg = i;
        beginTime += 1000;
        endTime += 1000;

        setTimeout(() => {
                currentCard.classList.add('transitioning-src'); // Add class to begin transition

        }, beginTime); 

        setTimeout(() => {
                currentCard.classList.remove('transitioning-src');
                currentCard.setAttribute('src', cardArray[countImg].imgEnd); //back to end img
        }, endTime); // Ensure timeout matches transition time, remove transition class
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*flipping cards. 
-Getting data-id of chosen card IMG, 
-pushing the corresponding objects name in the array to an empty array,
-changing the img of the card with the id,
-checking after 500ms whether the objects are corresponding.
*/
function flipCard() {
   const cardId = this.getAttribute('data-id'); //getting the data-id attribute of the IMG
   //console.log(cardArray[cardId].name);
    cardsChosen.push(cardArray[cardId].name); //pushing the object name of the card clicked on onto another array.
    cardsChosenIds.push(cardId); //pushing ids on a different array
    cardsFront.push(cardArray[cardId].imgFront); //NEW: push img path onto array
    cardsOrder.push(cardArray[cardId].order); // NEW: push order onto array
    //console.log(cardsChosen); 
   this.setAttribute('src', cardArray[cardId].img); //assign a new image according to the object clicked on.
   this.classList.add('found');
    if(cardsChosen.length === 2) {
        const cards = document.querySelectorAll('#grid img');
        for(let i = 0; i < cards.length; i++) {
            cards[i].removeEventListener('click', flipCard);
        }
        setTimeout(checkMatch, 500); //wait 500ms before executing the function
    }
}

//animating the grid
function fadeIn(){
  const h1 = document.getElementById('typewriter');
  h1.remove();

  gridDisplay.classList.add('show');
  gridDisplay.classList.remove('hide'); 
}

//play backsound
function playBk() {
    bkSound.play();
}

  new TypeWriter(`#typewriter`, {
    loop: false,
    cursor: {
      speed: 600,
      size: '2rem',
      id: 'Some_TypeWriter_CSS',
      enabled: false
    },
    timeout: 50
  })
  .write(`Liebe Mama,`)
  .wait(1000)
  .removeAll()
  .wait(500)
  .write(`älter werden ist nicht einfach:`)
  .wait(1000)
  .removeAll()
  .wait(500)
  .write(`der Rücken schmerzt,`)
  .wait(1000)
  .removeAll()
  .wait(500)
  .write(`man sieht wie ein Maulwurf,`)
  .wait(1000)
  .removeAll()
  .wait(500)
  .write(`und klappt das mit dem Gedächtnis eigentlich noch?`)
  .wait(1000)
  .removeAll()
  .wait(500)
  .write(`Was war das für ein Baum, der in Überruhr den Balkon überragte?`)
  .wait(1000)
  .removeAll()
  .wait(500)
    .write(`(Genau, ein Holunderbaum.)`)
  .wait(1000)
  .removeAll()
  .wait(500)
  .write(`Und wo war man nochmal im Urlaub, 2005?`)
  .wait(1000)
  .removeAll()
  .wait(500)
  .write(`(Ja, wo eigentlich?)`)
  .wait(1000)
  .removeAll()
  .wait(500)
  .write(`Stellen wir Dein Gedächtnis mal auf die Probe...`)
  .wait(1000)
  .removeAll()
  .wait(500)
  .write(`Mit einer Runde Memory!`)
  .wait(3000)
  .removeAll()
  .start()

  //setTimeout(createBoard, 1000);
  createBoard();
  setTimeout(fadeIn, 64000); //64000
  setTimeout(playBk, 5000);