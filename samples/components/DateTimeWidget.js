class DateTime extends HTMLElement {
    #dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    #timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    constructor() {
      super();
    }
    connectedCallback() {
      const now = new Date();
      const curDate = now.toLocaleDateString('ru-RU', this.#dateOptions).split('.').reverse().join('-');
      const curTime = now.toLocaleTimeString('ru-RU', this.#timeOptions);
      const date = this.getAttribute('date') || curDate;
      const time = this.getAttribute('time') || curTime.split('.')[0];
      this.innerHTML = `<p>${date} ${time}</p>`;
    }
}

class DateTimeWidget extends HTMLElement {
      constructor() {
        super();
      }
      connectedCallback() {
        const [curDate, curTime] = new Date().toISOString().split('T');
        const date = this.getAttribute('date') || curDate;
        const time = this.getAttribute('time') || curTime.split('.')[0];
        this.innerHTML = `<p>${date} ${time}</p>`;
      }
}
