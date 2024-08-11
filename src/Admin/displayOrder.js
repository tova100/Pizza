import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { Button } from "@mui/material";

function Row({ row, customerName }) {
  const [open, setOpen] = useState(false);
  const navigat = useNavigate();
    // Translation mapping for pizza toppings
  const toppingsTranslation = {
    mushrooms: "פטריות",
    tomatoes: "עגבניות",
    blackOlives: "זיתים שחורים",
    greenOlives: "זיתים ירוקים",
  };
  // Get details of selected toppings, translating them to Hebrew
  const getToppingsDetails = (toppings) => {
    const selectedToppings = Object.keys(toppings)
      .filter((topping) => toppings[topping])
      .map((topping) => toppingsTranslation[topping] || topping) 
      .join(", ");
    return selectedToppings.length > 0 ? selectedToppings : "אין תוספות";
  };
    // Handle removing a row (order) from localStorage and navigate to the order management page
  const handleRemoveRow = (index) => {
    const storedOrders =
      JSON.parse(localStorage.getItem("customer-orders")) || [];

    const currentCustomerIndex = storedOrders.findIndex(
      (customer) => customer.customerName === customerName
    );
    const currentCustomer = storedOrders[currentCustomerIndex];
    const updatedOrders = currentCustomer.orders.filter(
      (i) => i.idOrder !== index
    );
    if (updatedOrders.length === 0) {
      currentCustomer.orders = [];
    } else {
      currentCustomer.orders = updatedOrders;
    }
    localStorage.setItem("customer-orders", JSON.stringify(storedOrders));
    navigat("/order-management");
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{customerName}</TableCell>
        <TableCell align="right">{row.date}</TableCell>
        <TableCell align="right">{row.phoneNumber}</TableCell>
        <TableCell align="right">{row.address}</TableCell>
        <TableCell>
          <Button align="right" onClick={() => handleRemoveRow(row.idOrder)}>
            אשר
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                פרטי הפיצות
              </Typography>
              <Table size="small" aria-label="purchases" className="table-container">
                <TableHead>
                  <TableRow>
                    <TableCell>כמות הפיצות</TableCell>
                    <TableCell>גודל</TableCell>
                    <TableCell align="right">תוספות לבחירה</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.pizzas && row.pizzas.length ? (
                    row.pizzas.map((pizza, index) => (
                      <TableRow key={index}>
                        <TableCell>{pizza.quantity}</TableCell>
                        <TableCell>{pizza.size}</TableCell>
                        <TableCell align="right">
                          {getToppingsDetails(pizza.toppings)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        אין פיצות להזמנה זו
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
// DisplayOrder component displays a table of orders with the ability to expand rows for more details
export default function DisplayOrder() {
  const location = useLocation();
  const { order, customerName } = location.state || {};
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" className="table-container">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="right">שם לקוח</TableCell>
            <TableCell align="right">תאריך הספקה</TableCell>
            <TableCell align="right">פלאפון ליצירת קשר</TableCell>
            <TableCell align="right">כתובת</TableCell>
            <TableCell align="right">פעולות </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Row row={order} customerName={customerName} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
