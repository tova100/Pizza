import {
  AppBar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../App.css";
// OrderManagement component displays a table of customer orders with navigation to detailed view
export function OrderManagement() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    let storedOrders = [];
    storedOrders = JSON.parse(localStorage.getItem("customer-orders")) || [];
    setCustomers(storedOrders);
  }, []);

  // Navigate to the display-order page with the selected order and customer details
  const handleRowClick = (order, customerName) => {
    navigate("/display-order", { state: { order, customerName } });
  };

  return (
    <div>
      {/* Title */}
      <AppBar dir="rtl" position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            ניהול הזמנות
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Table */}
      <Table className="table-container">
        <TableHead>
          <TableRow>
            <TableCell>שם לקוח</TableCell>
            <TableCell>טלפון</TableCell>
            <TableCell>תאריך הספקה</TableCell>
            <TableCell>כמות פיצות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.length ? (
            customers.map((customer, customerIndex) => (
              <React.Fragment key={customerIndex}>
                <TableRow>
                  <TableCell>{customer.customerName}</TableCell>
                  <TableCell colSpan={3}></TableCell>{" "}
                </TableRow>

                {customer.orders.length ? (
                  customer.orders.map((order, orderIndex) => (
                    <TableRow
                      key={orderIndex}
                      onClick={() =>
                        handleRowClick(order, customer.customerName)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell></TableCell>{" "}
                      <TableCell>{order.phoneNumber}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        {order.pizzas.reduce(
                          (acc, pizza) => acc + Number(pizza.quantity),
                          1
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>אין הזמנות להצגה</TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>אין לקוחות להצגה</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
