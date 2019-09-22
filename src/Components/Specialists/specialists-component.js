import React from 'react';
import Scoreboard from '../Scoreboard/scoreboard-component';
import Clients from '../Administrator/client-list-example';

class Specialists extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            currentSpec: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({currentSpec: event.target.value});
    }
    render(){
        return(           
            <div className = 'container'>
                <div className = 'row'>
                    <div className = 'col-sm-2'>
                    <label>Pasirinkite specialistą</label>
                    <div className = 'dropdown'>
                                
                    <select className = 'btn btn-secondary btn-sm' value={this.state.currentSpec} onChange={this.handleChange} autoFocus >
                        <option className = 'dropdown-item changeColor' key = {0}>-----</option>
                        {JSON.parse(Clients).clients.map(element =>
                            <option className = 'dropdown-item changeColor' key = {element.Number} value = {element.SpecialistName}>{element.SpecialistName}</option>                    
                        )}                            
                    </select>
                </div>
                    </div>
                    <div className = 'col-sm-8'>
                        <Scoreboard  Items = {this.props.Items} customerDone = {this.props.customerDone} specOnly = {this.state.currentSpec}></Scoreboard>
                    </div>
                </div>                
            </div>
        );
    }
}
export default Specialists