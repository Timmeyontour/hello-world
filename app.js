const gridDisplay = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result');
let cardsChosen = []; //Array of the name properties of cards 
let cardsChosenIds = []; //Array of the id properties of img 
const cardsFound = []; //Array of matches
// an array of objects for all memory cards
const cardArray = [
    {
        name: 'fries',
        img: 'img/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'img/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'img/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'img/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'img/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'img/pizza.png'
    },
    {
        name: 'fries',
        img: 'img/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'img/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'img/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'img/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'img/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'img/pizza.png'
    }
]

//creating the randomisation of array items

cardArray.sort(() => 0.5 - Math.random());

//console.log(cardArray);

//create html img per cardArray-object and append it to the grid element
function createBoard () {
    for(let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img'); //create html img
        card.setAttribute('src', 'img/blank.png'); //create attributes
        card.setAttribute('data-id', i);
        //console.log(card, i);
        card.addEventListener('click', flipCard) //adding an event listener, not calling the function
        gridDisplay.appendChild(card);//append img to grid
    }   
}

createBoard();

//checking whether items match
function checkMatch() {
    const cards = document.querySelectorAll('#grid img'); //all img in the div with the id of grid
    const optionOneId = cardsChosenIds[0];
    const optionTwoId = cardsChosenIds[1];
    //console.log(cards);
    //console.log('checkMatch');

    //if same card
    if (optionOneId === optionTwoId) {
        cards[optionOneId].setAttribute('src', 'img/blank.png');
        cards[optionTwoId].setAttribute('src', 'img/blank.png');
        alert('clicked same img');
    }

    if (cardsChosen[0] === cardsChosen[1] && optionOneId != optionTwoId) {
        cards[optionOneId].setAttribute('src', 'img/white.png'); //show that a match is found by making the img white
        cards[optionTwoId].setAttribute('src', 'img/white.png');
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        /*cards[optionOneId].setAttribute('style', 'order: -1');
        switch statement - if "name", then order "x". 
        //have one round of tiles around for a border.
        */
        cardsFound.push(cardsChosen);
        alert('match found');
    }
    else { // if not the same card nor a match
        cards[optionOneId].setAttribute('src', 'img/blank.png');
        cards[optionTwoId].setAttribute('src', 'img/blank.png');
        alert('nope');
    }
    resultDisplay.textContent = cardsFound.length;
    cardsChosen = []; //reset the array
    cardsChosenIds = [];

    if(cardsFound.length === cardArray.length / 2) {
        resultDisplay.textContent = 'Congratulations';
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
    //console.log(cardsChosen); 
   this.setAttribute('src', cardArray[cardId].img); //assign a new image according to the object clicked on.
    if(cardsChosen.length === 2) {
        setTimeout(checkMatch, 500); //wait 500ms before executing the function
    }
}