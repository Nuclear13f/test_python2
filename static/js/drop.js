// region ******** переменные, константы
const dropAria = document.querySelector('.drop-section')
const listSection = document.querySelector('.list-section')
const listContainer = document.querySelector('.list')
const fileSelector = document.querySelector('.file-selector')
const fileSelectorInput = document.querySelector('.file-selector-input')
// endregion

// region ******** выбор файла через browse
fileSelector.onclick = function (){fileSelectorInput.click()}
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
    console.log('загрузка файла')
    let http = new XMLHttpRequest()
    let data = new FormData()
    data.append('file', file)
    data.append('uuid', '2322-3321-xxcx')
    http.open('POST', '/unload_xlsx_input')
    http.send(data)
    http.onload = function () {
        const tmp = JSON.parse(http.response);
        console.log(tmp)
        if (tmp['status'] === 'err') {error_modal('Нормализуйте xlsx файл')}

    }
}

function error_modal(str) {
    $('#modal_error').modal('show');
    var elem = document.getElementById("head_modal_order_1");
    elem.style.background = '#a01414'
    var elem = document.getElementById("exampleModalLabel");
    elem.textContent = 'ОШИБКА ЗАПИСИ'
    var elem = document.getElementById("text_body_modal_order_1");
    elem.textContent = str
}