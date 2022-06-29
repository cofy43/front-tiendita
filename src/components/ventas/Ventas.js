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
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tooltip from '@mui/material/Tooltip';

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

/** Components */
import TableSales from "./components/modal";

import { getAllProductsI } from "../../api/productsAPI";
import {
  getAllSales,
  createASale,
  findOne,
  updateSale,
} from "../../api/saleAPI";

import "./ventas.css";

import SweetAlert2 from "../../utils/sweetAlert/sweetAlertUtils";
const moment = require("moment-timezone");

const style = {
  bgcolor: "#53ca98 ",
  height: "85vh",
  marginTop: "4rem",
  width: "100%",
  overflowY: "scroll",
  borderRadius: "10px",
};

function Ventas() {
  const sweetAlert2 = new SweetAlert2();
  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [editedSaleId, setEditedSaleId] = React.useState(-1);
  const [salesList, setSalesList] = React.useState([]);
  const [toSaleList, setToSaleList] = React.useState([]);
  const [productList, setProductList] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  const handleClose = () => {
    resetModalData();
  };
  //const [cambio, setCambio] = React.useState(12);

  React.useEffect(() => {
    async function fetchData() {
      let res = await getAllSales();
      if (res) {
        res = res.map((sale) => {
          sale.date = formatDate(sale.date);
          return sale;
        });
        setSalesList(res);
      } else {
        sweetAlert2.errorModal(
          "Ocurrio un error al traer el listado de ventas"
        );
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, [editedSaleId]);

  const StyledTableTitle = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#D8D2CB",
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  async function editSale(id) {
    let res = await findOne(id);
    if (res) {
      setEditedSaleId(res.id);
      setToSaleList(JSON.parse(res.products));
      setTotal(res.total);
      setEdit(true);
      getProducts();
    } else {
      sweetAlert2.errorModal(
        "Ocurrio al traer la información de la venta:" + id
      );
    }
  }

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
      maxItems: obj.items-1
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
      if (element.id === id && element.maxItems-1 >= 0) {
        element.items += 1;
        element.maxItems -= 1;
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
          element.maxItems += 1;
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

  async function saveEditedSale(editedSale) {
    console.log(editedSale);
    editedSale.id = editedSaleId;
    let res = await updateSale(editedSale);
    if (res === 200) {
      resetModalData();
      sweetAlert2.successModal(
        "Actualizado",
        "El registro de venta: " +
          editedSale.id +
          " ha sido guardado exitosamente"
      );
    } else {
      sweetAlert2.errorModal(
        "Ha ocurrido un error al intentar actualizar el registro de venta: " +
          editedSale.id
      );
    }
  }

  function resetModalData() {
    setToSaleList([]);
    setTotal(0);
    setProductList([]);
    setOpen(false);
  }

  async function saveSale() {
    let newSale = {
      date: moment().locale("es").format(),
      total: total,
      products: JSON.stringify(toSaleList),
    };
    if (edit) {
      saveEditedSale(newSale);
    } else {
      let res = await createASale(newSale);
      if (res) {
        resetModalData();
        sweetAlert2.successModal(
          "Guardado",
          "La venta ha sido registrada con exito"
        );
      } else {
        sweetAlert2.errorModal(
          "Ha ocurrido un error al momento de intentar guardar el registro de la venta"
        );
      }
    }
  }

  function formatDate(mometString) {
    return moment(mometString).format("DD-MMMM-YYYY hh:mm");
  }

  return (
    <div style={{ marginRight: "1.5rem" }}>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Grid container spacing={2}>
          <h1 className="subTitle">Ventas</h1>
          {!open && (
            <Fab
              size="small"
              aria-label="add"
              style={{ marginRight: "calc(30px)" }}
              color="warning"
              onClick={() => getProducts()}
            >
              <AddIcon />
            </Fab>
          )}
        </Grid>
      </Box>

      <TableSales
        salesList={salesList}
        editSale={(id) => editSale(id)}
      />

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
                            className={`card-item ${breakpoint ? 'card-mobile' : 'card-desktop'}`}                            
                            onClick={handleClick(elemt)}
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
                                variant="body2"
                                color="black"
                                textAlign={"center"}
                              >
                                $ {elemt.sales_cost} Inventario: {elemt.items}
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
