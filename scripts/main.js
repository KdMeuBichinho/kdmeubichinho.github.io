//const BASE_URL_CLIENT = "http://localhost:5500/";
const BASE_URL_CLIENT = "https://kdmeubichinho.github.io/";
const BASE_URL_SERVER = "https://kdmeubichinho-app.herokuapp.com/";

const API_ANUNCIO_BUSCA = "anuncio/busca?";
const API_FOTO = "storage/upload";
const API_ANUNCIO = "anuncio/";
const API_MENSAGEM = "mensagem/"
const API_AUTH = "pessoa/auth"
const API_PESSOA = "pessoa/"
const API_ATUALIZA_STATUS = "atualizastatus/"
const CLIENT_PETPROFILE = "pages/petprofile.html";
const CLIENT_PETADVERT = "pages/petadvert.html"
const CLIENT_LOGIN = "pages/login.html"

const URL_BLOCK = [`${BASE_URL_CLIENT}${CLIENT_PETADVERT}`, ]

let token = false;
const menu = document.querySelector('#menu')
const footer = document.querySelector('#footer')
const localizacaoViaCep = {}
const menuLogout = `
    <a href="${BASE_URL_CLIENT}">
        <img src="${BASE_URL_CLIENT}images/logo-black.svg" alt="Logo KdMeuBichinho" class="logo">
    </a>
    <input type="checkbox" id="bar">
    <label for="bar" class="bars">&#9776;</label>
    <ul class="">
        <li><a href="${BASE_URL_CLIENT}">Início <!--<i class="fas fa-home"></i>--></a></li>
        <li><a href="${BASE_URL_CLIENT}pages/petadvert.html">Anunciar <!--<i class="fas fa-plus">--></i></a></li>
        <li><a href="${BASE_URL_CLIENT}pages/signup.html">Cadastrar <!--<i class="fas fa-user-plus"></i>--></a></li>
        <li><button class="btn-primary" onclick="location.href='${BASE_URL_CLIENT}pages/login.html'">Entrar  <!--<i class="fas fa-sign-in-alt">--></i></button></li>
    </ul>  
`
const menuLogin = `
    <a href="${BASE_URL_CLIENT}">
        <img src="${BASE_URL_CLIENT}images/logo-black.svg" alt="Logo KdMeuBichinho" class="logo">
    </a>
    <input type="checkbox" id="bar">
    <label for="bar" class="bars">&#9776;</label> 
    <ul>
        <li><a href="${BASE_URL_CLIENT}">Início </a></li>
        <li><a href="${BASE_URL_CLIENT}pages/petadvert.html">Anunciar</a></li>
        <li>
            <div class="dropdown">
                <i class="fas fa-user dropbtn"></i>
                <div class="dropdown-content">
                    <a href="${BASE_URL_CLIENT}pages/profile.html">Meus anuncios</a>
                    <a href="#" id="logout" onclick="fazlogout()">Sair</a>
                </div>
            </div>
        </li>
    </ul>
`
const footerPages = `
    <img src="https://kdmeubichinho.github.io/images/icone-black.svg" alt="Icone do KdMeuBichinho" class="icone">
    <div>
        <a href="https://github.com/KdMeuBichinho" target="_blank"><strong>Colabore no Github do projeto.</strong></a>
        <p>2020 Todos os direitos reservados.</p>
    </div>
    <a href="#main"><button class="btn-primary"><span class="footer-top-button"><i class="fas fa-chevron-up"></i></span></button></a>
`
function fazlogout(){
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    verificaToken()
    redirecionamentoIndex()
}
function verificaRota(rota){
    if(!token){
        for(rotaBloqueada of URL_BLOCK){
            if(rotaBloqueada == rota){
                window.alert('Você precisa estar logado para fazer anuncios')
                // Swal.fire({
                //     icon: 'error',
                //     title: 'Oops...',
                //     text: 'Você precisa estar logado para enviar mensagens!',
                //     footer: '<a href="./login.html">Entrar na minha conta</a>'
                //   })
                location.href = BASE_URL_CLIENT + CLIENT_LOGIN
            }
        }
    }
}
function verificaToken(){
    if(localStorage.getItem('token')){
        menu.innerHTML = menuLogin;
        token = true;
    }else{
        menu.innerHTML = menuLogout;
        token = false;
    }
}
function redirecionamentoIndex(){
    location.href = BASE_URL_CLIENT; 
}
function redirecionamento(url){
    location.href = url; 
}
function capturaAnuncio(idAnuncio) {
    localStorage.setItem("idAnuncio", idAnuncio)
}
function formatnumber(number){
    return number.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ^a-zA-Z]/gi, '')
}
function adicionaZero(numero){
    if (numero <= 9) 
        return "0" + numero;
    else
        return numero; 
}
function atualizaFooter(){
    footer.innerHTML = footerPages;
}
function capturaPagina(){
    localStorage.setItem("page", location.href)
}

atualizaFooter()
verificaToken()
verificaRota(location.href)
capturaPagina()



const urll = "https://bancopsa-prod-n.cloudapp.net/Login/ValidaToken?token=5539404E46E91DF4A6C20ACC79D854CD14128C8DD7888B5852BE7B4D84129A06CDABACB6F40888BD013F4D01F95BE7480775F9D1E323A699441BC9311C7D2375B9368F49B86A7578E31644EF71FA87312242A0CC43ED951070B516DFBD7A5495B201B45CFA92CEABA5E8517E7C1D32DB20E18C4AC57081711808659BEBCBD09324E56103DB118B623336B94AD1FF5D320FF7F3059AE3CF3835DC72A730F6C629D7F956F49EB86999FA06AF1178714AF01E546CBBBA68D73185E58CF1AEF1FFDC5D776112DEC90B20A416AD57CDD452DF92E57ECD894DFBD00BD533679A6E4FF1"

fetch(urll).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
    });
  }).catch(function(err) {
    console.error('Failed retrieving information', err);
  });
