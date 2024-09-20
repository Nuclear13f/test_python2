// // Метод GET запрашивает предоставления ресурса
// // Метод POST говорит серверу, что у меня есть данные для тебя
//
//
// fetch('https://jsonplaceholder.typicode.com/posts')
// const data = fetch('https://jsonplaceholder.typicode.com/comments') // Вернет Promise
// console.log(data);
//
// fetch('https://jsonplaceholder.typicode.com/comments').then((data)=> {
//     console.log(data)
// }) // Вернет уже какие-то данные
//
// //Что бы получить JSON надо:
//
// fetch('https://jsonplaceholder.typicode.com/comments').then((data)=> {
//     data.json().then((info)=> {
//         console.log(info)
//     })
// }) // Вернет уже данные
//
// //УСЛОЖНЯЕМ
//
// //Получаем одного пользователя
// fetch('https://jsonplaceholder.typicode.com/users/1').then((data)=> {
//         console.log(data)
//         return data.json()
// }).then((info) =>{
//     console.log(info)
// })
//
// //Получаем всех пользователей
// fetch('https://jsonplaceholder.typicode.com/users/').then((data)=> {
//         console.log(data)
//         return data.json()
// }).then((info) =>{
//     console.log(info)
// })
//
// //Запросим 11 пользователя и получем ошибку 404 (так как пользователей всего 10)
// fetch('https://jsonplaceholder.typicode.com/users/11').then((data)=> {
//         console.log(data)
//         return data.json()
// }).then((info) =>{
//     console.log(info)
// })
//
// //Обработаем ошибку
// fetch('https://jsonplaceholder.typicode.com/users/11').then((data)=> {
//     if (data.status === 200){
//         return data.json()
//     }
//     else {console.error('Ошибка')}
//     console.log(data)
// }).then((info) =>{
//     console.log(info)
// })
//
// // МЕТОД GET
//
// fetch('https://jsonplaceholder.typicode.com/users/11', {
//     method: 'GET',
//     }
// ).then((data)=> {
//     if (data.status === 200){
//         return data.json()
//     }
//     else {console.error('Ошибка')}
//     console.log(data)
// }).then((info) =>{
//     console.log(info)
// })
//
// // МЕТОД POST
// const newPost =
// {
//     "userId": 1,
//     "id": 44343433434,
//     "title": "Hellow",
//     "body": "awdawdfawsregsegsefsefsfsef"
//   }
//
// const test = JSON.stringify(newPost) //Оборочиваем в строку JSON
//
// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     body: test,     //Если статус 201 то данные сохранены на сервере
//     }
// ).then((data)=> {
//     if (data.status === 200){
//         return data.json()
//     }
//     else {console.error('Ошибка')}
//     console.log(data)
// }).then((info) =>{
//     console.log(info)
// })


//РАБОТЫ С ПАРАМЕТРАМИ

const url ='https://api.open-meteo.com/v1/forecast?latitude=52.57&longitude=30.19&current=temperature_2m'
console.log(url)
fetch(url, {
    method: 'GET',
    }).then((data) => {
        return data.json()
    }).then((info) => {
        console.log(info)
        renderWeather(info.current.temperature_2m);
    })

function renderWeather(data){
    const div = document.createElement('div');
    div.textContent = data;
    document.body.append(div);
}