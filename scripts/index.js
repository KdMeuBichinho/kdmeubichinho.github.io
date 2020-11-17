const btnBuscar = document.getElementById("btn_Buscar");
const imgSearch = document.querySelector(".img-home");
const sectionSearch = document.querySelector(".search");
const sectionResult = document.querySelector(".result");
const footer = document.querySelector(".footer");

if(sessionStorage.estadoHome == "visitado"){
    reduzIndex();
}else{
    ampliaIndex();
}

btnBuscar.addEventListener("click", () => {
    sessionStorage.setItem("estadoHome","visitado");
    reduzIndex();
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

