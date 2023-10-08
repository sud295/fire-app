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
        console.log(formData);
        alert('Form submitted. Check the console for data.');
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

