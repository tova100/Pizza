import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { PizzaForm } from "./pizzaForm";
import "../App.css";
import {
  AppBar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { OrderForm } from "./orderForm";

// This Component  display the current customer's orders
export function DisplayMyOrder() {
  // Get customer name from the navigation state
  const location = useLocation();
  const { customerName } = location.state || {};
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectdOrder] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState();
  // Load orders from localStorage when the component mounts
  useEffect(() => {
    const storedOrders =
      JSON.parse(localStorage.getItem("customer-orders")) || [];
    // Find the customer with the given name
    const customer = storedOrders.find(
      (customer) => customer.customerName === customerName
    );
    setCurrentCustomer(customer);
    setOrders(customer.orders);
  }, [customerName]);
  // Function that set the status of order  and update localStorage
  const saveOrder = (index) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = true;
    setOrders(updatedOrders);
    const storage = JSON.parse(localStorage.getItem("customer-orders")) || [];
    // Update the storage with the modified order list
    const updatedStorage = storage.map((customer) => {
      if (customer.customerName === currentCustomer.customerName) {
        return { ...customer, orders: updatedOrders };
      }
      return customer;
    });

    localStorage.setItem("customer-orders", JSON.stringify(updatedStorage));
  };



  return (
    <div>
      <AppBar dir="rtl" position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            רשימת הזמנות של - {customerName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Table className="table-container">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row">
              שם לקוח
            </TableCell>
            <TableCell component="th" scope="row">
              כתובת
            </TableCell>
            <TableCell component="th" scope="row">
              תאריך הספקה
            </TableCell>
            <TableCell component="th" scope="row">
              טלפון
            </TableCell>

            <TableCell component="th" scope="row">
              עריכה
            </TableCell>
            <TableCell component="th" scope="row">
              פעולות
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <>
            {orders.length ? (
              orders.map((row, index) => (
                <TableRow key={`customer-${index}`}>
                  <TableCell>{customerName}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>

                  {row.status ? (
                    <TableCell colSpan={2}>ההזמנה נשלחה</TableCell>
                  ) : (
                    <>
                      <TableCell>
                        <Button onClick={() => setSelectdOrder(row)}>
                          עריכת הזמנה
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => saveOrder(index)}>
                          שלח הזמנה
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="4">אין הזמנות להצגה</TableCell>
              </TableRow>
            )}
          </>
        </TableBody>
      </Table>
      {selectedOrder && <OrderForm order={selectedOrder} />}
    </div>
  );
}
