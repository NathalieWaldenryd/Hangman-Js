/* global Hangman */
(function () {
    'use strict';

    var wordElement = document.createElement('div');
    var alphabetElement = document.createElement('div');
    var messageElement = document.createElement('div');

    wordElement.id = "Word";
    alphabetElement.id = "Alphabet";
    messageElement.id = "Message";

    const Alphabet = "abcdefghijklmnopqrstuvwxyzåäö".split("");
    const Word = Hangman.peek().toLowerCase().split("");

    let parts = Hangman.validParts.slice();

    parts.forEach(part => Hangman.hide(part));

    alphabetElement.addEventListener('click', e => {
        let target = e.target;
        let clickedLetter = target.dataset.letter;

        if (clickedLetter) {
            target.disabled = true;
            checkLetter(clickedLetter);
        }
    });

    let currentWord = Word.slice().filter(l => l != " ");

    function checkLetter(letter) {
        wordElement.dataset.display += letter;
        if (!Word.includes(letter)) {
            let part = parts.shift();

            Hangman.show(part);
            if (parts.length == 0) {
                Hangman.show(part);
                alphabetElement.classList.add("disabled");
                messageElement.innerText = "You lost!";
                document.body.appendChild(messageElement);
            }
        } else {
            currentWord = currentWord.filter(l => l != letter);

            if (currentWord.length == 0) {
                alphabetElement.classList.add("disabled");
                messageElement.innerText = "You Won!";
                document.body.appendChild(messageElement);
            }
        }
    }

    function buildWord() {
        let fragment = document.createDocumentFragment();

        wordElement.dataset.display = "";
        Word.forEach(letter => {
            let span = document.createElement("span");

            span.dataset.letter = letter;
            fragment.appendChild(span);
        });
        wordElement.appendChild(fragment);
        document.body.appendChild(wordElement);
    }

    function buildLeAlphabet() {
        let fragment = document.createDocumentFragment();

        Alphabet.forEach(letter => {
            let button = document.createElement("button");

            button.dataset.letter = letter;
            button.innerText = letter;
            fragment.appendChild(button);
        });
        alphabetElement.appendChild(fragment);
        document.body.appendChild(alphabetElement);
    }

    buildLeAlphabet();
    buildWord();
})();
