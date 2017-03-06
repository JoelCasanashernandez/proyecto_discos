//Disco a puntuar
var idDisco;
//URL del servidor para realizar la puntuación
var url = window.location.href;
var arr = url.split("/");
var requestURL = arr[0] + "//" + arr[2];

function puntuar(idBuscar) {
    myPuntuacion = new puntuarObj(idBuscar);
}
//Objeto de puntuación
function puntuarObj(idBuscar) {
    this.idBuscar = idBuscar;
    this.dialog = null;
    this.puntuar();
}
//Realizar la búsqueda de disco por ID al servidor
//Crear cuadro de diálogo de puntuación
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
//Enviar la puntuación al servidor
function sendPuntuacion() {
    var that = this;
  var ratingValue = $("input[name='rating']:checked").val();
  var puntuacion = {
      Idcliente : getIdCliente("id"),
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
          crearToastSuccess();
          myPuntuacion.dialog.dialog("close");
      },
      error: function(error){
          alert("No se ha podido enviar la puntuación. Disculpe las molestias.");
      }
  });

}
//
function getIdCliente(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function crearToastSuccess() {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-bottom-full-width",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "150",
        "hideDuration": "1000",
        "timeOut": "2500",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr.info("Puntuacion enviada correctamente! muchas gracias!");
}

// Crear Gráfica de puntuaciones
function crearGrafica(lista) {
    myGraph = new graphObj(lista);
}
//Objeto para crear la gráfica
//La lista que se le pasa es la lista genérica (desde react). 
//El objeto se encarga de realizar las medias y ordenar.
function graphObj(lista) {
    this.lista = lista;
    this.crearGrafica();
}
//Crear gráfica vía amCharts
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
//Crear el teclado virtual y aleatorio para introducir el password.
function crearTecladoVirtual() {
    var inputPass = document.getElementById("Password");
    inputPass.setAttribute("onKeyPress","return false");
    var arrayClave = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var id = "teclado";
    var filaTeclado = document.getElementById(id);
        for (var j = 0; j < 10; j++) {
            var rndPos = Math.floor((Math.random() * arrayClave.length));
            var nodoButton = document.createElement("INPUT");
            var nodeValue = (arrayClave.splice(rndPos, 1));
            nodoButton.setAttribute("type", "button");
            nodoButton.setAttribute("value", nodeValue);
            nodoButton.setAttribute("onClick", "escribirTecladoVirtual(this)");
            nodoButton.setAttribute("class", "btn-info");
            filaTeclado.appendChild(nodoButton);
    }
}
//Solo permitir que se escriban 5 números en el campo de contraseña.
function escribirTecladoVirtual(boton) {
    var passInput = document.getElementById("Password");
    passInput.value += boton.value;
}