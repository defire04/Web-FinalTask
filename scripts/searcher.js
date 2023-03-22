class TextSearcher {
    constructor(text) {
        this.text = text;
    }

    search(query) {
        const inputArr = this.text.split(" ");
        for (let i = 0; i < inputArr.length; i++) {
            if (
                inputArr[i].length >= query.length &&
                inputArr[i].length <= query.length + 1
            ) {
                const regex = new RegExp(query + "(?![a-zа-я])", "gi");
                inputArr[i] = inputArr[i].replace(regex, "<mark>$&</mark>");
            }
        }
        const textElement = document.createElement("div");
        textElement.innerHTML = inputArr.join(" ");
        return textElement;
    }
}

export default TextSearcher;
