
var url = window.location.href;
var arr = url.split("/");
var requestURL = arr[0] + "//" + arr[2];

//Objeto de búsqueda que se irá actualizando
const searchObject ={
        tituloValue: "",
        artistaValue: "",
        anioValue: "",
}

const listYear = [];
for(var i=1950;i<2018;i++){
    listYear.push(i);
}
//Funciones de filtro para la lista.
var isSearchedTitulo = searchTerm => (item) => !searchTerm ||
  item.Titulo.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());

var isSearchedArtista = searchTerm => (item) => !searchTerm ||
  item.Interprete.Interprete1.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());

var isSearchedAnio = searchTerm => (item) => !searchTerm ||
  item.Agno==searchTerm;

//Componente -> formulario de búsqueda.
//Params: funciones de actualización de lista.
var Search = ({onChangeTitulo, onChangeArtista, onChangeAnio}) => {
    return(
      <form>
          <h3>Realiza tu búsqueda:</h3>
      <label for="searchTitulo" >Título:</label><input id="searchTitulo" type="text" onChange={onChangeTitulo} className="form form-control" /><br />
      <label for="searchArtista" >Artista: </label><input id="searchArtista" type="text" onChange={onChangeArtista} className="form form-control" /> <br />
      <label for="searchAnio">Año: </label><select id="searchAnio" className="form form-control" onChange={onChangeAnio}><option value="">-Cualquiera-</option>
      { listYear.map(item =>
             <option key={item} value={item}>{item}</option>
        )}</select><br />
      
    </form>
    );
}

var buttonStyle = {
    position: "relative",
    float: "right",
    marginRight: "20",
    top: "-30"
}
var dataStyle = {
    width: '80%',
    margin: "0 auto",
}
//Componente -> mostrar la lista de discos.
//Se le pasa la lista completa y realiza automáticamente las filtraciones.
var DataDisplay = ({lista,searchObject,puntuarEvent}) => {
    console.log(lista);
    var list = lista.filter(isSearchedTitulo(searchObject.tituloValue));
    list = list.filter(isSearchedArtista(searchObject.artistaValue));
    list = list.filter(isSearchedAnio(searchObject.anioValue));
  return (
    <div>
    { list.map(item =>
      <div key={item.IdDisco} style={dataStyle}>
        <label>Título:</label><span>       {item.Titulo}</span><br />
        <label>Artista:</label><span>       {item.Interprete.Interprete1}</span><br />
        <label>Año: </label><span>       {item.Agno}</span><br />
        <button style={buttonStyle} className="btn btn-primary" onClick={puntuarEvent} value={item.IdDisco} >Puntuar</button> <br />
        <br />
      </div>
    )}
    </div>
  );
}

//Main component
//Se encarga de realizar la conexión a la base de datos.
//Usado para crear los otros dos componentes.
var App = React.createClass( {
    getInitialState: function(){
        var discosUrl = requestURL+"/api/Discoes";
        fetch(discosUrl).then(response => response.json())
        .then(result => this.rellenarLista(result))
        return{searchObject: searchObject, result: []};
    },
    rellenarLista: function(resultado){
        this.setState({result: resultado});
        window.crearGrafica(resultado);
  },
  onChangeTitulo: function(event){
    console.log(this.state.searchObject);
    var item = this.state.searchObject;
    item.tituloValue = event.target.value;
    this.setState({searchObject: item});
  },
  onChangeArtista:function(event){
    var item = this.state.searchObject;
    item.artistaValue = event.target.value;
    this.setState({searchObject: item});
  },
  onChangeAnio:function(event){
    var item = this.state.searchObject;
    item.anioValue = event.target.value;
    this.setState({searchObject: item});
  },
  puntuarEvent:function(event){
    window.puntuar(event.target.value);
  },
  render: function(){
      return(
        <div>
            <div id="search">
                <Search onChangeTitulo={this.onChangeTitulo} onChangeArtista={this.onChangeArtista} onChangeAnio={this.onChangeAnio} />
            </div>
            <div id="datadisplay">
                <DataDisplay lista={this.state.result} searchObject={searchObject} puntuarEvent={this.puntuarEvent} />
            </div>
        </div>
      )
  }
})
ReactDOM.render(
    <App />,
    document.getElementById('dataDiv')
);
