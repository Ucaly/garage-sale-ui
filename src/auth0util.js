import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react'
    export const setJWT = async () => { 
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { getAccessTokenSilently } = useAuth0();

    // useEffect(() => { getAccessTokenSilently().then(setToken)},[])
        let jwt;
        try {
            const token = await getAccessTokenSilently();
            await localStorage.setItem("access_token", token)
            // jwt = await token;
        } catch(e) {
            throw new Error('Failed to get JWT')
        }
        // return jwt;  
    } 

    function useToken() {
        const {  getAccessTokenSilently } = useAuth0();
        const [token, setToken] = useState(null);
      
        useEffect(() => { getAccessTokenSilently().then(setToken) }, [])
      
        return token;
    }

    export const getJWT = () => {
        const token = localStorage.getItem('access_token');
        return token;
    }
      