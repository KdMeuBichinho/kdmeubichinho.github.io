const BASE_URL_CLIENT = "http://localhost:5500/"
const BASE_URL_SERVER = "http://localhost:8080/"
const API_ANUNCIO = "anuncio/"
const API_PESSOA = "pessoa/"
const queryPessoaEmail = "pessoa?email="
const queryEmail = "email?email="
const email = localStorage.getItem('email');

const nameLabel = document.querySelector('#name');
const mailLabel = document.querySelector('#mail');
const zipCodeLabel = document.querySelector('#zip_code');
const streetLabel = document.querySelector('#street');
const numberLabel = document.querySelector('#number');
const phoneLabel = document.querySelector('#phone');
const complementLabel = document.querySelector('#complement');

const pessoa = {};

function buscaPessoa(){
    fetch(`${BASE_URL_SERVER}${API_PESSOA}${queryEmail}${email}`)
        .then(res => res.json())
        .then(res => {
            pessoa.nome = `${res.nome}`;
            pessoa.email = `${res.email}`;
            pessoa.cep = `${res.cep}`;
            pessoa.logradouro = `${res.logradouro}`;
            pessoa.complemento = `${res.complemento}`;
            pessoa.bairro = `${res.bairro}`;
            pessoa.localidade = `${res.localidade}`;
            pessoa.uf = `${res.uf}`;
            pessoa.ibge = `${res.ibge}`;
            pessoa.ddd = `${res.ddd}`;
            pessoa.numeroResidencial = `${res.numeroResidencial}`;
            pessoa.celular = `${res.celular}`;
            inserePessoaNaTela(pessoa)
        })
}
function inserePessoaNaTela(pessoa){
    nameLabel.textContent = `${pessoa.nome}`;
    mailLabel.textContent = `Email: ${pessoa.email}`
    zipCodeLabel.textContent = `Cep: ${pessoa.cep}`;
    streetLabel.textContent = `Rua: ${pessoa.logradouro}`;
    numberLabel.textContent = `Numero: ${pessoa.numeroResidencial}`;
    complementLabel.textContent = `Complemento: ${pessoa.complemento}`;
    phoneLabel.textContent = `Celular: ${pessoa.celular}`;
}

function buscaAnuncios(email){
    fetch(`${BASE_URL_SERVER}${API_ANUNCIO}${queryPessoaEmail}${email}`)
        .then(res => res.json())
        .then(res => console.log(res))
}

const btnEdit = document.getElementById('edit');
const btnCancel = document.getElementById('cancel');
const btnSave = document.getElementById('save');
const modal = document.querySelector('.modal-container');
const nameEdit = document.querySelector('#name_edit');
const zipCodeEdit = document.querySelector('#zip_code_edit');
const streetEdit = document.querySelector('#street_edit');
const numberEdit = document.querySelector('#number_edit');
const phoneEdit = document.querySelector('#phone_edit');
const complementEdit = document.querySelector('#complement_edit');
            
btnEdit.addEventListener('click', () => {
    nameEdit.value = pessoa.nome;
    zipCodeEdit.value = pessoa.cep;
    streetEdit.value = pessoa.logradouro;
    numberEdit.value = pessoa.numeroResidencial;
    phoneEdit.value = pessoa.celular;
    complementEdit.value = pessoa.complemento;
    modal.classList.add('show');
})

btnCancel.addEventListener('click', () => {
    modal.classList.remove('show');
})
zipCodeEdit.addEventListener("keypress", function (){ 
    if(zipCodeEdit.value.length == 5)
        zipCodeEdit.value = zipCodeEdit.value + '-'; //quando o campo já tiver 8 caracteres, o script irá inserir um tracinho, para melhor visualização do cep. 
});
phoneEdit.addEventListener("keypress", function (){ 
    if(phoneEdit.value.length == 0)
        phoneEdit.value = '(' + phoneEdit.value; //quando começamos a digitar, o script irá inserir um parênteses no começo do campo.
    if(phoneEdit.value.length == 3)
        phoneEdit.value = phoneEdit.value + ') '; //quando o campo já tiver 3 caracteres (um parênteses e 2 números) o script irá inserir mais um parênteses, fechando assim o código de área.
    if(phoneEdit.value.length == 10)
        phoneEdit.value = phoneEdit.value + '-'; //quando o campo já tiver 8 caracteres, o script irá inserir um tracinho, para melhor visualização do telefone.
});
btnSave.addEventListener('click',(e) => {
    e.preventDefault()

    pessoa.nome = nameEdit.value;
    pessoa.cep = zipCodeEdit.value;
    pessoa.logradouro = streetEdit.value;
    pessoa.numeroResidencial = numberEdit.value;
    pessoa.complemento = complementEdit.value;
    pessoa.celular = formatnumber(phoneEdit.value);

    editaPessoa(pessoa)
} )

function formatnumber(number){
    return number.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ^a-zA-Z]/gi, '')
}
zipCodeEdit.addEventListener("blur", ()=>{
    if(zipCodeEdit.value && zipCodeEdit.value.length == 9){
        let newcep=formatnumber(zipCodeEdit.value)
        fetch(`https://viacep.com.br/ws/${newcep}/json/`)
        .then(res => res.json())
        .then(local => {
            streetEdit.value = local.logradouro
            pessoa.cep = local.cep
            pessoa.logradouro = local.logradouro
            pessoa.bairro = local.bairro
            pessoa.localidade = local.localidade
            pessoa.uf = local.uf
            pessoa.ibge = local.ibge
            pessoa.ddd = local.ddd
        })
    }   
});
function editaPessoa(pessoa){
    //http://localhost:8080/pessoa/
    fetch(`${BASE_URL_SERVER}${API_PESSOA}${email}`,{
        method: "PUT",
        headers: { "Content-Type":"application/json"},
        body: JSON.stringify(pessoa)
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))

    console.log(pessoa)
}

buscaPessoa()
buscaAnuncios(email)