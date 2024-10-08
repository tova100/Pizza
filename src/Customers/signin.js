import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";
// Signin component allows users to sign in by providing their name(check that name) and phone number.
export function Signin() {
  const [formDetailsCustomer, setformDetailsCustomer] = useState({
    customerName: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformDetailsCustomer({
      ...formDetailsCustomer,
      [name]: value,
    });
  };
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Get all customer data from local storage
    const allCustomers =
      JSON.parse(localStorage.getItem("customer-orders")) || [];
    const exists = allCustomers.some(
      (customer) => customer.customerName === formDetailsCustomer.customerName
    );
    // Check if the customer already exists
    if (exists) {
      // Navigate to the customer-order page if the customer exists
      navigate("/customer-order", {
        state: {
          customerName: formDetailsCustomer.customerName,
        },
      });
    } else {
      // Show an alert if the customer does not exist
      alert("this customer is not exists");
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
        טופס כניסה למערכת
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
          label="מספר טלפון"
          name="phoneNumber"
          value={formDetailsCustomer.phoneNumber}
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
