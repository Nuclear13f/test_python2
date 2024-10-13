
const selectBox = document.querySelectorAll('.select-box')
const selectOption = document.querySelectorAll('.select-option')
const soValue = document.querySelector('#soValue')
const optionSearch = document.querySelector('#optionSearch')
const options = document.querySelector('.options')
const optionsList = document.querySelectorAll('.options li')

// selectOption.addEventListener('click', function () {
//     selectBox.classList.toggle('active')
// })

document.addEventListener('mousedown', (e) => {
    selectBox.forEach(function (d) {
        if (d.classList.value == 'select-box active') {
            d.classList.remove('active')
        }
    })
})

selectOption.forEach(function (a){
    a.addEventListener('click',function (){
        this.parentElement.classList.toggle('active')
    })
})

optionsList.forEach(function(d){
    d.addEventListener('mousedown',function (){
        text = this.textContent
        this.parentElement.parentElement.parentElement.children[0].children[0].value = text
        this.parentElement.parentElement.parentElement.classList.remove('active')
    })
})

optionSearch.addEventListener('keyup', function () {
    let filter, li, i, textValue, liCount
    filter = optionSearch.value.toUpperCase();
    li = options.getElementsByTagName('li')
    for (i=0; i < li.length; i++) {
        liCount = li[i];
        textValue = liCount.textContent || liCount.innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1){
            li[i].style.display = '';
        }else{
            li[i].style.display = 'none';
        }
    }
})

new SlimSelect({
  // select: '#multiple',
     select: '#select_providers',
settings: {
    placeholderText: 'Выбери поставщика'}

})
