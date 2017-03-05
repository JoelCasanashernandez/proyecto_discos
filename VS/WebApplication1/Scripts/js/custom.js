var idDisco;
var url = window.location.href;
var arr = url.split("/");
var requestURL = arr[0] + "//" + arr[2];

function puntuar(idBuscar) {
    myPuntuacion = new puntuarObj(idBuscar);
}

function puntuarObj(idBuscar) {
    this.idBuscar = idBuscar;
    this.dialog = null;
    this.puntuar();
}

puntuarObj.prototype.puntuar = function() {
    idDisco = this.idBuscar;
    var that = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText));
            var dialogDiv = $("#dialogDiv");
            that.rellenarDialog(dialogDiv, JSON.parse(this.responseText));
            that.dialog = dialogDiv.dialog({
                modal: true,
                buttons: {
                    "Puntuar": sendPuntuacion,
                },
                position: {
                    my: "center",
                    at: "center",
                    of: window
                }
            });
        }
    };
    xhttp.open("GET", requestURL+"/api/Discoes/"+this.idBuscar, true);
    xhttp.send();
    
}

puntuarObj.prototype.rellenarDialog = function(dialogDiv, item){
  dialogDiv.find("#tituloD").html(item.Titulo);
  dialogDiv.find("#artistaD").html(item.Interprete.Interprete1);
  dialogDiv.find("#anioD").html(item.Agno);
}
function sendPuntuacion() {
    var that = this;
  var ratingValue = $("input[name='rating']:checked").val();
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
          myPuntuacion.dialog.dialog("close");
      },
      error: function(error){
          alert("No se ha podido enviar la puntuación. Disculpe las molestias.");
      }
  });

}

function crearGrafica(lista) {
    myGraph = new graphObj(lista);
}
function graphObj(lista) {
    this.lista = lista;
    this.crearGrafica();
}

graphObj.prototype.crearGrafica = function() {
    grapDiv = $("#graphDiv");
    var listaGraph = [];
    for (var i = 0; i < this.lista.length;i++){
        var itemGraph = {
            'titulo': this.lista[i].Titulo,
            'puntuacion': calcularMedia(this.lista[i].Puntuacion),
            'color': '#006699'
        };
        listaGraph.push(itemGraph);
    }
    
    listaGraph = this.ordenarLista(listaGraph);
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

graphObj.prototype.ordenarLista = function(lista){
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
