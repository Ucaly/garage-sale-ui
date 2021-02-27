import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useGlobalContext, baseUrl } from '../context'

const NewUserForm = () => {
    // const { id } = useParams()
//   const { newSaleItem, handleChange, handleSubmit, error } = useGlobalContext()
    const { jwtToken } = useGlobalContext();
    // console.log('currentItem: ', JSON.stringify(currentItem));
    const intialUserState = {name: '', nickname: '', email: ''}
    const [newUser, setNewUser] = useState(intialUserState)
    const [error, setError] = useState(false)
   
    // useEffect(()=> {
    //     setUpdatedSaleItem(intialItemState)
    // },[])
    
    const handleChange = (event) => {
        // name -> property name
        const name = event.target.name;
        const value = event.target.value;
        setNewUser({...newUser, [name]: value})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if(!newUser.name && !newUser.email) {
            return;
        }
        addNewUser(newUser)      
    }

    const addNewUser = async (newUesr) => {
        try {
        // const JWT = await getAccessTokenSilently();
        const body = JSON.stringify(newUser);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${jwtToken}`);
        const response = await fetch(`${baseUrl}/users`, {
            method: 'POST',
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
            <Link to='/' className='btn btn-primary'>
                back to home
            </Link>
        <section className='newitem'>
            <form className='search-form'>
            <h2>add user</h2>
            
            <div className='form-control'>
                <label htmlFor='name'>name</label>
                <input
                type='text'
                name='name'
                id='name'
                value={newUser.name}
                onChange={handleChange}
                />
            </div>
            <div className='form-control'>
                <label htmlFor='email'>email</label>
                <input
                    type='text'
                    name='email'
                    id='email'
                    className='form-input'
                    value={newUser.email}
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
                    value={newUser.nickname}
                onChange={handleChange}
                />
            </div>
            {error && (
                <p className='error'>
                can't add user
                </p>
            )}
            <button type='submit' onClick={handleSubmit} className='submit-btn'>
                add user
            </button>
            </form>
        </section>
        </main>
    )
}

export default NewUserForm
