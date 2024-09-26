const axios = require("axios");

class ApiClient {
    word;
    constructor(word) {
        this.word = word;
    }

    async getWordInformation(word) {
        try {
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            return response.data;
        } catch (error) {
            console.error('No details found, please try again!');
            return;
        }
    }

    async getRandomWord() {
        try {
            const response = await axios.get('https://random-word-api.vercel.app/api?words=1');
            return response.data[0];
        } catch (error) {
            console.error('Coud not get a random word, please try again!');
            return;
        }
    }
}

module.exports = ApiClient;
