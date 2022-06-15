import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import { styled } from "@mui/material/styles";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import './ventas.css';

const style = { bgcolor: '#98d9c4', height: '85vh', marginTop: '4rem', width: '100%'}

function Ventas() {
  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // eslint-disable-next-line
  const [total, setTotal] = React.useState(16.7);
  // eslint-disable-next-line
  //const [cambio, setCambio] = React.useState(12);
  const TAX_RATE = 0.07;

  const listItems = [
    {
      name: "coca cola 600ml",
      price: 16.0,
      image: "https://coca-colafemsa.com/wp-content/uploads/2019/11/2.png",
    },
    {
      name: "coca cola 600ml",
      price: 16.0,
      image: "https://coca-colafemsa.com/wp-content/uploads/2019/11/2.png",
    },
    {
      name: "coca cola 600ml",
      price: 16.0,
      image: "https://coca-colafemsa.com/wp-content/uploads/2019/11/2.png",
    },
    {
      name: "coca cola 600ml",
      price: 16.0,
      image: "https://coca-colafemsa.com/wp-content/uploads/2019/11/2.png",
    },
    {
      name: "coca cola 600ml",
      price: 16.0,
      image: "https://coca-colafemsa.com/wp-content/uploads/2019/11/2.png",
    },
    {
      name: "coca cola 600ml",
      price: 16.0,
      image: "https://coca-colafemsa.com/wp-content/uploads/2019/11/2.png",
    },
    {
      name: "coca cola 600ml",
      price: 16.0,
      image: "https://coca-colafemsa.com/wp-content/uploads/2019/11/2.png",
    },
    {
      name: "coca cola 600ml",
      price: 16.0,
      image: "https://coca-colafemsa.com/wp-content/uploads/2019/11/2.png",
    },
    {
      name: "coca cola 600ml",
      price: 16.0,
      image: "https://coca-colafemsa.com/wp-content/uploads/2019/11/2.png",
    },
    {
      name: "coca cola 600ml",
      price: 16.0,
      image: "https://coca-colafemsa.com/wp-content/uploads/2019/11/2.png",
    },
  ];

  let toSale = [
    {
      id: 1,
      nombre: "gancito",
      precio: 12.5,
      cantidad: 2,
    },
    {
      id: 2,
      nombre: "gancito",
      precio: 12.5,
      cantidad: 2,
    },
    {
      id: 3,
      nombre: "gancito",
      precio: 12.5,
      cantidad: 2,
    },
    {
      id: 4,
      nombre: "gancito",
      precio: 12.5,
      cantidad: 2,
    },
  ];

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function priceRow(qty, unit) {
    return qty * unit;
  }

  function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
  }

  function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  const rows = [
    createRow("Paperclips (Box)", 100, 1.15),
    createRow("Paper (Case)", 10, 45.99),
    createRow("Waste Basket", 2, 17.99),
  ];

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#e28000",
      color: theme.palette.common.white,      
      padding: '0px',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },    
  }));

  const StyledTableTitle = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#D8D2CB",
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#ffc340",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#ffed6b",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div style={{ marginRight: "1.5rem" }}>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Grid container spacing={2}>
          <h1 className="subTitle">Ventas</h1>
          <Fab
            size="small"
            aria-label="add"
            style={{ marginRight: "calc(30px)" }}
            color="warning"
            onClick={handleOpen}
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Box>

      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            stickyHeader
            sx={{ minWidth: 100 }}
            aria-label="spanning table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" colSpan={3}>
                  Details
                </StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>Desc</StyledTableCell>
                <StyledTableCell align="right">Qty.</StyledTableCell>
                <StyledTableCell align="right">Unit</StyledTableCell>
                <StyledTableCell align="right">Sum</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.desc}>
                  <StyledTableCell>{row.desc}</StyledTableCell>
                  <StyledTableCell align="right">{row.qty}</StyledTableCell>
                  <StyledTableCell align="right">{row.unit}</StyledTableCell>
                  <StyledTableCell align="right">
                    {ccyFormat(row.price)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}

              <StyledTableRow>
                <StyledTableCell rowSpan={3} />
                <StyledTableCell colSpan={2}>Subtotal</StyledTableCell>
                <StyledTableCell align="right">
                  {ccyFormat(invoiceSubtotal)}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>Tax</StyledTableCell>
                <StyledTableCell align="right">{`${(TAX_RATE * 100).toFixed(
                  0
                )} %`}</StyledTableCell>
                <StyledTableCell align="right">
                  {ccyFormat(invoiceTaxes)}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell colSpan={2}>Total</StyledTableCell>
                <StyledTableCell align="right">
                  {ccyFormat(invoiceTotal)}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container>
          <Box sx={style}>
            <Grid
              container
              spacing={2}
              columnSpacing={4}
              justify="center"
              minHeight={"80vh"}
              direction={breakpoint ? "column" : "row"}
            >
              <Grid item xs={8}>
                <div className="container" id="left-container">
                  <Grid
                    container
                    direction="row"
                    className="list-products"
                    justify="center"
                  >
                    {listItems.map((elemt) => {
                      return (
                        <Grid item>
                          <Card
                            sx={
                              breakpoint
                                ? { maxWidth: 145, margin: 1.5 }
                                : { maxWidth: 145, margin: 2 }
                            }
                          >
                            <CardMedia
                              component="img"
                              height="140"
                              image={elemt.image}
                              alt="green iguana"
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                              >
                                {elemt.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="#1099BB"
                                textAlign={"center"}
                              >
                                $ {elemt.price}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>
                <Stack direction="row" spacing={2} className="sections-options">
                  <Button variant="contained" className="button-option">
                    Bebidas
                  </Button>
                  <Button variant="contained" className="button-option">
                    Botana
                  </Button>
                  <Button variant="contained" className="button-option">
                    Cremería
                  </Button>
                </Stack>
                <Button variant="contained" color="error" className="leftInfo">
                  Cancelar
                </Button>
              </Grid>
              <Grid item xs={4}>
                <div className="container" id="right-container">
                  <p id="title">Venta</p>
                  <hr />
                  <div id="table-purchases-items">
                    <TableContainer component={Paper}>
                      <Table size="small" aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <StyledTableTitle>Nombre</StyledTableTitle>
                            <StyledTableTitle>Cantidad</StyledTableTitle>
                            <StyledTableTitle>Precio</StyledTableTitle>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {toSale.map((row) => (
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
                                  <DeleteIcon color="error" className="icon" />
                                  {row.nombre}
                                </div>
                              </TableCell>
                              <TableCell align="left">
                                <div className="cell-content">
                                  <RemoveCircleOutlineIcon
                                    color="error"
                                    className="icon"
                                  />
                                  <span style={{ margin: "0 7px 0 7px" }}>
                                    {row.cantidad}
                                  </span>
                                  <AddCircleOutlineIcon
                                    color="success"
                                    className="icon"
                                  />
                                </div>
                              </TableCell>
                              <TableCell align="left">
                                <b>$ {row.precio}</b>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                  <div id="info-purchase">
                    Total: <span className="leftInfo">${total}</span>
                  </div>
                </div>
                <Button
                  variant="contained"
                  color="success"
                  style={{ margin: "0 0 0 1rem", width: "calc(100% - 35px)" }}
                >
                  GUARDAR
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Modal>
    </div>
  );
}

export default Ventas;
