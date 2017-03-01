var list = [
  {id:1,
  titulo: "Mama",
  artista: "Joel",
  anio: "2016",
  tipo: "Rock"},
  {id:2,
  titulo: "Not Afraid",
  artista: "Ana",
  anio: "1999",
  tipo: "Pop"},
  {id:3,
  titulo: "Afraid",
  artista: "Ana",
  anio: "1990",
  tipo: "Pop"},
  {id:4,
  titulo: "Manjula",
  artista: "Joel",
  anio: "2016",
  tipo: "Pop"}
];
var idBuscar=1;
function filtrarPorID(obj) {
  if (obj.id==idBuscar) {
    return true;
  } else {
    return false;
  }
}

function punctObject(item){
  this.item = item;
}

function puntuar(idDisco){
  idBuscar = idDisco;
  console.log("puntuar->");
  var item = list.filter(filtrarPorID);
  console.log(item[0]);
  var dialogDiv = $("#dialogDiv");
  rellenarDialog(dialogDiv, item[0]);
  dialog = dialogDiv.dialog({
    modal: true,
    buttons: {
      "Puntuar": sendPuntuacion,
    }
  });
}

function rellenarDialog(dialogDiv, item){
  console.log("rellenar dialog");
  console.log(item);
  dialogDiv.find("#tituloD").html(item.titulo);
  dialogDiv.find("#artistaD").html(item.artista);
  dialogDiv.find("#anioD").html(item.anio);
  dialogDiv.find("#tipoD").html(item.tipo);
}
function sendPuntuacion(){
  var ratingValue = $("input[name='rating']:checked").val();
  alert(ratingValue);
  dialog.dialog("close");
}
