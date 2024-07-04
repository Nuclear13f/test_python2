


 $(document).on("click", '.sign-in-systems', function (event) {
     event.preventDefault();
     console.log($('#login').val())
     console.log($('#pass').val())
     if (isEmpty($('#login').val()) != true && isEmpty($('#pass').val()) != true)
     {
          $.ajax({
              url: "/login",
              method: "POST",

              data: {
                login: $('#login').val(),
                pass: $('#pass').val()
          },

           success:function(data){
               if (data == 'success')
               {$('#modfrmsignup').modal('hide')
               window.location.href ='/';}
              }

          });
     }

 });

$(document).on('click', '.mod-frm-sign-up', function(event){
    event.preventDefault();
    console.log('Вызов модального окна');
    $('#modfrmsignup').modal('show');
    $('#login').val('');
	$('#pass').val('');
 });

function isEmpty(value){
    return (value == null || (typeof value === "string" && value.trim().length === 0));

}