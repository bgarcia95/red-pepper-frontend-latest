import React from "react";
import TableFormat from "components/Table/TableFormat";
import { Typography, Container, Divider, Grid } from "@material-ui/core";

import FormDialog from "components/Modals/FormDialog";

const PageContainer = (props) => {
  const {
    pageTitle,
    formTarget,
    isLoadingData,
    buttonLabel,
    dialogTitle,
  } = props;

  return (
    <React.Fragment>
      <Container>
        <Divider style={{ margin: "1rem 0 2rem 0" }} />
        <Typography variant="h5" align="center">
          {pageTitle}
        </Typography>
        <Divider style={{ margin: "2rem 0" }} />
        <Grid item xs={12} className="text-center">
          <FormDialog
            formTarget={formTarget}
            buttonLabel={buttonLabel}
            title={dialogTitle}
            categories={props.formTarget === "dish" && props.categories}
            dishes={props.formTarget === "combo" && props.dishes}
          />
        </Grid>
        <Grid item xs={12} style={{ margin: "2rem 0 1rem 0" }}>
          {isLoadingData && (
            <div className="error--message">
              <p>Hubo un problema cargando la informacion...</p>
            </div>
          )}
        </Grid>
        <TableFormat {...props} />
      </Container>
    </React.Fragment>
  );
};

export default PageContainer;
