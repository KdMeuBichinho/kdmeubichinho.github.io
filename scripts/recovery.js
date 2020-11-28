const email = document.querySelector('#mail');
const enviar = document.querySelector('#submit');

const BASE_URL_CLIENT = "http://localhost:5500/"
const BASE_URL_SERVER = "http://localhost:8080/"


enviar.addEventListener('click', ()=>{
    if(email.value){
        window.alert('OK')
    }else {
        window.alert('Campos obrigatórios não preenchidos')
    }
})
