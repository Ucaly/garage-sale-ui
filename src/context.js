import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {setJWT, getJWT } from './auth0util';
// const baseUrl = 'http://localhost:5000';
export const baseUrl = 'https://my-garage-sale-service.herokuapp.com';

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
     const [loading, setLoading] = useState(true)
     const [searchTerm, setSearchTerm] = useState('')
     const [saleItems, setSaleItems] = useState([])
     const [currentItem, setCurrentItem] = useState(null)
     const [users, setUsers] = useState([])
     const [currentUser, setCurrentUser] = useState(null)
     // const [user, setUser] = useState(null)
     const [jwtToken, setJwtToken] = useState(null)
     const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
     
     const fetchSaleItems = async () => {
          if (!isAuthenticated){
               return <h2 className='section-title'>please login</h2>
          }
          setLoading(true)
          try {
               // const JWT = await getAccessTokenSilently();
               const myHeaders = new Headers();
               myHeaders.append('Content-Type', 'application/json');
               // myHeaders.append('Authorization', `Bearer ${jwtToken}`);               
               const response = await fetch(`${baseUrl}/saleitems`, {
                    method: 'GET',
                    headers: myHeaders,
               })
               const data = await response.json()
               console.log(data);
               const { saleitems } = data;
               if (saleitems) {
                    setSaleItems(saleitems);
               } else {
                    setSaleItems([])
               }
               setLoading(false);
          } catch (error) {
               console.log(error);
               setLoading(false)
          }
     }

     const getUsers = async () => {
          // if (!users) {
          //      setUsers([])
          // }
          setLoading(true)
          try {
               // const JWT = await getAccessTokenSilently();
               const myHeaders = new Headers();
               myHeaders.append('Content-Type', 'application/json');
               myHeaders.append('Authorization', `Bearer ${getJWT()}`);
               const response = await fetch(`${baseUrl}/users`, {
                    method: 'GET',
                    headers: myHeaders
               })
               const data = await response.json()
               const { users } = data;
               if (users) {
                    setUsers(users)
                    setLoading(false)
               }
          } catch(error) {
               console.log(error)
               setLoading(false)
          }
     }
     const getUser = async (authenticatedUser) => {
          // const { getAccessTokenSilently } = useAuth0();
          if (!authenticatedUser) {
               return;
          }
          // const user_to_check = {name: authenticatedUser.name, nickname: authenticatedUser.nickname, email: authenticatedUser.email}
          try{
               
               if (!jwtToken) {
                    const JWT = await getAccessTokenSilently();
                    await localStorage.setItem("access_token", JWT)
                    setJwtToken(JWT);
               }
               // // const JWT = await getAccessTokenSilently();
               // // await setJWT();
               // const JWT = getJWT();
               const body = JSON.stringify({name: authenticatedUser.name, nickname: authenticatedUser.nickname, email: authenticatedUser.email});
               const myHeaders = new Headers();
               myHeaders.append('Content-Type', 'application/json');
               myHeaders.append('Authorization', `Bearer ${jwtToken}`);
               const response = await fetch(`${baseUrl}/users`, {
                    method: 'POST',
                    headers: myHeaders,
                    body: body
               })
               const data = await response.json()
               if (data.user) {
                    setCurrentUser(data.user)
               } else {
                    console.log('something went wrong')
               }
          } catch (error) {
               console.log(error)
          }
     }
     const checkUser = async () => {
          if (!user) {
               return;
          }
          
          try{
               if (!jwtToken) {
                    const JWT = await getAccessTokenSilently();
                    await localStorage.setItem("access_token", JWT)
                    setJwtToken(JWT);
               }
               const token = getJWT();
               
               const body = JSON.stringify({name: user.name, nickname: user.nickname, email: user.email});
               const myHeaders = new Headers();
               myHeaders.append('Content-Type', 'application/json');
               myHeaders.append('Authorization', `Bearer ${token}`);
               const response = await fetch(`${baseUrl}/users`, {
                    method: 'POST',
                    headers: myHeaders,
                    body: body
               })
               const data = await response.json()
               if (data.user) {
                    setCurrentUser(data.user)
               } else {
                    setCurrentUser(null)
               }
          } catch (error) {
               console.log(error)
               setCurrentUser(null)
          }    
     }

     useEffect(() => {
          checkUser()
     }, [user])
     
     return (
          <AppContext.Provider
               value={{ loading, saleItems, searchTerm, setSearchTerm, getUsers, users, currentUser, getUser, fetchSaleItems, currentItem, setCurrentItem, jwtToken}}
          >
               {children}
          </AppContext.Provider>
     )
}

export const useGlobalContext = () => {
     return useContext(AppContext)
}

export { AppContext, AppProvider }
