import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

export function OrderForm({ order }) {
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

  const navigat = useNavigate();
  const location = useLocation();

  const { customerName } = location.state || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformOrderDetails({
      ...formOrderDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const customerOrders =
      JSON.parse(localStorage.getItem("customer-orders")) || [];

    const currentCustomer = customerOrders.find(
      (customer) => customer.customerName === customerName
    );
    let idOrder = 1;
    if (order) {
      idOrder = order.idOrder;
      const findIndex = currentCustomer.orders.findIndex(
        (x) => x.idOrder == idOrder
      );
      currentCustomer.orders[findIndex] = formOrderDetails;
    } else {
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

    localStorage.setItem("customer-orders", JSON.stringify(customerOrders));

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
