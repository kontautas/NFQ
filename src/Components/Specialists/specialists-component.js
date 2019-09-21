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
            <div>
                <div>
                    <select value={this.state.currentSpec} onChange={this.handleChange}>
                        <option key = {0}>-----</option>
                        {JSON.parse(Clients).clients.map(element =>
                            <option key = {element.Number} value = {element.SpecialistName}>{element.SpecialistName}</option>                    
                        )}
                    </select>
                </div>
                <Scoreboard  Items = {this.props.Items} customerDone = {this.props.customerDone} specOnly = {this.state.currentSpec} AverageTime = {this.props.AverageTime} Display = {this.props.Display}></Scoreboard>
            </div>
        );
    }
}
export default Specialists