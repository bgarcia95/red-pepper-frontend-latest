import React from "react";
import TableFormat from "components/Table/TableFormat";
import { Typography, Container, Divider } from "@material-ui/core";

const PageContainer = (props) => {
  const { pageTitle, isLoadingData } = props;

  return (
    <React.Fragment>
      <Container>
        <Typography variant="h5" align="center">
          {pageTitle}
        </Typography>
        <Divider style={{ margin: "2rem 0" }} />

        {isLoadingData && (
          <div className="error--message">
            <p>Hubo un problema cargando la informacion...</p>
          </div>
        )}
        <TableFormat {...props} />
      </Container>
    </React.Fragment>
  );
};

export default PageContainer;
