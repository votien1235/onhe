import { validateInputWrapper, getDataFromDoc, saveCurrentUser } from "./utils.js";
const $template = document.getElementById("form-login-template");

class FormLogin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$formLogin = this.shadowRoot.querySelector('.form-login');
        this.$studentId = this.shadowRoot.querySelector('#student-id');
        this.$password = this.shadowRoot.querySelector('#password');
        this.$loginBtn = this.shadowRoot.getElementById("login-btn");

        this.$formLogin.onsubmit = (event) => {
            event.preventDefault();
            this.handle();
        }
    }
    async handle() {
        let studentId = this.$studentId.value;
        let password = this.$password.value;
        // let $enterLogin = this.shadowRoot.querySelector("")
        // $formLogin.addEventListener("keyup",function(e){
        //     if(e.keyCode === 13){
        //         $loginBtn.click();
        //     }
        // })

        $('#login-btn').keypress(function(e) {
            if (e.which == 13) {
                click();
                e.preventDefault();
            }
        });

        if (this.validate()) {

            let result = await firebase
                .firestore()
                .collection('users')
                .where('studentId', '==', studentId)
                .where('password', '==', password)
                .get();

            if (result.empty) {
                alert("msv hoặc mk không chính xác");
            } else {
                // alert("Đăng nhập thành công");
                saveCurrentUser(getDataFromDoc(result.docs[0], ['password']));
                // chuyển trang
                router.navigate('/student-profile');
            }
        }
    }
    validate() {

        return validateInputWrapper(this.$studentId, (value) => value != "", "Nhập vào MSV")
            & validateInputWrapper(this.$password, (value) => value != "", "Nhập vào password");

    }
}

window.customElements.define("form-login", FormLogin);