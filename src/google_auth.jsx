import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from './UserContext';
import { jwtDecode } from 'jwt-decode';

const AuthRedirect = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUserEmail, setUserToken } = useUser();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const accessToken = query.get('access_token');
        const idToken = query.get('id_token');

        // Debugging output
        console.log('Access Token:', accessToken);
        console.log('ID Token:', idToken);

        if (accessToken && idToken) {
            try {
                const decodedToken = jwtDecode(idToken);
                setUserEmail(decodedToken.email);
                setUserToken(idToken);
                console.log(decodedToken.email)

                // Save tokens to localStorage
                localStorage.setItem('authToken', idToken);
                localStorage.setItem('userEmail', decodedToken.email);

                // Redirect to the home page
                navigate('/');
            } catch (error) {
                console.error('Failed to decode token:', error);
                navigate('/');
            }
        }
    }, [location, navigate, setUserEmail, setUserToken]);

    return <div>Redirecting...</div>;
};

export default AuthRedirect;
