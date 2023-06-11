/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./JS/CommentsList.js":
/*!****************************!*\
  !*** ./JS/CommentsList.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getCommentsList: () => (/* binding */ getCommentsList)\n/* harmony export */ });\n\r\n\r\nconst getCommentsList = (comment, index) => {\r\n  return `<li class=\"comment\" data-index=\"${index}\">\r\n          <div class=\"comment-header\">\r\n            <div>\r\n              ${comment.author.name}\r\n            </div>\r\n            <div>\r\n              ${getActualDate(comment.date)}\r\n            </div>\r\n          </div>\r\n          <div class=\"comment-body\">\r\n            <div class=\"comment-text\" data-index=\"${index}\">\r\n            ${comment.text}\r\n            </div>\r\n          </div>\r\n          <div class=\"comment-footer\">\r\n            <div class=\"likes\">\r\n              <span class=\"likes-counter\">\r\n                ${comment.likes}\r\n              </span>\r\n              <button class=\"like-button ${comment.isLiked ? '-active-like' : ''}\" data-index=\"${index}\">\r\n              </button>\r\n            </div>\r\n          </div>\r\n        </li>`;\r\n};\r\n\r\n\r\nfunction getActualDate(date) {\r\n  let userDate = new Date(date);\r\n  let month = userDate.getMonth() + 1;\r\n  let minutes = userDate.getMinutes();\r\n  let year = userDate.getFullYear() % 100;\r\n\r\n  if (month < 10) {\r\n    month = \"0\" + month;\r\n  };\r\n\r\n  if (minutes < 10) {\r\n    minutes = \"0\" + minutes;\r\n  };\r\n\r\n  if (year < 10) {\r\n    year = \"0\" + year;\r\n  };\r\n\r\n  return `${userDate.getDate()}.${month}.${year} ${userDate.getHours()}:${minutes}`;\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack://webdev-dom-homework2-9/./JS/CommentsList.js?");

/***/ }),

/***/ "./JS/api.js":
/*!*******************!*\
  !*** ./JS/api.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getFromApi: () => (/* binding */ getFromApi),\n/* harmony export */   isInitialLoading: () => (/* binding */ isInitialLoading),\n/* harmony export */   isPosting: () => (/* binding */ isPosting),\n/* harmony export */   newComments: () => (/* binding */ newComments),\n/* harmony export */   postToApi: () => (/* binding */ postToApi)\n/* harmony export */ });\n/* harmony import */ var _renderApp_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderApp.js */ \"./JS/renderApp.js\");\n/* harmony import */ var _CommentsList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CommentsList.js */ \"./JS/CommentsList.js\");\n\r\n\r\n\r\nconst listElem = document.getElementById('list-comments');\r\n\r\nlet newComments = [];\r\nlet isInitialLoading = true;\r\nlet isPosting = false;\r\n\r\nconst baseHost = \"https://wedev-api.sky.pro/api/v2/freddy-krugliy/comments\";\r\n\r\nfunction getFromApi(data) {\r\n    return fetch(baseHost, {\r\n        method: \"GET\",\r\n        headers: {\r\n            Authorization: _renderApp_js__WEBPACK_IMPORTED_MODULE_0__.token,\r\n        },\r\n    }).then((response) => {\r\n        if (response.status === 500) {\r\n            throw new Error(\"Ошибка 500\");\r\n        } else {\r\n            return response.json();\r\n        }\r\n    }).then((responseData) => {\r\n        data = responseData.comments;\r\n        isInitialLoading = false;\r\n        (0,_renderApp_js__WEBPACK_IMPORTED_MODULE_0__.renderApp)(data, listElem, _CommentsList_js__WEBPACK_IMPORTED_MODULE_1__.getCommentsList);\r\n        newComments = data;\r\n    }).catch((error) => {\r\n        if (error.message === \"Ошибка 500\") {\r\n            console.log(error);\r\n            alert(\"Сервер сломался, попробуйте позже\");\r\n        } else {\r\n            console.log(error);\r\n            alert(\"Кажется, у вас сломался интернет, попробуйте позже\");\r\n        };\r\n    })\r\n};\r\n\r\n\r\nfunction escapeHtml(text) {\r\n    return text\r\n        .replaceAll(\"&\", \"&amp;\")\r\n        .replaceAll(\"<\", \"&lt;\")\r\n        .replaceAll(\">\", \"&gt;\")\r\n        .replaceAll('\"', \"&quot;\")\r\n        .replaceAll(\"$\", \"&#36\");\r\n};\r\n\r\n\r\nfunction postToApi(data, addCommentElem, addNameElem) {\r\n\r\n    return fetch(baseHost, {\r\n        method: \"POST\",\r\n        headers: {\r\n            Authorization: _renderApp_js__WEBPACK_IMPORTED_MODULE_0__.token,\r\n        },\r\n        body: JSON.stringify({\r\n            text: escapeHtml(addCommentElem.value.trim()),\r\n            name: escapeHtml(addNameElem.value.trim()),\r\n        })\r\n    }).then((response) => {\r\n        if (response.status === 400) {\r\n            throw new Error(\"Ошибка 400\");\r\n        } else if (response.status === 500) {\r\n            throw new Error(\"Ошибка 500\");\r\n        } else {\r\n            return response.json();\r\n        }\r\n    }).then((responseData) => {\r\n        getFromApi(data);\r\n    }).then(() => {\r\n        isPosting = true;\r\n        (0,_renderApp_js__WEBPACK_IMPORTED_MODULE_0__.renderApp)(data, listElem, _CommentsList_js__WEBPACK_IMPORTED_MODULE_1__.getCommentsList);\r\n        addNameElem.value = '';\r\n        addCommentElem.value = '';\r\n        isPosting = false;\r\n    }).catch((error) => {\r\n        if (error.message === \"Ошибка 400\") {\r\n            console.log(error);\r\n            alert(\"Имя и комментарий должны быть не короче 3 символов\");\r\n        } else if (error.message === \"Ошибка 500\") {\r\n            console.log(error);\r\n            postToApi(data, addCommentElem, addNameElem);\r\n        } else {\r\n            alert(\"Кажется, у вас сломался интернет, попробуйте позже\");\r\n        };\r\n    })\r\n};\r\n\r\n\n\n//# sourceURL=webpack://webdev-dom-homework2-9/./JS/api.js?");

/***/ }),

/***/ "./JS/appHtml.js":
/*!***********************!*\
  !*** ./JS/appHtml.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getApp: () => (/* binding */ getApp),\n/* harmony export */   getAuthForm: () => (/* binding */ getAuthForm),\n/* harmony export */   getCommentsAndAuth: () => (/* binding */ getCommentsAndAuth)\n/* harmony export */ });\n/* harmony import */ var _components_login_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/login-component.js */ \"./JS/components/login-component.js\");\n\r\n\r\n\r\nconst getApp = (commentsHtml) => {\r\n    return `\r\n            <div class=\"container\">\r\n                <div class=\"loading\" style=\"display: none;\">Комментарии загружаются...</div>\r\n                <ul class=\"comments\" id=\"list-comments\">\r\n                ${commentsHtml}\r\n                </ul>\r\n                <div class=\"add-form\">\r\n                    <input type=\"text\" class=\"add-form-name\" id=\"add-name\" placeholder=\"Введите ваше имя\" value=\"${_components_login_component_js__WEBPACK_IMPORTED_MODULE_0__.userName}\" disabled />\r\n                    <textarea type=\"textarea\" class=\"add-form-text\" id=\"add-comment\" placeholder=\"Введите ваш коментарий\"\r\n                        rows=\"4\"></textarea>\r\n                    <div class=\"add-form-row\">\r\n                        <button class=\"add-form-button\" id=\"form-add-button\">Написать</button>\r\n                    </div>\r\n                </div>\r\n                <div class=\"comment-added\" style=\"display: none;\">Комментарий добавляется...</div>\r\n            </div>`\r\n};\r\n\r\n\r\nconst getCommentsAndAuth = (commentsHtml) => {\r\n    return `\r\n            <div class=\"container\">\r\n                <div class=\"loading\" style=\"display: none;\">Комментарии загружаются...</div>\r\n                <ul class=\"comments\" id=\"list-comments\">\r\n                ${commentsHtml}\r\n                </ul>\r\n                <div class=\"offer\">Чтобы добавить комментарий, <a href=\"#\" class=\"link\" id=\"auth-link\">авторизуйтесь</a></div>\r\n            </div>`\r\n};\r\n\r\n\r\nconst getAuthForm = () => {\r\n    return `\r\n            <div class=\"container\">\r\n                <div class=\"comment\">\r\n                    <h2>Форма ${_components_login_component_js__WEBPACK_IMPORTED_MODULE_0__.isLoginMode ? \"входа\" : \"регистрации\"}</h2>\r\n                    ${_components_login_component_js__WEBPACK_IMPORTED_MODULE_0__.isLoginMode ? \"\" : `<input type=\"text\" class=\"add-form-name signin-form\" id=\"name-input\" placeholder=\"Введите имя\" /><br>`}\r\n                    <input type=\"text\" class=\"add-form-name signin-form\" id=\"login-input\" placeholder=\"Введите логин\" /><br>\r\n                    <input type=\"password\" class=\"add-form-name signin-form\" id=\"password-input\" placeholder=\"Введите пароль\" /><br>\r\n                    <button class=\"add-form-button signin-button\" id=\"login-button\">${_components_login_component_js__WEBPACK_IMPORTED_MODULE_0__.isLoginMode ? \"Войти\" : \"Зарегистрироваться\"}</button><br><br><br>\r\n                    <a href=\"#\" class=\"link\" id=\"toggle-button\">${_components_login_component_js__WEBPACK_IMPORTED_MODULE_0__.isLoginMode ? \"Зарегистрироваться\" : \"Войти\"}</a>\r\n                </div>\r\n            </div>`\r\n};\n\n//# sourceURL=webpack://webdev-dom-homework2-9/./JS/appHtml.js?");

/***/ }),

/***/ "./JS/components/login-component.js":
/*!******************************************!*\
  !*** ./JS/components/login-component.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   isLoginMode: () => (/* binding */ isLoginMode),\n/* harmony export */   renderLoginComponent: () => (/* binding */ renderLoginComponent),\n/* harmony export */   userName: () => (/* binding */ userName)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api.js */ \"./JS/api.js\");\n/* harmony import */ var _appHtml_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../appHtml.js */ \"./JS/appHtml.js\");\n/* harmony import */ var _renderApp_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../renderApp.js */ \"./JS/renderApp.js\");\n/* harmony import */ var _user_api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../user-api.js */ \"./JS/user-api.js\");\n\r\n\r\n\r\n\r\n\r\nlet isLoginMode = true;\r\nlet userName = {};\r\n\r\nfunction renderLoginComponent({ appHtml, appElement, commentsHtml, setToken }) {\r\n\r\n    appHtml = (0,_appHtml_js__WEBPACK_IMPORTED_MODULE_1__.getCommentsAndAuth)(commentsHtml);\r\n    appElement.innerHTML = appHtml;\r\n\r\n    const loadingComments = document.querySelector('.loading');\r\n    const authLink = document.getElementById('auth-link');\r\n\r\n    (0,_renderApp_js__WEBPACK_IMPORTED_MODULE_2__.isInitialLoadingFunc)(loadingComments);\r\n\r\n    authLink.addEventListener(\"click\", () => {\r\n\r\n        const renderForm = () => {\r\n            appHtml = (0,_appHtml_js__WEBPACK_IMPORTED_MODULE_1__.getAuthForm)();\r\n            appElement.innerHTML = appHtml;\r\n\r\n            const loginBtn = document.getElementById('login-button');\r\n            const toggleBtn = document.getElementById('toggle-button');\r\n\r\n            loginBtn.addEventListener(\"click\", () => {\r\n                if (isLoginMode) {\r\n                    const login = document.getElementById('login-input').value;\r\n                    const password = document.getElementById('password-input').value;\r\n\r\n                    if (!login) {\r\n                        alert(\"Вы не ввели логин\")\r\n                        return;\r\n                    };\r\n\r\n                    if (!password) {\r\n                        alert(\"Вы не ввели пароль\")\r\n                        return;\r\n                    };\r\n\r\n                    (0,_user_api_js__WEBPACK_IMPORTED_MODULE_3__.loginToApp)({\r\n                        login: login,\r\n                        password: password,\r\n                    }).then((user) => {\r\n                        setToken(`Bearer ${user.user.token}`);\r\n                        userName = user.user.name;\r\n                        (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getFromApi)(_api_js__WEBPACK_IMPORTED_MODULE_0__.newComments);\r\n                    }).catch((error) => {\r\n                        if (error.message === \"Неверный логин или пароль\") {\r\n                            alert(error.message);\r\n                        }\r\n                    })\r\n                } else {\r\n                    const name = document.getElementById('name-input').value;\r\n                    const login = document.getElementById('login-input').value;\r\n                    const password = document.getElementById('password-input').value;\r\n\r\n                    if (!name) {\r\n                        alert(\"Вы не ввели имя\")\r\n                        return;\r\n                    };\r\n\r\n                    if (!login) {\r\n                        alert(\"Вы не ввели логин\")\r\n                        return;\r\n                    };\r\n\r\n                    if (!password) {\r\n                        alert(\"Вы не ввели пароль\")\r\n                        return;\r\n                    };\r\n\r\n                    (0,_user_api_js__WEBPACK_IMPORTED_MODULE_3__.registerToApp)({\r\n                        login: login,\r\n                        password: password,\r\n                        name: name,\r\n                    }).then((user) => {\r\n                        setToken(`Bearer ${user.user.token}`);\r\n                        userName = user.user.name;\r\n                        (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getFromApi)(_api_js__WEBPACK_IMPORTED_MODULE_0__.newComments);\r\n                    }).catch((error) => {\r\n                        if (error.message === \"Пользователь с таким логином уже сущетсвует\") {\r\n                            alert(error.message);\r\n                        }\r\n                    })\r\n                }\r\n\r\n            });\r\n\r\n            toggleBtn.addEventListener(\"click\", () => {\r\n                isLoginMode = !isLoginMode;\r\n                renderForm();\r\n            });\r\n        };\r\n\r\n        renderForm();\r\n    });\r\n};\n\n//# sourceURL=webpack://webdev-dom-homework2-9/./JS/components/login-component.js?");

/***/ }),

/***/ "./JS/likes.js":
/*!*********************!*\
  !*** ./JS/likes.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   likeButtonsListeners: () => (/* binding */ likeButtonsListeners)\n/* harmony export */ });\n/* harmony import */ var _renderApp_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderApp.js */ \"./JS/renderApp.js\");\n/* harmony import */ var _CommentsList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CommentsList.js */ \"./JS/CommentsList.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api.js */ \"./JS/api.js\");\n\r\n\r\n\r\n\r\nconst listElem = document.getElementById('list-comments');\r\n\r\nconst likeButtonsListeners = () => {\r\n    const likeButtonElements = document.querySelectorAll('.like-button');\r\n\r\n    for (const likeButtonElement of likeButtonElements) {\r\n\r\n        likeButtonElement.addEventListener(\"click\", (event) => {\r\n            event.stopPropagation();\r\n\r\n            likeButtonElement.classList.add(\"-loading-like\");\r\n            const comment = _api_js__WEBPACK_IMPORTED_MODULE_2__.newComments[likeButtonElement.dataset.index];\r\n\r\n            delay().then(() => {\r\n                comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;\r\n                comment.isLiked = !comment.isLiked;\r\n            }).then(() => {\r\n                likeButtonElement.classList.remove(\"-loading-like\");\r\n                (0,_renderApp_js__WEBPACK_IMPORTED_MODULE_0__.renderApp)(_api_js__WEBPACK_IMPORTED_MODULE_2__.newComments, listElem, _CommentsList_js__WEBPACK_IMPORTED_MODULE_1__.getCommentsList);\r\n            });\r\n        });\r\n    };\r\n};\r\n\r\n\r\nfunction delay(interval = 300) {\r\n    return new Promise((resolve) => {\r\n        setTimeout(() => {\r\n            resolve();\r\n        }, interval);\r\n    });\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://webdev-dom-homework2-9/./JS/likes.js?");

/***/ }),

/***/ "./JS/main.js":
/*!********************!*\
  !*** ./JS/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./JS/api.js\");\n/* harmony import */ var _renderApp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderApp.js */ \"./JS/renderApp.js\");\n/* harmony import */ var _CommentsList_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CommentsList.js */ \"./JS/CommentsList.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n(0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getFromApi)(_api_js__WEBPACK_IMPORTED_MODULE_0__.newComments);\r\n(0,_renderApp_js__WEBPACK_IMPORTED_MODULE_1__.renderApp)(_api_js__WEBPACK_IMPORTED_MODULE_0__.newComments, _renderApp_js__WEBPACK_IMPORTED_MODULE_1__.appElement, _CommentsList_js__WEBPACK_IMPORTED_MODULE_2__.getCommentsList);\n\n//# sourceURL=webpack://webdev-dom-homework2-9/./JS/main.js?");

/***/ }),

/***/ "./JS/renderApp.js":
/*!*************************!*\
  !*** ./JS/renderApp.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   appElement: () => (/* binding */ appElement),\n/* harmony export */   isInitialLoadingFunc: () => (/* binding */ isInitialLoadingFunc),\n/* harmony export */   renderApp: () => (/* binding */ renderApp),\n/* harmony export */   token: () => (/* binding */ token)\n/* harmony export */ });\n/* harmony import */ var _likes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./likes.js */ \"./JS/likes.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ \"./JS/api.js\");\n/* harmony import */ var _appHtml_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./appHtml.js */ \"./JS/appHtml.js\");\n/* harmony import */ var _components_login_component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/login-component.js */ \"./JS/components/login-component.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst appElement = document.getElementById('app');\r\n\r\nlet token;\r\nlet appHtml;\r\n\r\n\r\nconst isInitialLoadingFunc = (loadElem) => {\r\n    if (_api_js__WEBPACK_IMPORTED_MODULE_1__.isInitialLoading) {\r\n        loadElem.style.display = 'block';\r\n    } else {\r\n        loadElem.style.display = 'none';\r\n    };\r\n};\r\n\r\n\r\nconst renderApp = (data, elem, getList) => {\r\n\r\n    const commentsHtml = data\r\n        .map((comment, index) => getList(comment, index))\r\n        .join('');\r\n\r\n\r\n    if (!token) {\r\n        (0,_components_login_component_js__WEBPACK_IMPORTED_MODULE_3__.renderLoginComponent)({\r\n            appHtml,\r\n            appElement, \r\n            commentsHtml, \r\n            setToken: (newToken) => token = newToken,\r\n        });\r\n        return;\r\n    };\r\n\r\n    appHtml = (0,_appHtml_js__WEBPACK_IMPORTED_MODULE_2__.getApp)(commentsHtml);\r\n    appElement.innerHTML = appHtml;\r\n\r\n    const commentBtn = document.getElementById('form-add-button');\r\n    const addName = document.getElementById('add-name');\r\n    const addComment = document.getElementById('add-comment');\r\n    const loadingComments = document.querySelector('.loading');\r\n    const addFormElem = document.querySelector('.add-form');\r\n    const commentAddedElem = document.querySelector('.comment-added');\r\n\r\n    isInitialLoadingFunc(loadingComments);\r\n\r\n    if (_api_js__WEBPACK_IMPORTED_MODULE_1__.isPosting) {\r\n        addFormElem.style.display = 'none';\r\n        commentAddedElem.style.display = 'block';\r\n    } else {\r\n        addFormElem.style.display = 'block';\r\n        commentAddedElem.style.display = 'none';\r\n    };\r\n\r\n    (0,_likes_js__WEBPACK_IMPORTED_MODULE_0__.likeButtonsListeners)();\r\n\r\n\r\n    const addNewComment = () => {\r\n        commentBtn.addEventListener(\"click\", () => {\r\n            addName.classList.remove(\"error\");\r\n            addComment.classList.remove(\"error\");\r\n\r\n            if (addName.value.trim() === '') {\r\n                return addName.classList.add(\"error\");\r\n            } else if (addComment.value.trim() === '') {\r\n                return addComment.classList.add(\"error\");\r\n            };\r\n\r\n\r\n            renderApp(data, elem, getList);\r\n            (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.postToApi)(data, addComment, addName);\r\n        });\r\n    };\r\n\r\n    addNewComment();\r\n\r\n\r\n    function checkInputs() {\r\n        let isFilled = true;\r\n\r\n        if (addName.value.trim() === '' || addComment.value.trim() === '') {\r\n            isFilled = false;\r\n        }\r\n\r\n        if (isFilled) {\r\n            commentBtn.disabled = false;\r\n            commentBtn.classList.remove(\"hidden-button\");\r\n        } else {\r\n            commentBtn.disabled = true;\r\n            commentBtn.classList.add(\"hidden-button\");\r\n        }\r\n    };\r\n\r\n\r\n    const addNewCommentOnEnter = (event) => {\r\n        if (event.keyCode === 13) {\r\n            addName.classList.remove(\"error\");\r\n            addComment.classList.remove(\"error\");\r\n\r\n            if (addName.value.trim() === '') {\r\n                return addName.classList.add(\"error\");\r\n            } else if (addComment.value.trim() === '') {\r\n                return addComment.classList.add(\"error\");\r\n            } else {\r\n                commentBtn.click();\r\n            };\r\n        };\r\n    };\r\n\r\n    addName.addEventListener('input', checkInputs);\r\n    addName.addEventListener('keyup', addNewCommentOnEnter);\r\n    addComment.addEventListener('input', checkInputs);\r\n    addComment.addEventListener('keyup', addNewCommentOnEnter);\r\n};\r\n\r\n\n\n//# sourceURL=webpack://webdev-dom-homework2-9/./JS/renderApp.js?");

/***/ }),

/***/ "./JS/user-api.js":
/*!************************!*\
  !*** ./JS/user-api.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loginToApp: () => (/* binding */ loginToApp),\n/* harmony export */   registerToApp: () => (/* binding */ registerToApp)\n/* harmony export */ });\nconst userHost = \"https://wedev-api.sky.pro/api/user\";\r\n\r\nfunction loginToApp({ login, password }) {\r\n    return fetch(userHost + \"/login\", {\r\n        method: \"POST\",\r\n        body: JSON.stringify({\r\n            login,\r\n            password,\r\n        })\r\n    }).then((response) => {\r\n        if (response.status === 400) {\r\n            throw new Error(\"Неверный логин или пароль\");\r\n        };\r\n        return response.json();\r\n    })\r\n};\r\n\r\n\r\nfunction registerToApp({ login, password, name }) {\r\n    return fetch(userHost, {\r\n        method: \"POST\",\r\n        body: JSON.stringify({\r\n            login,\r\n            password,\r\n            name,\r\n        })\r\n    }).then((response) => {\r\n        if (response.status === 400) {\r\n            throw new Error(\"Пользователь с таким логином уже сущетсвует\");\r\n        };\r\n        return response.json();\r\n    })\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack://webdev-dom-homework2-9/./JS/user-api.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./JS/main.js");
/******/ 	
/******/ })()
;