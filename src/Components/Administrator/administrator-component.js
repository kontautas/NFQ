import React from 'react';
import Clients from './client-list-example';
import Scoreboard from '../Scoreboard/scoreboard-component';

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
        localStorage.setItem('CurrentData', this.props.Items);
        alert('Duomenys sėkmingai išsaugoti localstorage, key "CurrentData"');
    }
    ChangeCurrentSpecName = (event) => {
        this.setState({SpecialistName: event.target.value});
        this.focus();
    }
    ChangeCurrentNumber = (event)=> {
        this.setState({Number: event.target.value});
    }
    
    render(){
        return (
            <div className = 'container'>
                <div className = 'row'>
                    <form className = 'col-sm-2' onSubmit={this.state.SpecialistName !== '-----' ? ()=> this.props.addNewClient(this.state.SpecialistName, this.state.Number) : null}> 
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
                        
                        <button className = 'btn btn-secondary pls' onClick = {this.saveToLocalExampleData}>Saugoti pradinius duom</button>
                        <button className = 'btn btn-secondary pls' onClick = {this.saveToLocalCurrentData}>Saugoti esama data</button>
                        <button className = 'btn btn-secondary pls' onClick = {this.props.loadExampleData}>Užkrauti pradinius duom</button>   

                    </form>
                   
                    <Scoreboard Items = {this.props.Items} AverageTime = {this.props.AverageTime} /> 
                </div>    
            </div> 
        );  
    }
}

export default admin;