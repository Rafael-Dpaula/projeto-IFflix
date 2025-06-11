var obras = [];
var series = [];
var filmes = [];

function salvar() {
    let dadosO = JSON.stringify(obras);
    localStorage.setItem('obras', dadosO);
    obras.forEach(o => {
        if (o.tipo == "filme") {
            filmes.push(o);
        }
        else {
            series.push(o);
        }
    })
    let dadosF = JSON.stringify(filmes);
    localStorage.setItem('filmes', dadosF);

    let dadosS = JSON.stringify(series);
    localStorage.setItem('series', dadosS);
}

function mostrartbl() {
    if (localStorage.hasOwnProperty("obras")) {
        obras = JSON.parse(localStorage.getItem("obras"));
        limparLista();
        limparObras();
        obras.forEach(o => {
            addLista(o);
            addHome(o);
            if(o.tipo == 'filme') {
                addFilme(o);
            }
            else {
                addSerie(o);
            }

        });
    }
}

window.addEventListener('load', () => {
    mostrartbl(); 
});


function addLista(o) {
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
        iEx.id = 'btnRem';
        iEd.id = 'btnAlt';
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
}

function addHome(o) {
        let conteudo = document.createElement('div');
        conteudo.classList.add("conteudo");
        let img = document.createElement('img');
        img.src = o.capa;
        let titulo = document.createElement('h4');
        titulo.textContent = o.titulo;
        let data = document.createElement('h4');
        let dataI = document.createElement('i');
        dataI.classList.add("fa-regular");
        dataI.classList.add("fa-calendars");
        dataI.textContent = o.lancamento;
        data.appendChild(dataI);
        conteudo.appendChild(img);
        conteudo.appendChild(titulo);
        conteudo.appendChild(data);
        if (o.id >= obras.length - 4) {
            document.getElementById("lancamentosHome").appendChild(conteudo);
        } if (o.id < obras.length - 4) {
            document.getElementById("geralHome").appendChild(conteudo);
        }
}
function addFilme(o) {
        let conteudo = document.createElement('div');
        conteudo.classList.add("conteudo");
        let img = document.createElement('img');
        img.src = o.capa;
        let titulo = document.createElement('h4');
        titulo.textContent = o.titulo;
        let data = document.createElement('h4');
        let dataI = document.createElement('i');
        dataI.classList.add("fa-regular");
        dataI.classList.add("fa-calendars");
        dataI.textContent = o.lancamento;
        data.appendChild(dataI);
        conteudo.appendChild(img);
        conteudo.appendChild(titulo);
        conteudo.appendChild(data);
        if (o.id >= obras.length - 4 && o.tipo == 'filme') {
            document.getElementById("lancamentosFilme").appendChild(conteudo);
        } if (o.id < obras.length - 4 && o.tipo == 'filme') {
            document.getElementById("geralFilme").appendChild(conteudo);
        }
}
function addSerie(o) {
        let conteudo = document.createElement('div');
        conteudo.classList.add("conteudo");
        let img = document.createElement('img');
        img.src = o.capa;
        let titulo = document.createElement('h4');
        titulo.textContent = o.titulo;
        let data = document.createElement('h4');
        let dataI = document.createElement('i');
        dataI.classList.add("fa-regular");
        dataI.classList.add("fa-calendars");
        dataI.textContent = o.lancamento;
        data.appendChild(dataI);
        conteudo.appendChild(img);
        conteudo.appendChild(titulo);
        conteudo.appendChild(data);
        if (o.id >= obras.length - 4 && o.tipo == 'serie') {
            document.getElementById("lancamentosSerie").appendChild(conteudo);
        } if (o.id < obras.length - 4 && o.tipo == 'serie') {
            document.getElementById("geralSerie").appendChild(conteudo);
        }
}

function limparObras() {
    document.getElementById("geralHome").innerHTML = "";
    document.getElementById("lancamentosHome").innerHTML = "";
}

function limparLista() {
    document.getElementById("listarFilmes").innerHTML = "";
}

function removeObras(id) {
    obras = obras.filter(o => o.id != id);
    document.getElementById("fieldList").remove();
}

function addObras() {
    if (formCheck()) {
        let titulo = document.getElementById("titulo").value;
        let tipo = document.getElementById("tipoSelect").value;
        let lancamento = new Date().toLocaleDateString();

        let capaInput = document.getElementById("capa");
        let capaFile = capaInput.files[0];
        let capaURL = capaFile ? URL.createObjectURL(capaFile) : "../img/img-filme-sem-capa.jpg";

        let assistido = false;
        let id = obras.length + 1;
        obras.push({ id: id, titulo: titulo, tipo: tipo, lancamento: lancamento, assistido: assistido, capa: capaURL });
        alert("inserido com sucesso");
        salvar();
        mostrartbl();
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
    else if (document.getElementById("tipoSelect").value == "selecionar") {
        document.getElementById("tipoSelect").style = "border:1px solid red; color:red;";
        return false;
    }
    else {
        return true;

    }
}

let btnAdd = document.querySelector("#btnAdd");
btnAdd.addEventListener("click", addObras);
