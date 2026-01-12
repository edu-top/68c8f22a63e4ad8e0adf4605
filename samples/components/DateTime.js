class DateTime extends HTMLElement {
    #rendered;
    constructor() {
        super();
    }
    #render() {
        const datetime = this.getAttribute('datetime') ?? new Date().toISOString();
        let [date, time] = datetime.split('T');
        time = time.split('.')[0];
        this.innerHTML = `<p>${date} ${time}</p>`;
    }
    static get observedAttributes() {
        return ['datetime'];
    }
    connectedCallback() {
        if (this.rendered) return;
        this.#render()
        this.#rendered = true;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.#render();
    }
}
