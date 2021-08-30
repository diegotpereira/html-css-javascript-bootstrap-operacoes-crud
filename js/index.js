function carregarTabela() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8080/api/usuarios");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var trHTML = '';
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {
                trHTML += '<tr>';
                trHTML += '<td>' + object['id'] + '</td>';
                trHTML += '<td><img width="50px" src="' + object['imageURL'] + '" class="imageURL"></td>';
                trHTML += '<td>' + object['nome'] + '</td>';
                trHTML += '<td>' + object['sobrenome'] + '</td>';
                trHTML += '<td>' + object['usuario'] + '</td>';
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
            '<input id="imageURL" class="swal2-input" placeholder="Imagem de Perfil">' +
            '<input id="nome" class="swal2-input" placeholder="Nome">' +
            '<input id="sobrenome" class="swal2-input" placeholder="Sobrenome">' +
            '<input id="usuario" class="swal2-input" placeholder="Usuário">' +
            '<input id="email" class="swal2-input" placeholder="Email">',

        focusConfirm: false,
        preConfirm: () => {
            criarUsuario();
        }

    })
}

function criarUsuario() {

    const imageURL = document.getElementById("imageURL").value;
    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const usuario = document.getElementById("usuario").value;
    const email = document.getElementById("email").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8080/api/add");
    xhttp.setRequestHeader("Content-Type", "application/json; charset = UTF-8");
    xhttp.send(JSON.stringify({
        "nome": nome,
        "sobrenome": sobrenome,
        "usuario": usuario,
        "email": email,
        "imageURL": imageURL
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
    xhttp.open("GET", "http://localhost:8080/api/usuarios/" + id);
    xhttp.send();
    console.log(this.responseText);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            const usuario = objects['usuario'];
            console.log(usuario);
            Swal.fire({
                title: 'Editar Usuário',
                html: '<input id="id" type="hidden" value=' + usuario['id'] + '>' +
                    '<input id="imageURL" class="swal2-input" placeholder="Imagem de Perfil" value="' + usuario['imageURL'] + '">' +
                    '<input id="nome" class="swal2-input" placeholder="Nome" value="' + usuario['nome'] + '">' +
                    '<input id="sobrenome" class="swal2-input" placeholder="Sobrenome" value="' + usuario['sobrenome'] + '">' +
                    '<input id="usuario" class="swal2-input" placeholder="Usuário" value="' + usuario['usuario'] + '">' +
                    '<input id="email" class="swal2-input" placeholder="Email" value="' + usuario['email'] + '">',
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
    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const usuario = document.getElementById("usuario").value;
    const email = document.getElementById("email").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:8080/api/usuario");
    xhttp.setRequestHeader("Content-Type", "application/json; charset = UTF-8");
    xhttp.send(JSON.stringify({
        "id": id,
        "nome": nome,
        "sobrenome": sobrenome,
        "usuario": usuario,
        "email": email,
        "imageURL": imageURL
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