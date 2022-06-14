import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Sidebar from "../components/sidebar/sidebar";
import Home from "../components/productos/Productos";
import Contact from "../components/contact/Contact";
import About from "../components/about/About";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import "./main.css";

function Main() {
  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="app">
      <HashRouter>
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content" style={ breakpoint ? {paddingLeft: '3rem'}: {paddingLeft: '5rem'}}>
          <nav>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={2}
                direction={breakpoint ? "column" : "row"}
                justify="center"
              >
                <Grid item xs={6} md={9}>
                  <span style={breakpoint ? {paddingLeft: 'calc(10%)'} : {paddingLeft: 'calc(50%)'}} className="title">Tiendita</span>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <SearchIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                    <TextField
                      id="input-with-sx"
                      label="Búsqueda rápida"
                      variant="standard"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </nav>
          <div style={breakpoint ? {marginTop: '5rem'}: {marginTop: '1rem'}}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </HashRouter>
    </div>
  );
}

export default Main;
