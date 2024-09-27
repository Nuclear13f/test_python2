


    fetch('https://jsonplaceholder.typicode.com/todos').then((data) => {
        return data.json()
    }).then((data) => {
        // console.log(data)
    })



async function getData() {
   const data = await fetch('https://jsonplaceholder.typicode.com/todos')
    console.log(data)
    const data2 = await data.json() //Достаем данные
    console.log(data2)
}

getData();