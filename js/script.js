var obras = [];
var filmes = [];
var series = [];
var assistidos = [];

window.addEventListener('load', () => {
    mostrartbl();
});
function salvar() {
    let dadosO = JSON.stringify(obras);
    localStorage.setItem('obras', dadosO);
    filmes = [];
    series = [];
    assistidos = [];
    obras.forEach(fs => {
        if (fs.tipo == 'filme') {
            filmes.push(fs);
        }
        if(fs.assistido == true){
            assistidos.push(fs);
        }
        if (fs.tipo == 'serie') {
            series.push(fs);
        }
    });
    let dadosF = JSON.stringify(filmes);
    localStorage.setItem('filmes', dadosF);
    let dadosS = JSON.stringify(series);
    localStorage.setItem('series', dadosS);
    let dadosA = JSON.stringify(assistidos);
    localStorage.setItem('assistidos', dadosA);
    mostrartbl();
}

function mostrartbl() {
    if (localStorage.hasOwnProperty("obras")) {
        obras = JSON.parse(localStorage.getItem("obras"));
        if (localStorage.hasOwnProperty("filmes")) {
            filmes = JSON.parse(localStorage.getItem("filmes"));
        }
        if (localStorage.hasOwnProperty("series")) {
            series = JSON.parse(localStorage.getItem("series"));
        }
        if (localStorage.hasOwnProperty("assistidos")) {
            assistidos = JSON.parse(localStorage.getItem("assistidos"));
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
        assistidos.forEach((a, index) => {
            addAssistidos(a, index);
        });
    }
}
function search() {
    if (localStorage.hasOwnProperty("obras")) {
        limparObras();
        const busca = document.getElementById('busca').value;
        const regex = new RegExp(busca, 'i');
        let finder = false;

        if (busca === "") {
            document.getElementById("lancaMsg").style = "display:block;";
            document.getElementById("outrosMsg").textContent = "Outros títulos disponíveis "
            mostrartbl();
            return 0;
        }
        obras.forEach(o => {
            if (o.titulo.search(regex) == busca.search(regex)) {
                document.getElementById("lancaMsg").style = "display:none;";
                document.getElementById("outrosMsg").textContent = "Busca: " + busca;
                addHomeSearch(o);
                finder = true;
            }
        });
        if (finder == false) {
            document.getElementById("lancaMsg").style = "display:none;";
            document.getElementById("outrosMsg").textContent = "Nenhum resultado encontrado para: " + busca;
        }

    }
}

function test() {
    for (var i = 0; i < 15; i++) {
        let id, titulo, tipo, lancamento, capa = "../img/img-filme-sem-capa.jpg";
        id = obras.length + 1;
        titulo = "teste" + id;
        if (i % 2 == 0) {
            tipo = "filme";
        } else {
            tipo = "serie";
        }
        lancamento = new Date().toLocaleDateString();
        let assistido = false;
        let test = { id: id, titulo: titulo, tipo: tipo, lancamento: lancamento, assistido: assistido, capa: capa };
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
    editar.addEventListener("click", Alterar);

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

function addHomeSearch(o) {
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
    document.getElementById("geralHome").appendChild(conteudo);
}
function addHome(o) {
    let conteudo = document.createElement('div');
    conteudo.id = o.id;
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
    conteudo.addEventListener("click", fullView);
    if (o.id >= obras.length - 4) {
        document.getElementById("lancamentosHome").appendChild(conteudo);
    } if (o.id < obras.length - 4) {
        document.getElementById("geralHome").appendChild(conteudo);
    }
}
function addFilme(o, index) {
    let conteudo = document.createElement('div');
    conteudo.id = o.id;
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
    conteudo.addEventListener("click", fullView);
    if (index >= filmes.length - 5 && o.tipo == 'filme') {
        document.getElementById("lancamentosFilme").appendChild(conteudo);
    } if (index < filmes.length - 5 && o.tipo == 'filme') {
        document.getElementById("geralFilme").appendChild(conteudo);
    }
}
function addAssistidos(o, index) {
    let conteudo = document.createElement('div');
    conteudo.id = o.id;
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
    conteudo.addEventListener("click", fullView);
    document.getElementById("geralAssistidos").appendChild(conteudo);
}
function addSerie(o, index) {
    let conteudo = document.createElement('div');
    conteudo.id = o.id;
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
    conteudo.addEventListener("click", fullView);
    if (index >= series.length - 5 && o.tipo == 'serie') {
        document.getElementById("lancamentosSerie").appendChild(conteudo);
    } if (index < series.length - 5 && o.tipo == 'serie') {
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
    document.getElementById("geralAssistidos").innerHTML = "";
}

function limparLista() {
    document.getElementById("listarFilmes").innerHTML = "";
}

function addObras() {
    if (formCheck()) {
        let titulo = document.getElementById("titulo").value;
        let tipo = document.getElementById("tipoSelect").value;
        let lancamento = new Date().toLocaleDateString();

        let capaFile = document.getElementById("capa").files[0];
        let capaURL = capaFile ? URL.createObjectURL(capaFile) : "../img/img-filme-sem-capa.jpg";

        let assistido = false;
        let id = obras.length + 1;
        obras.push({ id: id, titulo: titulo, tipo: tipo, lancamento: lancamento, assistido: assistido, capa: capaURL });
        alert("inserido com sucesso");
        salvar();
        mostrartbl();
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
    document.getElementById("alterForm").style.display = "block";
    let linha = this.parentElement.parentElement;
    let ind = linha.rowIndex - 1;
    let obra = obras[ind];

    document.getElementById('tituloAlt').value = obra.titulo;
    document.getElementById('tipoSelectAlt').value = obra.tipo;

    let btnSalvarAlt = document.querySelector("#btnAlter");
    btnSalvarAlt.replaceWith(btnSalvarAlt.cloneNode(true));
    btnSalvarAlt = document.querySelector("#btnAlter");
    btnSalvarAlt.addEventListener("click", () => salvarAlterar(obra));
}

function salvarAlterar(obra) {
    if (confirm("Confirma a alteração do Filme/Serie " + obra.titulo + "?")) {

        let titulo = document.getElementById("tituloAlt").value;
        let capaAltFile = document.getElementById("capa").files[0];
        let capaURL = capaAltFile ? URL.createObjectURL(capaAltFile) : "../img/img-filme-sem-capa.jpg";
        let tipo = document.getElementById("tipoSelectAlt").value;
        obras.forEach(o => {
            if (o.id === obra.id) {
                o.titulo = titulo;
                o.tipo = tipo;
                o.lancamento = new Date().toLocaleDateString();
                o.capa = capaURL;
            }
        })
        salvar();
        mostrartbl();
        fecharAlt();
    };
}

function fecharAlt() {
    document.getElementById("alterForm").style.display = "none";
}
function fecharFullView() {
    document.getElementById("fullView").style.display = "none";
    document.getElementById("fullView").innerHTML = "";
    document.removeEventListener("click", fecharAoClicarFora);
}

function fullView() {
    if (document.getElementById("fullView").style.display == "flex") {
        fecharFullView();
    };
    const fullViewContainer = document.getElementById("fullView");
    fullViewContainer.innerHTML = "";
    fullViewContainer.style = "display:flex !important;";

    let h3 = document.createElement('h3');
    h3.textContent = "Full View Mode";
    h3.classList.add("titleFV");
    fullViewContainer.appendChild(h3);



    let obraId = Number(this.id);

    let obra = obras.find(o => o.id === obraId);
    if (!obra) {
        alert("Obra não encontrada no id:", obraId);
        return;
    }

    let imgContainer = document.createElement('div');
    imgContainer.id = "imgContainerFV";
    let img = document.createElement('img');
    img.src = obra.capa;
    img.id = "capaFV";
    imgContainer.appendChild(img);
    fullViewContainer.appendChild(imgContainer);

    let textContainer = document.createElement('div');
    textContainer.id = "textContainerFV";


    let Mtitulo = document.createElement('h1');
    Mtitulo.textContent = "Titulo: ";
    textContainer.appendChild(Mtitulo);

    let titulo = document.createElement('h2');
    titulo.textContent = obra.titulo;
    titulo.id = "tituloFV";
    textContainer.appendChild(titulo);

    let Mtipo = document.createElement('h1');
    Mtipo.textContent = "Tipo: ";
    textContainer.appendChild(Mtipo);
    let tipo = document.createElement('h2');
    tipo.textContent = obra.tipo;
    tipo.id = "tipoFV";
    textContainer.appendChild(tipo);

    let Mlancamento = document.createElement('h1');
    Mlancamento.textContent = "Lançamento: ";
    textContainer.appendChild(Mlancamento);
    let lancamento = document.createElement('h2');
    lancamento.textContent = obra.lancamento;
    lancamento.id = "lancamentoFV";
    textContainer.appendChild(lancamento);

    fullViewContainer.appendChild(textContainer);

    let btn = document.createElement('button');
    btn.textContent = "X";
    btn.type = "button";
    btn.addEventListener("click", fecharFullView);
    btn.id = "fecharFullView";
    fullViewContainer.appendChild(btn);

    //checkbox de assitido
    const container = document.createElement('div');
    container.className = 'container';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.gap = '10px';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'cbx2';
    input.checked = obra.assistido;
    input.style.display = 'none';

    input.addEventListener("change", function () {
        if (obra) {
            obra.assistido = this.checked;
            salvar();
        }
    });


    const label = document.createElement('label');
    label.setAttribute('for', 'cbx2');
    label.className = 'check';

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "36px");
    svg.setAttribute("height", "36px");
    svg.setAttribute("viewBox", "0 0 18 18");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z");

    const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    polyline.setAttribute("points", "1 9 7 14 15 4");

    const texto = document.createElement('span');
    texto.textContent = 'Assistido';
    texto.classList.add('textoCheckAssistido');
    texto.style.color = 'white';

    container.appendChild(texto);
    svg.appendChild(path);
    svg.appendChild(polyline);
    label.appendChild(svg);


    container.appendChild(input);
    container.appendChild(label);

    document.getElementById("textContainerFV").appendChild(container);
    setTimeout(() => {
        document.addEventListener("click", fecharAoClicarFora);
    }, 10);
}

function fecharAoClicarFora(event) {
    const fullView = document.getElementById("fullView");
    if (fullView.style.display !== "none" && !fullView.contains(event.target)) {
        fecharFullView();
        document.removeEventListener("click", fecharAoClicarFora);
    }
}

function Excluir() {
    var lin = this.parentElement.parentElement;
    var ind = lin.rowIndex;
    if (confirm("Confirma a exclusão do Filme/Serie? " + obras[ind - 1].titulo)) {
        obras.splice(ind - 1, 1);
        document.getElementById('listaF').deleteRow(ind);
        salvar();
    }
}

let btnAdd = document.querySelector("#btnAdd");
let btnSearch = document.querySelector("#searchBtn");
let btnTeste = document.querySelector("#btnTeste");
let btnFechaAlt = document.querySelector("#fecharAlterForm");
btnSearch.addEventListener("click", search);
btnAdd.addEventListener("click", addObras);
btnFechaAlt.addEventListener("click", fecharAlt);
btnTeste.addEventListener("click", test);
