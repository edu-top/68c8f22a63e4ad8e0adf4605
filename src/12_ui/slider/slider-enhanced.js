class SliderEnhanced extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });

      const wrapper = document.createElement('div');
      wrapper.classList.add('slider');
      const thumb = document.createElement('div');
      thumb.classList.add('thumb');
      thumb.tabIndex = 0; // Фокус на бегунке!

      wrapper.appendChild(thumb);

      const style = document.createElement('style');
      style.textContent = `
        :host {
          display: inline-block;
        }
        .slider {
          border-radius: 5px;
          background: #E0E0E0;
          background: linear-gradient(left top, #E0E0E0, #EEEEEE);
          width: var(--slider-width, 310px);
          height: 15px;
          margin: 5px;
          position: relative;
          outline: none;
        }
        .thumb {
          width: 10px;
          height: 25px;
          border-radius: 3px;
          position: absolute;
          left: 10px;
          top: -5px;
          background: blue;
          cursor: pointer;
          user-select: none;
          transition: left 0.1s ease;
          outline: none;
        }
        .thumb:focus {
          outline: 2px solid #e24a4a;
          outline-offset: 0px;
          background: #1E73F2;
        }
      `;

      this.shadowRoot.append(wrapper, style);

      this._wrapper = wrapper;
      this._thumb = thumb;

      this._onMouseMove = this._onMouseMove.bind(this);
      this._onMouseUp = this._onMouseUp.bind(this);
      this._onKeyDown = this._onKeyDown.bind(this);
      this._onClick = this._onClick.bind(this);

      this._dragging = false;
    }

    connectedCallback() {
      this._thumb.addEventListener('mousedown', this._startDrag.bind(this));
      this._thumb.addEventListener('keydown', this._onKeyDown);
      this._wrapper.addEventListener('click', this._onClick);
      this._thumb.ondragstart = () => false;

      const w = this.getAttribute('width');
      if (w) {
        this.style.setProperty('--slider-width', w + 'px');
      }
    }

    disconnectedCallback() {
      this._thumb.removeEventListener('mousedown', this._startDrag);
      this._thumb.removeEventListener('keydown', this._onKeyDown);
      this._wrapper.removeEventListener('click', this._onClick);
      document.removeEventListener('mousemove', this._onMouseMove);
      document.removeEventListener('mouseup', this._onMouseUp);
    }

    // Пересчитывает относительное положение (0-9)
    get _relativePosition() {
      const sliderWidth = this._wrapper.offsetWidth;
      const thumbWidth = this._thumb.offsetWidth;
      const thumbLeft = parseFloat(this._thumb.style.left) || 0;
      return Math.round((thumbLeft / (sliderWidth - thumbWidth)) * 9 * 10) / 10;
    }

    // Генерация кастомного события
    _dispatchSlideEvent() {
      const position = this._relativePosition;
      this.dispatchEvent(new CustomEvent('slide', {
        bubbles: true,
        detail: { position: position }
      }));
    }

    _startDrag(event) {
      event.preventDefault();
      this._thumb.focus(); // ✅ Фокус при клике мышкой
      this._dragging = true;
      const thumbRect = this._thumb.getBoundingClientRect();
      this._shiftX = event.clientX - thumbRect.left;

      document.addEventListener('mousemove', this._onMouseMove);
      document.addEventListener('mouseup', this._onMouseUp);
      this._dispatchSlideEvent();
    }

    _onMouseMove(event) {
      if (!this._dragging) return;

      const sliderRect = this._wrapper.getBoundingClientRect();
      let newLeft = event.clientX - this._shiftX - sliderRect.left;

      if (newLeft < 0) newLeft = 0;
      const rightEdge = this._wrapper.offsetWidth - this._thumb.offsetWidth;
      if (newLeft > rightEdge) newLeft = rightEdge;

      this._thumb.style.left = newLeft + 'px';
      this._dispatchSlideEvent();
    }

    _onMouseUp() {
      this._dragging = false;
      document.removeEventListener('mousemove', this._onMouseMove);
      document.removeEventListener('mouseup', this._onMouseUp);
    }

    // Клавиатурное управление (на thumb)
    _onKeyDown(event) {
      const step = (this._wrapper.offsetWidth - this._thumb.offsetWidth) / 20;
      let currentLeft = parseFloat(this._thumb.style.left) || 0;
      let newLeft = currentLeft;

      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          newLeft = Math.max(0, currentLeft - step);
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          const rightEdge = this._wrapper.offsetWidth - this._thumb.offsetWidth;
          newLeft = Math.min(rightEdge, currentLeft + step);
          break;
        case 'Home':
          event.preventDefault();
          newLeft = 0;
          break;
        case 'End':
          event.preventDefault();
          newLeft = this._wrapper.offsetWidth - this._thumb.offsetWidth;
          break;
      }

      if (newLeft !== currentLeft) {
        this._thumb.style.left = newLeft + 'px';
        this._dispatchSlideEvent();
      }
    }

    // Клик по полосе
    _onClick(event) {
      if (event.target === this._thumb) return;

      const rect = this._wrapper.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const thumbWidth = this._thumb.offsetWidth;

      let newLeft = clickX - thumbWidth / 2;
      if (newLeft < 0) newLeft = 0;
      if (newLeft > rect.width - thumbWidth) newLeft = rect.width - thumbWidth;

      this._thumb.style.left = newLeft + 'px';
      this._dispatchSlideEvent();

      // ✅ Фокусируем бегунок после клика по полосе
      this._thumb.focus();
    }
  }

  customElements.define('enhanced-slider', SliderEnhanced);
