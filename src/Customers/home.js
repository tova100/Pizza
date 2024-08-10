import { Typography, Box } from "@mui/material";

export function Home() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" // אם אתה רוצה שהטקסט יהיה במרכז התצוגה האנכית
    >
      <Typography variant="h1" component="h1" gutterBottom>
        ברוכים הבאים לבית הפיצה
      </Typography>
    </Box>
  );
}
