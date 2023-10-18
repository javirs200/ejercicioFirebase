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
    str += `<h2>id : ${d.id}</h2>`;
    str += `<h3>name : ${d.data().name}</h2>`;
    str += `<h3>email : ${d.data().email}</h2>`;
    str += `<h3>imgUrl : ${d.data().imgUrl}</h2>`;
    str += `<h3>msg : ${d.data().msg}</h2>`;
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
const deleteUser = (id) => {
  console.log(id);
  db.collection('Usuarios').doc(id).delete().then(() => {
    alert(`Usuario ${id} ha sido borrado`);
    readAll();
  })
    .catch(() => console.log('Error borrando documento'));
};

//Borrar todos los usuarios
const deleteAllUsers = () => {
  //primero get ids de todos 
  db.collection("Usuarios")
  .get()
  .then((querySnapshot) => {
    for (const doc of querySnapshot.docs) {
      db.collection('Usuarios').doc(doc.id).delete()
    }
    readAll();
  })
  .catch(() => console.log('Error reading documents'));
  //luego borrar en for
};

document.getElementById('deleteAll').addEventListener('click', () => {
  deleteAllUsers();
});

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

document.getElementById("deleteUser")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const deleteid = event.target.nameDelete.value;

    deleteUser(deleteid);

});
