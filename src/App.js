import React from 'react';
import './App.css';
import Admin from './Components/Administrator/administrator-component';
import {Switch, Route} from 'react-router-dom';
import Specialists from './Components/Specialists/specialists-component';
import Scoreboard from './Components/Scoreboard/scoreboard-component';
import Clients from './Components/Administrator/client-list-example';
import ClientPage from './Components/Client-page/client-page-component';
import Header from './Components/Header/header-component';
import firebase from './firebase';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      items: [],
      averageTime: []
    }
  }
  storeDataToFirebase = () => {
    const items = JSON.parse(localStorage.getItem('state'));
    firebase
    .firestore()
    .collection('items')
    .add({items: items});
  }
  
  uploadTimesToItems = () => {
    let copy = this.state.items;
    let lineNumber = 0;
    let last = '';
    copy.map(el => {
        if(el.SpecialistName === last && !el.Done){
            lineNumber++;
            last = el.SpecialistName;
        }
        else if(el.SpecialistName !== last && !el.Done){
            lineNumber = 0;
            last = el.SpecialistName;
        }
        this.state.averageTime.map(ele => {
            if(el.SpecialistName === ele.SpecialistName){                    
                el.WaitTime = ele.AverageTime * lineNumber;              
            }
            return el;
        })
        return el;
    })
    if(copy !== this.state.items){
        this.setState({items: copy});
    }
  }

  updateTimeToWait = () => {
    let copy = this.state.items;
    copy.map(el => {
        if(el.WaitTime > 0){
          el.WaitTime = Math.round(el.WaitTime - 5);
        }
        if(el.WaitTime < 0){
          el.WaitTime = 0;
        }
        return el;
                     
    })
    if(copy !== this.state.items){
        this.setState({items: copy});
    }
  }

  updateAverageTime = (specName, time) => {
    this.state.averageTime.map(el => {
      if(el.SpecialistName === specName){
        el.Times = [...el.Times, time];
        el.AverageTime = el.Times.reduce(function(a, b) { return a + b; }) / el.Times.length;
      }
      return el;
    })
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
        copy.push({SpecialistName: el.SpecialistName, Times: [], AverageTime: 0});
        lastName = el.SpecialistName;
      }
      return el;
    })
    this.setState({averageTime: copy});
    localStorage.setItem('time', JSON.stringify(copy));
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
          el.EndTime = fullTime;
          this.updateAverageTime(el.SpecialistName, el.VisitTime);
          this.uploadTimesToItems();
        }       
      }
      return el;
    })
    this.setState({items: copy})
  }
  
  addNewClient = (name, number) => {
    const add = {SpecialistName: name, Number: number};
    this.setState({items: [...this.state.items, add]});
    alert('Užregistruota sėkmingai');
  }

  componentDidMount(){
    const data = localStorage.getItem('state');
    const time = localStorage.getItem('time');
    if(data === null){
      this.setState({items: JSON.parse(Clients).clients       
      },()=>this.uploadTimesToItems());
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
    const data = JSON.stringify(this.state.items);
    const time = JSON.stringify(this.state.averageTime);
    localStorage.setItem('state', data);
    localStorage.setItem('time', time);
    //this.storeDataToFirebase();
  }

  loadExampleData = async() => {
    try{
      let response = await Clients;
      response = JSON.parse(response);
      this.setState({items: response.clients});
      this.averageTimeObject();
      this.uploadTimesToItems(); 
    }
    catch{
      alert('Nepavyko nuskaityti lankytojų duomenų')
    }
   
  }
 
  render(){
    return (
      <div className = 'homepage'>
        <Header/>
        <Switch>
          <Route path = '/administrator' render = {(props) => <Admin {...props} Items = {this.state.items} addNewClient = {this.addNewClient} loadExampleData = {this.loadExampleData} AverageTime = {this.state.averageTime} />}/>
          <Route path = '/specialists' render = {(props) => <Specialists {...props} Items = {this.state.items} customerDone = {this.customerDone} AverageTime = {this.state.averageTime} />}/>
          <Route path = '/scoreboard' render = {(props) => <Scoreboard {...props} Items = {this.state.items} AverageTime = {this.state.averageTime} />}/>
          <Route path = '/client' render = {(props) => <ClientPage {...props} Items = {this.state.items} uploadTimesToItems = {this.uploadTimesToItems} AverageTime = {this.state.averageTime} UpdateTime = {this.updateTimeToWait} />}/>
        </Switch>
      </div>      
    );
  }
}

export default App;
