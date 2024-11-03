const site2 = document.querySelector("#site2")
const param = [{'type': 'type_product_id'}, {'s1': 's1'}]
let flgArrow_1 = false;
let pagesCount = 0

async function getData() {
   const data = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data2 = await data.json() //Достаем данные
    return data2

}
async function gData(){
    let render = await getData();
    render.forEach(rer =>{
    })
}
// gData();

function render() {
    let divE = document.createElement('div')
    divE.classList.add('container')
    divE.style.border = '1px solid #0000FF';
    // divE.style.height = '200px'
    const http_c = '<div class="container myFlex" style="margin-top: 0px"> <div id="stouts" class="start2"></div> <div class="start2_"> <div class="pagination13"></div> </div>  </div>'
    divE.insertAdjacentHTML('beforeend', http_c)
    site2.prepend(divE)
}
render();

async function getCategory() {
    const url = new URL(window.location)
    const stouts = document.querySelector("#stouts")
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

function ddd() {
    let sel1 = new SlimSelect({
        select: '#select_providers',
        settings: {
            placeholderText: 'Выбери поставщика'
        },
        events: {
            afterChange: (newVal) => {
                hClick4444(newVal)
            }
        }
    })
    const url = new URL(window.location)
    let d1 = url.searchParams.getAll('provider')
    if (d1){
        m = []
        d1.forEach(s =>{
            m.push(s)
        })
        sel1.setSelected(m, false)
    }

}

async function getProviders() {
    const stouts = document.querySelector("#stouts")
    let eSelect_1 = document.createElement('select')
    eSelect_1.classList.add('provider22112')
    eSelect_1.setAttribute('id', 'select_providers')
    eSelect_1.multiple = true
    let html2 = '<option value="value 1">sdfdfds</option>'
    let html = ''
    let render = await go_provider();
    render['data'].forEach(d => {
        let eOption = document.createElement('option')
            eOption.textContent = d['name_provider']
            eOption.setAttribute('id', d['id'])
            eOption.setAttribute('value',d['id'])
            eSelect_1.append(eOption)
    })
    stouts.append(eSelect_1)
    ddd();
}
getProviders();


const hClick2 = (event) => {
    if (event.target.checked){
        let url = new URL(window.location)
        url.searchParams.delete('page');
        url.searchParams.append("type",event.target.value)
        window.history.replaceState(window.history.state,'',url.href)
    }else {
        const url = new URL(window.location.href)
        const param = url.searchParams
        param.delete('page');
        if (param.getAll('type').length===1){
            param.delete('type');
            history.replaceState(history.state, '', url.href);
        }else{
            let str = param.getAll('type')
            for (let i=0; i<str.length;++i) {
                if (event.target.value===str[i]) {
                    // Удалим из массива один элемент начиная с i
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


// async function getProduct() {
//     const data = await fetch('https://fakestoreapi.com/products')
//     const info = await data.json()
//     info.forEach(rer => {
//     })
// }
// getProduct();

async function get_stat() {
    const newPost =
        {
            "userId": 1,
            "id": 44343433434,
            "title": "Hellow",
            "body": "awdawdfawsregsegsefsefsfsef",
            "flag": true,
            "con": ["flag1", "flag2"],
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
            "con": ["flag1", "flag2"],
            "type": [],
            'provider': [],
            'page': ['1'],
            'query': []
        }
    let type_m = []
    let url = new URL(window.location)
    if (url.searchParams.toString()) {
        if (url.searchParams.has('type')) {
            newPost['type'] = url.searchParams.getAll('type')
        }
        if (url.searchParams.has('provider')) {
            newPost['provider'] = url.searchParams.getAll('provider')
        }
        if (url.searchParams.has('page')) {
            newPost['page'] = url.searchParams.getAll('page')
        }
    }

    const test = JSON.stringify(newPost) //Оборочиваем в строку JSON
    console.log(newPost)
    const result = await $.ajax({
        url: '/get_products',
        method: 'post',
        contentType: 'application/json',
        data: test,
    });
    console.log(result)
    return result;
}

async function go_products(){
    let render = await get_products();
    html2 = ''

    let start2 = document.querySelector(".start2_")
    let elem2 = document.querySelector(".start3_")
    if (elem2) {elem2.remove()} else {console.log('нет элемента')}
    let div = document.createElement('div')
    div.classList.add('start3_')
    start2.prepend(div)
    const array = Array.from(start2.children);

    render['data'].forEach(f1 => {
        let div_layout = document.createElement('div')
        div_layout.classList.add('layout-grid__item')
        div_layout.style.width = '80%'
        let a_product = document.createElement('a')
        a_product.classList.add('product')
        a_product.setAttribute('href','')
        let article_product = document.createElement('article')
        article_product.classList.add('product__article')
        let div_product_row = document.createElement('div')
        div_product_row.classList.add('product__rows')
        div_product_row.classList.add('product__col-text')
        let div_pic = document.createElement('div')
        div_pic.classList.add('product__col-pic')
        // html = '<img class="product__pic" src="https://cdn.lunda.ru/catalog/binary/image/gibkaya-vstavka-di7240-tecofi_i18826.webp?width=100" alt="r"/>'
        html = '<img class="product__pic" src="' + f1['img_product'] + '"onError="this.src=\'/static/img/logo/0.png\'"  alt="d"/>'



        div_pic.insertAdjacentHTML('beforeend', html)
        let div_product_id = document.createElement('div')
        div_product_id.classList.add('product_ID')
        div_product_id.textContent = 'ID:'
        html = '<span data221="ID-container">' + f1['id_product'] + '</span>'
        div_product_id.insertAdjacentHTML('beforeend', html)
        let div_product_title = document.createElement('div')
        div_product_title.classList.add('product__title')
        div_product_title.textContent = f1['name_product']
        let div_product_logo = document.createElement('div')
        div_product_logo.classList.add('product__attrs-grid')
        let div_product_brand = document.createElement('div')
        div_product_brand.classList.add('product__brand')
        html = '<img class="product__brand-logo-img" src="/static/img/logo/' + f1['img_logo'] + '" alt="' + f1['provider'] + '"/>'
        // html = '<img class="product__brand-logo-img" src="/static/img/logo/' + f1['img_logo'] + '" alt=" (HHH "dd")  "/>'
        div_product_brand.insertAdjacentHTML('beforeend', html)
        div_product_logo.prepend(div_product_brand)
        div_product_row.prepend(div_product_logo)
        div_product_row.prepend(div_product_title)
        div_product_row.prepend(div_product_id)
        article_product.prepend(div_product_row)
        article_product.prepend(div_pic)
        a_product.prepend(article_product)
        div_layout.prepend(a_product)
        array[0].prepend(div_layout)

    })
    const pagenationsSection = document.querySelector('.pagination13')
    displayPaginations(pagenationsSection, 10, render['count'])



}
go_products();

async function get_provider() {
    const result = await $.ajax({
        url: '/get_provider',
        method: 'post',
        contentType: 'application/json',
    });
    return result;
}
async function go_provider(){
    const render = await get_provider();
    return render
}

function mySelectRender (r) {
    stouts.insertAdjacentHTML('beforeend', html)
    let eDiv_1 = document.createElement('div')
    eDiv_1.classList.add('select-box')
    let eDiv_2 = document.createElement('div')
    eDiv_2.classList.add('select-option')
    eDiv_2.insertAdjacentHTML('beforeend', '<input type="text" placeholder="Выбрать" id="soValue_3" readonly name="">')
    eDiv_1.append(eDiv_2)
    let eDiv_3 = document.createElement('div')
    let eDiv_4 = document.createElement('div')
    eDiv_3.classList.add('content')
    //
    eDiv_4.classList.add('search')
    eDiv_4.insertAdjacentHTML('beforeend', '<input type="text" id="optionSearch_3" placeholder="Поиск" name="">')
    eDiv_3.append(eDiv_4)
    eDiv_1.append(eDiv_3)
    let eUl = document.createElement('ul')
    eUl.classList.add('options')
    let eLi = document.createElement('li')
    eLi.setAttribute('value', 1)
    eLi.textContent = 'sadasdasdassad'
    eUl.append(eLi)

    eDiv_3.append(eUl)
    stouts.append(eDiv_1)
}

// Обработчик select provider

// let select1 = new SlimSelect({
//     select: '#multiple'
// })
// select1.setSelected('value 7')


const hClick4444 = (event) => {
    let elem = document.querySelector('.ss-values')
    const url = new URL(window.location.href)
    const param = url.searchParams
    param.delete('provider');
    param.delete('page');
    console.log('событие provider')
    elem.childNodes.forEach(f => {
        if (!!f) {
            let dataid = f.getAttribute('data-id')
            if (dataid != null) {
                param.append('provider', dataid)
                history.replaceState(history.state, '', url.href);
            } else {
                history.replaceState(history.state, '', url.href)

            }
            go_products();
        }
    })
}

function displayPaginations(pageSelect, c_rows=10, count) {
    pagesCount = Math.ceil(count / c_rows);  // Количество кнопочек
    console.log(c_rows)
    const url = new URL(window.location)
    let numPage =Number(url.searchParams.get('page'))
    if (!numPage) {numPage=1}
    console.log(numPage)

    const array = Array.from(pageSelect.children);
    if (array[0]){
        array[0].remove();
    }
    if (count <= c_rows){return}
    let elem_1_page = document.createElement('div')
    elem_1_page.className = "pagination14"
    let str1 = '<ul class="RE45V">'
    let i = 0; let str2 = "", str3 = ""; let tmpstr = "";
    while (i < pagesCount) {
        i++;
        if (i === numPage) {
            tmpstr = 'link active'
        } else {
            tmpstr = 'link'
        }
        if (pagesCount < 11){str2 = str2 + '<li class="' + tmpstr + '" value="' + i + '" onClick="activelink13()">' + i + '</li>'}
        else{
            if (i > 5 && i < pagesCount) {
                str3 = "...";
                flgArrow_1 = true;
            } else if (i === pagesCount) {
                str3 = str3 + '<li class="' + tmpstr + '" value="' + i + '" onClick="activelink13()">' + i + '</li>';
            } else {
                str2 = str2 + '<li class="' + tmpstr + '" value="' + i + '" onClick="activelink13()">' + i + '</li>'
            }
        }

    }
    elem_1_page.innerHTML = str1 + str2 + str3 + '</ul>'
    pageSelect.prepend(elem_1_page)
    if (pagesCount > 10) {in_add_pagination(numPage)}
}

function activelink13() {
    let link_el = document.getElementsByClassName("link");
    for (l of link_el){
         l.classList.remove("active")
    }
    event.target.classList.add("active")

    in_add_pagination(event.target.value)

    const url = new URL(window.location.href)
    const param = url.searchParams
    param.delete('page');
    param.append('page', Number(event.target.value))
    history.replaceState(history.state, '', url.href)
    go_products();


}

function in_add_pagination(num_page){
    if (pagesCount <11) {return}
    // item = document.querySelector('.pagination_item_active')
    // item.remove()
    const pagenationsSection = document.querySelector('.pagination14')
    let i = 0;
    if (Number(num_page) >= 1 && flgArrow_1 ==true && Number(num_page) < 5) {
        const child_e = pagenationsSection.children[0]
        let str1 = "";
        let str2 = "";
        let tmpClass = "";
        child_e.remove();
        while (i < pagesCount) {
            i++;
            if (i < 6) {
                if (i === Number(num_page))  {tmpClass = "link active"} else {tmpClass = "link"}
                str1 = str1 + '<li class="' + tmpClass + '" value="' + i + '" onClick="activelink13()">' + i + '</li>'
            }
            if (i > 5 && i < pagesCount) {
                str2 = "..." + '<li class="' + tmpClass + '" value="' + pagesCount + '" onClick="activelink13()">' + pagesCount + '</li>';
            }
        }
        let elem_1 = document.createElement('ul');
        elem_1.classList.add('RE45V')
        elem_1.innerHTML = str1 + str2;
        pagenationsSection.append(elem_1)

    }
    let str3 = "";
    if (Number(num_page) > 4 && flgArrow_1 == true)  {
        let tmpArr = [];
        let iTmp = 0;
        if ((Number(num_page)+2) >= pagesCount) {iTmp = pagesCount-1} else {iTmp = (Number(num_page)+2)}
        for (let i=0; i <5; i++) {tmpArr.push(iTmp-i)}

        let str1 = '<i class ="fa-solid fa-arrow-right page_btn_1" style="color:#ff4568; transform: rotate(180deg)"></i>';
        let str_start = '<li class="link" value="1" onClick="activelink13()">1</li> ...';
        let str_end = '<li class="link" value="' + pagesCount + '" onClick="activelink13()">' + pagesCount + '</li>';
        let i = 0;
        let str_3dot = ""

        if (Number(num_page) === pagesCount) {str_end = '<li class="link active" value="' + pagesCount + '" onClick="activelink13()">' + pagesCount + '</li>';}
        tmpArr.reverse().forEach(rer => {
            let tmpClass = "";
            i++;
            if (rer === Number(num_page)) {
                tmpClass = "link active"
            } else {
                tmpClass = "link"
            }
            if (rer < pagesCount) {
                str3 = str3 + '<li class="' + tmpClass + '" value="' + rer + '" onClick="activelink13()">' + rer + '</li>'
            }
            if (i === 5 && rer <= (pagesCount - 2)) {
                str3 = str3 + "..." + str_end
            } else if (i === 5 && rer <= (pagesCount)) {
                str3 = str3 + str_end
            }
        });

        pagenationsSection.children[0].remove();
        let elem_1 = document.createElement('ul');
        elem_1.classList.add('RE45V')
        elem_1.innerHTML = str_start + str3;
        pagenationsSection.append(elem_1)
    }
}

let availKey = ['HTML', 'CSS', 'Easy Tutorial','CS23S','CSS555','CSS4'];
const resultBoxB1 = document.querySelector(".result-box_b1")
const inputBox = document.getElementById('input-box_b2')
inputBox.onkeyup = function (){
    const url = new URL(window.location.href)
    const param = url.searchParams
    param.delete('query');
    history.replaceState(history.state, '', url.href)
    let result1 = []
    let input1 = inputBox.value;
    if (input1.length <3) {return}
    if (input1.length) {
        result1 = availKey.filter((keyword)=>{
            return keyword.toLowerCase().includes(input1.toLowerCase());
        });
        console.log(result1)
    }
    display_b1(result1)
    param.append('query',input1 = inputBox.value )
    history.replaceState(history.state, '', url.href)



}
function display_b1(result){
    const content = result.map((list)=>{
        return '<li onclick=selectInput_b1(this)>' + list + '</li>';
    })
    resultBoxB1.innerHTML = '<ul>' + content.join('') + '</ul>'
}

function selectInput_b1(list){
    inputBox.value = list.innerHTML
    resultBoxB1.innerHTML = '';
}


