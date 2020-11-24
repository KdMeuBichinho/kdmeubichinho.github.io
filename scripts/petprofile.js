const nome_animal = document.getElementById('nome_animal')
const cidade_animal = document.getElementById('cidade_animal')
const tags = document.getElementById('tags')
const id=1
fetch(`http://localhost:8080/anuncio/${id}`)
        .then(res => res.json())
        .then(anuncio => {
            console.log(anuncio)
            //nome_animal = anuncio
        })