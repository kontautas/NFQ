import React from 'react';
import Clients from './client-list-example.js';
import Scoreboard from '../Scoreboard/scoreboard-component';

class admin extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            SpecialistName: '',
            Number: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        
    }    
    saveToLocal = () => {
        localStorage.setItem('data', Clients);
    }
    saveToLocalCurrentData = () => {
        localStorage.setItem('CurrentData', this.props.items);
    }
    handleChange(event) {
        this.setState({SpecialistName: event.target.value});
    }
    handleChange2(event) {
        this.setState({Number: event.target.value});
    }
    render(){
        return (
            <div>
                <div>
                <form onSubmit={()=> this.props.addNewClient(this.state.SpecialistName, this.state.Number)}>                    
                    <label>
                        Pick specialist:
                        <select value={this.state.SpecialistName} onChange={this.handleChange}>
                            <option>-----</option>
                            {JSON.parse(Clients).clients.map(element =>
                                <option value = {element.SpecialistName}>{element.SpecialistName}</option>                    
                            )}
                        </select>
                    </label>
                    <label>
                        Pick number:
                        <input type='number' onChange = {this.handleChange2}/>
                    </label>
                <input type="submit" value="Submit" />
              </form>
            </div>
                <button onClick = {this.saveToLocal}>Saugoti pradinius duom</button>
                <button onClick = {this.saveToLocalCurrentData}>Saugoti esama data</button>
                <Scoreboard Items = {this.props.Items}/>                
            </div>
        );  
    }
}

export default admin;