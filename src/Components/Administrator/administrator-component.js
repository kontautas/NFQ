import React from 'react';
import clients from './client-list-example.js';

const admin = () => {

    const saveToLocal = () => {
        localStorage.setItem('data', clients);
    }

    return (
        <div>
            <button onClick = {saveToLocal}>Saugoti i local storage</button>
        </div>
    );    
}

export default admin;