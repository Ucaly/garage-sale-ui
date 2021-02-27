import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import { useGlobalContext } from '../context';
/*
{"nickname":"yukarim777","name":"yukarim777@gmail.com","picture":"https://s.gravatar.com/avatar/ce899e4a69eca48a186dfa74a3ccfbf5?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fyu.png","updated_at":"2021-02-12T21:44:19.664Z","email":"yukarim777@gmail.com","email_verified":true,"sub":"auth0|600ed5cadf7b5a00718db212"}
*/
export default function Home() {
    const { currentUser, getUser } = useGlobalContext();
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    // console.log('user: ', JSON.stringify(user));
    
    // useEffect(() => {
    //     if (user) {
    //         const loggedInUser = {name: user.name, nickname: user.nickname, email: user.email}
    //         getUser(loggedInUser);
    //     }
    // },[user])

    return (
        <main>
            {  !isAuthenticated ? 
                <section className="section about-section"><h2>Please login</h2><LoginButton /></section> :
                <section className="section about-section"><h2>Logout</h2><LogoutButton /></section>
            }
        </main>
        
    )
}