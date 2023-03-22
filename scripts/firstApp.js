

class Page {
    constructor() {
        this.inputForm = document.forms["input-form"];
        this.textInput = this.inputForm.elements["text"];

        this.inputForm.addEventListener("submit", (event) => {
            event.preventDefault();
            this.analyzeText();
        });
    }

    analyzeText() {
        localStorage.setItem("source-text", this.textInput.value);
        window.location.href = "second.html";
    }
}

const page = new Page();
