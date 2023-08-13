import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

  return (
    <Box>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <h1>Welcome to Cafe Manager!</h1>
      </Stack>
    </Box>
  );
};

export default Home;
