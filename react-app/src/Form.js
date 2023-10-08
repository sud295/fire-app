import React, { useState } from 'react';
import './Fire.css';

function FireReportForm() {
    const [formData, setFormData] = useState({
        address: '',
        fireDescription: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:5000/alert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Form submission failed.');
            }
        })
        .then((data) => {
            alert('Form submitted successfully.');
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred while submitting the form.');
        });
    };

    return (
        <form onSubmit={handleSubmit} className="fire-report-form">
            <div>
                <label htmlFor="address">Address:</label>
                <input 
                    type="text" 
                    id="address" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div>
                <label htmlFor="fireDescription">Description of Fire:</label>
                <textarea 
                    id="fireDescription" 
                    name="fireDescription" 
                    value={formData.fireDescription} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default FireReportForm;

