const $template = document.getElementById('template-input-wrapper');

class InputWrapper extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$label = this.shadowRoot.getElementById('input-label');
        this.$input = this.shadowRoot.getElementById('input-main');
        this.$error = this.shadowRoot.getElementById('input-error');
        this
    }

    static get observedAttributes() {
        return ['label', 'type', 'error', 'value', "placeholder"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'label') {
            this.$label.innerHTML = newValue;
        } else if (name == 'type') {
            this.$input.type = newValue;
        } else if (name == 'error') {
            this.$error.innerHTML = newValue;
        } else if (name == 'value') {
            this.$input.value = newValue;
        } else if (name == 'placeholder') {
            this.$input.placeholder = newValue;
        }
    }

    get value() {
        return this.$input.value;
    }

    set error(message) {
        this.setAttribute('error', message);
    }
}

window.customElements.define('input-wrapper', InputWrapper);