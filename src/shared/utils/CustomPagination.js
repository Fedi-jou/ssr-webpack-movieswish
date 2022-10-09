import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  pageNumber: {
    "& .MuiPaginationItem-root": {
      color: "#454545",
    },
    "& .MuiPaginationItem-textPrimary.Mui-selected": {
      color: "#fff",
    },
  },
}));

export default function CustomPagination({ setPage, numOfPages = 10 }) {
  const handlePageChange = (page) => {
    setPage(page);
  };
  const classes = useStyles();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <Pagination
        className={classes.pageNumber}
        onChange={(e) => handlePageChange(e.target.textContent)}
        count={numOfPages}
        color="primary"
        hideNextButton
        hidePrevButton
      />
    </div>
  );
}
