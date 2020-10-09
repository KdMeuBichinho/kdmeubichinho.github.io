const btnPesquisar = document.getElementById("btnPesquisar");
const sectionHome = document.querySelector(".section-home");

if(sessionStorage.estadoHome == "visitado"){
    sectionHome.remove();
}

btnPesquisar.addEventListener("click", () => {
    sectionHome.classList.replace("section-home", "animation-home");
    while (sectionHome.firstChild) {
        sectionHome.firstChild.remove()
    }
    sessionStorage.setItem("estadoHome","visitado");
})
