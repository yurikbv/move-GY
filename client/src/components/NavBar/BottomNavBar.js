import React from 'react';
import { Link } from 'react-router-dom';

import './BottomNavBar.css';

export default function BottomNavBar() {
  return (
    <div className="bottomNavBar">
      <Link to="/about_us">About Us</Link>
      <Link to="/tos">TOS</Link>
      <Link to="/privacy">Privacy</Link><br></br>
    </div>
  )
}
