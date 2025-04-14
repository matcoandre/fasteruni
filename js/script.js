async function pasuser(form) {
    const data = await (await fetch('http://localhost:8083/users')).json()

    let found = 0
    for (let i = 0; i < data.length; i++) {
        username = data[i].user
        password = data[i].password

        if (form.user.value == username) {
            found = 1
        }

        if (form.user.value == username && form.pw.value == password) {
            found = 2
            role = data[i].role
        }

        if (found != 0)
            break
    }

    if (found == 0){
        alert("Username e password errati. Riprova.")
    } else if (found == 1){
        alert("Password errata. Riprova.")
    } else if (found == 2){
        location = "./html/main" + role + ".html"
    }
}

async function checkUser(e) {
    const name = document.querySelector('#user')
    
    const res = await fetch('http://localhost:8083/users')
    const data = await res.json()

    for(var i = 0; i < data.length; i++){
      if (data[i].user == name.value) {
        $('#submit').prop('disabled', true);
        name.classList.add('!border-red-500')
        break
      } else {
        name.classList.remove('!border-red-500')
        $('#submit').prop('disabled', false);
      }
    }
}

function del(obj, id){
    if(confirm("Sei sicuro di rimuovere l'utente selezionato?")) {
      obj.parentNode.parentNode.remove()
      fetch('http://localhost:8083/users/delete/' + id)
    }
}

function edit(obj, id){
    var pass = prompt("Inserisci la nuova password per l'utente numero " + id + ":")
    if(pass == null){
      alert("La password non è stata cambiata.")
    } else {
      fetch('http://localhost:8083/users/edit/' + id + '/' + pass)
      alert("Password cambiata con successo.")
    }
}

function add(obj){
    fetch('http://localhost:8083/users/add')
}

function notificaScomparsa(string) {
  var x = document.getElementById("snackbar");
  x.className = "show";
  x.textContent = string;
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}



// function makeid(length) {
//     var result           = '';
//     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var charactersLength = characters.length;
//     for ( var i = 0; i < length; i++ ) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//    }
//    document.getElementById('code').innerHTML += '<h1 class="text-3xl font-semibold dark:text-neutral-100 text-neutral-900 text-center"> ' + result + '</h1>'
// }

