import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CloseIcon from '@mui/icons-material/Close';

export default function ModalSale(props) {
  const StyledTableTitle = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#F0F0F8",
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <Container>
      <Box className="box-container">
      <div className="close-modal"><CloseIcon/></div>
        <Grid
          container
          spacing={2}
          columnSpacing={4}
          justify="center"
          minHeight={"80vh"}
          direction={props.breakpoint ? "column" : "row"}          
        >
          <Grid item className="modal-body" xs={8}>
            <div className="container" id="left-container">
              <Grid
                container
                direction="row"
                className="list-products"
                style={props.breakpoint ? { marginLeft: "7px" } : {}}
                justify="center"
              >
                {props.productList.map((elemt) => {
                  return (
                    <Grid item>
                      <Card
                        className={`card-item ${
                          props.breakpoint ? "card-mobile" : "card-desktop"
                        }`}
                        onClick={props.handleClick(elemt)}
                      >
                        <CardMedia
                          component="img"
                          height="130"
                          image={elemt.image}
                          alt=""
                        />
                        <CardContent className="card-content">
                          <Tooltip title={elemt.name} placement="top-start">
                            <Typography
                              noWrap
                              gutterBottom
                              variant="h6"
                              component="div"
                              align="center"
                            >
                              {elemt.name}
                            </Typography>
                          </Tooltip>
                          <hr />
                          <Typography
                            variant="inherit"
                            color="black"
                            textAlign={"center"}                            
                          >
                            $ {elemt.sales_cost} <br/>Inventario: {elemt.items}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </Grid>
          <Grid item className="modal-body" xs={4}>
            <div className="container" id="right-container">
              <div id="title-div">
                <LocalMallIcon color="primary"/> <span id="title"> Venta</span>                
              </div>              
              <hr />
              <div id="table-purchases-items">
                <TableContainer component={Paper}>
                  <Table
                    size="small"
                    stickyHeader={true}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableTitle>Nombre</StyledTableTitle>
                        <StyledTableTitle>Cantidad</StyledTableTitle>
                        <StyledTableTitle>Precio</StyledTableTitle>
                      </TableRow>
                    </TableHead>
                    <TableBody
                      style={{ overflowY: "scroll", maxHeight: "1rem" }}
                    >
                      {props.toSaleList.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell align="left">
                            <div className="cell-content">
                              <DeleteIcon
                                color="error"
                                className="icon"
                                onClick={() => props.removeProduct2Sale(row.id)}
                              />
                              {row.name}
                            </div>
                          </TableCell>
                          <TableCell align="left">
                            <div className="cell-content">
                              <RemoveCircleOutlineIcon
                                color="error"
                                className="icon"
                                onClick={() => props.decrementProduct(row.id)}
                              />
                              <span style={{ margin: "0 7px 0 7px" }}>
                                {row.items}
                              </span>
                              <AddCircleOutlineIcon
                                color="success"
                                className="icon"
                                onClick={() => props.incrementProduct(row.id)}
                              />
                            </div>
                          </TableCell>
                          <TableCell align="left">
                            <b>$ {row.price}</b>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <hr />
              <div id="info-purchase">
                <span>Total:</span>
                <span className="rigthInfo">
                  $ {props.total}
                </span>
              </div>
            </div>
            <Stack
              direction="row"
              spacing={props.breakpoint ? 8 : 6}
              className="sections-options"
            >
              <Button
                variant="contained"
                color="error"
                size="large"
                startIcon={<CancelIcon />}
                onClick={props.handleClose}
              >
                Cancelar
              </Button>
              <Button
                disabled={!props.total}
                className="leftInfo"
                variant="contained"
                color="success"
                size="large"
                startIcon={<SaveIcon />}
                onClick={() => props.saveSale()}
              >
                GUARDAR
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}