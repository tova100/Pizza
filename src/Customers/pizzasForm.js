import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { PizzaForm } from "./pizzaForm";

export function PizzasForm() {
  const state = useLocation();
  const navigate = useNavigate();
  // Destructure customerName and idOrder from state
  const { customerName, idOrder } = state || {};
  // State for selected pizza, index of pizza, and array of pizzas
  const [selctedPizza, setSelectedPizza] = useState(null);
  const [indexPizza, setIndexPizza] = useState(null);
  const [pizzaArr, setPizzaArr] = useState([]);

  useEffect(() => {
    const storedOrders =
      JSON.parse(localStorage.getItem("customer-orders")) || [];
    if (customerName) {
      const customer = storedOrders.find(
        (customer) => customer.customerName === customerName
      );
      const findOrderIndex = customer.orders.findIndex(
        (order) => order.idOrder === idOrder
      );
      // Update state with pizzas from order
      setPizzaArr(customer.orders[findOrderIndex].pizzas);
    }
  }, []);


  // Add or update pizza in the array
  const addPizza = (pizza) => {
    // Update existing pizza
    if (indexPizza !== null) {
      const copy = [...pizzaArr];
      copy[indexPizza] = pizza;
      setPizzaArr(copy);
    } else {
      // Add new pizza
      setPizzaArr([...pizzaArr, pizza]);
    }
    setSelectedPizza(null);
    setIndexPizza(null);
  };
  // Save pizza data and navigate back to customer order page
  const saveData = () => {
    const storedOrders =
      JSON.parse(localStorage.getItem("customer-orders")) || [];
    if (customerName) {
      const customer = storedOrders.find(
        (customer) => customer.customerName === customerName
      );
      const findOrderIndex = customer.orders.findIndex(
        (order) => order.idOrder === idOrder
      );
      // Update pizzas in order
      customer.orders[findOrderIndex].pizzas = pizzaArr;
      // Save updated orders to local storage
      localStorage.setItem("customer-orders", JSON.stringify(storedOrders));
    }
    // Navigate back with state
    navigate("/customer-order", { state: { customerName } });
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
      {pizzaArr.map((x, i) => (
        <div>
          {x.size}
          <Button
            onClick={() => {
              setIndexPizza(i);
              setSelectedPizza(x);
            }}
          >
            עריכה
          </Button>
        </div>
      ))}
      {selctedPizza ? (
        <PizzaForm
          cancel={() => setSelectedPizza(null)}
          onSave={addPizza}
          pizza={selctedPizza}
        />
      ) : (
        <>
          <p>האם ברצונך להוסיף פיצה נוספת להזמנה?</p>
          <Button onClick={() => setSelectedPizza({ toppings: {} })}>כן</Button>
          <Button onClick={saveData}> לא, שמרו הזמנה </Button>
        </>
      )}
    </Box>
  );
}
