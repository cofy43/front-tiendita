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
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import { getAllProductsI } from "../../api/productsAPI";
import { getAllSales, createASale } from "../../api/saleAPI";

import './ventas.css';

import SweetAlert2 from "../../utils/sweetAlert/sweetAlertUtils";
import moment from 'moment';

const style = {bgcolor: '#53ca98 ', height: '85vh', marginTop: '4rem', width: '100%', overflowY: 'scroll', borderRadius: '10px'}

function Ventas() {
  const sweetAlert2 = new SweetAlert2();
  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = React.useState(false);
  const [refreshTable, setRefreshTable] = React.useState(false);
  // eslint-disable-next-line
  const [salesList, setSalesList] = React.useState([]);
  const [toSaleList, setToSaleList] = React.useState([]);
  const [productList, setProductList] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  const handleClose = () => {
    setProductList([]);
    setToSaleList([]);
    setTotal(0);
    setOpen(false);
  };
  //const [cambio, setCambio] = React.useState(12);
  const TAX_RATE = 0.07;

  React.useEffect(() => {
    async function fetchData() {
      let res = await getAllSales();
      if (res) {
        setSalesList(res);
      } else {
        sweetAlert2.errorModal(
          "Ocurrio un error al traer el listado de ventas"
        );
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, [refreshTable]);

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
      padding: "0px",
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

  async function getProducts() {
    let res = await getAllProductsI();
    if (res) {
      setProductList(res);
      setOpen(true);
    } else {
      sweetAlert2.errorModal(
        "Ocurrio un error al intentar traer todos los productos"
      );
    }
  }

  function getTemplate(obj) {
    return {
      id: obj.id,
      name: obj.name,
      items: 1,
      price: obj.sales_cost,
    };
  }

  function addProducto2Sale(item) {
    let previusAdded = toSaleList.find((elemet) => elemet.id === item.id);
    if (previusAdded) {
      sweetAlert2.errorModal(
        "Ya se agregó previamente el articulo: " + item.name
      );
    } else {
      let newItem = getTemplate(item);
      let tempTotal = total;
      tempTotal += parseFloat(newItem.price);
      setTotal(tempTotal);
      setToSaleList((allItems) => [...allItems, newItem]);
    }
  }

  function removeProduct2Sale(id) {
    let newItemList = toSaleList.filter((elemet) => elemet.id !== id);
    assingTotal(newItemList);
    setToSaleList(newItemList);
  }

  const handleClick = (item) => (e) => {
    if (e.detail === 2) {
      console.log("double click");
      addProducto2Sale(item);
    }
  };

  function incrementProduct(id) {
    let tempList = toSaleList;
    tempList = tempList.map((element) => {
      if (element.id === id) {
        element.items += 1;
      }
      return element;
    });
    setToSaleList(tempList);
    assingTotal(tempList);
  }

  function decrementProduct(id) {
    let tempList = toSaleList;
    let removeItem = false;
    tempList = tempList.map((element) => {
      if (element.id === id) {
        if (element.items - 1 > 0) {
          element.items -= 1;
        } else {
          removeItem = true;
        }
      }
      return element;
    });
    if (removeItem) {
      tempList = tempList.filter((element) => element.id !== id);
    }
    assingTotal(tempList);
    setToSaleList(tempList);
  }

  function assingTotal(list = []) {
    let count = 0;
    list.forEach((elemet) => (count += elemet.price * elemet.items));
    setTotal(count);
  }

  async function saveSale() {
    let newSale = {
      date: moment().locale("es").format(),
      total: total,
      products: JSON.stringify(toSaleList),
    };
    let res = await createASale(newSale);
    if (res) {
      sweetAlert2.successModal(
        "Guardado",
        "La venta ha sido registrada con exito"
      );
      setToSaleList([]);
      setTotal(0);
      setProductList([]);
      setOpen(false);
      setRefreshTable(true);    
    } else {
      sweetAlert2.errorModal(
        "Ha ocurrido un error al momento de intentar guardar el registro de la venta"
      );
    }
  }

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
            onClick={() => getProducts()}
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
        style={{ zIndex: "6" }}
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
                    style={breakpoint ? { marginLeft: "7px" } : {}}
                    justify="center"
                  >
                    {productList.map((elemt) => {
                      return (
                        <Grid item>
                          <Card
                            sx={
                              breakpoint
                                ? { height: "90%", maxWidth: 145, margin: 1.5 }
                                : { height: "90%", maxWidth: 145, margin: 2 }
                            }
                            onClick={handleClick(elemt)}
                          >
                            <CardMedia
                              component="img"
                              height="130"
                              image={elemt.image}
                              alt="green iguana"
                            />
                            <CardContent
                              style={{
                                paddingTop: "0px",
                                paddingBottom: "10px",
                              }}
                            >
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                                align="center"
                              >
                                {elemt.name}
                              </Typography>
                              <hr />
                              <Typography
                                variant="body2"
                                color="black"
                                textAlign={"center"}
                              >
                                $ {elemt.sales_cost}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="container" id="right-container">
                  <p id="title">Venta</p>
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
                          {toSaleList.map((row) => (
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
                                    onClick={() => removeProduct2Sale(row.id)}
                                  />
                                  {row.name}
                                </div>
                              </TableCell>
                              <TableCell align="left">
                                <div className="cell-content">
                                  <RemoveCircleOutlineIcon
                                    color="error"
                                    className="icon"
                                    onClick={() => decrementProduct(row.id)}
                                  />
                                  <span style={{ margin: "0 7px 0 7px" }}>
                                    {row.items}
                                  </span>
                                  <AddCircleOutlineIcon
                                    color="success"
                                    className="icon"
                                    onClick={() => incrementProduct(row.id)}
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
                    <b>Total:</b>{" "}
                    <span className="leftInfo">
                      <b>$ {total}</b>
                    </span>
                  </div>
                </div>
                <Stack
                  direction="row"
                  spacing={breakpoint ? 8 : 6}
                  className="sections-options"
                >
                  <Button
                    variant="contained"
                    color="error"
                    size="large"
                    startIcon={<CancelIcon />}
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    disabled={!total}
                    className="leftInfo"
                    variant="contained"
                    color="success"
                    size="large"
                    startIcon={<SaveIcon />}
                    onClick={() => saveSale()}
                  >
                    GUARDAR
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Modal>
    </div>
  );
}

export default Ventas;
