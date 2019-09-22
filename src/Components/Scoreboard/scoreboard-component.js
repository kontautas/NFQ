import React from 'react'
import './scoreboard-styles.css';

const Scoreboard = (props) => {
    let lastName = '';
    let cssClass = '';
    const renderButtonsElement = (cssclass, number) =>{
        if(cssclass === 'first'){
            return(
                <div className = 'col-sm text'>
                    <button className = 'btn btn-primary pls' onClick = {()=>props.customerDone(number)}>Pradėti laika</button>
                    <button className = 'btn btn-primary pls' onClick = {()=>props.customerDone(number)}>Aptarnavau</button>
                </div>
            );
        }
    }

    const renderScoreboardElement = (cssClass, number, specName, waitTime, renderButtons) => {       
        return(
            <div className = {`col-sm ${cssClass}`} key = {number}>
                <div className = 'row'>
                    <div className = 'col-sm text'>{specName}</div> 
                    <div className = 'col-sm text'>{number}</div>
                    {
                        renderButtons ?  renderButtonsElement(cssClass, number)
                        :
                        <div className = 'col-sm text'>{waitTime ? waitTime : 0} seconds</div>     
                    }     
                </div>
                                                                                     
            </div>
        )
    }

    const renderItem = (el) => {
        if(!el.Done){
            if(lastName !== el.SpecialistName){           
                cssClass = 'first';                          
            }
            else {
                cssClass = '';    
            }

            lastName = el.SpecialistName;

            if(props.specOnly){
                if(props.specOnly === el.SpecialistName){ 
                    if(cssClass === 'first'){
                        return(
                            renderScoreboardElement(cssClass, el.Number, el.SpecialistName, el.WaitTime, true)
                        );
                    }                  
                    else{
                        return(
                            renderScoreboardElement(cssClass, el.Number, el.SpecialistName, el.WaitTime)
                        );
                    }
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
        <div className = 'col-sm-8 scoreboard'>
            <div className = 'col-sm'>
                <div className = 'row startElements'>
                    <label className = 'col-sm text'>Specialistas</label>
                    <label className = 'col-sm text'>Numeris</label>
                    <label className = 'col-sm text'>Laikas laukti</label>
                </div>    
            </div>
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