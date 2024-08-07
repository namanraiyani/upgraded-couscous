import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

const DriveTest = () => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null);
    const { userToken } = useUser(); // Get the user token from context

    const listFiles = async () => {
        try {
            const response = await axios.get('http://localhost:3001/list-files', {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            setFiles(response.data.files);
            setError(null); // Reset error if request is successful
        } catch (error) {
            console.error('Error listing files:', error);
            setError('Error listing files');
        }
    };

    return (
        <div>
            <button onClick={listFiles}>List Drive Files</button>
            {error && <p>{error}</p>}
            <ul>
                {files.map((file) => (
                    <li key={file.id}>{file.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default DriveTest;
