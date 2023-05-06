"use strict"

const FORMULARIO_REGISTRO = "frmRegistro"

const BOTAO_FAZER_REGISTRO = 'btnRegister'

const EMAIL_INPUT = "mailInput"

const PASSWORD_INPUT = "passInput"

const USERNAME = "username"

const ITEM_USERS = "usuarios"

const EMAIL_LOGIN = "emailLogin"

const PASSWORD_LOGIN = "passwordLogin"

const BOTAO_FAZER_LOGIN = "btnLogin"

const wrapper = document.querySelector('.wrapper');

const loginLink = document.querySelector('.login-link');

const registerLink = document.querySelector('.register-link');

const btnPopup = document.querySelector('.btnLogin-popup');

const iconClose = document.querySelector('.icon-close');

const content = document.querySelector('.content');


let formulario = null


let usuarios = []


/**
 * @param {string} username
 * @param {string} email
 * @param {string} password
 */

function User(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
}

window.addEventListener('load', principal);

/**
 * 
 * 
 * @param {string} rank;
 * @param {string} name;
 * @param {string} points;
 * 
 */

function Ponto(rank, name, points) {
    this.rank = rank;
    this.name = name;
    this.points = points;
}

function principal () {

    carregaHistoricoUsuarios();

    /*createClassfTable();*/

    funcaoEventListeners();
}


/**
 * Trata os dados do registro.
 */
function trataFazerRegistro() {
    formulario = document.forms[FORMULARIO_REGISTRO];

    let registroValido = formulario.reportValidity();

    let registro = null;
    if (registroValido) {
        registro = new User(obtemDadosUser());
        
        gravaUsuarioNoHistorico(registro);
        createClassfTable();


        formulario.reset();
    }
    console.log(registro)
}


/**
 * @returns {User} 
 */

function obtemDadosUser() {
    return new User(formulario.elements[USERNAME].value,
                    formulario.elements[EMAIL_INPUT].value,
                    formulario.elements[PASSWORD_INPUT].value);
}


/**
 * Carrega o histórico de usuários guardado no local storage do browser.
 */
function carregaHistoricoUsuarios() {

    usuarios = JSON.parse(localStorage.getItem(ITEM_USERS)) || [];
    console.log(usuarios)
}

/**
 * Grava o histórico de usuários no local storage.
 */
function gravaHistoricoUsuarios() {
    
    localStorage.setItem(ITEM_USERS, JSON.stringify(usuarios));

}


/**
 * Grava o usuário no histórico de usuários.
 * @param {User} user
 */
function gravaUsuarioNoHistorico(user) {

    usuarios.push(user);
    gravaHistoricoUsuarios();
}


function funcaoEventListeners() {
    document.getElementById(BOTAO_FAZER_REGISTRO).
        addEventListener('click', trataFazerRegistro);

    registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
    })


    loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
    })

    btnPopup.addEventListener('click', ()=> {
        wrapper.classList.add('active-popup');
        content.classList.add('active');
    })

    iconClose.addEventListener('click', ()=> {
        wrapper.classList.remove('active-popup');
        content.classList.remove('active');
    })

    document.getElementById(BOTAO_FAZER_LOGIN).
        addEventListener('click', Login);

}

/**
 * Faz o login.
 */
function Login() {
    const localEmail = localStorage.getItem(EMAIL_INPUT);
    let mail = document.getElementById(EMAIL_LOGIN).value

    const localPassword = localStorage.getItem(PASSWORD_INPUT)
    let pass = document.getElementById(PASSWORD_LOGIN).value

    if (mail === localEmail && pass === localPassword) {
        alert('Login com sucesso.')
    } else {
        alert('As credenciais introduzidas não estão corretas.')
    }
}

/**
 * Tabela de classificações.
 */
/*function createClassfTable () {
    
    let tabela = document.querySelector('.content-table');


    let numeroUsuario = 1;
    for (let user of usuarios) {
        let linhaTabela = document.createElement('tr');
        linhaTabela.innerHTML = '<td>' + numeroUsuario + '</td>' +
                                '<td>' + user.username +'</td>' +
                                '<td>' + '</td>';
        tabela.appendChild(linhaTabela);
        numeroUsuario++;

    }
}
*/