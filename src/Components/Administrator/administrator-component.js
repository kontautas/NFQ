import React from 'react';
import Clients from './client-list-example.js';
import Scoreboard from '../Scoreboard/scoreboard-component';

class admin extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            SpecialistName: '-----',
            Number: 0
        }        
    }    
    saveToLocalExampleData = () => {
        localStorage.setItem('data', Clients);
    }
    saveToLocalCurrentData = () => {
        localStorage.setItem('CurrentData', this.props.items);
    }
    ChangeCurrentSpecName = (event) => {
        this.setState({SpecialistName: event.target.value});
    }
    ChangeCurrentNumber = (event)=> {
        this.setState({Number: event.target.value});
    }
    componentDidMount(){
        this.numberInput.focus(); 
    }
    render(){
        return (
            <div>
                <div>
                <form onSubmit={this.state.SpecialistName !== '-----' ? ()=> this.props.addNewClient(this.state.SpecialistName, this.state.Number) : null}>                    
                    <label>
                        Pick specialist:
                        <select value={this.state.SpecialistName} onChange={this.ChangeCurrentSpecName}>
                            <option key = {0}>-----</option>
                            {JSON.parse(Clients).clients.map(element =>
                                <option key = {element.Number} value = {element.SpecialistName}>{element.SpecialistName}</option>                    
                            )}
                        </select>
                    </label>
                    <label>
                        Pick number:
                        <input type='number' onChange = {this.ChangeCurrentNumber} ref={(input) => { this.numberInput = input; }}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                </div>
                    <button onClick = {this.saveToLocalExampleData}>Saugoti pradinius duom</button>
                    <button onClick = {this.saveToLocalCurrentData}>Saugoti esama data</button>
                    <button onClick = {this.props.loadExampleData}>uzkrauti pradinius duom</button>
                    <Scoreboard Items = {this.props.Items} AverageTime = {this.props.AverageTime} />                
                </div>
        );  
    }
}

export default admin;