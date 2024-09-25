const ApiClient = require('./ApiClient');

const apiClient = new ApiClient();

class CommandHandler {

    constructor() {
        
    }

    async handleCommand(commandArgs) {
        let command = commandArgs[0];
        let word = commandArgs[1];

        const wordData = await apiClient.getWordInformation(word);

        let resultDataArray = [];

        switch (command) {
            case 'def':
                this.printCommandData(this.getDefinitions(wordData, resultDataArray), 'Definitions', word)
                break;
            case 'syn':
                this.printCommandData(this.getSynonyms(wordData, resultDataArray), 'Synonyms', word)
                break;
            case 'ant':
                this.printCommandData(this.getAntonyms(wordData, resultDataArray), 'Antonyms', word)
                break;
            case 'ex':
                this.printCommandData(this.getExamples(wordData, resultDataArray), 'Examples', word)
                break;
            case 'full':
                this.printCommandData(this.getDefinitions(wordData, resultDataArray), 'Definitions', word)
                this.printCommandData(this.getSynonyms(wordData, resultDataArray), 'Synonyms', word)
                this.printCommandData(this.getAntonyms(wordData, resultDataArray), 'Antonyms', word)
                this.printCommandData(this.getExamples(wordData, resultDataArray), 'Examples', word)
                break;
            default:
                console.log('Unknown command:', command);
        }

    }

    printCommandData(resultDataArray, commandName, word) {
        console.log('\n');
        console.log(`${commandName} for the word "${word}" are:`);
        resultDataArray.forEach((text, index)=> console.log(`${index+1}. ${text}`));
        return;
    }

    getDefinitions(wordData, resultDataArray) {
        wordData.forEach(element => {
            element.meanings.flatMap(meaning => meaning.definitions.map(def => def.definition && resultDataArray.push(def.definition)));
        });
        return resultDataArray;
    }
    getExamples(wordData, resultDataArray) {
        wordData.forEach(element => {
            element.meanings.flatMap(meaning => meaning.definitions.map(def => def.example && resultDataArray.push(def.example)));
        });
        return resultDataArray;
    }
    getAntonyms(wordData, resultDataArray) {
        wordData.forEach(element => {
            element.meanings.flatMap(meaning => meaning.antonyms && resultDataArray.push(...meaning.antonyms));
        });
        return resultDataArray;
    }
    getSynonyms(wordData, resultDataArray) {
        wordData.forEach(element => {
            element.meanings.flatMap(meaning => meaning.synonyms && resultDataArray.push(...meaning.synonyms));
        });
        return resultDataArray;
    }

    async getWordInformation() {
        apiClient.word = this.commandsArray[0];
        console.log(this.commandsArray);

        console.log(await apiClient.getWordInformation());
    }

}


module.exports = CommandHandler;