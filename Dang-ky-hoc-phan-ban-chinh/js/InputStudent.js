const $template = document.getElementById("input-wrapper-student-template");
export class InputWrapper extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$label = this.shadowRoot.getElementById("infomation-label");
        this.$informationChild = this.shadowRoot.getElementById("information-child");
    }
    static get observedAttributes(){
        return ["label","value"]
    }
    attributeChangedCallback(name,oldValue,newValue){
        // console.log(name);
        if(name=="label"){
            this.$label.innerHTML = newValue;
        }
        if(name=="value"){
            this.$informationChild.innerHTML = newValue;
        }
    }
}

window.customElements.define("input-wrapper-student",InputWrapper);
