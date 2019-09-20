import React from 'react';
import Element from '../Scoreboard-element/scoreboard-element-component';
import './scoreboard-styles.css';
class Scoreboard extends React.Component {
    
    constructor(){
        super();
        this.state = {
            number: 0
        }
    }
    render(){       
            return(
                <div>                                          
                    <Element Items = {this.props.Items} specOnly = {this.props.specOnly}/>  
                </div>
            );
        }
}

export default Scoreboard;