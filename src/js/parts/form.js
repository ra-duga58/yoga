function form () {
    let message = {
        loading: "Загрузка...",
        sucsess: "Спасибо! Скоро мы с Вами свяжемся!",
        failure: "Что-то пошло не так..."
    };

    let form = document.querySelector('.main-form'),
        formDown = document.querySelector('#form'),
        inputFormDown = formDown.getElementsByTagName('input'),
        input = form.getElementsByTagName ('input'),
        statusMessage = document.createElement('div');


    statusMessage.classList.add('status');

    function sendForm(elem){

        elem.addEventListener('submit', function (event) {
            event.preventDefault();
            elem.appendChild(statusMessage);

            let formData = new FormData(elem);

            function postData() {
                return new Promise(function (resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                    request.onreadystatechange = function () {
                        if(request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4) {
                            if (request.status == 200 && request.status < 300) {
                                resolve();
                            } else {
                                reject();
                            }
                        }
                    };

                    let obj = {};
                    formData.forEach (function (value, key) {
                        obj[key] = value;
                    });
                    let json = JSON.stringify(obj);
                    request.send(json);

                });
            }

            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }

                for (let i = 0; i < inputFormDown.length; i++) {
                    inputFormDown[i].value = '';
                }

            }

            postData (formData)
                .then (() => statusMessage.innerHTML = message.loading)
                .then (() => statusMessage.innerHTML = message.sucsess)
                .catch (() => statusMessage.innerHTML = message.failure)
                .then (clearInput);
        });

    }

    sendForm(form);
    sendForm(formDown);
}

module.exports = form;