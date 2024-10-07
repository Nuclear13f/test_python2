const site2 = document.querySelector("#site2")
const param = [{'type': 'type_product_id'}, {'s1': 's1'}]

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
    let d1 = url.searchParams.getAll('type')
    let checked_m = "";
    let checked_i = "";

    if (d1){
        d1.forEach(s =>{
            if (s==="2"){checked_m='checked'}
            if (s==="1"){checked_i='checked'}
        })
    }

    html = '<div><input id="checkbox-1" type="checkbox" class="pt-checker_L" name="novelty" labelhtml="[object Object]" value="2"' + checked_m + '><label for="checkbox-1" class="pt-checkbox-label_L" ><div class="filter-titte-qty ">Материал</div></label>\</div>'
    stouts.insertAdjacentHTML('beforeend', html)
    html = '<div><input id="checkbox-2" type="checkbox" class="pt-checker_L" name="novelty" labelhtml="[object Object]" value="1"' + checked_i + '><label for="checkbox-2" class="pt-checkbox-label_L" ><div class="filter-titte-qty ">Инструмент</div></label>\</div>'
    stouts.insertAdjacentHTML('beforeend', html)
    const check2 = await document.querySelectorAll(".pt-checker_L")
    check2.forEach(check => {
            check.addEventListener('click', hClick2)
        }
    )

}
getCategory();

const hClick2 = (event) => {
    if (event.target.checked){
        let url = new URL(window.location)
        url.searchParams.append("type",event.target.value)
        window.history.replaceState(window.history.state,'',url.href)
    }else {
        const url = new URL(window.location.href)
        const param = url.searchParams
        if (param.getAll('type').length===1){
            param.delete('type');
            history.replaceState(history.state, '', url.href);
        }else{
            let str = param.getAll('type')
            for (let i=0; i<str.length;++i) {
                if (event.target.value===str[i]) {
                    str.splice(i,1)
                }
            }
            param.delete('type');
            param.append('type',str[0])
            history.replaceState(history.state, '', url.href);
        }
    }
    go_products();
}







async function getProduct() {
    const data = await fetch('https://fakestoreapi.com/products')
    const info = await data.json()
    info.forEach(rer => {
    })
}
getProduct();


const hClick = (event) => {

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
        url.searchParams.delete(event.target.value)
        console.log(url.href)
        history.replaceState(history.state, '', url.href);
    }
}

async function get_stat() {

 const newPost =
    {
    "userId": 1,
    "id": 44343433434,
    "title": "Hellow",
    "body": "awdawdfawsregsegsefsefsfsef",
     "flag": true,
     "con": ["flag1","flag2"],
     "sas": {"s": 1, "b": 2}

  }

const test = JSON.stringify(newPost) //Оборочиваем в строку JSON

    const result = await $.ajax({
        url: '/get_stat_product',
        method: 'post',
        contentType: 'application/json',
        data:  test,
    });
    return result;
}

async function go_stat(){
    let render = await get_stat();
    console.log(render)
}
// go_stat();


async function get_products() {

 const newPost =
    {
    "userId": 1,
    "id": 44343433434,
    "title": "Hellow",
    "body": "awdawdfawsregsegsefsefsfsef",
     "flag": true,
     "con": ["flag1","flag2"],
     "type": []

  }
let par = []
let url = new URL(window.location)
       if (url.searchParams.toString()) {console.log('есть праметры')
          if (url.searchParams.has('type')) {
              console.log('Yea', url.searchParams.getAll('type'))
              url.searchParams.getAll('type').forEach(p=>{
                  let s = {'type_product_id': p}
                  par.push(s)
              })
              newPost['type'] = url.searchParams.getAll('type')
              console.log(newPost)
          }

       } else {console.log('нет параметров')}


const test = JSON.stringify(newPost) //Оборочиваем в строку JSON
    const result = await $.ajax({
        url: '/get_products',
        method: 'post',
        contentType: 'application/json',
        data:  test,
    });
    return result;
}

async function go_products(){
    let render = await get_products();
    console.log(render)
}
go_products();

