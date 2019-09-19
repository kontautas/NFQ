import React from 'react';
import App from '../../App';

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
                    <ol>
                        {this.props.Items.sort(function(a,b){return a.SpecialistName > b.SpecialistName ? 
                            1 : (a.SpecialistName === b.SpecialistName) ? (a.Number - b.Number): -1})
                            .map(el => (
                            <div key = {el.Number}>
                                {el.SpecialistName}: {el.Number} {this.props.Spec === true ? <button onClick = {() => this.props.deleteItem(el.SpecialistName, el.Number)}>Aptarnauta</button> : null}
                            </div>
                        ))}
                    </ol>
                </div>

            );
        }
}
//deleteItem(el.SpecialistName, el.Number)
/* <ol>
{this.props.Items.sort(function(a,b){return a.SpecialistName > b.SpecialistName ? 
    1 : (a.SpecialistName === b.SpecialistName) ? (a.Number - b.Number): -1})
    .map(el => (
    <div key = {el.Number}>
        {el.SpecialistName}: {el.Number} {this.props.Spec === true ? <button>Aptarnauta</button> : null}
    </div>
))}
</ol>
*/

export default Scoreboard;