class SliderInput extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });

      // Основной контейнер
      const container = document.createElement('div');
      container.classList.add('slider-input-container');

      // Слайдер
      this._slider = document.createElement('adjustible-slider');
      this._slider.style.display = 'inline-block';

      // Поле ввода
      this._input = document.createElement('input');
      this._input.type = 'number';
      this._input.classList.add('value-input');
      this._input.readOnly = false;
      this._input.min = '0';

      container.append(this._slider, this._input);

      // Стили
      const style = document.createElement('style');
      style.textContent = `
        :host {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .slider-input-container {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .value-input {
          width: 70px;
          height: 25px;
          padding: 0 8px;
          border: 2px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          text-align: center;
          background: white;
          transition: border-color 0.2s ease;
        }

        .value-input:focus {
          outline: none;
          border-color: #1E73F2;
          box-shadow: 0 0 0 2px rgba(30, 115, 242, 0.2);
        }

        .value-input.invalid {
          border-color: #e24a4a;
          background: #fff5f5;
        }
      `;

      this.shadowRoot.append(container, style);

      // Параметры диапазона
      this._min = parseFloat(this.getAttribute('min')) || 0;
      this._max = parseFloat(this.getAttribute('max')) || 10;
      this._step = parseFloat(this.getAttribute('step')) || 0.1;

      // Связываем события
      this._initEventListeners();

      // Инициализируем начальное значение
      this.value = parseFloat(this.getAttribute('value')) || this._min;
    }

    connectedCallback() {
      // Обновляем CSS переменные для слайдера
      this._updateSliderCSS();
    }

    _initEventListeners() {
      // Слушаем изменения слайдера
      this._slider.addEventListener('slide', (e) => {
        const position = e.detail.position;
        this.value = this._min + (this._max - this._min) * (position / 9);
      });

      // Обрабатываем ввод в поле
      this._input.addEventListener('input', this._handleInput.bind(this));
      this._input.addEventListener('blur', this._handleInput.bind(this));
    }

    // Геттер/сеттер для значения
    get value() {
      return parseFloat(this._input.value) || this._min;
    }

    set value(newValue) {
      const clampedValue = Math.max(this._min, Math.min(this._max, newValue));
      this._input.value = clampedValue.toFixed(this._getDecimalPlaces());

      // Перемещаем слайдер
      const position = (clampedValue - this._min) / (this._max - this._min) * 9;
      const sliderWidth = this._slider._wrapper.offsetWidth;
      const thumbWidth = this._slider._thumb.offsetWidth;
      const newLeft = (position / 9) * (sliderWidth - thumbWidth);

      this._slider._thumb.style.left = `${Math.max(0, Math.min(newLeft, sliderWidth - thumbWidth))}px`;

      // Диспатчим событие
      this.dispatchEvent(new CustomEvent('input', {
        bubbles: true,
        detail: { value: clampedValue }
      }));

      this.dispatchEvent(new CustomEvent('change', {
        bubbles: true,
        detail: { value: clampedValue }
      }));
    }

    _handleInput(event) {
      const inputValue = parseFloat(event.target.value);

      if (isNaN(inputValue)) {
        this._input.classList.add('invalid');
        return;
      }

      if (inputValue < this._min || inputValue > this._max) {
        this._input.classList.add('invalid');
        return;
      }

      this._input.classList.remove('invalid');
      this.value = inputValue;
    }

    _updateSliderCSS() {
      const range = this._max - this._min;
      if (range > 0) {
        this._slider.style.setProperty('--slider-width', '250px');
      }
    }

    _getDecimalPlaces() {
      const stepStr = this._step.toString();
      const decimalMatch = stepStr.match(/\.(\d+)$/);
      return decimalMatch ? decimalMatch[1].length : 0;
    }

    // Атрибуты
    static get observedAttributes() {
      return ['min', 'max', 'step', 'value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case 'min':
          this._min = parseFloat(newValue) || 0;
          break;
        case 'max':
          this._max = parseFloat(newValue) || 10;
          break;
        case 'step':
          this._step = parseFloat(newValue) || 0.1;
          break;
        case 'value':
          this.value = parseFloat(newValue) || this._min;
          break;
      }

      this._updateSliderCSS();
      this._input.min = this._min;
      this._input.max = this._max;
      this._input.step = this._step;
    }
  }

  // Регистрируем компонент
  customElements.define('input-slider', SliderInput);
