const CommandHandler = require('./service/CommandHandler');

const commandHandler = new CommandHandler();

async function run() {
    const args = process.argv.slice(2); // Get command line arguments
    commandHandler.handleCommand(args);

    //console.log(await apiClient.getWordInformation());
}

run();