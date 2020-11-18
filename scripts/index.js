const btnBuscar = document.getElementById("btn_Buscar");
const imgSearch = document.querySelector(".img-home");
const sectionSearch = document.querySelector(".search");
const sectionResult = document.querySelector(".result");
const footer = document.querySelector(".footer");
const cardsArea = document.querySelector("#cards-area");
const inputCep = document.querySelector("#input_cep");

const anuncio = {};

if(sessionStorage.estadoHome == "visitado"){
    reduzIndex();
} else{
    ampliaIndex();
}

btnBuscar.addEventListener("click", () => {
    sessionStorage.setItem("estadoHome","visitado");
    reduzIndex();
    buscaAnimais();
})

function reduzIndex(){
    
    imgSearch.classList.add("display-none");
    sectionSearch.classList.add("section-search-animation");
    sectionResult.classList.remove("display-none");
    footer.classList.remove("display-none")
    sessionStorage.setItem("estadoHome","visitado");
}

function ampliaIndex(){
    imgSearch.classList.remove("display-none")
}

function buscaAnimais(){
    cardsArea.innerHTML = ``
    fetch(`http://localhost:8080/anuncio/busca?cep=${inputCep.value}`)
        .then(res => res.json())
        .then(anuncio => {
            for(anuncioRecebido of anuncio.content){
                cardsArea.innerHTML += `<a href="./pages/petprofile.html" class="res-card">
                <div class="res-card-img">
                    <img src="../KdMeuBichinho-BackEnd/${anuncioRecebido.idAnimal.fotos.caminho}" alt="">
                </div>
                <div class="res-card-txt">
                    <p>${anuncioRecebido.idAnimal.nome}</p>
                    <p>${anuncioRecebido.idAnimal.nome}</p>
                </div>
                <div class="res-card-tag">
                    <span class="tag">${anuncioRecebido.idCategoria.classificacao}</span>    
                </div>
            </a>`
            }
            console.log(anuncio)
        })
}