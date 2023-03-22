import TextSearcher from "./searcher.js";
import TextAnalyzer from "./analyzer.js";

class Page2 {
    constructor() {
        this.textInput = localStorage.getItem("source-text");
        this.searchForm = document.getElementById("search-form");

        this.searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            this.searchText();
        });

        this.usersText = document.getElementById("users-text");
        this.frequencyTableElement = document.getElementById("words-count");

        this.searchInput = document.getElementById("search-input");
        this.searchResults = document.getElementById("suggestions");
        this.searchButton = document.getElementById("search-button");

        this.analyzer = new TextAnalyzer(this.textInput);
        this.wordsSet = Array.from(this.analyzer.wordsSet);

        this.searchInput.addEventListener("input", (event) => {
            this.showSuggestions(event.target.value);
        });

        this.searchResults.addEventListener("change", (event) => {
            this.searchInput.value = event.target.value;
        });

        this.searchButton.addEventListener("click", (event) => {
            this.clearSuggestions();
        });

        this.renderText(this.textInput);
        this.createTable(this.analyzer.getFrequencyTable());
    }

    renderText(text) {
        this.usersText.innerHTML = "";
        this.usersText.prepend(text);
    }

    searchText() {
        const searcher = new TextSearcher(this.textInput);
        const searchResults = searcher.search(this.searchInput.value);
        this.renderText(searchResults);
    }

    createTable(wordsCountObj) {
        Object.entries(wordsCountObj).forEach(([word, count]) => {
            const tableRow = this.rowTemplate(word, count);
            this.frequencyTableElement.append(tableRow);
        });
    }

    rowTemplate(word, count) {
        const tr = document.createElement("tr");
        const wordTd = document.createElement("td");
        wordTd.textContent = word;
        const countTd = document.createElement("td");
        countTd.textContent = count;
        tr.prepend(wordTd, countTd);

        return tr;
    }

    showSuggestions(searchWord) {
        if (!searchWord) {
            this.clearSuggestions();
            return;
        }

        const filtered = this.wordsSet.filter((word) =>
            word.toLowerCase().startsWith(searchWord.trim().toLowerCase())
        );

        this.clearSuggestions();

        filtered.forEach((element) => {
            this.suggestionTemplate(element);
        });
    }

    suggestionTemplate(word) {
        const newListItem = document.createElement("li");
        const newLabel = document.createElement("label");
        const newInput = document.createElement("input");
        const textNode = document.createTextNode(word);

        newInput.setAttribute("type", "radio");
        newInput.setAttribute("name", "word");
        newInput.setAttribute("value", word);
        newInput.setAttribute("id", "");

        newLabel.append(textNode);
        newLabel.append(newInput);
        newListItem.append(newLabel);
        this.searchResults.append(newListItem);
    }

    clearSuggestions() {
        this.searchResults.innerHTML = "";
    }
}
const page2 = new Page2();
