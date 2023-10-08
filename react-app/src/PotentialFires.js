import React, { useEffect, useState } from 'react';
import './PotentialFires.css';

function FireList() {
    const [potentialFires, setPotentialFires] = useState([]);

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        fetch('http://127.0.0.1:5000/alert', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setPotentialFires(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []); 

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
