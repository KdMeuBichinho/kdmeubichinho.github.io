const nomeAnimal = document.getElementById('nome_animal');
const localizacaoAnimal = document.querySelector('#localizacao_animal');
const cidadeAnimal = document.getElementById('cidade_animal');
const tags = document.getElementById('tags');
const foto = document.querySelector('#container_img');
const contato = document.querySelector('#contact');
const categoria = document.querySelector('#categoria');
const id = localStorage.getItem('idAnuncio');
const email = localStorage.getItem('email');
const messageArea = document.querySelector('#message_area');
const message = document.querySelector('#message');
const send = document.querySelector('#send');
const update = document.querySelector('#update');

function atualizaMensagens(){
    var messageScroll = document.getElementById('message_area');
    
    messageArea.innerHTML = ""
    fetch(`${BASE_URL_SERVER}${API_ANUNCIO}${id}`)
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

                const data = new Date(Date.parse(mensagem.dataMensagem))
                let dataFormatada = adicionaZero((data.getDate())) + "." + ((data.getMonth() + 1)) + "." + data.getFullYear() + " - " + (data.getHours() + 3) + ":" + adicionaZero(data.getMinutes()); 

                messageArea.innerHTML += 
                `
                    <p class="style-message">
                    <span><strong>${mensagem.idPessoa.nome}:</strong></span>
                    ${mensagem.mensagem}
                    <span>${dataFormatada}</span>
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

    verificaToken()
    if(token){
        if(message.value){
            idAnuncio.idAnuncio = id;
            idPessoa.email = email;
    
            mensagem.dataMensagem = new Date();
            mensagem.dataMensagem.setHours(mensagem.dataMensagem.getHours() - 3);
    
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
        } else {
            window.alert('Campos obrigatórios não preenchidos')
        }
    } else {
        window.alert('Você precisa estar logado para enviar mensagens')
    }
    
}
update.addEventListener('click', atualizaMensagens)
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

            foto.innerHTML += `<img src="${anuncio.idAnimal.fotos.caminho}">`
            contato.innerHTML += 
                `
                    <div class="people"><strong>${anuncio.idPessoa.nome}</strong></div>
                    <div class="phone">${anuncio.idPessoa.celular}</div>
                    <a href="https://api.whatsapp.com/send?phone=55${anuncio.idPessoa.celular}&text=Olá,%20vi%20o%20anuncio%20do(a)%20${anuncio.idAnimal.nome}%20no%20Kdmeubichinho!." target="_blank"><i class="fab fa-whatsapp"></i> Entrar em contato</a>
                `

            atualizaMensagens()
        })