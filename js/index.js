function carregarTabela() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://www.mecallapi.com/api/users");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var trHTML = '';
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {
                trHTML += '<tr>';
                trHTML += '<td>' + object['id'] + '</tr>';
                trHTML += '<td><img width="50px" src="' + object['avatar'] + '" class="avatar"></td>';
                trHTML += '<td>' + object['fname'] + '</td>';
                trHTML += '<td>' + object['lname'] + '</td>';
                trHTML += '<td>' + object['username'] + '</td>';
                trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="mostrarCaixaEdicaoUsuario(' + object['id'] + ')">Editar</button>';
                trHTML += '<button type="button" class="btn btn-outline-danger" onclick="deletarUsuario(' + object['id'] + ')">Excluir</button></td>';
                trHTML += "</tr>";
            }
            document.getElementById("minhaTabela").innerHTML = trHTML;
        }
    };
}

carregarTabela();


function mostrarCaixaCriacaoUsuario() {
    swal.fire({
        title: "Novo Usuário",
        html: '<input id="id" type="hidden">' +
            '<input id="fname" class="swal2-input" placeholder="Nome">' +
            '<input id="lname" class="swal2-input" placeholder="Sobrenome">' +
            '<input id="username" class="swal2-input" placeholder="Usuário">' +
            '<input id="email" class="swal2-input" placeholder="Email">',

        focusConfirm: false,
        preConfirm: () => {
            criarUsuario();
        }

    })
}

function criarUsuario() {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://www.mecallapi.com/api/users/create");
    xhttp.setRequestHeader("Content-Type", "application/json; charset = UTF-8");
    xhttp.send(JSON.stringify({
        "fname": fname,
        "lname": lname,
        "username": username,
        "email": email,
        "avatar": "https://www.mecallapi.com/users/cat.png"
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects['message']);

            carregarTabela();
        }
    };
}


function mostrarCaixaEdicaoUsuario(id) {

    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://www.mecallapi.com/api/users/" + id);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            const user = objects['user'];
            console.log(user);
            Swal.fire({
                title: 'Editar Usuário',
                html: '<input id="id" type="hidden" value=' + user['id'] + '>' +
                    '<input id="fname" class="swal2-input" placeholder="Nome" value="' + user['fname'] + '">' +
                    '<input id="lname" class="swal2-input" placeholder="Sobrenome" value="' + user['lname'] + '">' +
                    '<input id="username" class="swal2-input" placeholder="Usuário" value="' + user['username'] + '">' +
                    '<input id="email" class="swal2-input" placeholder="Email" value="' + user['email'] + '">',
                focusConfirm: false,
                preConfirm: () => {
                    editarUsuario();
                }
            })
        }
    };
}

function editarUsuario() {

    const id = document.getElementById("id").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "https://www.mecallapi.com/api/users/update");
    xhttp.setRequestHeader("Content-Type", "application/json; charset = UTF-8");
    xhttp.send(JSON.stringify({
        "id": id,
        "fname": fname,
        "lname": lname,
        "username": username,
        "email": email,
        "avatar": "https://www.mecallapi.com/users/cat.png"
    }));

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects['message']);

            carregarTabela();
        }
    };
}

function deletarUsuario(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "https://www.mecallapi.com/api/users/delete");
    xhttp.setRequestHeader("Content-Type", "application/json; charset = UTF-8");
    xhttp.send(JSON.stringify({
        "id": id
    }));

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects['message']);

            carregarTabela();
        }
    };
}