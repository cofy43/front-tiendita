import React from "react";

import  { NavLink } from "react-router-dom";
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import MenuIcon from '@mui/icons-material/Menu';
import 'react-pro-sidebar/dist/css/styles.css';

function Sidebar() {
    const [menuVisible, setMenuVisible] = React.useState(true);

    return (
      // <div className="navbar">
      //     <h1>Navbar</h1>
      //     <ul>
      //         <li><NavLink to="/">Home</NavLink></li>
      //         <li><NavLink to="/contact">Contact</NavLink></li>
      //         <li><NavLink to="/about">About</NavLink></li>
      //     </ul>
      // </div>
      <ProSidebar breakPoint="md" collapsed={menuVisible}>
        <Menu iconShape="square">
          <MenuItem
            icon={<MenuIcon style={{ height: "35px", width: "35px" }} />}            
            onClick={() => {
              setMenuVisible(!menuVisible);
            }}
          >
          </MenuItem>
          <MenuItem>
            <NavLink to="/">Productos</NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/contact">Ventas</NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/about">Proveedores</NavLink>
          </MenuItem>
        </Menu>
      </ProSidebar>
    );
}

export default Sidebar;