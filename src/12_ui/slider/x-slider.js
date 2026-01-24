// x-slider.js
class XSlider extends HTMLElement {
    constructor() {
      super();
      // Attach shadow DOM for encapsulation
      this.attachShadow({ mode: 'open' });

      // Create structure
      const wrapper = document.createElement('div');
      wrapper.classList.add('slider');
      // Inner thumb
      const thumb = document.createElement('div');
      thumb.classList.add('thumb');

      wrapper.appendChild(thumb);
      // Styles (scoped to shadow DOM)
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
        }
        /* Optional: smooth movement for nicer UX */
        .thumb, .slider {
          transition: left 0s;
        }
      `;

      // Append to shadow root
      this.shadowRoot.append(style, wrapper);

      // References to elements
      this._wrapper = wrapper;
      this._thumb = thumb;

      // Bind event handlers
      this._onMouseMove = this._onMouseMove.bind(this);
      this._onMouseUp = this._onMouseUp.bind(this);

      // Initialize
      this._dragging = false;
    }

    connectedCallback() {
      // Enable dragging
      this._thumb.addEventListener('mousedown', this._startDrag.bind(this));
      // Prevent native drag image
      this._thumb.ondragstart = () => false;

      // Apply initial position if width is set or via style
      const w = this.getAttribute('width');
      if (w) {
        this.style.setProperty('--slider-width', w + 'px');
      }
    }

    disconnectedCallback() {
      this._thumb.removeEventListener('mousedown', this._startDrag);
      document.removeEventListener('mousemove', this._onMouseMove);
      document.removeEventListener('mouseup', this._onMouseUp);
    }

    // Start dragging
    _startDrag(event) {
      event.preventDefault(); // prevent text selection
      this._dragging = true;

      // Compute initial offset between cursor and thumb left edge
      const thumbRect = this._thumb.getBoundingClientRect();
      this._shiftX = event.clientX - thumbRect.left;

      // Listen to document for mouse moves
      document.addEventListener('mousemove', this._onMouseMove);
      document.addEventListener('mouseup', this._onMouseUp);
    }

    // Mouse move handler
    _onMouseMove(event) {
      if (!this._dragging) return;

      const sliderRect = this._wrapper.getBoundingClientRect();
      const thumbRect = this._thumb.getBoundingClientRect();

      // New left relative to slider
      let newLeft = event.clientX - this._shiftX - sliderRect.left;

      // Boundaries
      if (newLeft < 0) newLeft = 0;
      const rightEdge = this._wrapper.offsetWidth - this._thumb.offsetWidth;
      if (newLeft > rightEdge) newLeft = rightEdge;

      // Apply position
      this._thumb.style.left = newLeft + 'px';
    }

    // Mouse up handler
    _onMouseUp() {
      this._dragging = false;
      document.removeEventListener('mousemove', this._onMouseMove);
      document.removeEventListener('mouseup', this._onMouseUp);
    }
  }

// Define the custom element
customElements.define('x-slider', XSlider);
