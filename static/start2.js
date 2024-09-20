const site2 = document.querySelector("#content")

// const url = "//start"
// const fullurl = url + "?" + "dssaa"


console.log(site2);

console.log("{{ test }}");


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



