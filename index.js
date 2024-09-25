const CommandHandler = require('./service/CommandHandler');

const commandHandler = new CommandHandler();

async function run() {
    const args = process.argv.slice(2); // Get command line arguments
    console.log(args);
    commandHandler.commandsArray = args;
    commandHandler.getWordInformation();

    //console.log(await apiClient.getWordInformation());
}

run();