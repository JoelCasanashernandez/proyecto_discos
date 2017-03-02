function registrar(){
  $("#fnacimiento").datepicker({
    maxDate:"-1D",
    showOtherMonths: true,
    changeMonth: true,
      changeYear: true
  });
  $("#registerForm").validate({
    rules :{
      nombre: "required",
      email:{
        required: true,
        email: true
      },
      password:{
        required: true,
        minlength: 4
      },
      fnacimiento:{
        required: true,
        date: true
      }
    },
    messages:{
      nombre:"Campo obligatorio",
      email: "Introduzca un email válido",
      password: "Campo obligatorio (longitud mínima: 4)",
      fnacimiento: "Introduzca una fecha de nacimiento válida"
    },
    submitHandler: function(form){
      enviarRegistro(form);
      return false;
    }
  });
}

/* -------------Objeto de Registro-------------- */
function enviarRegistro(myForm){
  console.log(myForm.nombre.value);
}
