const ApiClient = require('./ApiClient');
const WordGame = require('./WordGame');
const EventEmitter = require('node:events');

const eventEmitter = new EventEmitter();
const apiClient = new ApiClient();


class CommandHandler {
    async handleCommand(commandArgs) {
        let command = commandArgs[0];
        let word = commandArgs[1];

        if (commandArgs.length === 0) {
            word = await apiClient.getRandomWord();
            command = 'full';
            console.log(`Random Word: ${word}`);
        }
        if (command !== 'play') {
            word = command;
            command = 'full';
        }

        const wordData = await apiClient.getWordInformation(word);
        
        // handling commands here
        switch (command) {
            case 'def':
                this.printCommandData(wordData, 'Definitions', word)
                break;
            case 'syn':
                this.printCommandData(wordData, 'Synonyms', word)
                break;
            case 'ant':
                this.printCommandData(wordData, 'Antonyms', word)
                break;
            case 'ex':
                this.printCommandData(wordData, 'Examples', word)
                break;
            case 'full':
                this.printFullData(wordData, word);
                break;
            case 'play':
                const wordGame = new WordGame();
                // fetch a random word
                wordGame.word = await apiClient.getRandomWord();
                const wordInformation = await apiClient.getWordInformation(wordGame.word);

                wordGame.wordHints = this.getHintsForWord(wordInformation, wordGame.word);
                wordGame.startGame();
                wordGame.synonyms = this.getFormattedDataForEachCommand(wordInformation, 'Synonyms');
                wordGame.eventEmitter = eventEmitter;
                break;
            default:
                console.log('Unknown command:', command);
        }
        // eventEmitter to catch the event from WordGame.js and display full dict on exit
        eventEmitter.on('full', (word) => {
            console.log(`The word was "${word}".`);
           this.printFullData(wordData, word);
        })

    }

    jumbleWord(word) {
        const jumbledWord = word.split('').sort(() => Math.random() - 0.5).join('');
        // calling recursive, because multiple times the jumbled word was same as answer
        return jumbledWord == word ? this.jumbleWord(jumbledWord) : jumbledWord;
    }

    getHintsForWord(wordInformation, word) {
        const hints = [
            ...this.getFormattedDataForEachCommand(wordInformation, 'Definitions'),
            ...this.getFormattedDataForEachCommand(wordInformation, 'Synonyms'),
            ...this.getFormattedDataForEachCommand(wordInformation, 'Antonyms')
        ];

        return hints;
    }

    printFullData(wordData, word) {
        this.printCommandData(wordData, 'Definitions', word);
        this.printCommandData(wordData, 'Synonyms', word);
        this.printCommandData(wordData, 'Antonyms', word);
        this.printCommandData(wordData, 'Examples', word);
    }

    printCommandData(wordData, commandName, word) {
        console.log(`${commandName} for the word "${word}" are:`);
        const formattedData = this.getFormattedDataForEachCommand(wordData, commandName);
        if (!formattedData.length) {
            console.log(' Not found!');
            return;
        }
        formattedData.forEach((text, index) => console.log(` ${index + 1}. ${text}`));
    }

    getFormattedDataForEachCommand(wordData, commandName) {
        let mappedArray = [];

        switch (commandName) {
            case 'Definitions':
                wordData.forEach(element => {
                    element.meanings.flatMap(meaning => meaning.definitions.map(def => def.definition && mappedArray.push(def.definition)));
                });
                break;
            case 'Synonyms':
                wordData.forEach(element => {
                    element.meanings.flatMap(meaning => meaning.synonyms && mappedArray.push(...meaning.synonyms));
                });
                break;
            case 'Antonyms':
                wordData.forEach(element => {
                    element.meanings.flatMap(meaning => meaning.antonyms && mappedArray.push(...meaning.antonyms));
                });
                break;
            case 'Examples':
                wordData.forEach(element => {
                    element.meanings.flatMap(meaning => meaning.definitions.map(def => def.example && mappedArray.push(def.example)));
                });
                break;
        }
        return mappedArray;
    }
}


module.exports = CommandHandler;