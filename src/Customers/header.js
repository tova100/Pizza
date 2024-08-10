import React, { useState } from "react";
import { AppBar, Toolbar, Button, Input, Typography, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { customerName } = state || {};
  const [isCustomer, setIsCustomer] = useState(false);
  const handleShowFormAdd = () => {
    navigate("/order-form", { state: { customerName } });
  };
  const handleShowMyOrders = () => {
    navigate("/customer-order", { state: { customerName } });
  };

  return (
    <div dir="rtl">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {customerName ? "ניהול הזמנות" : "כניסה למערכת"}
          </Typography>

          <Box display="flex" flexDirection="row-reverse" flexGrow={1}>
            {customerName ? (
              <>
                <Button color="inherit" onClick={handleShowFormAdd}>
                  להזמנה חדשה
                </Button>
                <Button color="inherit" onClick={handleShowMyOrders}>
                  ההזמנות שלי
                </Button>
              </>
            ) : (
              <>
                {isCustomer && (
                  <>
                    <Button color="inherit" onClick={() => navigate("/login")}>
                      לקוח חדש
                    </Button>

                    <Button color="inherit" onClick={() => navigate("/signin")}>
                      לקוח קיים
                    </Button>
                  </>
                )}
              </>
            )}
            <Button color="inherit" onClick={() => setIsCustomer(true)}>
              לקוח
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/order-management")}
            >
              מנהל
            </Button>
            <Button color="inherit" onClick={() => navigate("/")}>
              דף הבית
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
