import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { PizzaForm } from "./pizzaForm";

export function PizzasForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const { customerName, idOrder } = location.state || {};
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

      setPizzaArr(customer.orders[findOrderIndex].pizzas);
    }
  }, []);

  const addPizza = (pizza) => {
    if (indexPizza !== null) {
      const copy = [...pizzaArr];
      copy[indexPizza] = pizza;
      setPizzaArr(copy);
    } else {
      setPizzaArr([...pizzaArr, pizza]);
    }
    setSelectedPizza(null);
    setIndexPizza(null);
  };
  ///הקודםםם
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

      customer.orders[findOrderIndex].pizzas = pizzaArr;

      localStorage.setItem("customer-orders", JSON.stringify(storedOrders));
    }
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
