import React from "react";
import { Container, Grid, Button } from "@material-ui/core";

const Orders = () => {
  return (
    <Container>
      <Grid container alignContent="center" spacing={2}>
        <Grid item md={6}>
          <Button>Boton 1</Button>
        </Grid>
        <Grid item md={6}>
          <Button>Boton 2</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Orders;
