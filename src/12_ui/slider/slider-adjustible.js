class SliderAdjustible extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });

      const wrapper = document.createElement('div');
      wrapper.classList.add('slider');

      // Шкала с метками
      const scale = document.createElement('div');
      scale.classList.add('scale');

      const thumb = document.createElement('div');
      thumb.classList.add('thumb');
      thumb.tabIndex = 0;

      wrapper.appendChild(scale);
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
        .scale {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .scale-mark {
          position: absolute;
          bottom: -10px; /* ✅ Черточки за пределами снизу */
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 10px;
          background: #999;
        }
        .scale-mark.major {
          height: 14px;
          background: #333;
          width: 2px;
        }
        .scale-label {
          position: absolute;
          bottom: -26px; /* ✅ Подписи за пределами */
          left: 50%;
          transform: translateX(-50%);
          font-size: 11px;
          color: #666;
          font-family: Arial, sans-serif;
          white-space: nowrap;
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
          z-index: 10;
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
      this._scale = scale;

      this._onMouseMove = this._onMouseMove.bind(this);
      this._onMouseUp = this._onMouseUp.bind(this);
      this._onKeyDown = this._onKeyDown.bind(this);
      this._onClick = this._onClick.bind(this);

      this._dragging = false;
      this._step = 1;
    }

    connectedCallback() {
      this._updateAttributes();
      this._renderScale();

      this._thumb.addEventListener('mousedown', this._startDrag.bind(this));
      this._thumb.addEventListener('keydown', this._onKeyDown);
      this._wrapper.addEventListener('click', this._onClick);
      this._thumb.ondragstart = () => false;

      new MutationObserver(() => {
        this._updateAttributes();
        this._renderScale();
      }).observe(this, { attributes: true });
    }

    disconnectedCallback() {
      this._thumb.removeEventListener('mousedown', this._startDrag);
      this._thumb.removeEventListener('keydown', this._onKeyDown);
      this._wrapper.removeEventListener('click', this._onClick);
      document.removeEventListener('mousemove', this._onMouseMove);
      document.removeEventListener('mouseup', this._onMouseUp);
    }

    _updateAttributes() {
      const width = this.getAttribute('width');
      if (width) {
        this.style.setProperty('--slider-width', width + 'px');
      }

      const step = parseFloat(this.getAttribute('step')) || 1;
      this._step = Math.max(1, Math.min(9, step));
    }

    _renderScale() {
      this._scale.innerHTML = '';

      const min = parseFloat(this.getAttribute('min')) || 0;
      const max = parseFloat(this.getAttribute('max')) || 10;
      const step = parseFloat(this.getAttribute('marks-step')) || 1;

      for (let value = min; value <= max; value += step) {
        const mark = document.createElement('div');
        mark.classList.add('scale-mark');
        mark.style.left = ((value - min) / (max - min)) * 100 + '%';

        if (value === min || value === max || (value - min) % (step * 2) === 0) {
          mark.classList.add('major');
        }

        this._scale.appendChild(mark);

        if (mark.classList.contains('major')) {
          const label = document.createElement('div');
          label.classList.add('scale-label');
          label.textContent = value;
          label.style.left = mark.style.left;
          this._scale.appendChild(label);
        }
      }
    }

    _snapToStep(left) {
      const sliderWidth = this._wrapper.offsetWidth;
      const thumbWidth = this._thumb.offsetWidth;
      const trackWidth = sliderWidth - thumbWidth;
      const stepWidth = trackWidth / this._step;
      return Math.round(left / stepWidth) * stepWidth;
    }

    get _relativePosition() {
      const sliderWidth = this._wrapper.offsetWidth;
      const thumbWidth = this._thumb.offsetWidth;
      const thumbLeft = parseFloat(this._thumb.style.left) || 0;
      return Math.round((thumbLeft / (sliderWidth - thumbWidth)) * 9 * 10) / 10;
    }

    _dispatchSlideEvent() {
      const position = this._relativePosition;
      this.dispatchEvent(new CustomEvent('slide', {
        bubbles: true,
        detail: { position: position }
      }));
    }

    _startDrag(event) {
      event.preventDefault();
      this._thumb.focus();
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

      newLeft = this._snapToStep(newLeft);
      this._thumb.style.left = newLeft + 'px';
      this._dispatchSlideEvent();
    }

    _onMouseUp() {
      this._dragging = false;
      document.removeEventListener('mousemove', this._onMouseMove);
      document.removeEventListener('mouseup', this._onMouseUp);
    }

    _onKeyDown(event) {
      const step = (this._wrapper.offsetWidth - this._thumb.offsetWidth) / this._step;
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

    _onClick(event) {
      if (event.target === this._thumb) return;

      const rect = this._wrapper.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const thumbWidth = this._thumb.offsetWidth;

      let newLeft = clickX - thumbWidth / 2;
      if (newLeft < 0) newLeft = 0;
      if (newLeft > rect.width - thumbWidth) newLeft = rect.width - thumbWidth;

      newLeft = this._snapToStep(newLeft);
      this._thumb.style.left = newLeft + 'px';
      this._dispatchSlideEvent();
      this._thumb.focus();
    }
  }

  customElements.define('adjustible-slider', SliderAdjustible);
