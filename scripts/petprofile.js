const nomeAnimal = document.getElementById('nome_animal');
const localizacaoAnimal = document.querySelector('#localizacao_animal');
const cidadeAnimal = document.getElementById('cidade_animal');
const tags = document.getElementById('tags');
const foto = document.querySelector('#container_img');
const contato = document.querySelector('#contact');
const categoria = document.querySelector('#categoria');
const id = localStorage.getItem('idAnuncio');
const messageArea = document.querySelector('#message_area');
const message = document.querySelector('#message');
const send = document.querySelector('#send');

const BASE_URL_CLIENT = "http://localhost:5500/"
const BASE_URL_SERVER = "http://localhost:8080/"
const API_ANUNCIO = "anuncio/"
const API_MENSAGEM = "mensagem/"

async function atualizaMensagens(){
    var messageScroll = document.getElementById('message_area');
    
    messageArea.innerHTML = ""
    await fetch(`${BASE_URL_SERVER}${API_ANUNCIO}${id}`)
        .then(res => res.json())
        .then(anuncio => {
            console.log(anuncio)
            anuncio.mensagens.sort(function (a, b) {
                if (a.idMensagem > b.idMensagem) {
                  return 1;
                }
                if (a.idMensagem < b.idMensagem) {
                  return -1;
                }
                // a must be equal to b
                return 0;
              });
            for(let mensagem of anuncio.mensagens){
                messageArea.innerHTML += 
                `
                    <p class="style-message">
                    <span><strong>${mensagem.idPessoa.nome}:</strong></span>
                    ${mensagem.mensagem}
                    <span>${mensagem.dataMensagem}</span>
                    </p>
                `
            }
        })
        .then(() => {
            messageScroll.scrollTop = messageScroll.scrollHeight - messageScroll.clientHeight;
        })
}

function enviaMensagem(){
    const mensagem = {}
    const idAnuncio = {}
    const idPessoa = {}

    if(message.value){
        idAnuncio.idAnuncio = localStorage.getItem('idAnimal');
        idPessoa.email = localStorage.getItem('email');

        mensagem.dataMensagem = new Date();
        mensagem.idAnuncio = idAnuncio;
        mensagem.idPessoa = idPessoa;
        mensagem.mensagem = message.value;

        fetch(`${BASE_URL_SERVER}${API_MENSAGEM}`,{
            method: "POST",
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify(mensagem)
        })
        .then(res => res.json())
        .then(() => {
            atualizaMensagens()
            message.value = ""
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))

        
    }

    

}

send.addEventListener('click', enviaMensagem);

fetch(`${BASE_URL_SERVER}${API_ANUNCIO}${id}`)
        .then(res => res.json())
        .then(anuncio => {

            tags.innerHTML = ""
            foto.innerHTML = ""
            contato.innerHTML = ""
            messageArea.innerHTML = ""

            console.log(anuncio)
            categoria.textContent = anuncio.idCategoria.classificacao
            nomeAnimal.textContent = anuncio.idAnimal.nome
            localizacaoAnimal.textContent = `${anuncio.idAnimal.cep} - ${anuncio.idAnimal.bairro}, ${anuncio.idAnimal.localidade} `

            tags.innerHTML += `<span class="tag">${anuncio.idAnimal.especie.nome}</span>`
            tags.innerHTML += `<span class="tag">${anuncio.idAnimal.sexo}</span>`
            tags.innerHTML += `<span class="tag">${anuncio.idAnimal.classificacaoEtaria}</span>`
            tags.innerHTML += `<span class="tag">${anuncio.idAnimal.porte}</span>`
            anuncio.idAnimal.castrado? tags.innerHTML += `<span class="tag">Castrado</span>` : null
            anuncio.idAnimal.vacinado? tags.innerHTML += `<span class="tag">Vacinado</span>` : null

            foto.innerHTML += `<img src="${BASE_URL_SERVER}${anuncio.idAnimal.fotos.caminho}">`

            contato.innerHTML += 
                `
                    <div class="people"><strong>${anuncio.idPessoa.nome}</strong></div>
                    <div class="phone">${anuncio.idPessoa.celular}</div>
                    <a href="https://api.whatsapp.com/send?phone=55${anuncio.idPessoa.celular}&text=Olá,%20vi%20o%20anuncio%20do(a)%20${anuncio.idAnimal.nome}%20no%20Kdmeubichinho!." target="_blank"><i class="fab fa-whatsapp"></i> Entrar em contato</a>
                `

            atualizaMensagens()
        })