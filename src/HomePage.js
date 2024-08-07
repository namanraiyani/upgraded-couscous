import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const { userEmail } = useParams(); // Ensure you get userEmail from URL params
  const [qrCode, setQrCode] = useState('');
  const [isClientReady, setIsClientReady] = useState(false);
  const navigate = useNavigate();

  const fetchQRCode = async () => {
    const encodedEmail = encodeURIComponent(userEmail); // Encode the email
    try {
      const response = await fetch(`https://43.205.0.141:3000/qr/${encodedEmail}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setQrCode(url);
      } else {
        console.error('Failed to fetch QR code');
      }
    } catch (error) {
      console.error('Error fetching QR code:', error);
    }
  };

  useEffect(() => {
    const fetchStatus = () => {
      const encodedEmail = encodeURIComponent(userEmail); // Encode the email
      fetch(`https://43.205.0.141:3000/status/${encodedEmail}`)
        .then(response => response.text())
        .then(data => {
          if (data === 'ready') {
            setIsClientReady(true);
            navigate(`/generate/${encodedEmail}`);
          } else {
            setIsClientReady(false);
          }
        })
        .catch(error => {
          console.error('Error fetching status:', error);
          setIsClientReady(false);
        });
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);

    return () => clearInterval(interval);
  }, [userEmail, navigate]);

  useEffect(() => {
    fetchQRCode();
    const interval = setInterval(fetchQRCode, 60000);
    return () => clearInterval(interval);
  }, [userEmail]);

  const changeDateTime = () => {
    navigate('/');
  };

  const handleGenerate = () => {
    const encodedEmail = encodeURIComponent(userEmail); // Encode the email
    navigate(`/generate/${encodedEmail}`);
  };

  return (
    <div className="HomePage">
      <header className="HomePage-header">
        <div className="container">
          <div className="container-left">
            <h1>Scan this QR Code</h1>
            <div>
              {qrCode ? <img src={qrCode} alt="WhatsApp QR Code" className="qr-code" /> : <p>Loading...</p>}
            </div>
            <button onClick={changeDateTime} className='button'>Update Date and Time</button>
          </div>
        </div>
        <button onClick={handleGenerate} className="button">Generate Excel Sheet</button>
      </header>
    </div>
  );
}

export default HomePage;
