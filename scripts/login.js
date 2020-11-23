import * as main from "./main.js"

const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

submit.addEventListener("click", (e) => {
    e.preventDefault();
    enviar();
    
})

function enviar(){
    const pessoaLogin = {};
    pessoaLogin.email = email.value,
    pessoaLogin.senha = password.value,
    fetch("http://localhost:8080/pessoa/auth",{
        method: "POST",
        headers: { "Content-Type":"application/json"},
        body: JSON.stringify(pessoaLogin)
    })
    .then(res => res.json())
    .then(res => {
        console.log(res.status)
        localStorage.setItem("email", email.value)
        localStorage.setItem("token", res.token)
        setTimeout(1000)
        direcionamento(res.status)
    })
}

function direcionamento(status){
    console.log(status)
    if(status == "200"){
        location.href = main.BASE_URL; 
    } else {
        alert("Tente novamente")
        email.value = ""
        password.value = ""
    }
}
