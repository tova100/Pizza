import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export function DetailsCustomer() {
  const [formDetailsCustomer, setformDetailsCustomer] = useState({
    customerName: "",
    address: "",
    phoneNumber: "",
    email: "",
    orders: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformDetailsCustomer({
      ...formDetailsCustomer,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let allCustomers = [];
    allCustomers = JSON.parse(localStorage.getItem("customer-orders")) || [];

    if (allCustomers !== null) {
      const exists = allCustomers.find(
        (customer) => customer.customerName === formDetailsCustomer.customerName
      );

      if (exists === undefined) {
        allCustomers.push(formDetailsCustomer);
        localStorage.setItem("customer-orders", JSON.stringify(allCustomers));

        navigate("/customer-order", {
          state: {
            customerName: formDetailsCustomer.customerName,
          },
        });
      } else {
        alert("this customer exists");
      }
    } else {
      allCustomers.push(formDetailsCustomer);
      localStorage.setItem("customer-orders", JSON.stringify(allCustomers));
    }
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
        טופס לקוח חדש
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="שם לקוח"
          name="customerName"
          value={formDetailsCustomer.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="כתובת"
          name="address"
          value={formDetailsCustomer.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="מספר טלפון"
          name="phoneNumber"
          value={formDetailsCustomer.phoneNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="אימייל"
          name="email"
          type="email"
          value={formDetailsCustomer.email}
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
          שלח
        </Button>
      </form>
    </Box>
  );
}
