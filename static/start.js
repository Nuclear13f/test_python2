const site = document.querySelector("#site")

let html = ""
html = '     <div class="col mycent">\n' +
    '         <a href="/logout" type="button" class="btn btn-outline-primary me-2" id="logout" href="/logout"\n' +
    '            style="width: 150px">Выйти</a>\n' +
    '     </div> '
site.insertAdjacentHTML('beforeend', html)

html = ' <div class="col r" style="margin-top: 20px">\n' +
    '         <a ><img class="doberman" src="/static/img/jsimg_limon.png"> </a>\n' +
    '     </div>'
site.insertAdjacentHTML('beforeend', html)

html = '<div id="content" class="content"></div>'
site.insertAdjacentHTML('beforeend', html)


console.log(site)