import React from "react";
import TableFormat from "../../components/Table/TableFormat";
import { Typography, Container, Divider, Grid } from "@material-ui/core";

import FormDialog from "../../components/Modals/FormDialog";

const PageContainer = (props) => {
  const {
    pageTitle,
    suppliers,
    formTarget,
    tableHeaders,
    isLoading,
    isProcessing,
    isFetching,
    isLoadingData,
    buttonLabel,
    dialogTitle,
    onDelete,
  } = props;

  return (
    <React.Fragment>
      <Container>
        <Typography variant="h5" align="center">
          {pageTitle}
        </Typography>
        <Divider style={{ margin: "2rem 0" }} />

        <Grid item xs={12} className="text-center">
          <FormDialog
            formTarget={formTarget}
            buttonLabel={buttonLabel}
            title={dialogTitle}
          />
        </Grid>
        <div style={{ margin: "2rem 0" }} />
        {isLoadingData && (
          <div className="error--message">
            <p>Hubo un problema cargando la informacion...</p>
          </div>
        )}
        <TableFormat
          payload={suppliers}
          tableHeaders={tableHeaders}
          formTarget={formTarget}
          onDelete={onDelete}
          isLoading={isLoading}
          isProcessing={isProcessing}
          isFetching={isFetching}
        />
      </Container>
    </React.Fragment>
  );
};

export default PageContainer;
