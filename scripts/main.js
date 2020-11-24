export const BASE_URL_CLIENT = "http://localhost:5500/"
export const BASE_URL_SERVER = "http://localhost:8080/"
export const localizacaoViaCep = {}

export function atualizaLocalizacaoViaCep(cep){
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(local => {
            localizacaoViaCep.logradouro = local.logradouro
            localizacaoViaCep.cep = local.cep
            localizacaoViaCep.bairro = local.bairro
            localizacaoViaCep.localidade = local.localidade
            localizacaoViaCep.uf = local.uf
            localizacaoViaCep.ibge = local.ibge
            localizacaoViaCep.ddd = local.ddd
        })
}