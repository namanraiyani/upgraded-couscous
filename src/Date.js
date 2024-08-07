import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Import the custom hook
import './Date.css';

function DatePage() {
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [error, setError] = useState('');
    const { userEmail } = useUser(); // Use the context hook
    const navigate = useNavigate();

    const handleConvertToUnix = () => {
        if (startDate && startTime && endDate && endTime) {
            const start = new Date(`${startDate}T${startTime}`).getTime() / 1000;
            const end = new Date(`${endDate}T${endTime}`).getTime() / 1000;

            // Send timestamps to backend
            fetch(`http://43.205.0.141:3000/timestamps/${encodeURIComponent(userEmail)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ startTimestamp: start, endTimestamp: end }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                navigate(`/qr/${encodeURIComponent(userEmail)}`);
            })
            .catch(error => {
                console.error('Error sending timestamps:', error);
            });
        } else {
            setError('Please enter both start and end date and time.');
        }
    };

    return (
        <div className="DatePage">
            <header className="DatePage-header">
                <div className="instructions">
                    <h3>Steps to Generate Excel File:</h3>
                    <ol>
                        <li>Enter the start and end date and time between which all the messages should be archived</li>
                        <li>Click on Generate QR button</li>
                        <li>Open your WhatsApp and go to More - Linked Devices - Link a New Device</li>
                        <li>Scan the QR code from your phone</li>
                        <li>Once the QR is scanned, it will automatically redirect to a new page; there wait for some time while your Excel file is generated</li>
                        <li>Download your Excel file</li>
                    </ol>
                </div>
                
                <div className="date-time-inputs">
                    <h3>Please Enter the Required Time Frame</h3>
                    <label>
                        Start Date:
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </label>
                    <label>
                        Start Time:
                        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                    </label>
                    <label>
                        End Date:
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </label>
                    <label>
                        End Time:
                        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                    </label>
                    <button onClick={handleConvertToUnix} className="button">Generate QR</button>
                </div>
            </header>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default DatePage;
