import { getFromApi, newComments } from "../api.js";
import { getAuthForm, getCommentsAndAuth } from "../appHtml.js";
import { isInitialLoadingFunc } from "../renderApp.js";
import { loginToApp, registerToApp } from "../user-api.js";

export let isLoginMode = true;
export let userName = {};

export function renderLoginComponent({ appHtml, appElement, commentsHtml, setToken }) {

    appHtml = getCommentsAndAuth(commentsHtml);
    appElement.innerHTML = appHtml;

    const loadingComments = document.querySelector('.loading');
    const authLink = document.getElementById('auth-link');

    isInitialLoadingFunc(loadingComments);

    authLink.addEventListener("click", () => {

        const renderForm = () => {
            appHtml = getAuthForm();
            appElement.innerHTML = appHtml;

            const loginBtn = document.getElementById('login-button');
            const toggleBtn = document.getElementById('toggle-button');

            loginBtn.addEventListener("click", () => {
                if (isLoginMode) {
                    const login = document.getElementById('login-input').value;
                    const password = document.getElementById('password-input').value;

                    if (!login) {
                        alert("Вы не ввели логин")
                        return;
                    };

                    if (!password) {
                        alert("Вы не ввели пароль")
                        return;
                    };

                    loginToApp({
                        login: login,
                        password: password,
                    }).then((user) => {
                        setToken(`Bearer ${user.user.token}`);
                        userName = user.user.name;
                        getFromApi(newComments);
                    }).catch((error) => {
                        if (error.message === "Неверный логин или пароль") {
                            alert(error.message);
                        }
                    })
                } else {
                    const name = document.getElementById('name-input').value;
                    const login = document.getElementById('login-input').value;
                    const password = document.getElementById('password-input').value;

                    if (!name) {
                        alert("Вы не ввели имя")
                        return;
                    };

                    if (!login) {
                        alert("Вы не ввели логин")
                        return;
                    };

                    if (!password) {
                        alert("Вы не ввели пароль")
                        return;
                    };

                    registerToApp({
                        login: login,
                        password: password,
                        name: name,
                    }).then((user) => {
                        setToken(`Bearer ${user.user.token}`);
                        userName = user.user.name;
                        getFromApi(newComments);
                    }).catch((error) => {
                        if (error.message === "Пользователь с таким логином уже сущетсвует") {
                            alert(error.message);
                        }
                    })
                }

            });

            toggleBtn.addEventListener("click", () => {
                isLoginMode = !isLoginMode;
                renderForm();
            });
        };

        renderForm();
    });
};