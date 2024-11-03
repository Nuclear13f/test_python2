

const btn_add_row = document.getElementById('ds_input_51')
btn_add_row.addEventListener('click', hClick1)


function hClick1(){
    const elem_row = document.querySelector("#inp5432").children
    for (let i = 0; i < elem_row.length; i++) {
        if (i+1==elem_row.length) {
            let elem_row_clone = elem_row[i].cloneNode(true)
            const array = Array.from(elem_row[i].children);
            array[1].children[1].remove()
            elem_row_clone.children[1].children[0].style.display = 'block'
            // elem_row_clone.children[0].textContent = 's' + i
            document.querySelector("#inp5432").append(elem_row_clone)
            const btn_add_row = document.getElementById('ds_input_51')
            btn_add_row.addEventListener('click', hClick1)
            break
        }
    }
}

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

$( '#invalid-was-provider_1' ).select2( {
    theme: "bootstrap-5",
    // width: $( this ).data( 'width' ) ? $( this ).data( 'width' ) : $( this ).hasClass( 'w-100' ) ? '100%' : 'style',
    // placeholder: $( this ).data( 'placeholder' ),
} );

async function go_provider(){
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
async function go_provider(){
    const render = await get_provider();
    const stouts = document.getElementById('invalid-was-provider_1')
    render['data'].forEach(d => {
        let eOption = document.createElement('option')
            eOption.textContent = d['name_provider']
            eOption.setAttribute('id', d['id'])
            eOption.setAttribute('value',d['id'])
            stouts.append(eOption)
    })
    return render
}
go_provider()

$("select[name='gdfsdsfsdfsd']").bind("change", function (){
    const s = $("select[name='gdfsdsfsdfsd']").val()
    let s1 = document.querySelector('.das_122')
    s1.style.display = "block"

    html = '<div class="suggest-modal"><div class="suggest-content"><div class="suggest-products"></div></div></div>'
    // html = '<div> ddddd</div>'
    s1.insertAdjacentHTML("beforeend", html)

})







// // "select[name='sel_send_inn_prov']").val()
//      if ($("select[name='sel_send_id_client_2']").val() == "0")
//         { $("select[name='sel_contract']").empty();

// display: block;
//   height: 100px;
//   border: 1px solid red;
//   box-shadow: 0 24px 38px #445c8224,0 9px 46px #445c821f,0 11px 15px #445c8205;


