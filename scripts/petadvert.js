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

const BASE_URL_CLIENT = "http://localhost:5500/"
const BASE_URL_SERVER = "http://localhost:8080/"
const API_FOTO = "foto";
const API_ANUNCIO = "anuncio";

const anuncio = {};
const animal = {};
const fotos = {};
const especie = {};
const categoriaAnuncio = {};
const pessoa = {};

// function atualizaDadosViaCep(cep){
//     fetch(`https://viacep.com.br/ws/${cep}/json/`)
//         .then(res => res.json())
//         .then(local => {
//             animal.logradouro = local.logradouro
//             animal.cep = local.cep
//             animal.bairro = local.bairro
//             animal.localidade = local.localidade
//             animal.uf = local.uf
//             animal.ibge = local.ibge
//             animal.ddd = local.ddd
//         })
// }

// function carregaLocalizacaoAnimal(localizacao){
//     for(let atributo in localizacao){
//         animal[atributo] = localizacao[atributo]
//     }
// }

// async function localizacaoAnimal(cep){
//     if(cep){
//         const localizacaoViaCepp = await atualizaLocalizacaoViaCep(cep);
//         return localizacaoViaCepp
//     }
// }

// cep.addEventListener("blur", ()=>{
//     if(cep.value){
//         atualizaDadosViaCep(cep.value);  
//         // atualizaLocalizacaoViaCep(cep.value);
//         // carregaLocalizacaoAnimal(localizacaoViaCep)
//         // console.log(animal)
//     }   
// });
photo.addEventListener("change", ()=>{
    uploadFile(photo.files[0])
})
const uploadFile = (file) => {
   
    const fd = new FormData();
    fd.append("image", file)
    fetch(`${BASE_URL_SERVER}${API_FOTO}`,{
        method: "POST",
        body: fd
    })
    .then(res => res.text())
    .then(res => {
        fotos.caminho=res;
        animal.fotos=fotos;
    })
    .catch(err => console.log(err))
}
anunciar.addEventListener("click", () =>{
    for(let especieFormFor of especieForm){
        if(especieFormFor.checked) especie.idEspecie = especieFormFor.value;
    }
    for(let categoriaFormFor of categoria){
        if(categoriaFormFor.checked) categoriaAnuncio.idCategoria = categoriaFormFor.value;
    }
    for(let sexoFormFor of sexo){
        if(sexoFormFor.checked) animal.sexo = sexoFormFor.value;
    }
    for(let idadeFormFor of idade){
        if(idadeFormFor.checked) animal.classificacaoEtaria = idadeFormFor.value;
    }
    for(let porteFormFor of porte){
        if(porteFormFor.checked) animal.porte = porteFormFor.value;
    }

    animal.castrado=false
    animal.vacinado=false
    if(castrado.checked) animal.castrado = true;
    if(vacinado.checked) animal.vacinado = true;

    animal.nome = nome.value;
    pessoa.email = localStorage.email;
    animal.especie = especie;

    anuncio.idCategoria = categoriaAnuncio;
    anuncio.idPessoa = pessoa;
    anuncio.idAnimal = animal;
    anuncio.dataCriacao = new Date();

    fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
        .then(res => res.json())
        .then(local => {
            animal.logradouro = local.logradouro
            animal.cep = local.cep
            animal.bairro = local.bairro
            animal.localidade = local.localidade
            animal.uf = local.uf
            animal.ibge = local.ibge
            animal.ddd = local.ddd
        })
        .then(() => {
            fetch(`${BASE_URL_SERVER}${API_ANUNCIO}`,{
                method: "POST",
                headers: { "Content-Type":"application/json"},
                body: JSON.stringify(anuncio)
            })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))
        })

    
})
