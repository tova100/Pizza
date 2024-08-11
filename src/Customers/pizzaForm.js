import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@mui/material";

// This component  handle the form of pizza and edit 
export function PizzaForm({ pizza, onSave, cancel }) {
  const [data, setData] = useState(pizza);
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(data);
  };
// the topping of pizza update the data
  const handleToppingChange = (e) => {
    setData({
      ...data,
      toppings: { ...data.toppings, [e.target.name]: e.target.checked },
    });
  };

  return (
    <div style={{ padding: "6%" }}>
      <form
        className="table-container"
        dir="rtl"
        onSubmit={handleSubmit}
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          maxWidth: "500px",
          margin: "auto",
        }}
      >
        <div>
          <h1> : פיצה </h1>
          <Box mb={2}>
            <TextField
              select
              label="גודל פיצה"
              value={data.size}
              onChange={({ target }) =>
                setData({ ...data, size: target.value })
              }
              fullWidth
            >
              <MenuItem dir="rtl" value="">
                בחר גודל
              </MenuItem>
              <MenuItem value="s">S</MenuItem>
              <MenuItem value="m">M</MenuItem>
              <MenuItem value="l">L</MenuItem>
              <MenuItem value="xl">XL</MenuItem>
            </TextField>
          </Box>
        </div>
        <div>
          <Box mb={2}>
            <h2>תוספות:</h2>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.toppings.mushrooms}
                  onChange={handleToppingChange}
                  name="mushrooms"
                />
              }
              label="פטריות"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.toppings.tomatoes}
                  onChange={handleToppingChange}
                  name="tomatoes"
                />
              }
              label="עגבניות"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.toppings.blackOlives}
                  onChange={handleToppingChange}
                  name="blackOlives"
                />
              }
              label="זיתים שחורים"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.toppings.greenOlives}
                  onChange={handleToppingChange}
                  name="greenOlives"
                />
              }
              label="זיתים ירוקים"
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="number"
              label="כמות"
              value={data.quantity}
              onChange={({ target }) =>
                setData({ ...data, quantity: target.value })
              }
              inputProps={{ min: "1" }}
              fullWidth
            />
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row-reverse",
            }}
            mb={2}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginRight: "10px" }}
            >
              שמירת הזמנה
            </Button>
            <Button
              type="button"
              onClick={cancel}
              variant="outlined"
              color="secondary"
            >
              ביטול הזמנה
            </Button>
          </Box>
        </div>
      </form>
    </div>
  );
}
