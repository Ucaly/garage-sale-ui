import React from 'react'
import SaleItem from './SaleItem'
import Loading from './Loading'
import { useGlobalContext } from '../context'

export default function SaleItems() {
  const { saleItems, loading, fetchSaleItems } = useGlobalContext()
  // console.log('jwtToken: ', jwtToken);
  React.useEffect(() => {
      fetchSaleItems()
  },[])
  if (loading) {
    return <Loading/>
  }
  console.log('in SaleItems: ', saleItems.length)
  if (saleItems.length < 1) {
    return (
      <h2 className='section-title'>
        no sale item matched your search criteria
      </h2>
    )
  }
  return (
    <section className='section'>
      <h2 className='section-title'>items on sale</h2>
      <div className='saleitems-center'>
        {saleItems.map((item) => {
          return <SaleItem key={item.id} {...item} />
        })}
      </div>
    </section>
  )
}
