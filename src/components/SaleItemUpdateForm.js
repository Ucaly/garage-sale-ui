import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'
import { useGlobalContext, baseUrl } from '../context'

const SaleItemUpdateForm = () => {
    // const { id } = useParams()
//   const { newSaleItem, handleChange, handleSubmit, error } = useGlobalContext()
    const { currentItem, jwtToken } = useGlobalContext();
    // console.log('currentItem: ', JSON.stringify(currentItem));
    const intialItemState = {name: currentItem.name, price:currentItem.price, image:currentItem.image, description:currentItem.description}
    const [updatedSaleItem, setUpdatedSaleItem] = useState(intialItemState)
    const [error, setError] = useState(false)
    const { getAccessTokenSilently } = useAuth0();
    const {id} = currentItem;
    
    // useEffect(()=> {
    //     setUpdatedSaleItem(intialItemState)
    // },[])
    
    const handleChange = (event) => {
        // name -> property name
        const name = event.target.name;
        const value = event.target.value;
        setUpdatedSaleItem({...updatedSaleItem, [name]: value})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if(!updatedSaleItem.name || !updatedSaleItem.price || !updatedSaleItem.description) {
            return;
        }
        updateSaleItem(updatedSaleItem)      
    }

    const updateSaleItem = async (updatedItem) => {
        try {
        // const JWT = await getAccessTokenSilently();
        const body = JSON.stringify(updatedItem);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${jwtToken}`);
        const response = await fetch(`${baseUrl}/saleitems/${id}`, {
            method: 'PATCH',
            headers: myHeaders,
            body: body
        })
        const res = await response.json();
        if (res) {
            setError(false)
            // setNewSaleItem(intialItemState)
        }
        console.log('update item: ', res);
        } catch(e) {
            setError(true)
        }
    }

    return (
        <main>
            <Link to='/saleitems' className='btn btn-primary'>
                back to sale item list
            </Link>
        <section className='newitem'>
            <form className='search-form'>
            <h2>edit sale item</h2>
            {/* amount */}
            <div className='form-control'>
                <label htmlFor='name'>name</label>
                <input
                type='text'
                name='name'
                id='name'
                value={updatedSaleItem.name}
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
                    value={updatedSaleItem.price}
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
                value={updatedSaleItem.description}
                onChange={handleChange}
                />
            </div>
            <div className='form-control'>
                <label htmlFor='image'>image</label>
                <input
                name='image'
                id='image'
                className='form-input'
                value={updatedSaleItem.image}
                onChange={handleChange}
                />
            </div>
            <div className='form-control'>
                <label htmlFor='status'>status</label>
                <select name="status" id="status" onChange={handleChange}>
                    <option value="0">Available</option>
                    <option value="1">Pending</option>
                    <option value="2">Sold</option>
                </select>
            </div>
            {error && (
                <p className='error'>
                can't update item
                </p>
            )}
            <button type='submit' onClick={handleSubmit} className='submit-btn'>
                update sale item
            </button>
            </form>
        </section>
        </main>
    )
}

export default SaleItemUpdateForm
