import React from 'react'
import './scoreboard-styles.css';


const Scoreboard = (props) => {
    let lastName = '';
    let cssClass = '';
    const renderItem = (el) => {
        if(!el.Done){
            if(lastName !== el.SpecialistName){           
                cssClass = 'element first';                             
            }
            else {
                cssClass = 'element';          
            }
            lastName = el.SpecialistName;
            if(props.specOnly){
                if(props.specOnly === el.SpecialistName){                   
                    return(
                        <div className = {`${cssClass}`} key = {el.Number}>
                            <div className = 'text'>{el.SpecialistName}</div> 
                            <div className = 'text'>{el.Number}</div>
                            {
                                cssClass === 'element first' ? 
                                <button onClick = {()=>props.customerDone(el.Number)}>Aptarnavau</button>                                           
                                : null
                            }
                            {
                                cssClass === 'element first' ? 
                                <button onClick = {()=>props.customerDone(el.Number, true)}>Pradeti Laika</button>                                            
                                : null
                            }                            
                        </div>
                    ); 
                }            
            }
            else if(props.clientNumber){
                if(props.clientNumber === el.Number){
                    return(
                        <div className = {`${cssClass}`} key = {el.Number}>
                            <div className = 'text'>{el.SpecialistName}</div> 
                            <div className = 'text'>{el.Number}</div>                                                   
                        </div>
                    ); 
                }  
            }
            else if(!props.specOnly){
                return(
                    <div className = {`${cssClass}`} key = {el.Number}>
                        <div className = 'text'>{el.SpecialistName}</div> 
                        <div className = 'text'>{el.Number}</div>  
                    </div>
                );
            }
        }
    }
  
    return(   
        <div className = 'scoreboard'>
            {                       
                props.Items
                .sort(function(a,b){return a.SpecialistName > b.SpecialistName ? 
                    1 : (a.SpecialistName === b.SpecialistName) ? (a.Number - b.Number): -1})
                .map((el) => renderItem(el))
            }                
        </div>
    );
}

export default Scoreboard;