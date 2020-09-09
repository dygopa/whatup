//Se pasa el evento click del boton al input
//Y es como si se estuviera haciendo click en el input
function getFile() {
  document.getElementById("upfile").click();
}

//Se usa el objeto recibido en el input file
function sub(obj) {
  var file = obj.value;
  var fileName = file.split("\\");
  //Se cambia el nombre del boton por el nombre del archivo
  document.getElementById("uploadFileBtn")
    .innerHTML = '<svg id="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"/></svg> ';
   document.getElementById("uploadFileBtn")
    .style.backgroundColor = "#27FF7D";
  //Se previene el refrescamiento de la pagina
  event.preventDefault();
}

function show(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#image').css('background-image', 'url(' + e.target.result + ')');
          // $('#image').attr('src', e.target.result);
          $('#image').removeClass("hidde").addClass("show");
      };

      reader.readAsDataURL(input.files[0]);
    }
}

//Tamaño del textarea automático

function textAreaAdjust(element) {
  element.style.height = "1px";
  element.style.height = (10+element.scrollHeight)+"px";
}

function closeAlert(){
  document.getElementById("alert").style.display = "none";
}

//Mostrar la contraseña

$("#toggle-password").click(function() {
  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});