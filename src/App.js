import React from 'react';
import './App.css';
import Admin from './Components/Administrator/administrator-component';
import {Switch, Route} from 'react-router-dom';
import Specialists from './Components/Specialists/specialists-component';
import Scoreboard from './Components/Scoreboard/scoreboard-component';
import Clients from './Components/Administrator/client-list-example';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      items: []
    }
    this.deleteItem = this.deleteItem.bind(this);
    this.addNewClient = this.addNewClient.bind(this);
    
  }
  
  deleteItem = (name, number) => {
    const copy = this.state.items;
    let index;
    copy.forEach((el) => {
        if(el.SpecialistName === name && el.Number === number){                
            index = copy.indexOf(el);
        }
        return el;                           
    });        
    copy.splice(index,1);
    this.setState({items: copy});
  }  
  addNewClient = (name, number) => {
    const add = {SpecialistName: name, Number: number};
    this.setState({items: [...this.state.items, add]});
  }
  componentDidMount(){
    const data = localStorage.getItem('state');
    console.log(JSON.parse(Clients).clients)
    if(data === null){
      this.setState({items: JSON.parse(Clients).clients       
      });
    }
    else{
      this.setState({items: JSON.parse(data)});
      console.log(JSON.parse(data));
    }
  }
  componentDidUpdate(){
    const data = JSON.stringify(this.state.items);
    localStorage.setItem('state', data);
  }
  loadExampleData = async() => {
    let response = await Clients;
    response = JSON.parse(response);
    this.setState({items: response.clients});      
  }
 
  render(){
    return (
      <Switch>
        <Route path = '/administrator' render = {(props) => <Admin {...props} Items = {this.state.items} addNewClient = {this.addNewClient} loadExampleData = {this.loadExampleData}/>}/>
        <Route path = '/specialists' render = {(props) => <Specialists {...props} Items = {this.state.items} deleteItem = {this.deleteItem}/>}/>
        <Route path = '/scoreboard' render = {(props) => <Scoreboard {...props} Items = {this.state.items}/>}/>
      </Switch>
    );
  }
}

export default App;
