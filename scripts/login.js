const BASE_URL_CLIENT = "http://localhost:5500/"
const BASE_URL_SERVER = "http://localhost:8080/"
const API_AUTH = "pessoa/auth"

const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const submit = document.getElementById("submit");

submit.addEventListener("click", (e) => {
    e.preventDefault();
    enviar();
})

function enviar(){
    const pessoaLogin = {};
    pessoaLogin.email = emailField.value
    pessoaLogin.senha = passwordField.value
    let status;
    fetch(`${BASE_URL_SERVER}${API_AUTH}`,{
        method: "POST",
        headers: { "Content-Type":"application/json"},
        body: JSON.stringify(pessoaLogin)
    })
    .then(res => {
        status = res.status;
        return res.json();
    })
    .then(({ token, email }) => {
        if(status == 200){
            localStorage.setItem("email", email)
            localStorage.setItem("token", token)
            direcionamento()
        }else if(status == 401) {
            localStorage.clear()
            alert("Usuário ou senha inválido")
            emailField.value = ""
            passwordField.value = ""
        }else{
            localStorage.clear()
            alert("Ocorreu um erro ao logar, tente novamente mais tarde")
            emailField.value = ""
            passwordField.value = ""  
        }
    })
}

function direcionamento(){
        location.href = BASE_URL_CLIENT ; 
}
