import { Box, Stack } from "@mui/material";

const Home = () => {
   
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
