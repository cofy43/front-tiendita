import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";

export default function TableSales(props) {
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
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader sx={{ minWidth: 100 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Venta</StyledTableCell>
              <StyledTableCell align="center">Fecha</StyledTableCell>
              <StyledTableCell align="center">Monto</StyledTableCell>
              <StyledTableCell align="center">Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.salesList.map((row, indx) => (
              <StyledTableRow key={indx}>
                <StyledTableCell align="center">
                  {"Id de venta:" + row.id}
                </StyledTableCell>
                <StyledTableCell align="center">{row.date}</StyledTableCell>
                <StyledTableCell align="center">$ {row.total}</StyledTableCell>
                <StyledTableCell align="center">
                  <InfoIcon className="icon" />
                  <EditIcon
                    className="icon"
                    onClick={() => props.editSale(row.id)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}

            {/* <StyledTableRow>
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
              </StyledTableRow> */}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
