import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { useGlobalContext, baseUrl } from '../context'

const UserUpdateForm = () => {
    // const { id } = useParams()
//   const { newSaleItem, handleChange, handleSubmit, error } = useGlobalContext()
    const { currentUser, jwtToken } = useGlobalContext();
    // console.log('currentItem: ', JSON.stringify(currentItem));
    const intialUserState = {name: currentUser.name, nickname:currentUser.nickname}
    const [updatedUser, setUpdatedUser] = useState(intialUserState)
    const [error, setError] = useState(false)
    const id = currentUser.id;
    console.log('currentUser ', currentUser);
   
    // useEffect(()=> {
    //     setUpdatedSaleItem(intialItemState)
    // },[])
    
    const handleChange = (event) => {
        // name -> property name
        const name = event.target.name;
        const value = event.target.value;
        setUpdatedUser({...updatedUser, [name]: value})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if(!updatedUser.name && !updatedUser.nickname) {
            return;
        }
        updateUser(updatedUser)      
    }

    const updateUser = async (updatedUser) => {
        try {
        // const JWT = await getAccessTokenSilently();
        const body = JSON.stringify(updatedUser);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${jwtToken}`);
        const response = await fetch(`${baseUrl}/users/${id}`, {
            method: 'PATCH',
            headers: myHeaders,
            body: body
        })
        const res = await response.json();
        if (res) {
            setError(false)
            // setNewSaleItem(intialItemState)
        }
        console.log('update user: ', res);
        } catch(e) {
            setError(true)
        }
    }

    return (
        <main>
            <Link to='/userlist' className='btn btn-primary'>
                back to user list
            </Link>
        <section className='newitem'>
            <form className='search-form'>
            <h2>edit user</h2>
            
            <div className='form-control'>
                <label htmlFor='name'>name</label>
                <input
                type='text'
                name='name'
                id='name'
                value={updatedUser.name}
                onChange={handleChange}
                />
            </div>

            <div className='form-control'>
                <label htmlFor='nickname'>nickname</label>
                <input
                    type='text'
                    name='nickname'
                    id='nickname'
                    className='form-input'
                    value={updatedUser.nickname}
                onChange={handleChange}
                />
            </div>
            {error && (
                <p className='error'>
                can't update user
                </p>
            )}
            <button type='submit' onClick={handleSubmit} className='submit-btn'>
                update user
            </button>
            </form>
        </section>
        </main>
    )
}

export default UserUpdateForm
