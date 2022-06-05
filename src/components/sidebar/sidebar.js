import  { NavLink } from "react-router-dom";
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

function Sidebar() {
    return (
        // <div className="navbar">
        //     <h1>Navbar</h1>
        //     <ul>
        //         <li><NavLink to="/">Home</NavLink></li>
        //         <li><NavLink to="/contact">Contact</NavLink></li>
        //         <li><NavLink to="/about">About</NavLink></li>
        //     </ul>
        // </div>
        <ProSidebar>
            <Menu iconShape="square">
                <MenuItem >
                    <NavLink to="/">Productos</NavLink>
                </MenuItem>
                <MenuItem >
                    <NavLink to="/contact">Ventas</NavLink>
                </MenuItem>
                <MenuItem >
                    <NavLink to="/about">Proveedores</NavLink>
                </MenuItem>                
            </Menu>
        </ProSidebar>
    )
}

export default Sidebar;