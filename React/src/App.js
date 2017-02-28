import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
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

const listYear = [];
const listTipo = [
  "Pop","Rock"
];

const style = {
  width: '40%',
  boxSizing: 'border-box',
  float: 'left',
}
const dataStyle = {
  width: '60%',
  height: '300px',
  boxSizing: 'border-box',
  float: 'left',
  textAlign: 'center',
  overflow: 'auto',
}

for(var i=1950;i<2018;i++){
  listYear.push(i);
}


const isSearchedTitulo = searchTerm => (item) => !searchTerm ||
  item.titulo.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());

const isSearchedArtista = searchTerm => (item) => !searchTerm ||
  item.artista.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());

const isSearchedAnio = searchTerm => (item) => !searchTerm ||
  item.anio.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());

const isSearchedTipo = searchTerm => (item) => !searchTerm ||
  item.tipo.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());

const Search = ({listaTipos, onChangeTitulo, onChangeArtista, onChangeAnio, onChangeTipo}) => {
  return(
    <form>
      <label for="searchTitulo" >Título:</label><input id="searchTitulo" type="text" onChange={onChangeTitulo} className="form form-control" /><br />
      <label for="searchArtista" >Artista: </label><input id="searchArtista" type="text" onChange={onChangeArtista} className="form form-control" /> <br />
      <label for="searchAnio">Año: </label><select id="searchAnio" className="form form-control" onChange={onChangeAnio}><option value="">-Cualquiera-</option>
      { listYear.map(item =>
          <option value={item}>{item}</option>
      )}</select><br />
      <label for="searchTipo">Tipo: </label><select id="searchTipo" className="form form-control" onChange={onChangeTipo}><option value="">-Cualquiera-</option>
      { listTipo.map(item =>
          <option value={item}>{item}</option>
      )}</select><br />
    </form>
  );
}
const DataDisplay = ({lista,searchObject}) => {
  var list = lista.filter(isSearchedTitulo(searchObject.tituloValue));
  list = list.filter(isSearchedArtista(searchObject.artistaValue));
  list = list.filter(isSearchedAnio(searchObject.anioValue));
  list = list.filter(isSearchedTipo(searchObject.tipoValue));
  return (
    <div>
    { list.map(item =>
      <div key={item.id}>
        <span>{item.titulo}</span><br />
        <span>{item.artista}</span><br />
        <span>{item.anio}</span><br />
        <span>{item.tipo}</span><br />
        ---------------------------------
      </div>
    )}
    </div>
  );
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchObject : {
        tituloValue: "",
        artistaValue: "",
        anioValue: "",
        tipoValue: "",
      }
    }
    this.onChangeTitulo = this.onChangeTitulo.bind(this);
    this.onChangeArtista = this.onChangeArtista.bind(this);
    this.onChangeAnio = this.onChangeAnio.bind(this);
    this.onChangeTipo = this.onChangeTipo.bind(this);
  }
  onChangeTitulo(event){
    var item = this.state.searchObject;
    item.tituloValue = event.target.value;
    this.setState({searchObject: item});
  }
  onChangeArtista(event){
    var item = this.state.searchObject;
    item.artistaValue = event.target.value;
    this.setState({searchObject: item});
  }
  onChangeAnio(event){
    var item = this.state.searchObject;
    item.anioValue = event.target.value;
    this.setState({searchObject: item});
  }
  onChangeTipo(event){
    var item = this.state.searchObject;
    item.tipoValue = event.target.value;
    this.setState({searchObject: item});
  }
  render() {
    return (
      <div>
      <div style={style}>
      <Search onChangeTitulo={this.onChangeTitulo} onChangeArtista={this.onChangeArtista} onChangeAnio={this.onChangeAnio} onChangeTipo={this.onChangeTipo}/>
      </div>
      <div style={dataStyle}>
      <DataDisplay lista={list} searchObject={this.state.searchObject} />
      </div>
      </div>
    );
  }
}

export default App;
export {DataDisplay, Search}
