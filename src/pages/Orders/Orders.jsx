import React from "react";
import { Container, Grid } from "@material-ui/core";
import { OrderButton } from "components/UI/Buttons/Buttons";

const Orders = () => {
  return (
    <Container>
      <Grid
        container
        alignItems="center"
        direction="column"
        spacing={2}
        style={{ marginTop: "10vh" }}
      >
        <Grid item>
          <OrderButton variant="contained" fullWidth>
            Tomar orden
          </OrderButton>
        </Grid>
        <Grid item>
          <OrderButton variant="contained" fullWidth>
            Cola de Pedidos
          </OrderButton>
        </Grid>
        <Grid item>
          <OrderButton variant="contained" fullWidth>
            Dividir ordenes
          </OrderButton>
        </Grid>
        <Grid item>
          <OrderButton variant="contained" fullWidth>
            Cobrar
          </OrderButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Orders;
