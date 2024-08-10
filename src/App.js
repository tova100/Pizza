import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Customers/header";
import "./App.css";
import { PizzaForm } from "./Customers/pizzaForm";
import { DisplayMyOrder } from "./Customers/displayMyOrders";
import { OrderManagement } from "./Admin/orderManagement";
import { OrderForm } from "./Customers/orderForm";
import { DetailsCustomer } from "./Customers/detailsCustomer";
import { Signin } from "./Customers/signin";
import { PizzasForm } from "./Customers/pizzasForm";
import DisplayOrder from "./Admin/displayOrder";
import { Home } from "./Customers/home";

function App() {
  return (
    <div className="background">
      <img src={"./pizza.jpeg"} alt="Pizza Background" />
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/login" element={<DetailsCustomer />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/pizza-form" element={<PizzasForm />} />
            <Route path="/customer-order" element={<DisplayMyOrder />} />
            <Route path="/customer-order" element={<DisplayMyOrder />} />
            <Route path="/display-order" element={<DisplayOrder />} />
            <Route path="/order-management" element={<OrderManagement />} />
            <Route path="/order-form" element={<OrderForm />} />
            <Route path="/" element={<Home />} />

          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
