import React from 'react';
import data from '../Administrator/client-list-example';


class Scoreboard extends React.Component {
    constructor(){
        super();
        this.state = {
            items: [],
            isLoaded: false
        }  
    }
    async componentDidMount(){
        let response = await data;
        response = JSON.parse(response);
        this.setState({items: response.clients, isLoaded: true});
        console.log()
    }
    render(){
        if(!this.state.isLoaded){
            console.log('loading');
            return(<div>loading....</div>);
            
        }
        else
        {
            console.log(this.state.items);
            return(
                <div>
                    <ul>
                        {this.state.items.map(el => (
                            <li key = {el.Number}>
                                {el.SpecialistName}: {el.Number}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }
}

export default Scoreboard;