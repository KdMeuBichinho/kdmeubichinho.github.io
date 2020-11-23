const btnBuscar = document.querySelector("#btn_buscar");
const btnAplicarFiltro = document.querySelector("#btn_aplicar_filtro")
const imgSearch = document.querySelector(".img-home");
const sectionSearch = document.querySelector(".search");
const sectionResult = document.querySelector(".result");
const footer = document.querySelector(".footer");
const cardsArea = document.querySelector("#cards_area");
const paginationArea = document.querySelector("#pagination");

const anuncio = {};
let queryFilter = "";
let queryFilterStr;
let page = 0;

// if(sessionStorage.estadoHome == "visitado"){
//     reduzIndex();
// } else{
//     ampliaIndex();
// }

btnBuscar.addEventListener("click", () => {
    // sessionStorage.setItem("estadoHome","visitado");
    // reduzIndex();
    buscaAnimais(page);
    ampliaIndex();
})
btnAplicarFiltro.addEventListener("click", () => {
    buscaAnimais(page);
});


// function reduzIndex(){
//     imgSearch.classList.add("display-none");
//     sectionSearch.classList.add("section-search-animation");
//     sectionResult.classList.remove("display-none");
//     footer.classList.remove("display-none")
//     sessionStorage.setItem("estadoHome","visitado");
// }
function ampliaIndex(){
    imgSearch.classList.add("display-none")
    sectionSearch.classList.add("section-search-animation");
    sectionResult.classList.remove("display-none");
    footer.classList.remove("display-none")
}
function atualizaFiltros(){

    // const filterFields = document.querySelectorAll('.filter-field')
    // let queryFilterArr = [];

    // filterFields.forEach(function(field){
    //     let {id, value} = field;

    //     if(value.length){
    //         if(id == 'cep'){
    //             value = field.value.substring(0, 5);
    //         }
    //         queryFilterArr.push(`${id}=${value}`);
    //     }
    // });

    // queryFilterStr = queryFilterArr.join('&');



    let cep = document.querySelector("#cep").value;
    let idEspecie = document.querySelector("#especie").value
    let idCategoria = document.querySelector("#categoria").value
    let sexo = document.querySelector("#sexo").value
    let idade = document.querySelector("#idade").value
    let porte = document.querySelector("#porte").value
    let castrado = document.querySelector("#castrado").checked
    let vacinado = document.querySelector("#vacinado").checked

    queryFilter = ""
    cep = cep.substring(0,5)

    if(cep) queryFilter += `cep=${cep}&`;
    if(idEspecie != 0) queryFilter += `idEspecie=${idEspecie}&`;
    if(idCategoria != 0) queryFilter += `idCategoria=${idCategoria}&`;
    if(sexo) queryFilter += `sexo=${sexo}&`;
    if(idade) queryFilter += `classificacaoEtaria=${idade}&`;
    if(porte) queryFilter += `porte=${porte}&`;
    if(castrado) queryFilter += `castrado=${castrado}&`;
    if(vacinado) queryFilter += `vacinado=${vacinado}&`;

}
function selecionePagina(pagina){
    pagina --
    page = pagina;
    buscaAnimais(page)
}
function buscaAnimais(pagina){

    atualizaFiltros()
    cardsArea.innerHTML = ""
    paginationArea.innerHTML = ""

    fetch(`http://localhost:8080/anuncio/busca?${queryFilter}page=${pagina}&size=5`)
        .then(res => res.json())
        .then(anuncio => {
            for(anuncioRecebido of anuncio.content){
                console.log(anuncioRecebido.idAnimal.fotos.caminho)
                cardsArea.innerHTML += 
                `<a href="./pages/petprofile.html" class="res-card">
                    <div class="res-card-img">
                        <img src="http://127.0.0.1:8080/${anuncioRecebido.idAnimal.fotos.caminho}" alt="">
                    </div>
                    <div class="res-card-txt">
                        <p>${anuncioRecebido.idAnimal.nome}</p>
                        <p>${anuncioRecebido.idAnimal.bairro}</p>
                    </div>
                    <div class="res-card-tag">
                        <span class="tag">${anuncioRecebido.idCategoria.classificacao}</span>    
                    </div>
                </a>`
            }

            if(anuncio.totalPages){
                for(let i = 1; i <= anuncio.totalPages; i++){
                    paginationArea.innerHTML += `<li onclick="selecionePagina(${i})">${i}</li>`
                }
    
                let paginationAreaChildren = document.querySelector("#pagination").children;
                paginationAreaChildren[pagina].classList.add("active")
            }
            

        })
}