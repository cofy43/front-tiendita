import * as React from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from '@mui/material/TablePagination';

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Productos() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#5086c1',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },    
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: '#b2dafa',
    },
    "&:nth-of-type(even)": {
        backgroundColor: '#dcffff',
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

  return (
    <div style={{ marginRight: "1.5rem" }}>
      <h1 className="subTitle">Productos</h1>
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
    </div>
  );
}

export default Productos;
