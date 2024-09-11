





async function get_data() {
    const result = await $.ajax({
        url: '/get_stat_product',
        method: 'post',
        data: {text: 'Текст'},
    });
    return result;
}
async function get_stat_data() {
    let render = await get_data();
    render.reverse().forEach(rer => {
        console.log(rer)
    });
}
let res = get_stat_data();

function load_ (self){
    let http = new XMLHttpRequest()
    let data = []
    http.open('POST', '/cabinet2/?page=2')
    http.send(data)
}


$(document).on("click", '.ssaass', function () {
    alert('dddd')
    load_()
});

$(document).on("click", '.r2', function () {
    alert('Привет')
    let http = new XMLHttpRequest()
    let data = []
    http.open('POST', '/cabinet/order/')
    http.send(data)
});