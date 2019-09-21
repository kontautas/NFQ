import React from 'react';
import Scoreboard from '../Scoreboard/scoreboard-component';

class ClientPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentNumber: 0
        }
    }
    handleChange = (e) =>{
        this.setState({currentNumber: e.target.value});
    }
    componentDidUpdate(){
        const number = JSON.stringify(this.state.currentNumber);
        console.log(number);
        localStorage.setItem('number', number);
    }
    componentDidMount(){
        this.setState({currentNumber: JSON.parse(localStorage.getItem('number'))});
    }
    render(){
        return(
            <div>
                <input 
                    className = 'search'
                    type = 'search' 
                    placeholder = {this.state.currentNumber}
                    onChange = {this.handleChange}>
                </input>

                <Scoreboard  Items = {this.props.Items} clientNumber={this.state.currentNumber}></Scoreboard>  
                <meta httpEquiv="refresh" content="5; url=/client"></meta>
            </div>
        );
    }
}
export default ClientPage;