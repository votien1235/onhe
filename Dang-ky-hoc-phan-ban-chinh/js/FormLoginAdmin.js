import { validateInputWrapper, getDataFromDoc, saveCurrentUser } from "./utils.js";
const $template = document.getElementById("form-login-admin-template");

class FormLoginAdmin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$formLoginAdmin = this.shadowRoot.querySelector('.form-login-admin');
        this.$adminId = this.shadowRoot.querySelector('#admin-id');
        this.$password = this.shadowRoot.querySelector('#password');
        this.$loginBtn = this.shadowRoot.getElementById("login-btn");

        this.$formLoginAdmin.onsubmit = (event) => {
            event.preventDefault();
            this.handle();
        }
    }
    async handle() {
        let adminId = this.$adminId.value;
        let password = this.$password.value;
        // let $enterLogin = this.shadowRoot.querySelector("")
        // $formLogin.addEventListener("keyup",function(e){
        //     if(e.keyCode === 13){
        //         $loginBtn.click();
        //     }
        // })

        $('#login-btn').keypress(function (e) {
            if (e.which == 13) {
                click();
                e.preventDefault();
            }
        });

        if (this.validate()) {

            let result = await firebase
                .firestore()
                .collection('Admin')
                .where('adminId', '==', adminId)
                .where('password', '==', password)
                .get();

            if (result.empty) {
                alert("TK hoặc MK không chính xác");
            } else {
                alert("Đăng nhập thành công");
                saveCurrentUser(getDataFromDoc(result.docs[0], ['password']));
                // chuyển trang
                router.navigate('/sign-up');
                document.getElementById('id02').style.display = 'none'
            }
        }
    }
    validate() {

        return validateInputWrapper(this.$adminId, (value) => value != "", "Nhập vào TK")
            & validateInputWrapper(this.$password, (value) => value != "", "Nhập vào password");

    }
}

window.customElements.define("form-login-admin", FormLoginAdmin);