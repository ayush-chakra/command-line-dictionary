const ApiClient = require('./ApiClient');

const apiClient = new ApiClient();

class CommandHandler {
    commandsArray;

    constructor(commandsArray) {
        this.commandsArray = commandsArray;

        console.log(this.commandsArray);
    }

    async getWordInformation() {
        apiClient.word = this.commandsArray[0];
        console.log(this.commandsArray);

        console.log(await apiClient.getWordInformation());
    }

}


module.exports = CommandHandler;