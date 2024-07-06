let element1 = document.getElementById('login')
let element2 = document.getElementById('pass')

 $(document).on("click", '.sign-in-systems', function (event) {
     event.preventDefault();

     if (isEmpty($('#login').val()) != true && isEmpty($('#pass').val()) != true)
     {
         console.log('Отправляем данные')
          $.ajax({
              url: "/login",
              method: "POST",

              data: {
                login: $('#login').val(),
                pass: $('#pass').val()
          },

           success:function(data){
                  console.log('Применаем данные')
               if (data == 'success')
               {$('#modfrmsignup').modal('hide')
               window.location.href ='/';}
               else {
                   // elem1 = document.querySelector('.form-control-style-21')
                   document.getElementById('label-style-21').innerHTML = 'Логин или пароль неверный'
                    document.getElementById('label-style-22').innerHTML = 'Логин или пароль неверный'
                document.getElementById('label-style-21').style.color = 'red';
                   document.getElementById('label-style-22').style.color = 'red';

               }
              }

          });
     }

 });

$(document).on('click', '.mod-frm-sign-up', function(event){
    event.preventDefault();
    console.log('Вызов модального окна');
    $('#modfrmsignup').modal('show');
    labelstart1();
    $('#login').val('');
	$('#pass').val('');
 });

function isEmpty(value){
    return (value == null || (typeof value === "string" && value.trim().length === 0));

}

element1.oninput = () =>{
    labelstart1();
}
element2.oninput = () =>{
    labelstart1();
}

function labelstart1() {
    document.getElementById('label-style-21').innerHTML = 'Логин'
    document.getElementById('label-style-22').innerHTML = 'Пароль'
    document.getElementById('label-style-21').style.cssText = 'color: rgba(33,37,41, 0.65)';
    document.getElementById('label-style-22').style.cssText = 'color: rgba(33,37,41, 0.65)';
}