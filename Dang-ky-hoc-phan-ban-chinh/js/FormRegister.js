// import { md5 } from "./utils.js";
const $template = document.getElementById('template-form-register');

class FormRegister extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$studentId = this.shadowRoot.getElementById('student-id');
        this.$email = this.shadowRoot.getElementById('email');
        this.$fullName = this.shadowRoot.getElementById('full-name');
        this.$majors = this.shadowRoot.getElementById('majors');
        this.$dateOfBirth = this.shadowRoot.getElementById('date-of-birth');
        this.$numberPhone = this.shadowRoot.getElementById('number-phone');
        this.$password = this.shadowRoot.getElementById('password');
        this.$passwordConfirmation = this.shadowRoot.getElementById('password-confirmation');
        this.$sex = this.shadowRoot.getElementById('sex');

        this.$formRegister = this.shadowRoot.querySelector('.form-register');
        this.$formRegister.onsubmit = (event) => {
            event.preventDefault();
            this.register();
        }
    }

    async register() {
        // lấy dữ liệu

        let email = this.$email.value;
        let studentId = this.$studentId.value;
        let majors = this.$majors.value;
        let dateOfBirth = this.$dateOfBirth.value;
        let numberPhone = this.$numberPhone.value;
        let fullName = this.$fullName.value;
        let sex = this.$sex.value;
        let password = this.$password.value;
        let passwordConfirmation = this.$passwordConfirmation.value;



        // check dữ liệu
        if (this.validate(studentId, email, majors, dateOfBirth, numberPhone, fullName, sex, password, passwordConfirmation)) {
            alert('đăng kí thành công');

            // let email = this.$email.value;
            // let name = this.$name.value;
            // let password = this.$password.value;
            // let passwordConfirmation = this.$passwordConfirmation.value;

            // console.log(email, name, password, passwordConfirmation);

            if (this.validate(studentId, email, majors, dateOfBirth, numberPhone, fullName, sex, password, passwordConfirmation)) {
                let result = await firebase
                    .firestore()
                    .collection('users')
                    .where('studentId', '==', studentId)
                    .get();
                // console.log(result);
                if (result.empty) {
                    await firebase.firestore().collection('users').add({
                        studentId: studentId,
                        majors: majors,
                        dateOfBirth: dateOfBirth,
                        numberPhone: numberPhone,
                        fullName: fullName,
                        email: email,
                        password: password,
                        sex: sex
                    });
                    alert('bạn đã đăng kí thành công')
                } else {
                    alert('email này đã được đăng ký!');
                }

                // firebase.firestore().collection('users').add({
                //     name: name,
                //     email: email,
                //     password: password
                // })
            }

        }
    }



    validate(studentId, email, majors, dateOfBirth, numberPhone, fullName, sex, password, passwordConfirmation) {
        let isPassed = true;
        if (studentId == '') {
            this.$studentId.error = "Nhập vào MSV";
            isPassed = false;
        } else {
            this.$studentId.error = "";
        }
        if (email == '') {
            this.$email.error = "Nhập vào email";
            isPassed = false;
        } else {
            this.$email.error = "";
        } if (majors == '') {
            this.$majors.error = "Nhập vào Ngành học";
            isPassed = false;
        } else {
            this.$majors.error = "";
        } if (dateOfBirth == '') {
            this.$dateOfBirth.error = "Nhập vào ngày sinh";
            isPassed = false;
        } else {
            this.$dateOfBirth.error = "";
        } if (numberPhone == '') {
            this.$numberPhone.error = "Nhập vào SDT";
            isPassed = false;
        } else {
            this.$numberPhone.error = "";
        }

        if (fullName == '') {
            this.$fullName.error = "Nhập vào họ tên";
            isPassed = false;
        } else {
            this.$fullName.error = "";
        }
        if (sex == '') {
            this.$sex.error = "Nhập vào giới tính";
            isPassed = false;
        } else {
            this.$sex.error = "";
        }

        if (password == '') {
            isPassed = false;
            this.$password.error = "Nhập vào mật khẩu"
        } else {
            this.$password.error = "";
        }

        if (passwordConfirmation == '' || passwordConfirmation != password) {
            isPassed = false;
            this.$passwordConfirmation.error = "Xác thực mật khẩu không đúng";
        } else {
            this.$passwordConfirmation.error = "";
        }

        return isPassed;
    }
}



window.customElements.define('form-register', FormRegister);