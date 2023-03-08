import MaterialReactTable from "material-react-table";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState, useMemo } from "react";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(8),
  },
}));
// Wrapper For MaterialTableWrapper so that settings on each page remain sames.
export const MaterialTableWrapper = (props) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const handlePaginationChange = (updater) => {
    //Updater is a type from @tanstack/react-table
    //TanStack Table requires this strange syntax since updater can be a function to update the state or the new state itself
    setPagination((prevPagination) => (updater instanceof Function ? updater(prevPagination) : updater));
    props.handleUpdate();
    //put more code for your side effects here, guaranteed to only run once, even in React Strict Mode
  };
  const classes = useStyles();
  // This Will Only return table once the data is loaded.
  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="lg">
          <div className={classes.formWrapper}>
            <MaterialReactTable columns={props.columns} autoResetPageIndex={false} data={props.data ? props.data : []} state={{ pagination, isLoading: props.data.length ? false : true }} onPaginationChange={handlePaginationChange} enableColumnActions={false} enableColumnFilters={false} enablePagination={true} enableSorting={false} enableBottomToolbar={true} enableTopToolbar={true} muiTableBodyRowProps={{ hover: false }} />
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};
