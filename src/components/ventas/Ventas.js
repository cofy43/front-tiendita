import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import AddIcon from "@mui/icons-material/Add";

/** Components */
import TableSales from "./components/TableSales";
import ModalSale from "./components/ModalSale";

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
      maxItems: obj.items - 1,
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
      if (element.id === id && element.maxItems - 1 >= 0) {
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

      <TableSales salesList={salesList} editSale={(id) => editSale(id)} />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ zIndex: "6" }}
      >
        <ModalSale
          breakpoint={breakpoint}
          productList={productList}
          handleClick={(element) => handleClick(element)}
          toSaleList={toSaleList}
          removeProduct2Sale={(id) => removeProduct2Sale(id)}
          decrementProduct={(id) => decrementProduct(id)}
          incrementProduct={(id) => incrementProduct(id)}
          total={total}
          handleClose={handleClose}
          saveSale={() => saveSale()}
        />
      </Modal>
    </div>
  );
}

export default Ventas;
