import React from "react";
import { Container, Grid, Button } from "@material-ui/core";

const Orders = () => {
  return (
    <Container>
      <Grid container direction="row" spacing={2}>
        <Grid md={4}></Grid>
        <Grid container direction="column" spacing={2} md={4}>
          <Grid item>
            <Button variant="contained" fullWidth>
              Boton 1
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" fullWidth>
              Boton 2
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" fullWidth>
              Boton 3
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" fullWidth>
              Boton 4
            </Button>
          </Grid>
        </Grid>
        <Grid md={4}></Grid>
      </Grid>
    </Container>
  );
};

export default Orders;
