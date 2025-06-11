var obras = [];
var filmes = [];
var series = [];

function salvar() {
    let dadosO = JSON.stringify(obras);
    localStorage.setItem('obras', dadosO);
    filmes =[];
        series = [];
        obras.forEach(fs => {
            if (fs.tipo == 'filme') {
                filmes.push(fs);
            }
            else {
                series.push(fs);
            }
        });
    let dadosF = JSON.stringify(filmes);
    localStorage.setItem('filmes', dadosF);
    let dadosS = JSON.stringify(series);
    localStorage.setItem('series', dadosS);
    mostrartbl();
}

function mostrartbl() {
    if (localStorage.hasOwnProperty("obras")) {
        obras = JSON.parse(localStorage.getItem("obras"));
        if(localStorage.hasOwnProperty("filmes")){
            filmes = JSON.parse(localStorage.getItem("filmes"));
        }
        if(localStorage.hasOwnProperty("series")){
            series = JSON.parse(localStorage.getItem("series"));
        }
        limparLista();
        limparObras();
        obras.forEach((o, index) => {
            addLista(o);
            addHome(o);
        });
        filmes.forEach((f, index) => {
            addFilme(f, index);
        });
        series.forEach((s, index) => {
            addSerie(s, index);
        });
    }
}
function search() {
    if (localStorage.hasOwnProperty("obras")) {
        limparObras();
        let busca = document.getElementById('busca').value;
        let finder = false;

        if(busca.toLowerCase() == ""){
            mostrartbl();
        }
        obras.forEach(o => {
            if (o.titulo.toLowerCase() == busca.toLowerCase()) {
                document.getElementById("lancaMsg").style = "display:none;";
                document.getElementById("outrosMsg").textContent = "Busca: " + busca;
                addHome(o);
                finder = true;
            }
        });
        if(finder == false){
            document.getElementById("lancaMsg").style = "display:none;";
            document.getElementById("outrosMsg").textContent = "Nenhum resultado encontrado para: " + busca;
        }

    }
}

window.addEventListener('load', () => {
    mostrartbl();
});

function test(){
    for(var i = 0; i < 15; i++){
        let id, titulo, tipo, lancamento, capa="../img/img-filme-sem-capa.jpg";
        id = obras.length+1;
        titulo = "teste" + id;
        if(i%2 == 0){
            tipo = "filme";
        }else{
            tipo = "serie";
        }
        lancamento = new Date().toLocaleDateString();
        let assistido = false;
        let test = { id: id, titulo: titulo, tipo: tipo, lancamento: lancamento, assistido: assistido, capa: capa };
        console.log(test);
        obras.push(test);
    }
    salvar();
}


function addLista(o) {
    let tr = document.createElement('tr');
    tr.id = "fieldList";
    let id = document.createElement('td');
    let titulo = document.createElement('td');//titulo
    let tipo = document.createElement('td');//tipo
    let lancamento = document.createElement('td');//ano
    let assistidoTd = document.createElement('td');//assistido
    let assitidoCheck = document.createElement('input');
    assitidoCheck.type = "checkbox";
    assitidoCheck.checked = o.assistido === true;
    assitidoCheck.disabled = true;
    let edicao = document.createElement('td');//editar
    let exclusao = document.createElement('td');//excluir

    let excluir = document.createElement('button');
    excluir.type = "button";
    let editar = document.createElement('button');
    editar.type = "button";
    let iEx = document.createElement('i');
    let iEd = document.createElement('i');
    excluir.id = 'btnRem';
    editar.id = 'btnAlt';
    iEx.classList.add("fa-regular");
    iEx.classList.add("fa-trash-alt");
    iEd.classList.add("fa-regular");
    iEd.classList.add("fa-edit");
    excluir.appendChild(iEx);
    editar.appendChild(iEd);
    edicao.appendChild(editar);
    exclusao.appendChild(excluir);

    excluir.addEventListener("click", Excluir);

    id.textContent = o.id;
    titulo.textContent = o.titulo;
    tipo.textContent = o.tipo;
    lancamento.textContent = o.lancamento;
    assistidoTd.appendChild(assitidoCheck);
    tr.appendChild(id);
    tr.appendChild(titulo);
    tr.appendChild(tipo);
    tr.appendChild(lancamento);
    tr.appendChild(assistidoTd);
    tr.appendChild(edicao);
    tr.appendChild(exclusao);
    document.getElementById("listarFilmes").appendChild(tr);
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
    if (o.id >= obras.length-4) {
        document.getElementById("lancamentosHome").appendChild(conteudo);
    } if (o.id < obras.length - 4) {
        document.getElementById("geralHome").appendChild(conteudo);
    }
}
function addFilme(o, index) {
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
    if (index >= filmes.length - 5 && o.tipo == 'filme') {
        document.getElementById("lancamentosFilme").appendChild(conteudo);
    } if (index < filmes.length - 5 && o.tipo == 'filme') {
        document.getElementById("geralFilme").appendChild(conteudo);
    }
}
function addSerie(o, index) {
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
    if (index >= series.length - 5 && o.tipo == 'serie') {
        document.getElementById("lancamentosSerie").appendChild(conteudo);
    } if (index < series.length -5 && o.tipo == 'serie') {
        document.getElementById("geralSerie").appendChild(conteudo);
    }
}

function limparObras() {
    document.getElementById("geralHome").innerHTML = "";
    document.getElementById("lancamentosHome").innerHTML = "";
    document.getElementById("geralFilme").innerHTML = "";
    document.getElementById("lancamentosFilme").innerHTML = "";
    document.getElementById("geralSerie").innerHTML = "";
    document.getElementById("lancamentosSerie").innerHTML = "";
}

function limparLista() {
    document.getElementById("listarFilmes").innerHTML = "";
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

function Alterar() {
    linha = this.parentElement.parentElement;
    var ind = linha.rowIndex - 1;
    var obra = obras[ind];

    document.getElementById('tituloAlt').value = obra.titulo;
    document.getElementById('capaAlt').value = obra.capa;
    document.getElementById('tipoAlt').value = obra.tipo;
}

function Excluir() {
    var lin = this.parentElement.parentElement;
    var ind = lin.rowIndex;
    if (confirm("Confirma a exclusão do Filme/Serie? "+obras[ind-1].titulo)) {
        obras.splice(ind - 1, 1);
        document.getElementById('listaF').deleteRow(ind);
        salvar();
    }
}

let btnAdd = document.querySelector("#btnAdd");
let btnSearch = document.querySelector("#searchBtn");
let btnTeste = document.querySelector("#btnTeste");
btnSearch.addEventListener("click", search);
btnAdd.addEventListener("click", addObras);
btnTeste.addEventListener("click", test);
