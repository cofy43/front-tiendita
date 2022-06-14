import React from "react";

import './sidebar.css';

import { NavLink } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';

function Sidebar() {
  return (
    <Menu>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          color: 'white',
        }}
      >
        <NavLink to="/">
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: '#9f90ea' }}>
                <LunchDiningIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Productos"/>
          </ListItem>
        </NavLink>

        <NavLink to="/contact">
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: '#9f90ea' }}>
                <AttachMoneyIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Ventas"/>
          </ListItem>
        </NavLink>

        <NavLink to="/about">
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: '#9f90ea' }}>
                <AirportShuttleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Proveedores"/>
          </ListItem>
        </NavLink>        
      </List>
    </Menu>
  );
}

export default Sidebar;
