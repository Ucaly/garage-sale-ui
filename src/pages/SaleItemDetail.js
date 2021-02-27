import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useGlobalContext, baseUrl } from '../context'
export default function SaleItemDetail() {
    const { id } = useParams();
    const [loading, setLoading] = React.useState(false)
    const [saleItem, setSaleItem] = React.useState(null)
    const [buyers, setBuyers] = React.useState([])
    const { getAccessTokenSilently } = useAuth0();
    const { setCurrentItem, jwtToken, currentUser, getUser} = useGlobalContext();
    // console.log('user: ', currentUser.id)
    const buySaleItem = async () => {
        if (!currentUser) {
            await getUser()
            console.log('currentUser ', currentUser)
        }
        const userId = currentUser.id;
        const body = JSON.stringify({user_id: userId})
        try {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', `Bearer ${jwtToken}`);
            const response = await fetch(`${baseUrl}/saleitems/${id}/buy`, {
                method: 'POST',
                headers: myHeaders,
                body: body
            })
            const res = await response.json();

        } catch(error) {
            console.log('error: ', error)
        }
    }

    const deleteSaleItem = async () => {
      try {
            // const JWT = await getAccessTokenSilently();
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', `Bearer ${jwtToken}`);
            const response = await fetch(
                `${baseUrl}/saleitems/${id}`, {
                    method: 'DELETE',
                    headers: myHeaders
                }
            )
            const data = await response.json()
            if (data.success) {
              setSaleItem(null)
            }
      } catch (e) {
        console.log('error: ', e);
      }
    }

    React.useEffect(() => {
        setLoading(true)
        
        async function getSaleItem() {
        // const JWT = await getAccessTokenSilently();
        // console.log('inside getSaleItem: ', JWT);
        try {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', `Bearer ${jwtToken}`);  
            const response = await fetch(
                `${baseUrl}/saleitems/${id}`, {
                    method: 'GET',
                    headers: myHeaders
                }
            )
            const data = await response.json()
            // console.log('single item: ', data)
            if (data) {
                setSaleItem(data.item)
                setCurrentItem(data.item)
                setBuyers(data.buyers)
            } else {
                setSaleItem(null)
                setCurrentItem(null)
                setBuyers([])
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }
        getSaleItem()
    }, [])
  
    if (loading) {
        return <Loading/>
    }
  
    if (!saleItem) {
        <Link to='/saleitems' className='btn btn-primary'>
           back to sale item list
        </Link>
        return <h2 className='section-title'>no item to display</h2>
    } else {
        const {
        name,
        image,
        price,
        description,
    } = saleItem
    return (
        <div className='selitem-container'>
        <section className='section saleitem-section'>
        <Link to='/saleitems' className='btn btn-primary'>
          back to sale item list
        </Link>
        <Link to={`/saleitems/${id}/edit`} className='btn btn-primary'>
          edit sale item
        </Link>
        <button className='btn btn-primary' onClick={deleteSaleItem}>
          delete sale item
        </button>
        <button className='btn btn-primary' onClick={buySaleItem}>
          buy sale item
        </button>
        <h2 className='section-title'>{name}</h2>
        <div className='saleitem'>
          <img src={image} alt={name}></img>
          <div className='saleitem-info'>
            <p>
              <span className='saleitem-data'>name :</span> {name}
            </p>
            <p>
              <span className='saleitem-data'>price :</span> ${price}
            </p>
            <p>
              <span className='saleitem-data'>description :</span> {description}
            </p>
            <p>
              <span className='saleitem-data'>buyers :</span>
              {buyers.map((item, index) => {
                return item ? <span key={index}> {item.nickname}</span> : null
              })}
            </p>
          </div>
        </div>
      </section>
      </div>
    )
    }
}
