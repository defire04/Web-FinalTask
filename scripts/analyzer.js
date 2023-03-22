class TextAnalyzer {
    constructor(text) {
        this.text = text;
        // this.words = text.match(/[a-zA-Zа-яА-Я]\w*/g);
        this.words = text.match(/[а-щА-ЩЬьЮюЯяЄєЇїІіҐґа-яА-ЯёЁa-zA-Z]+/g);
        // this.words = text.match(/[^\s|\d|\,|\.|\+|\-|\*|\/|\(|\)]/g);
        this.wordsSet = new Set(
            this.words.map((element) => element.toLowerCase())
        );
    }

    getFrequencyTable() {
        const frequencyTable = this.words.reduce((accumulator, currentWord) => {
            accumulator[currentWord.toLowerCase()] =
                (accumulator[currentWord.toLowerCase()] || 0) + 1;
            // console.log(accumulator[currentWord.toLowerCase()], currentWord);
            return accumulator;
        }, {});

        const sortedWords = Object.entries(frequencyTable).sort(
            (a, b) => b[1] - a[1]
        );

        return Object.fromEntries(sortedWords);
    }
}

export default TextAnalyzer;
