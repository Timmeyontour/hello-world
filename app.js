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


const cardArray = [
    {
        name: '1',
        img: 'img/1_1.png',
        imgFront: 'img/1_1f.png',
        order: 1
    },
    {
        name: '2',
        img: 'img/1_2.png',
        imgFront: 'img/1_2f.png',
        order: 2
    },
    {
        name: '3',
        img: 'img/1_3.png',
        imgFront: 'img/1_3f.png',
        order: 3
    },
    {
        name: '4',
        img: 'img/1_4.png',
        imgFront: 'img/1_4f.png',
        order: 4
    },
    {
        name: '5',
        img: 'img/2_1.png',
        imgFront: 'img/2_1f.png',
        order: 5
    },
    {
        name: '6',
        img: 'img/2_2.png',
        imgFront: 'img/2_2f.png',
        order: 6
    },
    {
        name: '7',
        img: 'img/2_3.png',
        imgFront: 'img/2_3f.png',
        order: 7
    },
    {
        name: '8',
        img: 'img/2_4.png',
        imgFront: 'img/2_4f.png',
        order: 8
    },
    {   name: '1',
        img: 'img/1_1.png',
        imgFront: 'img/3_1f.png',
        order: 9
    },
    {
        name: '2',
        img: 'img/1_2.png',
        imgFront: 'img/3_2f.png',
        order: 10
    },
    {
        name: '3',
        img: 'img/1_3.png',
        imgFront: 'img/3_3f.png',
        order: 11
    },
    {
        name: '4',
        img: 'img/1_4.png',
        imgFront: 'img/3_4f.png',
        order: 12
    },
    {
        name: '5',
        img: 'img/2_1.png',
        imgFront: 'img/4_1f.png',
        order: 13
    },
    {
        name: '6',
        img: 'img/2_2.png',
        imgFront: 'img/4_2f.png',
        order: 14
    },
    {
        name: '7',
        img: 'img/2_3.png',
        imgFront: 'img/4_3f.png',
        order: 15
    },
    {
        name: '8',
        img: 'img/2_4.png',
        imgFront: 'img/4_4f.png',
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

    //if same card
    if (optionOneId === optionTwoId) {
        cards[optionOneId].setAttribute('src', cardArray[optionOneId].imgFront); //back to front img
        cards[optionTwoId].setAttribute('src', cardArray[optionTwoId].imgFront); //back to front img
        //alert('clicked same img');
    }

    if (cardsChosen[0] === cardsChosen[1] && optionOneId != optionTwoId) {
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
    }
    else { // if not the same card nor a match
        cards[optionOneId].setAttribute('src', cardArray[optionOneId].imgFront); //back to front img
        cards[optionTwoId].setAttribute('src', cardArray[optionTwoId].imgFront); //back to front img
        //alert('nope');
    }
    //resultDisplay.textContent = cardsFound.length;
    cardsChosen = []; //reset the array
    cardsChosenIds = [];

    if(cardsFound.length === cardArray.length / 2) {
        //resultDisplay.textContent = 'Congratulations';
        for(let i = 0; i < cards.length; i++){
        const card = cards[i];
        card.classList.remove('grid-item');
        card.classList.add('grid-done');
        gridDisplay.classList.add('grid-end');
        headerDisplay.classList.add('hide-header');
        }
    }
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
    if(cardsChosen.length === 2) {
        setTimeout(checkMatch, 500); //wait 500ms before executing the function
    }
}

//animating the grid
function fadeIn(){
  gridDisplay.classList.add('show');
  gridDisplay.classList.remove('hide');  
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
  .write(`Alles Gute zum Geburtstag!`)
  .wait(2000)
  .removeAll()
  .wait(500)
  .write(`...ob das wohl mit dem Gedächtnis noch klappt?`)
  .wait(2000)
  .removeAll()
  .wait(500)
  .write(`...finden wir es heraus!`)
  .wait(2000)
  .removeAll()
  .wait(500)
  .write(`...mit einer Runde Memory!`)
  .start()

  //setTimeout(createBoard, 25000);
  createBoard();
  setTimeout(fadeIn, 2000); //22000
  