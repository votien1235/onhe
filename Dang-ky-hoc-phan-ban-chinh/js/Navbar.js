class Navbar extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:"open"});
        let $template = document.getElementById("main-navbar");
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$title1 = this.shadowRoot.getElementById("title1");
        this.$title2 = this.shadowRoot.getElementById("title2");
        this.$title3 = this.shadowRoot.getElementById("title3");
        this.$title4 = this.shadowRoot.getElementById("title4");
        this.$title5 = this.shadowRoot.getElementById("title5");
        this.$logo = this.shadowRoot.getElementById("logo");
    }
    // liệt kê những thuộc tính ảnh hưởng đến thẻ
    static get observedAttributes(){
        return ['title1','title2','title3',"title4","title5",'logo'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        if (name == "title1") {
            this.$title1.innerHTML = newValue;
        } else if (name=="title2"){
            this.$title2.innerHTML = newValue;
        } else if (name=="title3"){
            this.$title3.innerHTML = newValue;
        } else if (name=="title4"){
            this.$title4.innerHTML = newValue;
        } else if (name=="title5"){
            this.$title5.innerHTML = newValue;
        } else if(name == "logo"){
            this.$logo.src = newValue;
        }
    }
}

window.customElements.define("main-navbar",Navbar);