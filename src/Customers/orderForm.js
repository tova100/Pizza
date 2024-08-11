import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
// This component  handle the form for creating or editing an order
export function OrderForm({ order }) {
  // State to manage form details, initializing with either the provided order or default values
  const [formOrderDetails, setformOrderDetails] = useState(
    order
      ? order
      : {
        date: "",
        address: "",
        phoneNumber: "",
        totalSum: "",
        pizzas: [],
        status: false,
      }
  );
  // Get the customerName from the location state
  const navigat = useNavigate();
  const location = useLocation();
  const { customerName } = location.state || {};
  // Function to handle input changes and update the form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformOrderDetails({
      ...formOrderDetails,
      [name]: value,
    });
  };
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const customerOrders =
      JSON.parse(localStorage.getItem("customer-orders")) || [];

    const currentCustomer = customerOrders.find(
      (customer) => customer.customerName === customerName
    );
    let idOrder = 1;
    // If editing an existing order, find its index and update it
    if (order) {
      idOrder = order.idOrder;
      const findIndex = currentCustomer.orders.findIndex(
        (x) => x.idOrder == idOrder
      );
      currentCustomer.orders[findIndex] = formOrderDetails;
    } else {
      // If creating a new order, assign a new idOrder and add it to the customer's orders
      if (currentCustomer.orders.length > 0) {
        idOrder =
          currentCustomer.orders[currentCustomer.orders.length - 1].idOrder + 1;
      }
      const newOrder = {
        ...formOrderDetails,
        idOrder,
      };
      currentCustomer.orders.push(newOrder);
    }
    // Update the customer-orders in localStorage
    localStorage.setItem("customer-orders", JSON.stringify(customerOrders));
    // Navigate to the pizza form with the customerName and idOrder
    navigat("/pizza-form", { state: { customerName: customerName, idOrder } });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 400,
        margin: "auto",
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        טופס הוספת הזמנה
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="תאריך"
          name="date"
          type="date"
          value={formOrderDetails.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="כתובת"
          name="address"
          value={formOrderDetails.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="מספר טלפון"
          name="phoneNumber"
          value={formOrderDetails.phoneNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          הוסף פיצה
        </Button>
      </form>
    </Box>
  );
}
