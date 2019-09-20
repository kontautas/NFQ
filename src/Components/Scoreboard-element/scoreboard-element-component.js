import React from 'react'
import './scoreboard-element-styles.css'

const ScoreboardElement = (props) => {
    let lastName = '';
    const renderItem = (el) => {
        if(lastName !== el.SpecialistName){
            lastName = el.SpecialistName;
            console.log(lastName)
            return(
                <div className = 'element first' key = {el.Number}>
                    <div className = 'text'>{el.SpecialistName}</div> 
                    <div className = 'text'>{el.Number}</div>  
                </div>
            );
        }
        else {
            lastName = el.SpecialistName;
            return(
                <div className = 'element' key = {el.Number}>
                    <div className = 'text'>{el.SpecialistName}</div> 
                    <div className = 'text'>{el.Number}</div>  
                </div>
            );
        }
    }
    return(   
        <div className = 'scoreboard'>
            {                       
                props.specOnly ? 
                props.Items
                .map(el => (
                    el.SpecialistName === props.specOnly  ? 
                    <div className = 'element' key = {el.Number}>
                        <div className = 'text'>{el.SpecialistName}</div> 
                        <div className = 'text'>{el.Number}</div>  
                        <div className = 'text'><button onClick = {() => props.deleteItem(el.SpecialistName, el.Number)}>Aptarnauta</button></div>
                    </div> : null))
                
                :
                props.Items
                .sort(function(a,b){return a.SpecialistName > b.SpecialistName ? 
                    1 : (a.SpecialistName === b.SpecialistName) ? (a.Number - b.Number): -1})
                .map((el) => renderItem(el))
            }                
        </div>
    );
}

export default ScoreboardElement;