import React from 'react';
import Scoreboard from '../Scoreboard/scoreboard-component';

class Specialists extends React.Component {
    render(){
        return(           
            <div>
                <Scoreboard  Items = {this.props.Items}  Spec = {true} deleteItem = {this.props.deleteItem}></Scoreboard>
            </div>
        );
    }
}
export default Specialists