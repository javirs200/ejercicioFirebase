const firebaseConfig = {
  apiKey: "AIzaSyAPOff8lzBBnwASnqZszIixszHV1YpSCKk",
  authDomain: "ejerciciofb-53371.firebaseapp.com",
  projectId: "ejerciciofb-53371",
  storageBucket: "ejerciciofb-53371.appspot.com",
  messagingSenderId: "334540955901",
  appId: "1:334540955901:web:155021238a0d26b3971e94"
};

firebase.initializeApp(firebaseConfig);// Inicializaar app Firebase

const db = firebase.firestore();// db representa mi BBDD //inicia Firestore


function updateDom(data) {
  let str = "";
  for (const d of data) {
    str += "<div>";
    str += `<h2>name : ${d.data().name}</h2>`;
    str += `<h2>email : ${d.data().email}</h2>`;
    str += `<h2>imgUrl : ${d.data().imgUrl}</h2>`;
    str += `<h2>msg : ${d.data().msg}</h2>`;
    str += "</div>";
  }
  document.getElementById("print").innerHTML = str;
}

function createDocumentDB(user) {
  db.collection("Usuarios")
        .add(user)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id)
        })
        .catch((error) => console.error("Error adding document: ", error));
}

function readAll() {
  db.collection("Usuarios")
        .get()
        .then((querySnapshot) => {
              updateDom(querySnapshot.docs);
        })
        .catch(() => console.log('Error reading documents'));
}

function storageData(user) {
  createDocumentDB(user)
}

//Borrar un usuario
const deletePicture = () => {
  const id = prompt('Introduce el ID a borrar');
  db.collection('Usuarios').doc(id).delete().then(() => {
    alert(`Documento ${id} ha sido borrado`);
  })
    .catch(() => console.log('Error borrando documento'));
};

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = event.target.name.value;
  const email = event.target.email.value;
  const imgUrl = event.target.imgUrl.value;
  const msg = event.target.msg.value;

  let user = { name: name, email: email, imgUrl: imgUrl, msg: msg };

  storageData(user);

  readAll();
});

/*document
  .getElementById("deleteUser")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const deleteUser = event.target.nameDelete.value;

    let data = JSON.parse(localStorage.getItem("users"));

    data = data.filter((el) => el.name !== deleteUser);

    localStorage.setItem("users", JSON.stringify(data));

    updateDom(data)
  });

document.getElementById("delete").addEventListener("click", function () {
  localStorage.setItem("users", JSON.stringify([]));
  updateDom([])
});*/
