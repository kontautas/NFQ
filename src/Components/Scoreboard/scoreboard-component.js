import React from 'react'
import './scoreboard-styles.css';

const Scoreboard = (props) => {
    let lastName = '';
    let cssClass = '';
    const renderButtonsElement = (cssclass, number) =>{
        if(cssclass === 'element first'){
            return(
                <div className = 'text'>
                    <button onClick = {()=>props.customerDone(number)}>Aptarnavau</button>
                    <button onClick = {()=>props.customerDone(number)}>Pradėti laika</button>
                </div>
            );
        }
    }
    const renderScoreboardElement = (cssClass, number, specName, waitTime, renderButtons) => {
        
        return(
            <div className = {`${cssClass}`} key = {number}>
                <div className = 'text'>Specialist: {specName}</div> 
                <div className = 'text'>Number: {number}</div>
                {
                    renderButtons ?  renderButtonsElement(cssClass, number)
                    :
                    <div className = 'text'>Time to wait: {waitTime ? waitTime : 0} seconds</div>     
                }                                                                            
            </div>
        )
    }
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
                        renderScoreboardElement(cssClass, el.Number, el.SpecialistName, el.WaitTime, true)
                    ); 
                }
                else if(props.specOnly === '-----'){
                    return(
                        renderScoreboardElement(cssClass, el.Number, el.SpecialistName, el.WaitTime, false)
                    ); 
                }
                                          
            }
            else if(props.clientNumber){
                if(props.clientNumber === el.Number){
                    return(
                        renderScoreboardElement(cssClass, el.Number, el.SpecialistName, el.WaitTime, false)
                    ); 
                }  
            }
            else if(!props.specOnly && !props.clientNumber){
                return(
                    renderScoreboardElement(cssClass, el.Number, el.SpecialistName, el.WaitTime, false)
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