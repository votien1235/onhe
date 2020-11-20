import { getCurrentUser, getDataFromDoc } from "./utils.js";

let $app = document.getElementById('app');

let root = null;
let useHash = true;

let hash = '#'


let router = new Navigo(root, useHash, hash);

// đăng nhập
router.on('/sign-in', function () {
    $app.innerHTML = `<form-login></form-login>`;
}).resolve();

router.on('/sign-up', function () {
    $app.innerHTML = `<form-register></form-register>`;
}).resolve();

router.on("/student-profile", async function () {
    let currentUser = getCurrentUser();
    let result = await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.id)
        .get();
    console.log(getDataFromDoc(result));

    let studentProfileData = getDataFromDoc(result);
    $app.innerHTML = `<student-profile id="${studentProfileData.id}"></student-profile>`;
});
window.router = router;

router.on("/object-list", async function () {
    let currentUser = getCurrentUser();
    let result = await firebase
        .firestore()
        .collection("ObjectList")
        .where("owner", "==", currentUser.id)
        .get();

    console.log(getDataFromDoc(result.docs[0]));

    let ObjectListData = getDataFromDoc(result.docs[0]);

    let $objectList = document.createElement("object-list");
    $objectList.setAttribute("id", ObjectListData.id);
    $objectList.setObjects(ObjectListData.objects);
    $app.appendChild($objectList);
}).resolve();

window.router = router;
