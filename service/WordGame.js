const readline = require('readline');


class WordGame {
    wordHints;
    word;
    synonyms;
    readline;
    eventEmitter;
    constructor(word, hints, synonym, eventEmitter) {
        this.word = word;
        this.nonDisplaySynonym = synonym;
        this.wordHints = hints;
        this.eventEmitter = eventEmitter;

        this.readline = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'Enter your answer: '
        });
    }

    async startGame(showHint = true) {
        if (showHint) {
            console.log(this.wordHints[Math.floor(Math.random() * (this.wordHints.length))]);
        }

        this.readline.question('Enter your answer: ', (input) =>  {
            if (input.toLocaleLowerCase() === this.word.toLocaleLowerCase() 
                || this.nonDisplaySynonym?.toLocaleLowerCase() == input.toLocaleLowerCase()) {
                console.log('Correct answer!');
                this.readline.close();
            } else {
                console.log('Incorrect!');
                this.showOptions(this.readline);
            }
        })
    }

    showOptions(readline) {
        console.log('1. Try again', '\n2. Hint', '\n3. Exit');
        readline.question('Select any option from above: ', (input) => {
            switch (input.toLocaleLowerCase()) {
                case '1':
                case 'try again':
                    this.startGame(false);
                    break;
                case '2':
                case 'hint':
                    this.startGame();
                    break;
                case '3':
                case 'exit':
                    this.eventEmitter.emit('full', this.word);
                    readline.close();
                    break;
                default:
                    console.log('Unknown command');
                    this.showOptions(this.readline);
                    break;
            }
        });
    }
}

module.exports = WordGame;