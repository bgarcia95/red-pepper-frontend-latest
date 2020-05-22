import React from "react";
import TableFormat from "components/Table/TableFormat";
import { Typography, Container, Divider } from "@material-ui/core";

const PageContainer = (props) => {
  const { pageTitle, isLoadingData } = props;

  return (
    <React.Fragment>
      <Container>
        <TableFormat {...props} />
      </Container>
    </React.Fragment>
  );
};

export default PageContainer;
