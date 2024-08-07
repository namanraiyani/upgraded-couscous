import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './GeneratePage.css';

function GeneratePage() {
  const { userEmail } = useParams();
  const [isFileReady, setIsFileReady] = useState(false);
  const navigate = useNavigate();

  const downloadExcel = async () => {
    try {
      const encodedEmail = encodeURIComponent(userEmail);
      const response = await fetch(`http://43.205.0.141:3000/download/${encodedEmail}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${userEmail}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to download Excel file');
      }
    } catch (error) {
      console.error('Error downloading Excel file:', error);
    }
  };

  const uploadFile = async () => {
    try {
      const encodedEmail = encodeURIComponent(userEmail);
      const response = await fetch(`http://43.205.0.141:3000/upload/${encodedEmail}`, {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        console.log('File uploaded successfully:', data);
      } else {
        console.error('Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  const handleBack = () => {
    navigate(`/`);
  };

  useEffect(() => {
    const fetchStatus = () => {
      const encodedEmail = encodeURIComponent(userEmail);
      fetch(`http://43.205.0.141:1234/file-status/${encodedEmail}`)
        .then(response => response.text())
        .then(data => {
          if (data === 'available') {
            setIsFileReady(true);
          } else {
            setIsFileReady(false);
          }
        })
        .catch(error => {
          console.error('Error fetching status:', error);
          setIsFileReady(false);
        });
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);

    return () => clearInterval(interval);
  }, [userEmail]);

  return (
    <div className="GeneratePage">
      <div className="center-content">
        {isFileReady ? (
          <>
            <button className='button' onClick={downloadExcel}>Download Excel File</button><br/>
            <button className='button' onClick={uploadFile}>Upload File</button>
          </>
        ) : (
          <div>
            <h3>Generating file</h3>
            <div className="loader"></div>
          </div>
        )}
      </div>
      <br />
      <div className='center-content'>
        <button className='button' onClick={handleBack}>Back to QR</button>
      </div>
    </div>
  );
}

export default GeneratePage;
