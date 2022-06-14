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
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import './productos.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  widht: '500px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Productos() {
  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  function createData(name, category, cost, price, id) {
    return { name: name, category: category, cost: cost, price: price, id: id };
  }

  const rows = [
    createData("Coca cola 600ml", "Refrescos", 10, 16, 1),
    createData("Platos desechables", "Desechables", 10, 12, 2),
    createData("Doritos nacho", "Papas", 9, 14, 3),
    createData("Crema alpura 500ml", "Lacteos", 12, 17, 4),
    createData("Gancito", "Panes", 11, 15, 6),
    createData("Coca cola 600ml", "Refrescos", 10, 16, 7),
    createData("Platos desechables", "Desechables", 10, 12, 8),
    createData("Doritos nacho", "Papas", 9, 14, 9),
    createData("Crema alpura 500ml", "Lacteos", 12, 17, 10),
    createData("Gancito", "Panes", 11, 15, 11),
  ];

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
    setPreview(true);
  };

  return (
    <div style={{ marginRight: "1.5rem" }}>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Grid container spacing={2} direction={"col"}>
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
              {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.category}</StyledTableCell>
                  <StyledTableCell align="left">{row.cost}</StyledTableCell>
                  <StyledTableCell align="left">{row.price}</StyledTableCell>
                  <StyledTableCell align="center">
                    <EditIcon />
                    <DeleteIcon />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          //rowsPerPage={rowsPerPage}
          page={1}
          //onPageChange={handleChangePage}
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
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              autoComplete="off"
            >
              <div>
                <TextField id="outlined-error" label="Nombre" defaultValue="" />
                <TextField
                  id="outlined-adornment-amount"
                  //value={values.amount}
                  //onChange={handleChange("amount")}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Precio de proveedor"
                />
              </div>
              <div>
                <TextField
                  id="outlined-adornment-amount"
                  //value={values.amount}
                  //onChange={handleChange("amount")}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Precio de venta"
                />
                <Grid container>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Categoría
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    //value={age}
                    //onChange={handleChange}
                    autoWidth
                    label="Age"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Refrescos</MenuItem>
                    <MenuItem value={21}>Cremería</MenuItem>
                    <MenuItem value={22}>Miselaneos</MenuItem>
                  </Select>
                </Grid>
              </div>
              <div>
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
                  <img src={image} alt="Preview" className="preview-image" />
                </div>
              )}
            </Box>
            <hr />
            <Grid container direction="row-reverse" spacing={2}>
              <Grid item>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => setOpen(false)}
                >
                  Guardar
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setOpen(false)}
                >
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
