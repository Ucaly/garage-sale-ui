import React from 'react'
import { Link } from 'react-router-dom'
export default function SaleItem({ image, name, id, price, description }) {
  return (
    <article className='saleitem'>
      <div className='img-container'>
        <img src={image} alt={name} />
      </div>
      <div className='saleitem-footer'>
        <h3>{name}</h3>
        <h4>${price}</h4>
        <p>{description}</p>
        <Link to={`/saleitems/${id}`} className='btn btn-primary btn-details'>
          details
        </Link>
      </div>
    </article>
  )
}
