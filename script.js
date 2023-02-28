// http://puzzle.mead.io/puzzle?wordCount=${wordCount}
// https://random-word-api.herokuapp.com/word?length=5

let lettersElements = document.querySelectorAll('div.word input.letter')
let submitBtn = document.querySelector('button#submitWord')
let guessCount = 0
let gamePoints = 0
const wordCount = 5

lettersElements.forEach((letterElement) => {
    letterElement.addEventListener('keyup', (e) => {
        if (e.target.value.length === 1 && e.target.nextElementSibling) {
            e.target.nextElementSibling.focus()
        }
    })
})

let getWord = (length = 5) => {
    var req = new XMLHttpRequest()
    req.open('GET', `https://random-word-api.herokuapp.com/word?length=${length}`, false)
    req.send()
    theWord = JSON.parse(req.responseText)[0].toUpperCase().split('')
    return theWord
}

localStorage.setItem('word', JSON.stringify(getWord()))

let addNewGuessBoxes = () => {
    // lastIndex = parseInt(submitBtn.previousElementSibling.lastElementChild.getAttribute('data-index'))
    submitBtn.insertAdjacentHTML('beforebegin', `<div class="word">
    <input type="text" class="letter" data-index="0">
    <input type="text" class="letter" data-index="1">
    <input type="text" class="letter" data-index="2">
    <input type="text" class="letter" data-index="3">
    <input type="text" class="letter" data-index="4">
        </div>`)
    lettersElements = document.querySelectorAll('div.word input.letter')
    lettersElements.forEach((letterElement) => {
        letterElement.addEventListener('keyup', (e) => {
            if (e.target.value.length === 1 && e.target.nextElementSibling) {
                e.target.nextElementSibling.focus()
            }
        })
    })
}

let isCorrect = () => {
    let lettersElements = submitBtn.previousElementSibling.querySelectorAll('input.letter')
    correctLetters = 0
    lettersElements.forEach((letterElement) => {
        if (letterElement.classList.contains('correct')) {
            correctLetters++
        }
    })
    return correctLetters === lettersElements.length
}

let submitGuess = () => {
    let lettersElements = submitBtn.previousElementSibling.querySelectorAll('input.letter')
    let word = JSON.parse(localStorage.getItem('word'))
    lettersElements.forEach((letterElement) => {
        position = parseInt(letterElement.getAttribute('data-index'))
        typedLetter = letterElement.value.toUpperCase()
        if (word.includes(typedLetter) && position === word.indexOf(typedLetter)) {
            letterElement.classList.add('correct')
        } else if (word.includes(typedLetter)) {
            // word.splice(word.indexOf(typedLetter), 1)
            letterElement.classList.add('miss-place')
        } else {
            letterElement.classList.add('incorrect')
        }
        // console.log(word)
    })
    guessCount++
}

let renderScore = (score) => {
    let scoreElement = document.querySelector('div.score h1#score')
    scoreElement.innerHTML = gamePoints
}

// let word = ["C", "H", "A", "I", "N"]
submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    submitGuess()
    if (isCorrect()) {
        guessCount === 5 ? gamePoints += 1 : gamePoints += (wordCount - guessCount)
        alert('You win!')
        renderScore()
    } else if (guessCount === 5) {
        alert('You lose!')
    } else {
        addNewGuessBoxes()
    }
})