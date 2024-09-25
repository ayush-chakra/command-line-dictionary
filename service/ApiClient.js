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
            console.error(error);
        }
    }
}

module.exports = ApiClient;
