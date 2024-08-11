import { Typography, Box } from "@mui/material";

export function Home() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" 
    >
      <Typography variant="h1" component="h1" gutterBottom>
        ברוכים הבאים לבית הפיצה
      </Typography>
    </Box>
  );
}
