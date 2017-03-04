var idDisco;
var url = window.location.href;
var arr = url.split("/");
var requestURL = arr[0] + "//" + arr[2];

function punctObject(item){
  this.item = item;
}

function puntuar(idBuscar) {
    idDisco = idBuscar;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText));
            var dialogDiv = $("#dialogDiv");
            rellenarDialog(dialogDiv, JSON.parse(this.responseText));
            dialog = dialogDiv.dialog({
                modal: true,
                buttons: {
                    "Puntuar": sendPuntuacion,
                }
            });
        }
    };
    xhttp.open("GET", requestURL+"/api/Discoes/"+idBuscar, true);
    xhttp.send();
    
}

function rellenarDialog(dialogDiv, item){
  console.log("rellenar dialog");
  console.log(item);
  console.log(item.Titulo);
  console.log(item.Interprete);
  console.log(item.Agno);
  dialogDiv.find("#tituloD").html(item.Titulo);
  dialogDiv.find("#artistaD").html(item.Interprete.Interprete1);
  dialogDiv.find("#anioD").html(item.Agno);
}
function sendPuntuacion(){
  var ratingValue = $("input[name='rating']:checked").val();
  alert(ratingValue);
  var puntuacion = {
      Idcliente : null,
      iddisco : idDisco,
      puntuacion1 : ratingValue,
      Fecha : new Date(),
  };
  $.ajax({
      url: requestURL + "/api/Puntuacions",
      type: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      data: JSON.stringify(puntuacion),
      dataType: 'json',
      crossdomain: true,
      success: function () {
          alert("Puntuacion enviada");
      },
      error: function(error){
          alert("Error al enviar puntuación");
          console.log(error.responseText);
      }
  });

  dialog.dialog("close");
}

function crearGrafica(lista) {
    console.log("Crear Gráfica");
    console.log(lista);
    grapDiv = $("#graphDiv");
    var listaGraph = [];
    for (var i = 0; i < lista.length;i++){
        var itemGraph = {
            'titulo': lista[i].Titulo,
            'puntuacion':calcularMedia(lista[i].Puntuacion),
            'color': '#006699'
        };
        listaGraph.push(itemGraph);
    }
    
    listaGraph = ordenarLista(listaGraph);
    console.log(listaGraph);
    var chart = AmCharts.makeChart("graphDiv", {
        "theme": "light",
        "type": "serial",
        "startDuration": 2,
        "dataProvider": listaGraph,
        "valueAxes": [{
            "position": "left",
            "title": "Media"
        }],
        "graphs": [{
            "balloonText": "[[category]]: <b>[[value]]</b>",
            "fillColorsField": "color",
            "fillAlphas": 1,
            "lineAlpha": 0.1,
            "type": "column",
            "valueField": "puntuacion"
        }],
        "depth3D": 20,
        "angle": 30,
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "titulo",
        "categoryAxis": {
            "gridPosition": "start",
            "labelRotation": 45
        },
        "export": {
            "enabled": true
        }

    });
}

function ordenarLista(lista){
    lista.sort(function (a, b) {
        if (a.puntuacion < b.puntuacion) {
            return -1;
        }
        if(a.puntuacion > b.puntuacion){
            return 1;
        }
        return 0;
    });
    return lista.reverse().slice(0,10);
}
function calcularMedia(listaPuntuaciones) {
    var suma = 0;
    if (listaPuntuaciones.length != 0) {
        for (var i = 0; i < listaPuntuaciones.length;i++){
            suma = suma + listaPuntuaciones[i].Puntuacion1;
        }
        return (suma / listaPuntuaciones.length);
    }
    else {
        return 0;
    }
    
}
