import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../flowers.svg'
export default function Navbar() {
  return (
    <nav className='navbar'>
      <div className='nav-center'>
        <Link to='/'>
          <img src={logo} alt='logo' className='logo' />
        </Link>
        <ul className='nav-links'>
          <li>
            <Link to='/'>home</Link>
          </li>
          <li>
            <Link to='/saleitems'>sale items</Link>
          </li>
          <li>
            <Link to='/add_item'>add new item</Link>
          </li>
          <li>
            <Link to='/sign_up'>sign up</Link>
          </li>                
          <li>
            <Link to='/about'>about</Link>
          </li>
          <li>
            <Link to='/userlist'>user list</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
