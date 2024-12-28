const elemCustomer = document.getElementById('zakazchik_1r_sel')
const elemContract = document.getElementById('contract_1r_sel')
const elemAdress = document.getElementById('adress_1r_sel')

const elm_group = document.querySelector('[name="group_item_2111"]')
const elm_service = document.querySelector('[name="group_item_2112"]')
const elm_contractor = document.querySelector('[name="group_item_2113"]')
let elemCouper = document.getElementById('coupler_s111')

// async function func_check(es, e) {
//     const stat_int = await get_check_stat_product(es).then(data => {
//         return data
//     })
// }

async function get_clients(self) {
    const get_query = JSON.stringify('ok') //Оборочиваем в строку JSON
    const result = await $.ajax({
        url: '/get_clients',
        method: 'post',
        contentType: 'application/json',
        data: get_query,
    });
    result.forEach(element => {
        let elemOption = document.createElement('option')
        elemOption.textContent = element['client']
        elemOption.setAttribute('id', element['id'])
        elemOption.setAttribute('value', element['id'])
        elemCustomer.append(elemOption)
    });
    return result;
}

get_clients();

async function get_contracts(id_client) {
    const get_query = JSON.stringify(id_client) //Оборочиваем в строку JSON
    const result = await $.ajax({
        url: '/get_contracts',
        method: 'post',
        contentType: 'application/json',
        data: get_query,
    });
    func_select_clear(elemContract)
    result.forEach(element => {
        let elemOption = document.createElement('option')
        elemOption.textContent = element['id'] + ' ' + element['contracts']
        elemOption.setAttribute('id', element['id'])
        elemOption.setAttribute('value', element['id'])
        elemContract.append(elemOption)
    });
    return result;
}

function func_select_clear(elem, i) {
    for (let k = elem.children.length - 1; k >= 1; --k) {
        elem.children[k].remove()
    }
}

$("select[name='zakazchik_1r_sel']").bind("change", function () {
    const id_client = $("select[name='zakazchik_1r_sel']").val()
    render = get_contracts(id_client)
    clear_items()
})

$("select[name='contract_1r_sel']").bind("change", function () {
    const id_contract = $("select[name='contract_1r_sel']").val()
    renderP = get_orders(id_contract)
    renderS = get_service(id_contract)
    renderC = get_contractor(id_contract)
    clear_items()
})

$("select[name='adress_1r_sel']").bind("change", function () {
    const id_contract = $("select[name='contract_1r_sel']").val()
    const id_adress = $("select[name='adress_1r_sel']").val()
    console.log(id_adress)
    if (id_adress) {
        renderP = get_orders(id_contract, id_adress, false)
        renderS = get_service(id_contract, id_adress)
    } else {
        renderP = get_orders(id_contract, 0, false)
        renderS = get_service(id_contract, 0)
    }
    // renderC = get_contractor(id_contract)
    clear_items()
})


function clear_items() {
    elm_group.innerHTML = ""
    elm_service.innerHTML = ""
    elm_contractor.innerHTML = ""
    elemCouper.innerHTML = ""
}

async function get_orders(id_contract, id_adress = 0, flgAC = true) {

    const query = {"id_contract": id_contract, "id_adress": id_adress}

    const get_query = JSON.stringify(query) //Оборочиваем в строку JSON
    const result = await $.ajax({
        url: '/get_orders_psql',
        method: 'post',
        contentType: 'application/json',
        data: get_query,
    });
    let elm_1 = document.querySelector('[name="num_contact_s111"]')
    let elm_2 = document.querySelector('[name="adress_s111"]')
    let elm_3 = document.querySelector('[name="cost_product_s111"]')
    let elm_4 = document.querySelector('[name="tbo_s111"]')
    let elm_5 = document.querySelector('[name="total_s111"]')

    let strAdress = '';
    result[0]['info']['adress'].forEach(d => {
        strAdress = ' ' + strAdress + ' ' + d['adress']
    })

    if (flgAC == true) {
        func_select_clear(elemAdress)
        let massAdress = result[0]['info']['adress']
        if (massAdress.length > 1) {
            massAdress.forEach(element => {
                let elemOption = document.createElement('option')
                elemOption.textContent = element['adress']
                elemOption.setAttribute('id', element['id'])
                elemOption.setAttribute('value', element['id'])
                elemAdress.append(elemOption)
            })
        }
    }

    elm_1.textContent = result[0]['info']['contact_num']
    elm_2.textContent = strAdress
    elm_3.textContent = (result[1]['total'] - result[2]['tbo']).toLocaleString('ru')
    elm_4.textContent = (result[2]['tbo']).toLocaleString('ru')
    elm_5.textContent = (result[1]['total']).toLocaleString('ru')
    let i = 0

    result[0]['info']['coupler'].forEach(d => {
        let div_1 = document.createElement('div')
        let div_2 = document.createElement('div')
        div_1.classList.add('row')
        div_1.classList.add('mx-2')
        div_2.classList.add('col')
        div_2.classList.add('overflows231s')
        div_2.classList.add('price_s111')
        div_2.style.color = '#003d44eb'
        div_2.textContent = d['name'] + ' - (' + numberWithSpaces(d['price']) + ')'

        div_1.append(div_2)
        elemCouper.append(div_1)
    })


    result[3]['ORDER'].forEach(d => {
        i += 1;
        const results2 = orders(d['order'], d['total'], i, d['items'], d['provider'],
            d['date'], d['flgItem'], d['flgPay'], d['company']).then(data => {
            elm_group.append(data)
            return data
        })
    })
    console.log(result)
    return result;
}


document.querySelectorAll('.arrow21').forEach(function (item) {
    item.addEventListener('click', function (e) {
        e.preventDefault()
        const parent = item.closest('.group_12_1')
        if (parent.classList.contains('selected')) {
            parent.classList.remove('selected')
        } else {
            parent.classList.add('selected')
        }
    })
})

async function orders(name_order, total, i, items, provider, date, flgItem, flgPay, company) {
    let div_group_12_1 = document.createElement('div')
    let div_tbl_head = document.createElement('div')
    let div_tbl_items = document.createElement('div')
    let div_str1 = document.createElement('div')
    let div_str2 = document.createElement('div')
    let div_str3 = document.createElement('div')
    let div_str4 = document.createElement('div')
    let div_str5 = document.createElement('div')
    let div_str3s = document.createElement('div')
    let clFlgItem = 'br-red'
    let clFlgPay = 'br-red'
    if (flgItem == 'ok') {
        clFlgItem = 'br-green'
    }
    if (flgPay == 'ok') {
        clFlgPay = 'br-green'
    }


    div_group_12_1.classList.add('group_12_1')
    div_tbl_head.classList.add('tbl_exp_12_1_head')
    div_tbl_items.classList.add('mx-2')
    div_tbl_items.classList.add('hidden')
    div_tbl_items.classList.add('group_12_1-[.selected]:block')
    div_tbl_items.classList.add('s231s-1')
    const results = items_f(items, company).then(data => {
        div_tbl_items.insertAdjacentHTML("beforeend", data)
        return data
    })

    div_tbl_head.setAttribute('row_id', i)
    div_str1.classList.add('tbl_col_width-1')
    div_str1.classList.add('tbl_col_text')
    let div_sub_str_1 = document.createElement('div')
    div_sub_str_1.classList.add('row')
    let div_sub_str_1_1 = document.createElement('div')
    div_sub_str_1_1.classList.add('col')
    let div_sub_str_row = document.createElement('div')
    div_sub_str_row.classList.add('col')
    div_sub_str_row.classList.add('ri-arrow-right-s-line')
    div_sub_str_row.classList.add('arrow21')
    let div_sub_str_1_1_1 = document.createElement('div')
    div_sub_str_1_1_1.classList.add('s231d')
    let span_element = document.createElement('span')
    span_element.classList.add('message-count')
    span_element.textContent = i
    div_sub_str_1_1_1.append(span_element)
    div_sub_str_1_1.append(div_sub_str_1_1_1)
    div_sub_str_1.append(div_sub_str_1_1)
    div_sub_str_1.append(div_sub_str_row)
    div_str1.append(div_sub_str_1)
    div_str2.classList.add('tbl_col_width-2')
    div_str2.classList.add('tbl_col_text')
    div_str2.textContent = name_order
    div_str3.classList.add('tbl_col_width-3')
    div_str3.classList.add('tbl_col_text')
    div_str3.classList.add('overflows231s')

    div_str3.textContent = provider
    div_str3s.classList.add('tbl_col_width-4')
    div_str3s.classList.add('tbl_col_text')
    div_str3s.textContent = Intl.DateTimeFormat("ru", {dateStyle: "short"}).format(Date.parse(date));
    div_str4.classList.add('tbl_col_width-4')
    div_str4.classList.add('tbl_col_text')
    div_str4.textContent = total.toLocaleString('ru')
    div_str5.classList.add('tbl_col_width-5')
    div_str5.classList.add('tbl_col_text')
    let html = ' <div class="br-widget">\n' +
        '<a href="#" data-rating-value="1" data-rating-text="1" class=" ' + clFlgItem +
        '"></a>\n' +
        '<a href="#" data-rating-value="1" data-rating-text="1" class="' + clFlgPay +
        '"></a></div>'
    div_str5.insertAdjacentHTML("beforeend", html)
    div_tbl_head.append(div_str1)
    div_tbl_head.append(div_str2)
    div_tbl_head.append(div_str3)
    div_tbl_head.append(div_str3s)
    div_tbl_head.append(div_str4)
    div_tbl_head.append(div_str5)
    div_group_12_1.append(div_tbl_head)
    div_group_12_1.append(div_tbl_items)


    div_sub_str_row.addEventListener('click', function (e) {
        const parent = e.target.closest('.group_12_1')
        if (parent.classList.contains('selected')) {
            parent.classList.remove('selected')
        } else {
            parent.classList.add('selected')
        }

    })

    return div_group_12_1
}

async function items_f(items, company) {

    html_head = '<div class="head_data_s231s"><div class="row bgc_grey_1" style="margin: 0;">\n' +
        '<div class="col-1 s231s width5perc"></div>\n' +
        '<div class="col-2 s231s width12perc">Код товара</div>\n' +
        '<div class="col s231s">Товар</div>\n' +
        '<div class="col-1 s231s">Кол-во</div>\n' +
        '<div class="col-1 s231s width10perc">Цена</div>\n' +
        '<div class="col-1 s231s width10perc">Сумма</div>' +
        '<div class="col-1 s231s width10perc">Компания</div>' +
        '</div></div>'

    let div_elem = document.createElement('div')
    div_elem.classList.add('data-rows_s231s')
    let html = ''
    let i = 0;
    let total = 0;
    let results = await items.forEach(data => {
        i += 1;
        total = total + data['total']
        html = html + '<div class="row px-3"><div class="col-1 s231s width5perc">' + i + ' </div>\n' +
            '<div class="col-2 s231s width12perc">' + data['id'] + '</div>\n' +
            '<div class="col s231s overflows231s">' + data['name'] + '</div><div class="col-1 s231s">' + data['amount'] +
            '</div><div class="col-1 s231s width10perc">' + data['cost'].toLocaleString('ru') + '</div>\n' +
            '<div class="col-1 s231s width10perc">' + data['total'].toLocaleString('ru') + '</div>' +
            '<div class="col-1 s231s width10perc overflows231s">' + company + '</div>' +
            '</div>'
    })
    div_elem.insertAdjacentHTML("beforeend", html)
    const html_row = div_elem.outerHTML

    html_foot = '<div class="head_data_s231s"><div class="row bgc_grey_1" style="margin: 0;">\n' +
        '<div class="col-10 s231s" style="text-align: right">Итого:</div>\n' +
        '<div class="col-2 s231s" style="font-weight: 900">' + total.toLocaleString('ru') + '</div></div></div>'
    return html_head + html_row + html_foot
}


async function get_service(id_contract, id_adress = 0) {

    const query = {"id_contract": id_contract, "id_adress": id_adress}
    const get_query = JSON.stringify(query) //Оборочиваем в строку JSON
    const result = await $.ajax({
        url: '/get_service_psql',
        method: 'post',
        contentType: 'application/json',
        data: get_query,
    });
    let i = 0
    result.forEach(d => {
        i += 1;
        let div_group_12_1 = document.createElement('div')
        let div_tbl_head = document.createElement('div')
        let div_tbl_items = document.createElement('div')
        let div_str1 = document.createElement('div')
        let div_str2 = document.createElement('div')
        let div_str3 = document.createElement('div')
        let div_str4 = document.createElement('div')
        let div_str5 = document.createElement('div')
        let div_str6 = document.createElement('div')
        let clFlg = 'br-red'
        if (d['flgPay'] == 'ok') {
            clFlg = 'br-green'
        }
        div_group_12_1.classList.add('group_12_1')
        div_tbl_head.classList.add('tbl_exp_12_1_head')
        div_tbl_head.setAttribute('row_id', i)
        div_tbl_items.classList.add('mx-2')
        div_tbl_items.classList.add('hidden')
        div_tbl_items.classList.add('group_12_1-[.selected]:block')
        div_tbl_items.classList.add('s231s-1')

        const results = pay_service_f(d['pay']).then(data => {
            div_tbl_items.insertAdjacentHTML("beforeend", data)
            return data
        })

        div_str1.classList.add('tbl_col_width-1')
        div_str1.classList.add('tbl_col_text')
        let div_sub_str_1 = document.createElement('div')
        div_sub_str_1.classList.add('row')
        let div_sub_str_1_1 = document.createElement('div')
        div_sub_str_1_1.classList.add('col')
        let div_sub_str_row = document.createElement('div')
        div_sub_str_row.classList.add('col')
        div_sub_str_row.classList.add('ri-arrow-right-s-line')
        div_sub_str_row.classList.add('arrow21')
        let div_sub_str_1_1_1 = document.createElement('div')
        div_sub_str_1_1_1.classList.add('s231d')
        let span_element = document.createElement('span')
        span_element.classList.add('message-count')
        span_element.textContent = i
        div_sub_str_1_1_1.append(span_element)
        div_sub_str_1_1.append(div_sub_str_1_1_1)
        div_sub_str_1.append(div_sub_str_1_1)
        div_sub_str_1.append(div_sub_str_row)
        div_str1.append(div_sub_str_1)

        div_str2.classList.add('tbl_col_width-2')
        div_str2.classList.add('tbl_col_text')
        div_str2.classList.add('overflows231s')
        div_str2.textContent = d['provider']
        div_str3.classList.add('tbl_col_width-3')
        div_str3.classList.add('tbl_col_text')
        div_str3.classList.add('overflows231s')
        div_str3.textContent = d['service']

        div_str4.classList.add('tbl_col_width-4')
        div_str4.classList.add('tbl_col_text')
        div_str4.textContent = Intl.DateTimeFormat("ru", {dateStyle: "short"}).format(Date.parse(d['date']));
        div_str5.classList.add('tbl_col_width-4')
        div_str5.classList.add('tbl_col_text')
        div_str5.textContent = d['cost'].toLocaleString('ru')
        div_str6.classList.add('tbl_col_width-5')
        div_str6.classList.add('tbl_col_text')

        let html = ' <div class="br-widget">\n' +
            '<a href="#" data-rating-value="1" data-rating-text="1" class=" ' + clFlg +
            '"></a>\n' +
            '<a href="#" data-rating-value="1" data-rating-text="1" class="' + '' +
            '"></a></div>'
        div_str6.insertAdjacentHTML("beforeend", html)


        div_tbl_head.append(div_str1)
        div_tbl_head.append(div_str2)
        div_tbl_head.append(div_str3)
        div_tbl_head.append(div_str4)
        div_tbl_head.append(div_str5)
        div_tbl_head.append(div_str6)
        div_group_12_1.append(div_tbl_head)
        div_group_12_1.append(div_tbl_items)

        div_sub_str_row.addEventListener('click', function (e) {
            const parent = e.target.closest('.group_12_1')
            if (parent.classList.contains('selected')) {
                parent.classList.remove('selected')
            } else {
                parent.classList.add('selected')
            }
        })
        elm_service.append(div_group_12_1)
    })
}

async function pay_service_f(items) {
    html_head = '<div class="head_data_s231s"><div class="row bgc_grey_1" style="margin: 0;">\n' +
        '<div class="col-1 s231s width5perc"></div>\n' +
        '<div class="col-2 s231s width12perc">Счет</div>\n' +
        '<div class="col s231s width12perc">Дата</div>\n' +
        '<div class="col-1 s231s width40perc">Наименование услуги</div>\n' +
        '<div class="col-1 s231s width20perc">Плательщик</div>\n' +
        '<div class="col-1 s231s width10perc">Оплата</div></div></div>'

    let div_elem = document.createElement('div')
    div_elem.classList.add('data-rows_s231s')
    let html = ''
    let i = 0;
    let total = 0;
    let results = await items.forEach(data => {
        i += 1;
        total = total + data['cost']
        html = html + '<div class="row px-3"><div class="col-1 s231s width5perc">' + i + ' </div>\n' +
            '<div class="col-2 s231s width12perc">' + data['invoice'] + '</div>\n' +
            '<div class="col s231s overflows231s">' + Intl.DateTimeFormat("ru", {dateStyle: "short"}).format(Date.parse(data['date'])) + '</div><div class="col-1 s231s width40perc">' + data['service'] +
            '</div><div class="col-1 s231s width20perc">' + data['company'] + '</div>\n' +
            '<div class="col-1 s231s width10perc">' + data['cost'].toLocaleString('ru') + '</div></div>'
    })
    div_elem.insertAdjacentHTML("beforeend", html)
    const html_row = div_elem.outerHTML
    html_foot = '<div class="head_data_s231s"><div class="row bgc_grey_1" style="margin: 0;">\n' +
        '<div class="col-10 s231s" style="text-align: right">Итого:</div>\n' +
        '<div class="col-2 s231s" style="font-weight: 900">' + total.toLocaleString('ru') + '</div></div></div>'
    // return html_head + html_row + html_foot
    return html_head + html_row + html_foot
}

async function get_contractor(id_contract) {
    const get_query = JSON.stringify(id_contract) //Оборочиваем в строку JSON
    const result = await $.ajax({
        url: '/get_contractor_psql',
        method: 'post',
        contentType: 'application/json',
        data: get_query,
    });
    let i = 0;

    result.forEach(d => {
        i += 1;
        let div_group_12_1 = document.createElement('div')
        let div_tbl_head = document.createElement('div')
        let div_tbl_items = document.createElement('div')
        let div_str1 = document.createElement('div')
        let div_str2 = document.createElement('div')
        let div_str3 = document.createElement('div')
        let div_str4 = document.createElement('div')
        let div_str5 = document.createElement('div')
        let div_str6 = document.createElement('div')
        let div_str7 = document.createElement('div')
        let div_str8 = document.createElement('div')

        div_group_12_1.classList.add('group_12_1')
        div_tbl_head.classList.add('tbl_exp_12_1_head_c')
        div_tbl_head.setAttribute('row_id', i)
        div_tbl_items.classList.add('mx-2')
        div_tbl_items.classList.add('hidden')
        div_tbl_items.classList.add('group_12_1-[.selected]:block')
        div_tbl_items.classList.add('s231s-1')

        const results = pay_contractor_f(d['pay']).then(data => {
            div_tbl_items.insertAdjacentHTML("beforeend", data)
            return data
        })

        div_str1.classList.add('tbl_col_width_con-1')
        div_str1.classList.add('tbl_col_text')
        let div_sub_str_1 = document.createElement('div')
        div_sub_str_1.classList.add('row')
        let div_sub_str_1_1 = document.createElement('div')
        div_sub_str_1_1.classList.add('col')
        let div_sub_str_row = document.createElement('div')
        div_sub_str_row.classList.add('col')
        div_sub_str_row.classList.add('ri-arrow-right-s-line')
        div_sub_str_row.classList.add('arrow21')
        let div_sub_str_1_1_1 = document.createElement('div')
        div_sub_str_1_1_1.classList.add('s231d')
        let span_element = document.createElement('span')
        span_element.classList.add('message-count')
        span_element.textContent = i
        div_sub_str_1_1_1.append(span_element)
        div_sub_str_1_1.append(div_sub_str_1_1_1)
        div_sub_str_1.append(div_sub_str_1_1)
        div_sub_str_1.append(div_sub_str_row)
        div_str1.append(div_sub_str_1)

        div_str2.classList.add('tbl_col_width_con-2')
        div_str2.classList.add('tbl_col_text_c')
        div_str2.classList.add('overflows231s')
        div_str2.textContent = d['provider']
        div_str3.classList.add('tbl_col_width_con-3')
        div_str3.classList.add('tbl_col_text_c')
        div_str3.classList.add('overflows231s')
        div_str3.textContent = d['name_contract']
        div_str4.classList.add('tbl_col_width_con-4')
        div_str4.classList.add('tbl_col_text_c')
        div_str4.classList.add('overflows231s')
        div_str4.textContent = d['contract_num']
        div_str5.classList.add('tbl_col_width_con-5')
        div_str5.classList.add('tbl_col_text_c')
        div_str5.classList.add('overflows231s')
        div_str5.textContent = Intl.DateTimeFormat("ru", {dateStyle: "short"}).format(Date.parse(d['date']));
        div_str6.classList.add('tbl_col_width_con-6')
        div_str6.classList.add('tbl_col_text_c')
        div_str6.textContent = d['cost_contract'].toLocaleString('ru')
        div_str7.classList.add('tbl_col_width_con-7')
        div_str7.classList.add('tbl_col_text_c')
        div_str7.classList.add('overflows231s')
        div_str7.textContent = d['custamer']


        div_tbl_head.append(div_str1)
        div_tbl_head.append(div_str2)
        div_tbl_head.append(div_str3)
        div_tbl_head.append(div_str4)
        div_tbl_head.append(div_str5)
        div_tbl_head.append(div_str6)
        div_tbl_head.append(div_str7)
        div_group_12_1.append(div_tbl_head)
        div_group_12_1.append(div_tbl_items)

        div_sub_str_row.addEventListener('click', function (e) {
            const parent = e.target.closest('.group_12_1')
            if (parent.classList.contains('selected')) {
                parent.classList.remove('selected')
            } else {
                parent.classList.add('selected')
            }
        })
        elm_contractor.append(div_group_12_1)


    })
}

async function pay_contractor_f(items) {
    html_head = '<div class="head_data_s231s"><div class="row bgc_grey_1" style="margin: 0;">\n' +
        '<div class="col-1 s231s width5perc"></div>\n' +
        '<div class="col-2 s231s width12perc">Счет</div>\n' +
        '<div class="col s231s width12perc">Дата</div>\n' +
        '<div class="col-1 s231s width12perc">Оплата</div>\n' +
        '<div class="col-1 s231s" style="width: 59%">Резерв</div></div></div>'

    let div_elem = document.createElement('div')
    div_elem.classList.add('data-rows_s231s')
    let html = ''
    let i = 0;
    let total = 0;
    let results = await items.forEach(data => {
        i += 1;
        total = total + data['cost']
        html = html + '<div class="row px-3"><div class="col-1 s231s width5perc">' + i + ' </div>\n' +
            '<div class="col-2 s231s width12perc">' + 'б/н ' + '</div>\n' +
            '<div class="col s231s width12perc">' + Intl.DateTimeFormat("ru", {dateStyle: "short"}).format(Date.parse(data['date'])) + '</div><div class="col-1 s231s width12perc">' + data['cost'].toLocaleString('ru') + '</div>\n' +
            '<div class="col-1 s231s" style="width: 59%"></div></div>'
    })
    div_elem.insertAdjacentHTML("beforeend", html)
    const html_row = div_elem.outerHTML

    html_foot = '<div class="head_data_s231s"><div class="row bgc_grey_1" style="margin: 0;">\n' +
        '<div class="col-4 s231s" style="text-align: right">Итого:</div>\n' +
        '<div class="col-2 s231s" style="font-weight: 900">' + total.toLocaleString('ru') + '</div></div></div>'
    // return html_head + html_row + html_foot
    return html_head + html_row + html_foot
}

function numberWithSpaces(x) {
    let price = x.toLocaleString('ru')
    let num = price.toString().split(",");
    let decimal = ("" + num[1]).split("").map(Number)
    if (decimal[0]) {
        if (decimal.length = 1) {
            let tmp = num[1] + '0';
            console.log(tmp);
            num.pop();
            num.push(tmp);
        }
    }
    if (num.length < 2) {
        num.push('00')
        console.log('2')
    }
    return num.join(",")
}