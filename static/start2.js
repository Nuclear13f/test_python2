const site2 = document.querySelector("#site2")


html = '<div class="start2"></div>  <button type="button" class="btn btn-success r2">Заказы</button>'
site2.insertAdjacentHTML('beforeend', html)


$(document).on("click", '.r2', function () {
    alert('Привет')
    // let http = new XMLHttpRequest()
    // let data = []
    // http.open('POST', '/start/?page=2')
    // http.send(data)
});

function start(){
    let http = new XMLHttpRequest()
    let data = []
    alert('s1')
    http.open('POST', '/start/?page=1')
    http.send(data)

}
// start();

$(document).on("click", '.ssaass', function () {

    // alert(event.target.text)
    const params = '?page=' + event.target.text
    window.history.pushState('1', 'Title', params);
});

async function getData() {
   const data = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data2 = await data.json() //Достаем данные
    return data2

}
async function gData(){
    let render = await getData();
    render.forEach(rer =>{
        // console.log(rer)
        // console.log(rer.title)

    })
}
// gData();


// const url ='https://fakestoreapi.com/products/categories'
// let check = document.querySelectorAll(".form-check")
//
// console.log(url)
// fetch(url, {
//     method: 'GET',
// }).then((data) => {
//     return data.json()
// }).then((info) => {
//     console.log(info)
//     info.forEach(rer => {
//             console.log(rer)
//         html = '<div class="form-check"> <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">' +
//             '<label class="form-check-label" for="flexCheckDefault">' + rer + '  </label></div>'
//         site2.insertAdjacentHTML('beforeend', html)
//         }
//
//     )
// })

function render1() {
    let divE = document.createElement('div')
    divE.classList.add('container')
    divE.style.border = '1px solid #0000FF';
    divE.style.height = '200px'
    const http_c = '<div class="container myFlex" style="margin-top: 10px"> <div id="stouts" class="container start2" style="; ' +
        'width: 20%; margin-right: 10px"></div> <div class="container start2" style="height: 50px; width: 80%"></div> </div>'
    divE.insertAdjacentHTML('beforeend', http_c)
    site2.prepend(divE)
    console.log(1, 'render')
}
render1();


async function getCategory() {
    console.log(2, 'getCategories')
    const data = await fetch('https://fakestoreapi.com/products/categories')
    const info = await data.json() //Достаем данные
    const url = new URL(window.location)
    const stouts = document.querySelector("#stouts")
    let checked = "";

    info.forEach(rer => {
        if (url.searchParams.get(rer)) {
            checked = 'checked'
        } else {
            checked = ''
        }
        html = '<div class="form-check"> <input class="form-check-input" type="checkbox" value="' + rer + '" id="flexCheckDefault"' + checked + '>' +
            '<label class="form-check-label" for="flexCheckDefault">' + rer + '  </label></div>'
        stouts.insertAdjacentHTML('beforeend', html)
    })
    const check = await document.querySelectorAll(".form-check")
    check.forEach(check => {
            check.addEventListener('click', hClick)
        }
    )
}

getCategory();

async function getProduct() {
    const data = await fetch('https://fakestoreapi.com/products')
    const info = await data.json()
    info.forEach(rer => {
    })
}
getProduct();


const hClick = (event) => {
    console.log(event.target.value)
    console.log(event.type)

    if (event.target.checked){
        // const r = new URL(window.location.href)
        // let ss = r.searchParams.values();
        // console.log(r)
        // console.log(ss)
        // const params = '?' + event.target.value + '=1'
        let url = new URL(window.location)
        url.searchParams.append(event.target.value,'1')
        window.history.replaceState(window.history.state,'',url.href)

    } else {
        // window.history.pushState('2', '', '');
        const url = new URL(window.location.href)
        console.log(url)
        url.searchParams.delete(event.target.value)
        console.log(url.href)
        history.replaceState(history.state, '', url.href);
    }
}

async function get_stat() {
    const result = await $.ajax({
        url: '/get_stat_product',
        method: 'post',
        data: {params: {text: 'Текст'}},
    });
    return result;
}

async function go_stat(){
    let render = await get_stat();
    console.log(render)
}
go_stat();

