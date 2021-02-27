import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useGlobalContext, baseUrl } from '../context'
const SaleItemForm = () => {
    const { jwtToken } = useGlobalContext()
    const intialItemState = {name: '', price:0, image:'', description:''}
    const [newSaleItem, setNewSaleItem] = useState(intialItemState)
    const [error, setError] = useState(false)
    // const { getAccessTokenSilently } = useAuth0();
    const handleChange = (event) => {
        // name -> property name
        const name = event.target.name;
        const value = event.target.value;
        setNewSaleItem({...newSaleItem, [name]: value})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if(!newSaleItem.name || !newSaleItem.price || !newSaleItem.description) {
            return;
        }
        addNewSaleItem(newSaleItem)
        setNewSaleItem(intialItemState)
    }

    const addNewSaleItem = async (newItem) => {
        try {
        // const JWT = await getAccessTokenSilently();
        const body = JSON.stringify(newSaleItem);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${jwtToken}`);
        const response = await fetch(`${baseUrl}/saleitems`, {
            method: 'POST',
            headers: myHeaders,
            body: body
        })
        const res = await response.json();
        if (res) {
            setError(false)
            setNewSaleItem(intialItemState)
        }
        console.log('new item: ', res);
        } catch(e) {
            setError(true)
        }
    }

    return (
        <main>
        <section className='newitem'>
            <form className='search-form'>
            <h2>new sale item</h2>
            {/* amount */}
            <div className='form-control'>
                <label htmlFor='name'>name</label>
                <input
                type='text'
                name='name'
                id='name'
                value={newSaleItem.name}
                onChange={handleChange}
                />
            </div>
            {/* category */}

            <div className='form-control'>
                <label htmlFor='price'>price</label>
                <input
                    type='text'
                    name='price'
                    id='price'
                    className='form-input'
                    value={newSaleItem.price}
                onChange={handleChange}
                />
            </div>
            {/* difficulty */}

            <div className='form-control'>
                <label htmlFor='description'>description</label>
                <input
                name='description'
                id='description'
                className='form-input'
                value={newSaleItem.description}
                onChange={handleChange}
                />
            </div>
            <div className='form-control'>
                <label htmlFor='image'>image</label>
                <input
                name='image'
                id='image'
                className='form-input'
                value={newSaleItem.image}
                onChange={handleChange}
                />
            </div>
            {error && (
                <p className='error'>
                can't add new item
                </p>
            )}
            <button type='submit' onClick={handleSubmit} className='submit-btn'>
                add sale item
            </button>
            </form>
        </section>
        </main>
    )
}

export default SaleItemForm
