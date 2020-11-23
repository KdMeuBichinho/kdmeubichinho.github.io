const photo = document.getElementById("photo");
const anunciar = document.querySelector("#anunciar");
const especieForm = document.getElementsByName("especie")
const categoria = document.getElementsByName("evento")
const sexo = document.getElementsByName("sexo")
const idade = document.getElementsByName("idade")
const porte = document.getElementsByName("porte")
const castrado = document.querySelector("#castrado")
const vacinado = document.querySelector("#vacinado")
const nome = document.querySelector("#nome");
const cep = document.querySelector("#cep");

const anuncio = {};
const idAnimal = {};
const fotos = {};
const especie = {};
const idCategoria = {};
const idPessoa = {};

// anuncio.dataCriacao
// anuncio.status
// anuncio.idAnimal.castrado----
// anuncio.idAnimal.cep----
// anuncio.idAnimal.classificacaoEtaria----
// anuncio.idAnimal.especie.idEspecie----
// anuncio.idAnimal.fotos.caminho----
// anuncio.idAnimal.nome----
// anuncio.idAnimal.porte----
// anuncio.idAnimal.sexo----
// anuncio.idAnimal.vacinado
// anuncio.idCategoria.idCategoria----
// anuncio.idPessoa.idPessoa----

cep.addEventListener("blur",()=>{
    if(cep.value){
        fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
        .then(res => res.json())
        .then(local => {
            idAnimal.logradouro = local.logradouro
            idAnimal.cep = local.cep
            idAnimal.bairro = local.bairro
            idAnimal.localidade = local.localidade
            idAnimal.uf = local.uf
            idAnimal.ibge = local.ibge
            idAnimal.ddd = local.ddd
        })
    }   
});
photo.addEventListener("change", ()=>{
    uploadFile(photo.files[0])
})
const uploadFile = (file) => {
    const fd = new FormData();
    fd.append("image", file)
    fetch("http://localhost:8080/foto",{
        method: "POST",
        body: fd
    })
    .then(res => res.text())
    .then(res => {
        fotos.caminho=res;
        idAnimal.fotos=fotos;
    })
    .catch(err => console.log(err))
}
anunciar.addEventListener("click", (e) =>{
    e.preventDefault();
    for(especieFormFor of especieForm){
        if(especieFormFor.checked) especie.idEspecie = especieFormFor.value;
    }
    for(categoriaFormFor of categoria){
        if(categoriaFormFor.checked) idCategoria.idCategoria = categoriaFormFor.value;
    }
    for(sexoFormFor of sexo){
        if(sexoFormFor.checked) idAnimal.sexo = sexoFormFor.value;
    }
    for(idadeFormFor of idade){
        if(idadeFormFor.checked) idAnimal.classificacaoEtaria = idadeFormFor.value;
    }
    for(porteFormFor of porte){
        if(porteFormFor.checked) idAnimal.porte = porteFormFor.value;
    }

    idAnimal.castrado=false
    idAnimal.vacinado=false
    if(castrado.checked) idAnimal.castrado = true;
    if(vacinado.checked) idAnimal.vacinado = true;

    idAnimal.nome = nome.value;
    idAnimal.cep = cep.value;

    idPessoa.email = localStorage.email;
    idAnimal.especie = especie;

    anuncio.idCategoria = idCategoria;
    anuncio.idPessoa = idPessoa;
    anuncio.idAnimal = idAnimal;
    anuncio.dataCriacao = new Date();

    fetch("http://localhost:8080/anuncio",{
        method: "POST",
        headers: { "Content-Type":"application/json"},
        body: JSON.stringify(anuncio)
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))
})
