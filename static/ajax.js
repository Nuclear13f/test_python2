

function f1() {
    const xhr = new XMLHttpRequest(); //Объект запроса
    // Куда посылаем и параметры
    const url = '/testRequest'
    xhr.open('GET',url)

    //Обработка ответа от сервера

    xhr.onload = function (){
        console.log(xhr.status) //статус ответа
        console.log(xhr.response) //собственно сам ответ от сервера
        const data = JSON.parse(xhr.response); //переводим в удомбный формат
        console.log(data)
    }
    //послать запрос
    xhr.send();
}
// f1();

const getData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/testRequest')
    xhr.responseType = 'json';//Автоматически переведит в нужный формат (не надо json.parse)
    xhr.onload = () => {
        const data = xhr.response;
        console.log(data);
    }
    xhr.send();
}

//С использованием промисов
const getData2 = () => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/testRequest')
        xhr.responseType = 'json';//Автоматически переведит в нужный формат (не надо json.parse)
        xhr.onload = () => {
            resolve(xhr.response)
        }
        xhr.send();
    })
    console.log(promise.then())
    return promise
}
getData();
getData2();

/////// POST

const sendData = () => {
    sendHttpRequest('POST', '/testRequest', {email: 'test', pass: 'testPass'})
};

const sendHttpRequest = (method, url, data) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url)
    xhr.responseType = 'json';//Автоматически переведит в нужный формат (не надо json.parse)
    if (data)
    {
        xhr.setRequestHeader('Content-Type', 'application/json')
    }
    xhr.onload = () => {
        const data = xhr.response;
        console.log(data);
    }
    xhr.send(JSON.stringify(data));
}

sendData();
