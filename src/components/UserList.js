import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context';
import Loading from './Loading';
import NewUserForm from './NewUserForm';

const UesrList = () => {
    const { users, getUsers, loading } = useGlobalContext();
    useEffect(() => {
        getUsers()
    },[])

    const deleteUser = (id) => {

    }

    if (loading) {
        return <Loading/>
    }
    // console.log('users=', users)
    if (users) {
        
        return (
        <main>
            {users.map((user) => {
                return(
                <section className="section saleitem-section" key={user.id }>
                    <article key={user.id }>
                        <h3>id: {user.id}</h3>
                        <h3>name: {user.name}</h3>
                        <h3>email: {user.email}</h3>
                        <h3>nickname: {user.nickname}</h3>
                        <div>
                            <Link to={`/userlist/${user.id}`} className='btn btn-primary'>
                                edit user
                            </Link>
                            <button className="btn btn-primary" onClick={deleteUser(user.id)}>delete</button>
                        </div>
                    </article>
                </section>)})}
                <section className="section about-section">
                    <NewUserForm />
                </section>
        </main>
        )
    } else {
        return (
            <h3>no user found</h3>
        )
    }

}
export default UesrList;