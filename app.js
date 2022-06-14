//selectors
const section = document.querySelector('section');
const playerLivesCount = document.querySelector('.playerLivesCount');

let playerLives = 6;

//link text
playerLivesCount.textContent = playerLives;

//generate the data
const getData = () => [
    { imgSrc: "./images/beatles.jpeg", name: "beatles" },
    { imgSrc: "./images/blink182.jpeg", name: "blink 182" },
    { imgSrc: "./images/fkatwigs.jpeg", name: "fka twigs" },
    { imgSrc: "./images/fleetwood.jpeg", name: "fleetwood" },
    { imgSrc: "./images/joy-division.jpeg", name: "joy division" },
    { imgSrc: "./images/ledzep.jpeg", name: "led zeppelin" },
    { imgSrc: "./images/metallica.jpeg", name: "metallica" },
    { imgSrc: "./images/pinkfloyd.jpeg", name: "pink floyd" },
    { imgSrc: "./images/beatles.jpeg", name: "beatles" },
    { imgSrc: "./images/blink182.jpeg", name: "blink 182" },
    { imgSrc: "./images/fkatwigs.jpeg", name: "fka twigs" },
    { imgSrc: "./images/fleetwood.jpeg", name: "fleetwood" },
    { imgSrc: "./images/joy-division.jpeg", name: "joy division" },
    { imgSrc: "./images/ledzep.jpeg", name: "led zeppelin" },
    { imgSrc: "./images/metallica.jpeg", name: "metallica" },
    { imgSrc: "./images/pinkfloyd.jpeg", name: "pink floyd" }
];

//randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
}

//card generator function
const cardGenertor = () => {
    const cardData = randomize();
    //generate HTML
    cardData.forEach((item) => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.classList = 'card'; //adds class
        face.classList = 'face';
        back.classList = 'back';
        //attach info to the cards
        face.src = item.imgSrc; //adds src property to the img
        card.setAttribute('name', item.name);
        //attach cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e) => { //when we click, we push event to the arrow function
            card.classList.toggle('toggleCard'); //card is individual item's card div, because we created this element in forEach() loop for each item and specific card is invoked when clicked
            checkCards(e);
        })
    })

}

//check cards
const checkCards = e => {
    const clickedCard = e.target; //event captures clicked data
    clickedCard.classList.add('flipped'); //to compare cards
    const flippedCards = document.querySelectorAll('.flipped'); //we grab all flipped cards
    const toggledCards = document.querySelectorAll('.toggleCard');
    //logic
    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
            console.log('match');
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none'; //cards become unclickable
            })
        } else {
            console.log('wrong');
            flippedCards.forEach(card => {
                card.classList.remove('flipped'); //removes flipped class so we can click another two cards
                setTimeout(() => card.classList.remove('toggleCard'), 1050); //when toggleCard class is removed, the card flipps back
            })
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                setTimeout(() => restart('You lost, try again'), 1050);
            }
        }
    }
    //check if we won the game
    if (toggledCards.length === 16) {
        setTimeout(() => restart('You won'), 1050);
    }
}

//restart
const restart = (text) => {
    const cardData = randomize();
    const faces = document.querySelectorAll('.face'); //we can grab them here, because they're already created in cardGenerator() (old)
    const cards = document.querySelectorAll('.card'); //(old)
    section.style.pointerEvents = 'none'; //whole section is nonclickable until everything resets
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard'); //flipp all cards back (cards are old, index from new (but it's the same))
        cards[index].style.pointerEvents = 'all'; //resetting this on all cards so we can click again on them. We are adding pointer events back.
        //randomize
        setTimeout(() => {
            faces[index].src = item.imgSrc; //at new game, we change only faces (not refreshing whole page). Up until now the fresh set of data was only stored in cardData and wasn't displayed in any kind. We are accessing old faces images and giving them imgSrc attribute from fresh generated and randomized data ('item' is from new cardData).
            cards[index].setAttribute('name', item.name); //we also need to update the name
            section.style.pointerEvents = 'all';
        }, 1000);

    });
    playerLives = 6;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
}

cardGenertor();