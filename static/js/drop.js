// region ******** переменные, константы
const dropAria = document.querySelector('.drop-section');
const listSection = document.querySelector('.list-section');
const listContainer = document.querySelector('.list');
const fileSelector = document.querySelector('.file-selector');
const fileSelectorInput = document.querySelector('.file-selector-input');
let list_prod;
let flg_carry = true;
// endregion

// region ******** выбор файла через browse
fileSelector.onclick = function () {
    fileSelectorInput.click()
}
fileSelectorInput.onchange = () => {
    // если не ставить три точки, то вернется как объект, если поставить, то выведется значения подряд
    [...fileSelectorInput.files].forEach((file) => {
        unloadFile(file)
    })
}
// endregion

// region ******** выбор файла через drop
//o (срабатывает, когда элемент перемещают над допустимой зоной для переноса).
dropAria.ondragover = (e) => {
    e.preventDefault();
    [...e.dataTransfer.items].forEach((item) => {
        // if (typeValidation(item.type)) {

        dropAria.classList.add('drag-over-effect')
        // }

    })
}
dropAria.ondragleave = () => {
    dropAria.classList.remove('drag-over-effect')
}
dropAria.ondrop = (e) => {
    e.preventDefault();
    dropAria.classList.remove('drag-over-effect')
    if (e.dataTransfer.items) {
        [...e.dataTransfer.items].forEach((item) => {
            if (item.kind === 'file') {
                const file = item.getAsFile();
                unloadFile(file)
            }
        })
    } else {
        [...e.dataTransfer.files].forEach((file) => {
            unloadFile(file)
        })
    }
}

// endregion

function unloadFile(file) {
    let http = new XMLHttpRequest()
    let data = new FormData()
    data.append('file', file)
    data.append('uuid', '2322-3321-xxcx')
    http.open('POST', '/unload_xlsx_input')
    http.send(data)
    http.onload = function () {
        const tmp = JSON.parse(http.response);
        if (tmp['status'] === 'err') {
            error_modal('Нормализуйте xlsx файл')
        } else {
            list_prod = tmp
            add_list_p(list_prod)
        }

    }
}

function error_modal(str) {
    $('#modal_error').modal('show');
    var elem = document.getElementById("head_modal_order_1");
    elem.style.background = '#a01414'
    var elem = document.getElementById("exampleModalLabel");
    elem.textContent = 'ОШИБКА ЧТЕНИЯ'
    var elem = document.getElementById("text_body_modal_order_1");
    elem.textContent = str
}

function add_list_p(arr) {
    let elem = document.getElementById("tbl_exp_12");
    if (elem.children[0]) {
        elem.children[0].remove();
    }

    let elem_tbl = document.createElement('div')
    elem_tbl.className = "tbl_exp_12_1"
    let html_head = '<div class="tbl_exp_12_1_head"><div class="tbl_col_width-1 border_st">ID</div>\n' +
        '<div class="tbl_col_width-2">Наименование</div><div class="tbl_col_width-3">Статус</div></div>'
    let html_footer = '<div class="tbl_exp_12_1_footer"><div class="dropdown-divider"></div>\n' +
        '<div class="tbl_exp_12_1_footer_data"><span  class="badge">Экспорт в excel</span>\n' +
        '<span id= "fill_in_badge" class="badge">Заполнить</span></div></div>'
    let html_rows = '<div class="tbl_exp_12_1_rows"></div>'
    elem_tbl.innerHTML = html_head + html_rows + html_footer
    elem.prepend(elem_tbl)
    elem_rows = document.querySelector('.tbl_exp_12_1_rows')
    str1 = ''
    arr['data']['data'].forEach(d => {
        let str_class = ''
        let str_txt = ''
        if (d['flg'] == 'ok') {
            str_class = 'status_exp_12_1_ok'
            str_txt = 'В базе'
        } else {
            str_class = 'status_exp_12_1_proc'
            str_txt = 'Записываем'
        }
        let html_row = '<div class="tbl_exp_12_1_row"><div class="tbl_col_width-1">' + d['id'] + '</div>\n' +
            '<div class="tbl_col_width-2 truncate">' + d['product'] + '</div>\n' +
            '                    <div class="tbl_col_width-3">\n' +
            '                        <label class="status_exp_12_1 ' + str_class + '">' + str_txt + '</label>\n' +
            '                    </div>\n' +
            '                </div>'
        str1 = str1 + html_row
    })
    elem_rows.innerHTML = str1
    const fill_Im = document.getElementById("fill_in_badge")
    fill_Im.addEventListener('click', function (event) {
        fill_in_hendl()
    })
}

function fill_in_hendl() {
    const elem_row = document.querySelector("#inp5432").children;
    let iI = 1;
    list_prod['data']['data'].forEach(d => {
        if (d['flg'] === 'err') {
            if (flg_carry === true) {
                elem_row[0].querySelector('input[name="text_prov"]').value = d['product']
                elem_row[0].querySelector('div[name="own_id_prv"]').children[0].value = d['id']
                elem_row[0].children[1].children[1].style.display = 'none'
                flg_carry = false;
            } else {
                iI++;
                let elem_row_clone = elem_row[0].cloneNode(true)
                elem_row_clone.querySelector('input[name="text_prov"]').value = d['product']
                elem_row_clone.querySelector('div[name="own_id_prv"]').children[0].value = d['id']
                elem_row_clone.setAttribute("id_row", iI)
                elem_row_clone.children[0].children[1].children[0].children[4].children[0].setAttribute("id_check", iI)
                elem_row_clone.children[1].children[1].style.display = 'none'
                document.querySelector("#inp5432").append(elem_row_clone)
            }
        }
    })
    // for (let i = 0; i < elem_row.length; i++) {
    //     if (i + 1 == elem_row.length) {
    //         let elem_row_clone = elem_row[i].cloneNode(true)
    //         elem_row_clone.querySelector('.inp5432_row input').value = ''
    //         elem_row_clone.querySelector('div[name="max_id_prv"]').textContent = '??'
    //         const array = Array.from(elem_row[i].children);
    //         array[1].children[1].remove()
    //         elem_row_clone.children[1].children[0].style.display = 'block'
    //         document.querySelector("#inp5432").append(elem_row_clone)
    //         elem_row_clone.setAttribute("id_row", i + 2)
    //         elem_row_clone.children[0].children[1].children[0].children[4].children[0].setAttribute("id_check", i + 2)
    //         const btn_add_row = document.getElementById('ds_input_51')
    //         btn_add_row.addEventListener('click', hClick1)
    //         break
    //     }
    // }
}