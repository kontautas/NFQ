import React from 'react';
import './App.css';
import Admin from './Components/Administrator/administrator-component';
import {Switch, Route} from 'react-router-dom';
import Specialists from './Components/Specialists/specialists-component';
import Scoreboard from './Components/Scoreboard/scoreboard-component';
import Clients from './Components/Administrator/client-list-example';
import ClientPage from './Components/Client-page/client-page-component';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      items: [],
      averageTime: []
    }
    //this.deleteItem = this.deleteItem.bind(this);
    this.addNewClient = this.addNewClient.bind(this);
    this.customerDone = this.customerDone.bind(this);
    this.averageTimeObject = this.averageTimeObject.bind(this);
    
  }
  
  /*deleteItem = (name, number) => {
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
  }*/
  averageTimeObject = () => {
    let copy = [];
    let lastName = ''
    JSON.parse(Clients).clients.sort(function(a, b){
      if(a.SpecialistName < b.SpecialistName) { return -1; }
      if(a.SpecialistName > b.SpecialistName) { return 1; }
      return 0;
    }).map(el => {
      if(lastName !== el.SpecialistName){
        copy.push({SpecialistName: el.SpecialistName, AverageTime: 0});
        lastName = el.SpecialistName;
      }
      return el;
    })
    this.setState({averageTime: copy});
    localStorage.setItem('time', copy);
  }
  customerDone = (number,start) =>{
    let copy = this.state.items;
    let today = new Date();
    let fullTime = today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds();
    copy.map(el => {
      if(el.Number === number) {
        if(start && !el.StartTime){
          el.StartTime = fullTime;
        }
        else if(!start && el.StartTime){
          el.Done = 'Aptarnautas';
          el.VisitTime = fullTime - el.StartTime;
        }       
      }
      return el;
    })
    this.setState({items: copy})
    console.log(this.state.items);
  }
  
  addNewClient = (name, number) => {
    const add = {SpecialistName: name, Number: number};
    this.setState({items: [...this.state.items, add]});
  }
  componentDidMount(){
    const data = localStorage.getItem('state');
    const time = localStorage.getItem('time');
    if(data === null){
      this.setState({items: JSON.parse(Clients).clients       
      });
    }
    else{
      this.setState({items: JSON.parse(data)});
    }
    if(time === null){
      this.averageTimeObject();
    }
    else{
      this.setState({averageTime: JSON.parse(time)})
    }
  }
  componentDidUpdate(){
    console.log(this.state.averageTime)
    const data = JSON.stringify(this.state.items);
    const time = JSON.stringify(this.state.averageTime);
    localStorage.setItem('state', data);
    localStorage.setItem('time', time);
  }
  loadExampleData = async() => {
    let response = await Clients;
    response = JSON.parse(response);
    this.setState({items: response.clients});      
  }
 
  render(){
    return (
      <Switch>
        <Route path = '/administrator' render = {(props) => <Admin {...props} Items = {this.state.items} addNewClient = {this.addNewClient} loadExampleData = {this.loadExampleData} averageTimeObject = {this.averageTimeObject}/>}/>
        <Route path = '/specialists' render = {(props) => <Specialists {...props} Items = {this.state.items} customerDone = {this.customerDone} />}/>
        <Route path = '/scoreboard' render = {(props) => <Scoreboard {...props} Items = {this.state.items} />}/>
        <Route path = '/client' render = {(props) => <ClientPage {...props} Items = {this.state.items}/>}/>
      </Switch>
    );
  }
}

export default App;
