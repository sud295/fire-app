import React from 'react';
import './PotentialFires.css';  // Importing the CSS for styling

function FireList() {
    const potentialFires = [
        { address: '123 Elm St.', fireDescription: 'Small bushfire near the garage.' },
        { address: '456 Oak St.', fireDescription: 'Fire spotted on the balcony.' },
        // ... Add more potential fires here
    ];

    return (
        <div className="fires-container">
            <h2>Potential Fires</h2>
            <ul>
                {potentialFires.map((fire, index) => (
                    <li key={index} className="fire-item">
                        <h3>{fire.address}</h3>
                        <p>{fire.fireDescription}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FireList;
