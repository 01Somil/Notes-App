import React from 'react'
import { useState } from 'react';
import { FaHome, FaInfoCircle} from "react-icons/fa";
import {NavLink} from "react-router-dom";
import "./SideBar.css";

const Sidebar = ({children}) => {
  const[isOpen ,setIsOpen] = useState(false);
  const toggle = () => setIsOpen (!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "Home",
      icon: <FaHome />
    },
    {
      path: "/about",
      name: "About",
      icon: <FaInfoCircle />
    },
  ]
  return (
    <div className="sidebar_container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar" onMouseOver={()=>{setIsOpen(true)}} onMouseOut={()=>{setIsOpen(false)}}>
        {
          menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link" activeclassname="sidebar_active">
              <div className="icon">{item.icon}</div>
              <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
            </NavLink>
          ))
        }
      </div>
      <main>{children}</main>
    </div>
  )
}

export default Sidebar