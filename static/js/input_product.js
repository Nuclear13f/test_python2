const btn_add_row = document.getElementById('ds_input_51')
btn_add_row.addEventListener('click', hClick1)
let max_count = '';
let stat_data = '';
let gIdRow = ""
let dataInpRow = {gIdRow1: "", idStat: []}

// region ***********  Кнопка добавить ******************************
function hClick1() {
    const elem_row = document.querySelector("#inp5432").children
    for (let i = 0; i < elem_row.length; i++) {
        if (i + 1 == elem_row.length) {
            let elem_row_clone = elem_row[i].cloneNode(true)
            elem_row_clone.querySelector('.inp5432_row input').value = ''
            elem_row_clone.querySelector('div[name="max_id_prv"]').textContent = '??'
            const array = Array.from(elem_row[i].children);
            array[1].children[1].remove()
            elem_row_clone.children[1].children[0].style.display = 'block'
            document.querySelector("#inp5432").append(elem_row_clone)
            elem_row_clone.setAttribute("id_row", i + 2)
            elem_row_clone.children[0].children[1].children[0].children[4].children[0].setAttribute("id_check", i + 2)
            const btn_add_row = document.getElementById('ds_input_51')
            btn_add_row.addEventListener('click', hClick1)
            break
        }
    }
}

// endregion

// region **********  Кнопка удалить ******************************
$(document).on("click", '.inp5434', function (e) {
    const blc_row = document.getElementById('inp5432')
    let count = blc_row.children.length
    if (e.target.parentElement.parentElement.children[1]) {
        const sa1 = e.target.parentElement.parentElement.children[1].cloneNode(true)
        sa1.addEventListener('click', hClick1)
        e.target.parentElement.parentElement.parentElement.remove()
        blc_row.children[count - 2].children[1].append(sa1)
    } else {
        e.target.parentElement.parentElement.parentElement.remove()
    }
})
// endregion

// region **********  Кнопка check ******************************
$(document).on("click", '.inp5438', function (e) {
    parenElem = e.target.parentElement.parentElement.parentElement.parentElement
    dataInpRow.gIdRow1 = e.target.getAttribute("id_check")
    textValue = parenElem.querySelector('.inp5432_row input').value
    // e.target.setAttribute("disabled", "")
    func_check(textValue, e)
})

async function func_check(es, e) {
    const stat_int = await get_check_stat_product(es).then(data => { return data })
    const stat_str = await stat_data.then(r => { return r })
    const say = new ModalWin()
    await stat_int['data'].forEach(d => {
        say.arraStat = intToStrStat(stat_str, d['stat']);
        say.similarity = d['similarity'];
        say.dataSet = d['stat']
        say.f()
    })
    e.target.parentElement.insertAdjacentHTML("beforeend", say.fs2())
    await stat_int['data'].forEach(d => {
        let str = d['stat']
        let els1 = document.querySelector('[dataset="' + str + '"]')
        els1.addEventListener('click', function (e) {
            let elm1 = document.querySelector('[id_row="' + dataInpRow.gIdRow1 + '"]')
            let elm2 = elm1.querySelectorAll('select')
            dataInpRow.idStat = els1.getAttribute('dataset').split(",").map(string => +string)
            elm2[0][0].removeAttribute('selected')
            elm2[0][dataInpRow.idStat[0]].setAttribute('selected', "selected")
            func_select_clear(elm2, 3)
            for (let i = 0; i < dataInpRow.idStat.length; i++) {
                if (i === 0) {
                    func_select_1(elm2, 'type', dataInpRow.idStat[i], dataInpRow.idStat[1])
                }
                if (i === 1) {
                    func_select_1(elm2, 's1', dataInpRow.idStat[i], dataInpRow.idStat[2])
                }
                if (i === 2) {
                    func_select_1(elm2, 's2', dataInpRow.idStat[i], dataInpRow.idStat[3])
                }
            }
            els1.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
        })
    })
    const clsOL = document.getElementById("closeCheckS")
    clsOL.addEventListener('click', function (event) {
        e.target.parentElement.children[1].remove()
    })
}

// endregion


$('#invalid-was-provider_1').select2({
    theme: "bootstrap-5",
    // width: $( this ).data( 'width' ) ? $( this ).data( 'width' ) : $( this ).hasClass( 'w-100' ) ? '100%' : 'style',
    // placeholder: $( this ).data( 'placeholder' ),
});

async function go_provider() {
    const render = await get_provider();
    return render
}


async function get_provider() {
    const result = await $.ajax({
        url: '/get_provider',
        method: 'post',
        contentType: 'application/json',
    });
    return result;
}

async function go_provider() {
    const render = await get_provider();
    const stouts = document.getElementById('invalid-was-provider_1')
    render['data'].forEach(d => {
        let eOption = document.createElement('option')
        eOption.textContent = d['name_provider']
        eOption.setAttribute('id', d['id'])
        eOption.setAttribute('value', d['id'])
        eOption.setAttribute('flg_own', d['flg_own_ip'])
        stouts.append(eOption)
    })
    return render
}

go_provider()

// region ********** модуль select **********

$("select[name='id_prov_SDS_1']").bind("change", function () {
    const s = $("select[name='id_prov_SDS_1']").val()
    // const s2 = $("select[name='id_prov_SDS_1']").find(':selected').data('flg_own')
    const flg_own_id = $("select[name='id_prov_SDS_1']").find(':selected')[0].getAttribute("flg_own")
    render = get_id_max_product(s)
    render.then(r => {
        const elem_row_text = document.querySelectorAll(".inp5432_row")
        let s1 = elem_row_text[0].querySelector('div[name="max_id_prv"]')
        let s2 = elem_row_text[0].querySelector('div[name="own_id_prv"]')
        if (flg_own_id === 'true') {
            s1.style.display = "none"
            s2.style.display = "block"
        } else {
            s2.style.display = "none"
            s1.style.display = "block"
            s1.textContent = "PD" + s + "/" + r
        }

        // let s1 = elem_row_text[0].querySelector('div[name="max_id_prv"]')
        // s1.textContent = "PD" + s + "/" + r
        // max_count = r
    })
    let s1 = document.querySelector('.das_122')
    s1.style.display = "block"
})

$(document).on("change", "select[name=\'id_prov_SDS_2\']", function (e) {
    let elem = e.target.parentElement.parentElement
    let elem2 = elem.querySelectorAll('select [name="id_prov_SDS_2"]')
    let elem3 = elem.getElementsByTagName('select')
    if (e.target.getAttribute('name_id') === 'type') {
        func_select_clear(elem3, 3)
        func_select_1(elem3, 'type', e.target.value)

    }
    if (e.target.getAttribute('name_id') === 's1') {
        func_select_clear(elem3, 2)
        func_select_1(elem3, 's1', e.target.value)
    }
    if (e.target.getAttribute('name_id') === 's2') {
        func_select_clear(elem3, 1)
        func_select_1(elem3, 's2', e.target.value)

    }
})

async function func_select_1(elem, type, id, selectedId) {
    if (type === 'type') {
        await stat_data.then(render => {
            render['data'].forEach(d => {
                if (d['id'] == id) {
                    d['child'].forEach(s1 => {
                        let eOption = document.createElement('option')
                        eOption.textContent = s1['name']
                        eOption.setAttribute('id', s1['id'])
                        eOption.setAttribute('value', s1['id'])
                        if (Number(s1['id']) === Number(selectedId)) {
                            eOption.setAttribute('selected', 'selected')
                        }
                        elem[1].append(eOption)
                    })
                }
            })
        })
    }
    if (type === 's1') {
        await stat_data.then(render => {
            render['data'].forEach(d => {
                if (d['id'] == Number(elem[0].value)) {
                    d['child'].forEach(s1 => {
                        if (s1['id'] == id) {
                            s1['child'].forEach(s2 => {
                                let eOption = document.createElement('option')
                                eOption.textContent = s2['name']
                                eOption.setAttribute('id', s2['id'])
                                eOption.setAttribute('value', s2['id'])
                                if (Number(s2['id']) === Number(selectedId)) {
                                    eOption.setAttribute('selected', 'selected')
                                }
                                elem[2].append(eOption)
                            })
                        }
                    })
                }
            })
        })
    }
    if (type === 's2') {
        stat_data.then(render => {
            render['data'].forEach(d => {
                if (d['id'] == Number(elem[0].value)) {
                    d['child'].forEach(s1 => {
                        if (s1['id'] == Number(elem[1].value)) {
                            s1['child'].forEach(s2 => {
                                if (s2['id'] == id) {
                                    s2['child'].forEach(s3 => {
                                        let eOption = document.createElement('option')
                                        eOption.textContent = s3['name']
                                        eOption.setAttribute('id', s3['id'])
                                        eOption.setAttribute('value', s3['id'])
                                        if (Number(s3['id']) === Number(selectedId)) {
                                            eOption.setAttribute('selected', 'selected')
                                        }
                                        elem[3].append(eOption)
                                    })
                                }
                            })
                        }
                    })
                }
            })
        })
    }

}

function func_select_clear(elem, i) {
    let j = 0;
    while (j < i) {
        for (let k = elem[3 - j].length - 1; k >= 1; --k) {
            elem[3 - j][k].remove();
        }
        j++;
    }
}

// endregion

// region ********** Кнопка проверки совпадений **********

const elem_row_3 = document.querySelector(".das_121")
const elem_row_2 = document.querySelector(".das_122")
elem_row_2.addEventListener('click', function (event) {
    let div = document.createElement('div')
    div.classList.add('G212G2')
    div.style.position = 'absolute'
    div.style.top = '0px'
    div.style.zIndex = '999'
    elem_row_3.append(div)
    hClick3(event)
})
let hClick3 = (event) => {
    const elem_row_1 = document.querySelector(".G212G2")
    if (elem_row_1.children) {
        elem_row_1.innerHTML = ''
    }
    const elem_row_text = document.querySelectorAll(".inp5432_row")
    const id_provider = $("select[name='id_prov_SDS_1']").val()
    let dict = []
    let i = 0
    const q1 = {'providerId': id_provider, 'data': []}
    dict.push(q1)
    elem_row_text.forEach(div => {
        i++;
        sas = div.querySelector('.inp5432_row input').value
        const q2 = {'query': sas, 'count': i}
        dict[0]['data'].push(q2)
    })
    let render = go_products(dict);
    render.then(r => {
        console.log(r)
        let html = '<div class="result-box_b2"></div>'
        elem_row_1.insertAdjacentHTML("beforeend", html)
        let div_result = document.createElement('div')
        let div_footer = document.createElement('div')
        div_result.classList.add('result-box_b2_sub')
        div_footer.classList.add('footer-box_b2')
        r.reverse().forEach(s => {
            let div_li_b122 = document.createElement('div')
            div_li_b122.classList.add('li_b122')
            let ul_li_b123 = document.createElement('ul')
            ul_li_b123.classList.add('li_b123')
            let li = document.createElement('li')
            li.id = s['count']
            html2 = ''
            let flgOverlap = false
            let overlop = ''
            let colorOverlop = ''
            s['data']['data'].forEach(d => {
                if (d['similarity'] == '1' && flgOverlap == false) {
                    flgOverlap = true
                }
                html2 = html2 + '<li><div class="row"><div class="col-1">ID:</div><div class="col-3">' + d['id_product'] + '</div><div class="col-7" style="display: flex; justify-content: right">' + d['similarity'] + '</div></div><div class="footer-box_b2_3">' + d['name_product'] + '</div></li>'
            })
            if (flgOverlap == true) {
                overlop = 'Совпадение';
                colorOverlop = 'green'
            } else {
                overlop = 'Нет совпадений';
                colorOverlop = ''
            }
            html = '<div class="row"><div class="col-1" style="font-weight: bold">' + s['count'] + '.</div><div class="col-6" style="color: ' + colorOverlop + '">' + overlop + '</div></div><ul class="ul_b200_sub">' + html2 + '</ul><div style="border-top: 1px solid rgba(19,15,64,.15)"></div>'
            li.insertAdjacentHTML("beforeend", html)
            ul_li_b123.prepend(li)
            div_li_b122.prepend(ul_li_b123)
            div_result.prepend(div_li_b122)
        })
        html = '<div class="footer-box_b2_1"></div><div class="footer-box_b2_2" > <button type="button" class="btn btn-primary" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" id="closeOverlap">Закрыть</button></div>'
        div_footer.insertAdjacentHTML("beforeend", html)
        elem_row_1.children[0].prepend(div_result)
        elem_row_1.children[0].append(div_footer)
        const clsOL = document.getElementById("closeOverlap")
        clsOL.addEventListener('click', function (event) {
            elem_row_1.remove();
        })
    })
}

// endregion ****************  ++++++++++++ ******************************

async function get_products(q1) {

    const get_query = JSON.stringify(q1) //Оборочиваем в строку JSON
    const result = await $.ajax({
        url: '/get_prd_f_inp_prd',
        method: 'post',
        contentType: 'application/json',
        data: get_query,
    });
    return result;
}

async function go_products(s) {
    let render = await get_products(s);
    return render
}

async function get_id_max_product(id_provider) {
    const get_query = JSON.stringify(id_provider) //Оборочиваем в строку JSON
    const result = await $.ajax({
        url: '/get_id_max_product',
        method: 'post',
        contentType: 'application/json',
        data: get_query,
    });
    return result;
}

async function get_check_stat_product(text) {
    const get_query = JSON.stringify(text) //Оборочиваем в строку JSON
    const result = await $.ajax({
        url: '/get_product_check_stat',
        method: 'post',
        contentType: 'application/json',
        data: get_query,
    });
    return result;
}


async function get_stat() {
    const newPost = {}

    const data = JSON.stringify(newPost) //Оборочиваем в строку JSON

    const result = await $.ajax({
        url: '/get_stat_product',
        method: 'post',
        contentType: 'application/json',
        data: data,
    });
    return result;
}

stat_data = get_stat()

class ModalWin {
    constructor(similarity, arraStat, dataSet) {
        this.similarity = similarity
        this.arraStat = arraStat
        this.dataSet = dataSet
        this.str = ""
    }

    fly = () => {
        return '<div class="result-box_b2" style="position: relative"><div class="result-box_b2_sub">\n' +
            '<ul class="ul_23s"><li><div class="footer-box_b2_3 row">\n' +
            '<div class="footer-box_b2_3_stat col-1" style=" padding-left: 0">' + this.similarity + '</div>\n' +
            '<div class="footer-box_b2_3_stat col-9">' + this.fs1() + '</div>\n' +
            '<div class="footer-box_b2_3_stat col-2" style=" padding-left: 0">\n' +
            '<a href="ds">Ввести</a></div></div></li></ul></div><div class="footer-box_b2">\n' +
            '<div class="footer-box_b2_1"></div><div class="footer-box_b2_2">\n' +
            '<button  type="button" class="btn btn-primary"\n' +
            'style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">\n' +
            'Закрыть</button></div></div></div>'
    }

    fs2 = () => {
        return '<div class="result-box_b2" style="position: relative">' + this.str + '<div class="footer-box_b2">\n' +
            '<div class="footer-box_b2_1"></div><div class="footer-box_b2_2">\n' +
            '<button id="closeCheckS" type="button" class="btn btn-primary"\n' +
            'style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">\n' +
            'Закрыть</button></div></div></div>'
    }

    f = () => {
        this.str = this.str + '<div class="result-box_b2_sub"><ul class="ul_23s"> <li><div class="footer-box_b2_3 row">' +
            '<div class="footer-box_b2_3_stat col-1" style=" padding-left: 0">' + this.similarity + ' </div>' +
            '<div class="footer-box_b2_3_stat col-9">' + this.fs1() + '</div>' +
            '<div class="footer-box_b2_3_stat col-2" style=" padding-left: 0">' +
            '<a dataset = "' + this.dataSet + '" href="##">Ввести</a></div></div></li></ul></div>'
        return this.str
    }

    fs1() {
        let str = ""
        this.arraStat.forEach(r => {
            if (str === "") {
                str = str + " " + r
            } else {
                str = str + " &rarr; " + r
            }
        })
        return str
    }
}

function intToStrStat(rend, mass) {
    massFinish = [];
    rend['data'].forEach(d => {
        if (d['id'] == mass[0]) {
            massFinish.push(d['name'])
            d['child'].forEach(s => {
                if (s['id'] == mass[1]) {
                    massFinish.push(s['name'])
                    s['child'].forEach(s2 => {
                        if (s2['id'] == mass[2]) {
                            massFinish.push(s2['name'])
                            s2['child'].forEach(s3 => {
                                if (s3['id'] == mass[3]) {
                                    massFinish.push(s3['name'])
                                }
                            })
                        }
                    })
                }
            })
        }
    })
    return massFinish
}