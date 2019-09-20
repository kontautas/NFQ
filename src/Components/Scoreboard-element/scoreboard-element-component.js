import React from 'react'

const ScoreboardElement = (props) => {
    return(   
        <div>
            {                       
                props.specOnly ? 
                props.Items
                .map(el => (
                    el.SpecialistName === props.specOnly  ? 
                    <div key = {el.Number}>
                     {el.SpecialistName}: {el.Number}  <button onClick = {() => props.deleteItem(el.SpecialistName, el.Number)}>Aptarnauta</button>
                    </div> : null))
                
                :
                props.Items
                .sort(function(a,b){return a.SpecialistName > b.SpecialistName ? 
                    1 : (a.SpecialistName === b.SpecialistName) ? (a.Number - b.Number): -1})
                .map(el => (
                    <div key = {el.Number}>
                        {el.SpecialistName}: {el.Number}
                    </div>
                ))
            }                
        </div>
    );
}

export default ScoreboardElement;