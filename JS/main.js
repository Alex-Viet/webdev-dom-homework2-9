"use strict";
const listElem = document.getElementById('list-comments');
const commentBtn = document.getElementById('form-add-button');
const addName = document.getElementById('add-name');
const addComment = document.getElementById('add-comment');
const commentElements = document.querySelectorAll('comments');
const lastCommentDeleteButton = document.getElementById('form-delete-button');
const loadingComments = document.querySelector('.loading');
const commentAddedElem = document.querySelector('.comment-added');
const addFormElem = document.querySelector('.add-form');

let comments = [
    // {
    //   userName: "Глеб Фокин",
    //   commentDate: "13.02.22 19:22",
    //   userComment: "Это будет первый комментарий на этой странице",
    //   likes: 3,
    //   isLiked: false,
    //   isEdit: false,
    // },
    // {
    //   userName: "Варвара Н.",
    //   commentDate: "13.02.22 19:22",
    //   userComment: "Мне нравится как оформлена эта страница! ❤",
    //   likes: 75,
    //   isLiked: false,
    //   isEdit: false,
    // },
];

getFromApiFirstTime();


function getFromApiFirstTime() {
    loadingComments.style.display = 'block';

    return fetch("https://webdev-hw-api.vercel.app/api/v1/freddy-krugliy/comments", {
        method: "GET",
    }).then((responce) => {
        loadingComments.style.display = 'none';

        if (responce.status === 500) {
            throw new Error("Ошибка 500");
        } else {
            return responce.json();
        }
    }).then((responceData) => {
        comments = responceData.comments;
        renderComments();
    }).catch((error) => {
        if (error.message === "Ошибка 500") {
            console.log(error);
            alert("Сервер сломался, попробуй позже");
        } else {
            alert("Кажется, у вас сломался интернет, попробуйте позже");
        };
    })
};


function getFromApi() {
    return fetch("https://webdev-hw-api.vercel.app/api/v1/freddy-krugliy/comments", {
        method: "GET",
    }).then((responce) => {
        if (responce.status === 500) {
            throw new Error("Ошибка 500");
        } else {
            return responce.json();
        }
    }).then((responceData) => {
        comments = responceData.comments;
        renderComments();
    }).catch((error) => {
        if (error.message === "Ошибка 500") {
            console.log(error);
            alert("Сервер сломался, попробуй позже");
        } else {
            alert("Кажется, у вас сломался интернет, попробуйте позже");
        };
    })
};


function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}

const likeButtonsListeners = () => {
    const likeButtonElements = document.querySelectorAll('.like-button');
    const likeCountElements = document.querySelectorAll('.likes-counter');

    for (const likeButtonElement of likeButtonElements) {

        likeButtonElement.addEventListener("click", (event) => {
            event.stopPropagation();
            likeButtonElement.classList.add("-loading-like");
            const comment = comments[likeButtonElement.dataset.index];

            delay(2000).then(() => {
                comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;
                comment.isLiked = !comment.isLiked;
                renderComments();
            });
        });
    };
};


const editButtonsListeners = () => {
    const editButtonElements = document.querySelectorAll('.edit-button');
    const commentTextElements = document.querySelectorAll('.comment-text');

    for (const editButtonElement of editButtonElements) {
        editButtonElement.addEventListener('click', (event) => {
            event.stopPropagation();
            const index = editButtonElement.dataset.index;
            const comment = comments[index];
            const commentTextElement = commentTextElements[index];
            const textArea = document.querySelectorAll('.comment-text');

            if (comment.isEdit && textArea) {
                comment.text = textArea[index].value;
            }

            comment.isEdit = !comment.isEdit;
            comments[index].isEdit = comment.isEdit;

            renderComments();
        });
    };
};


const replyToCommentListeners = () => {
    const commentTextElements = document.querySelectorAll('.comment');
    for (const commentText of commentTextElements) {
        commentText.addEventListener('click', () => {
            event.stopPropagation();
            const index = commentText.dataset.index;
            const comment = comments[index];
            addComment.classList.add('reply-comment');
            addComment.value = `QUOTE_BEGIN ${comment.name}:\n${comment.text.replaceAll("QUOTE_BEGIN", "").replaceAll("QUOTE_END", "")}QUOTE_END\n `;
            addComment.focus();
            renderComments();
        });
    };
};


const renderComments = () => {
    const commentsHtml = comments
        .map((comment, index) => {
            return `<li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>
              ${comment.author.name}
            </div>
            <div>
              ${getActualDate(comment.date)}
            </div>
          </div>
          <div class="comment-body">
            ${comment.isEdit
                    ? `<textarea type="textarea" class="comment-text" rows="4" onclick="event.stopPropagation()">${comment.text}</textarea>`
                    : `<div class="comment-text" data-index="${index}">
              ${comment.text.replaceAll("QUOTE_BEGIN", "<div class='quote'>").replaceAll("QUOTE_END", "</div>")}
            </div>`
                }
          </div>
          <div class="comment-footer">
            <div>
              <button class="add-form-button edit-button" data-index="${index}">${comment.isEdit ? 'Сохранить' : 'Редактировать'
                }</button>
            </div>
            <div class="likes">
              <span class="likes-counter">
                ${comment.likes}
              </span>
              <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}">
              </button>
            </div>
          </div>
        </li>`;
        })
        .join('');

    listElem.innerHTML = commentsHtml;
    likeButtonsListeners();
    editButtonsListeners();
    replyToCommentListeners();
};

renderComments();


function getActualDate(date) {
    let userDate = new Date(date);
    let month = userDate.getMonth() + 1;
    let minutes = userDate.getMinutes();
    let year = userDate.getFullYear() % 100;

    if (month < 10) {
        month = "0" + month;
    };

    if (minutes < 10) {
        minutes = "0" + minutes;
    };

    if (year < 10) {
        year = "0" + year;
    };

    return `${userDate.getDate()}.${month}.${year} ${userDate.getHours()}:${minutes}`;
};


const addNewComment = () => {
    commentBtn.addEventListener("click", () => {
        addName.classList.remove("error");
        addComment.classList.remove("error");

        if (addName.value.trim() === '') {
            return addName.classList.add("error");
        } else if (addComment.value.trim() === '') {
            return addComment.classList.add("error");
        };


        function escapeHtml(text) {
            return text
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;")
                .replaceAll("$", "&#36");
        };

        // comments.push({
        //   userName: escapeHtml(addName.value),
        //   commentDate: nowDate,
        //   userComment: escapeHtml(addComment.value),
        //   likes: 0,
        //   isLiked: false,
        //   isEdit: false,
        // });

        function changeMessageToAddForm() {
            addFormElem.style.display = 'block';
            commentAddedElem.style.display = 'none';
        };


        function postToApi() {
            addFormElem.style.display = 'none';
            commentAddedElem.style.display = 'block';

            return fetch("https://webdev-hw-api.vercel.app/api/v1/freddy-krugliy/comments", {
                method: "POST",
                body: JSON.stringify({
                    text: escapeHtml(addComment.value.trim()),
                    name: escapeHtml(addName.value.trim()),
                    forceError: true,
                })
            }).then((responce) => {
                if (responce.status === 400) {
                    throw new Error("Ошибка 400");
                } else if (responce.status === 500) {
                    throw new Error("Ошибка 500");
                } else {
                    console.log(responce.status);
                    return responce.json();
                }
            }).then((responceData) => {
                return getFromApi();
            }).then(() => {
                changeMessageToAddForm();
                addName.value = '';
                addComment.value = '';
            }).catch((error) => {
                if (error.message === "Ошибка 400") {
                    console.log(error);
                    changeMessageToAddForm();
                    alert("Имя и комментарий должны быть не короче 3 символов");
                } else if (error.message === "Ошибка 500") {
                    console.log(error);
                    changeMessageToAddForm();
                    // alert("Сервер сломался, попробуй позже");
                    postToApi();
                } else {
                    changeMessageToAddForm();
                    alert("Кажется, у вас сломался интернет, попробуйте позже");
                };
            })
        };

        renderComments();
        postToApi();
    });
};

addNewComment();


function checkInputs() {
    let isFilled = true;

    if (addName.value.trim() === '' || addComment.value.trim() === '') {
        isFilled = false;
    }

    if (isFilled) {
        commentBtn.disabled = false;
        commentBtn.classList.remove("hidden-button");
    } else {
        commentBtn.disabled = true;
        commentBtn.classList.add("hidden-button");
    }
};


const addNewCommentOnEnter = (event) => {
    if (event.keyCode === 13) {
        addName.classList.remove("error");
        addComment.classList.remove("error");

        if (addName.value.trim() === '') {
            return addName.classList.add("error");
        } else if (addComment.value.trim() === '') {
            return addComment.classList.add("error");
        } else {
            commentBtn.click();
        };
    };
};


const DeleteLastComment = () => {
    lastCommentDeleteButton.addEventListener('click', () => {
        comments.pop();
        renderComments();
    });
};

lastCommentDeleteButton.disabled = true;
DeleteLastComment();

addName.addEventListener('input', checkInputs);
addName.addEventListener('keyup', addNewCommentOnEnter);
addComment.addEventListener('input', checkInputs);
addComment.addEventListener('keyup', addNewCommentOnEnter);