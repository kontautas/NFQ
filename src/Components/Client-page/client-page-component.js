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
        localStorage.setItem('number', number);   
        setInterval(this.props.UpdateTime(), 5000);     
          
    }
    componentDidMount = () =>{
        this.setState({currentNumber: JSON.parse(localStorage.getItem('number'))});        
    }
    
    render(){
        return(
            <div className = 'container'>
                <div className = 'row'>
                    <div className = 'col-sm-2'>
                        <label>
                            Įveskite savo skaičių
                        </label>
                        <input 
                            className = 'search'
                            type = 'search' 
                            placeholder = {this.state.currentNumber}
                            onChange = {this.handleChange}>
                        </input>
                    </div>                    
                    <div className = 'col-sm-8'>
                        <Scoreboard  Items = {this.props.Items} clientNumber={this.state.currentNumber}></Scoreboard>       
                    </div>                 
                </div> 
                <meta httpEquiv="refresh" content="5"></meta>              
            </div>
            
        );
    }
}
export default ClientPage;