import React from 'react';
import Clients from './client-list-example';
import Scoreboard from '../Scoreboard/scoreboard-component';
import { Dirent } from 'fs';

class admin extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            SpecialistName: '-----',
            Number: 0
        }
        this.textInput = React.createRef();        
    }    
    focus = () => {
        // Explicitly focus the text input using the raw DOM API
        // Note: we're accessing "current" to get the DOM node
        this.textInput.current.focus();
    }
    saveToLocalExampleData = () => {
        localStorage.setItem('ExampleData', Clients);
        alert('Duomenys sėkmingai išsaugoti localstorage, key "ExampleData"');
    }
    saveToLocalCurrentData = () => {
        localStorage.setItem('CurrentData', JSON.stringify(this.props.Items));
        alert('Data saved succesfully into localstorage, key "CurrentData"');
    }
    ChangeCurrentSpecName = (event) => {
        this.setState({SpecialistName: event.target.value});
        this.focus();
    }
    ChangeCurrentNumber = (event)=> {
        this.setState({Number: event.target.value});
    }
    checkBeforeSubmit = () => {
        let bool = true;
        this.props.Items.map(el => {
            if(el.Number === this.state.Number){
                bool = false;
            }
        });
        if(this.state.SpecialistName !== '-----' && bool){
            this.props.addNewClient(this.state.SpecialistName, this.state.Number);
        }
        else{
            alert('Something went wrong! Check specialist name and number');
        }
    }
    render(){
        return (
            <div className = 'container'>
                <div className = 'row'>
                    <div className = 'col-sm-2'>
                        <form onSubmit={() =>this.checkBeforeSubmit()}> 
                            <div className = 'row'>
                                <label className = 'col'>
                                    Pick specialist :                                                          
                                </label>
                                <div className = 'dropdown'>                               
                                    <select className = 'btn btn-secondary btn-sm' value={this.state.SpecialistName} onChange={this.ChangeCurrentSpecName} autoFocus >
                                        <option className = 'dropdown-item changeColor' key = {0}>-----</option>
                                        {JSON.parse(Clients).clients.map(element =>
                                            <option className = 'dropdown-item changeColor' key = {element.Number} value = {element.SpecialistName}>{element.SpecialistName}</option>                    
                                        )}                            
                                    </select>
                                </div>                                                 
                                <label className = 'col'>
                                    Pick number :                             
                                </label>
                                <input className = 'form-control form-control-sm' type='number' onChange = {this.ChangeCurrentNumber} ref={this.textInput}/>                           
                                <input type="submit" value="Submit"  className = 'btn btn-primary btn-sm col pls'/>
                            </div>                                                               
                        </form>
                        <button className = 'btn btn-secondary pls' onClick = {this.saveToLocalExampleData}>Saugoti pradinius duom</button>
                        <button className = 'btn btn-secondary pls' onClick = {this.saveToLocalCurrentData}>Saugoti esama data</button>
                        <button className = 'btn btn-secondary pls' onClick = {this.props.loadExampleData}>Užkrauti pradinius duom</button>                   
                    </div>
                    <div className = 'col-sm-8'>
                        <Scoreboard Items = {this.props.Items} AverageTime = {this.props.AverageTime} />
                    </div>                 
                    
                </div>    
            </div> 
        );  
    }
}

export default admin;