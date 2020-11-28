const email = document.querySelector('#mail');
const enviar = document.querySelector('#submit');

enviar.addEventListener('click', ()=>{
    if(email.value){
        window.alert('OK')
    }else {
        window.alert('Campos obrigatórios não preenchidos')
    }
})
