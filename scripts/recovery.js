const email = document.querySelector('#mail');
const enviar = document.querySelector('#submit');

enviar.addEventListener('click', ()=>{
    if(email.value){
        //window.alert('OK')
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Ainda estamos desenvolvendo isso, aguarde só mais um pouco!'
          })
    }else {
        //window.alert('Campos obrigatórios não preenchidos')
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Você não preencheu todos os campos obrigatórios marcados com *'
          })
    }
})
