import * as React from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import NumbersIcon from "@mui/icons-material/Numbers";

import {
  getAllProducts,
  createAProduct,
  deleteProduct,
  updateProduct,
} from "../../api/productsAPI";
import { getAllCategories } from "../../api/categoryAPI";

import "./productos.css";

import SweetAlert2 from "../../utils/sweetAlert/sweetAlertUtils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Productos() {
  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = React.useState(false);
  const [isEdited, setIsEdited] = React.useState(false);
  const [idEdited, setIdEdited] = React.useState(-1);
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(false);
  var categories = [];
  const [categoriesList, setCategoriesList] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [product, setProduct] = React.useState({
    name: "",
    image: "",
    items: 0,
    fk_category_id: 1,
    purchase_cost: 0.0,
    sales_cost: 0.0,
  });

  React.useEffect(() => {
    async function fetchData() {
      await assingTableValues();
    }
    fetchData();
  // eslint-disable-next-line
  }, []);

  const sweetAlert2 = new SweetAlert2();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    _resetProductObj();
    setOpen(false)
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#5086c1",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#b2dafa",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#dcffff",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleChange = (prop) => (event) => {
    setProduct({ ...product, [prop]: event.target.value });
  };

  function assingCategory(fk_category_id) {
    let res = categories.find((category) => category.id === fk_category_id);
    return res.name;
  }

  async function getProductList() {
    let res = await getAllProducts();
    if (res) {
      res.forEach((row) => {
        row.category = assingCategory(row.fk_category_id);
      });
      setProducts(res);
    }
  }

  async function assingTableValues() {
    let categoriesRes = await getAllCategories();
    if (categoriesRes) {
      categories = categoriesRes;
      setCategoriesList(categories);
    }
    getProductList();
  }

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleImageChange = async (event) => {
    let file = event.target.files[0];
    let base64String = await toBase64(file);
    setImage(base64String);
    let obj = product;
    obj.image = base64String;
    setProduct(obj);
    setPreview(true);
  };

  function validForm() {
    let validName = product.name.length > 0;
    let validImage = product.image.length > 0;
    let validCategory = product.fk_category_id > 0;
    let validCost = product.purchase_cost > 0;
    let validPrice = product.sales_cost > 0;
    return validName && validImage && validCategory && validCost && validPrice;
  }

  function _resetProductObj() {
    setProduct({
      name: "",
      image: "",
      items: 0,
      fk_category_id: 1,
      purchase_cost: 0.0,
      sales_cost: 0.0,
    });
    setIdEdited(false);
    setIdEdited(-1);
    setImage();
    setPreview(false);
    setImage(null);
  }

  async function saveNewProduct() {
    let res = await createAProduct(product);
    if (res) {
      setOpen(false);
      _resetProductObj();
      sweetAlert2
        .successModal(
          "Guardado",
          "Se ha almacenado de maneta correcta el producto"
        )
        .then((res) => {
          getProductList();
          isEdited(false);
        });
    }
  }

  async function deleteProductConfirm(id) {
    let deleted = await deleteProduct(id);
    if (deleted) {
      sweetAlert2
        .successModal("Eliminado", "El producto ha sido eliminado")
        .then((res) => getProductList());
    } else {
      sweetAlert2.errorModal(
        "Ocurrio un error al intentar eliminar el producto seleccionado"
      );
    }
  }

  function askDeleteProduct(id) {
    sweetAlert2
      .askModal(
        "Si eliminas el producto en los tickets de venta podrían haber inconsistencias",
        "Borrar"
      )
      .then((result) => {
        if (result.isConfirmed) {
          return deleteProductConfirm(id);
        }
      });
  }

  function editProduct(item) {
    let copyItem = item;
    setIdEdited(copyItem.id);
    delete copyItem.category;
    setProduct(copyItem);
    setImage(copyItem.image);
    setPreview(true);
    setIsEdited(true);
    setOpen(true);
  }

  async function saveEdition() {
    let obj = product;
    obj.id = idEdited;
    let res = await updateProduct(obj);
    if (res) {
      setOpen(false);
      _resetProductObj();
      sweetAlert2
        .successModal(
          "Editado",
          "Se almacenaron correctamente los cambios del producto"
        )
        .then((res) => getProductList());
    }
  }

  return (
    <div style={{ marginRight: "1.5rem" }}>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Grid container spacing={2}>
          <h1 className="subTitle">Productos</h1>
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            style={{ marginRight: "calc(30px)" }}
            onClick={handleOpen}
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Box>

      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader sx={{ minWidth: 100 }} aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre del producto</StyledTableCell>
                <StyledTableCell align="left">Categoría</StyledTableCell>
                <StyledTableCell align="left">Costo ($)</StyledTableCell>
                <StyledTableCell align="left">Precio ($)</StyledTableCell>
                <StyledTableCell align="left">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.category}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.purchase_cost}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.sales_cost}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <EditIcon onClick={() => editProduct(row)}/>
                    <DeleteIcon onClick={() => askDeleteProduct(row.id)} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={products.length}
          rowsPerPage={10}
          page={1}
          onPageChange={() => {}}
          //onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={breakpoint ? { ...style, width: "calc(75%)" } : style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Agregar un producto
          </Typography>
          <hr />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box
              component="form"
              sx={
                breakpoint
                  ? {
                      paddingLeft: "31px",
                      "& .MuiTextField-root": { m: 1, width: "25ch" },
                    }
                  : { "& .MuiTextField-root": { m: 1, width: "25ch" } }
              }
              autoComplete="off"
            >
              <div>
                <TextField
                  id="name"
                  label="Nombre"
                  value={product.name}
                  onChange={handleChange("name")}
                />

                <Select
                  id="demo-simple-select-autowidth"
                  value={product.fk_category_id}
                  onChange={handleChange("fk_category_id")}
                  sx={{ m: 1, minWidth: 225 }}
                  label="Categoria"
                >
                  {categoriesList.map((category, indx) => (
                    <MenuItem key={indx} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div>
                <TextField
                  id="price"
                  type="number"
                  label="Precio de venta"
                  value={product.sales_cost}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  onChange={handleChange("sales_cost")}
                />
                <TextField
                  id="cost"
                  type="number"
                  label="Precio de proveedor"
                  value={product.purchase_cost}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  onChange={handleChange("purchase_cost")}
                />
              </div>
              <div>
                {/*  select date
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    label="Fecha de expiración"
                    inputFormat="MM/dd/yyyy"
                    value={product.expired}
                    disablePast={true}
                    onChange={(value) => handleForm("expired", value)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider> */}
                <TextField
                  id="items"
                  type={"number"}
                  value={product.items}
                  label="En el inventario"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <NumbersIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  onChange={handleChange("items")}
                />
                <input
                  id="upload"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageChange}
                  hidden
                />
                <label className="labelUpload" for="upload">
                  Tomar Foto
                </label>
              </div>
              {preview && (
                <div className="preview-image-div">
                  <ImageList
                    sx={{
                      width: "100%",
                      // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                      transform: "translateZ(0)",
                    }}
                    rowHeight={200}
                    gap={1}
                  >
                    <ImageListItem key={1} cols={2} rows={1}>
                      <img
                        src={image}
                        alt="Preview"
                        className="preview-image"
                      />
                      <ImageListItemBar
                        sx={{
                          background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                            "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                        }}
                        title={"Vista previa"}
                        position="top"
                        actionIcon={
                          <IconButton
                            sx={{ color: "white" }}
                            aria-label={`star Vista previa`}
                          >
                            <InsertPhotoIcon />
                          </IconButton>
                        }
                        actionPosition="left"
                      />
                    </ImageListItem>
                  </ImageList>
                </div>
              )}
            </Box>
            <hr />
            <Grid container direction="row-reverse" spacing={2}>
              <Grid item>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => isEdited ? saveEdition() : saveNewProduct()}
                  disabled={!validForm()}
                >
                  Guardar
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="error" onClick={handleClose}>
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Productos;
