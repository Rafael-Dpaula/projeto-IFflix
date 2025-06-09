var obras = [];

function addLista() {
    obras.forEach(o => {
        let tr = document.createElement('tr');
        tr.id = "fieldList";
        let id = document.createElement('td');
        let titulo = document.createElement('td');//titulo
        let tipo = document.createElement('td');//tipo
        let lancamento = document.createElement('td');//ano
        let assistido = document.createElement('td');//assistido
        let assitidoCheck = document.createElement('input');
        assitidoCheck.type = "checkbox";
        assitidoCheck.checked = o.assistido;
        assitidoCheck.disabled = true;
        let edicao = document.createElement('td');//editar
        let exclusao = document.createElement('td');//excluir

        let excluir = document.createElement('button');
        let editar = document.createElement('button');
        let iEx = document.createElement('i');
        let iEd = document.createElement('i');
        iEx.classList.add("fa-regular");
        iEx.classList.add("fa-trash-alt");
        iEd.classList.add("fa-regular");
        iEd.classList.add("fa-edit");
        excluir.appendChild(iEx);
        editar.appendChild(iEd);
        edicao.appendChild(editar);
        exclusao.appendChild(excluir);

        id.textContent = o.id;
        titulo.textContent = o.titulo;
        tipo.textContent = o.tipo;
        lancamento.textContent = o.lancamento;
        assistido.appendChild(assitidoCheck);
        tr.appendChild(id);
        tr.appendChild(titulo);
        tr.appendChild(tipo);
        tr.appendChild(lancamento);
        tr.appendChild(assistido);
        tr.appendChild(edicao);
        tr.appendChild(exclusao);
        document.getElementById("listaF").appendChild(tr);

    });

}

function addObras() {
    if (formCheck()) {
        let titulo = document.getElementById("titulo").value;
        let tipo = document.getElementById("tipoSelect").value;
        let lancamento = new Date().toLocaleDateString();

        let capaInput = document.getElementById("capa");
        let capaFile = capaInput.files[0];
        let capaURL = capaFile ? URL.createObjectURL(capaFile) : "../img/img-filme-sem-capa.jpg";

        let assistido = true;
        let id = obras.length + 1;
        obras.push({ id: id, titulo: titulo, tipo: tipo, lancamento: lancamento, assistido: assistido, capa: capaURL });
        alert("inserido com sucesso");
        addLista();
        limparCampos();
    }
}

function limparCampos() {
    document.getElementById("titulo").value = "";
    document.getElementById("tipoSelect").value = "selecionar";
    document.getElementById("capa").value = "";
    document.getElementById("titulo").style = "border: 1px solid white; color: white;";
    document.getElementById("labeltitulo").style = "color: white;";
    document.getElementById("tipoSelect").style = "border: 1px solid white; color: white;";
}

function formCheck() {
    if (document.getElementById("titulo").value.length == 0) {
        document.getElementById("titulo").style = "border: 1px solid red; color:red;";
        document.getElementById("labeltitulo").style = " color:red;";
        return false;
    }
    else if(document.getElementById("tipoSelect").value == "selecionar"){
        document.getElementById("tipoSelect").style = "border:1px solid red; color:red;";
        return false;
    }
    else{
        return true;

    }
}

let btnAdd = document.querySelector("#btnAdd");
btnAdd.addEventListener("click", addObras);
