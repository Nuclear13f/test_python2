const button = document.querySelectorAll(".btn")
const button2 = document.querySelectorAll(".btn2")
console.log(button)


const hClick = (event) => {
    console.log(event.target)
}

const hClick2 = (event) => {
    console.log(event.target.dataset)
    console.log(event.target.dataset.set) // Получаем строчное значение data-set
    console.log(parseInt(event.target.dataset.set)) // Получаем числовое значение значение data-set
    console.log(event.target.textContent) // Получаем содержимое кнопки
}

button.forEach(button => {
    button.addEventListener('click', hClick)
    }
)

button2.forEach(button => {
    button.addEventListener('click', hClick2)
    }
)