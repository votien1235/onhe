const $template = document.getElementById("object-list-template");

export class ObjectList extends HTMLElement {
  id = "";
  objects = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.append($template.content.cloneNode(true));

    this.$objects = this.shadowRoot.getElementById("objects");
    this.$name = this,this.shadowRoot.getElementById("name");
  }

  static get observedAttributes() {
    return ["id","name"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log("test");
    if(name == 'id') {
        this.id = newValue;
        console.log(this.id);
    } else if(name="name"){
        this.name = newValue;
    }
    this.render();
  }

  setObjects(objects) {
    this.objects = objects;
    console.log(this.objects);
    this.render();
  }

  //   update() {
  //     let foundObject = this.objects.find(function (item) {
  //       return item.id === object.id;
  //     });

  //     if (foundObject != null) {
  //       foundObject.content = object.content;
  //     }
  //     firebase.firestore().collection("ObjectList").doc(this.id).update({
  //       objects: this.objects,
  //     });
  //   }

  render() {
    console.log(this.id);
    this.$name.innerHTML = "Danh sach hoc phan" + this.id;
    console.log(this.objects);
    this.$objects.innerHTML = this.objects.map(function(object) {
        return `
            <object-container 
                number="${object.number}"
                object-id="${object.objectId}"
                object-name="${object.objectName}"
                teacher-name="${object.teacherName}"
                class="${object.class}"
                number-tc="${object.numberTc}"
                tuition="${object.tuition}">
            </object-container>`
      })
      .join("");
  }
}

window.customElements.define("object-list", ObjectList);
