import React from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EnhancedTableHead from "../EnhancedTableHead";
import EnhancedTableToolbar from "../EnhancedTableToolbar";
import orderBy from "lodash/orderBy";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style"; 

const  EnhancedTable = (props) => {
  const { classes, columnData, data, rows, menuFunc } = props;

  const [order, setOrder] = React.useState("asc");
  const [orderedBy, setOrderedBy] = React.useState(columnData[3].id);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [items, setItems] = React.useState(data);
  const [searchContent, setSearchContent] = React.useState(false);
  const [optionsOpen, setOptionsOpen] = React.useState(false);
  const [moreAnchor, setMoreAnchor] = React.useState(null);
  
  // ensuring items will always match the ordered data (even when a new assignment is added)
  // does not apply if the search bar is in use
  if (!searchContent && JSON.stringify(items) !== JSON.stringify(orderBy(data, orderedBy, order))) {
    setItems(orderBy(data, orderedBy, order));
  }

  const handleSort = columnName => {
    if (orderedBy === columnName) {
      const isAsc = order === "asc" ? true : false;
      setOrder(isAsc ? "desc" : "asc");
    }

    setOrderedBy(columnName);
    setItems(orderBy(data, orderedBy, order));
  };

  const handleChangePage = (e, p) => {
    setPage(p);
  };

  const handleChangeRowsPerPage = e => {
    setRowsPerPage(e.target.value);
  };

  const handleSearch = e => {
    const value = e.target.value.toLowerCase();
    const filteredData = data.filter(d =>
      d.name.toLowerCase().includes(value)
    );
    
    if (e.target.value === "") {
      setSearchContent(false);
    } else {
      setSearchContent(true);
    }

    setItems(orderBy(filteredData, orderedBy, order)); 
  };

  const onMoreClick = e => {
    setMoreAnchor(e.currentTarget);
    setOptionsOpen(!optionsOpen);
  };

  // format due date to MM/dd/yyyy
  const formatDate = date => {
    const dueDate =  new Date(date);
    const year = dueDate.getFullYear();

    let month = (1 + dueDate.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    let day = dueDate.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar onSearch={handleSearch} />
        <TableContainer>
          <Table
            className={classes.table}
            size="medium"
            aria-label="Enhanced Table"
          >
            <EnhancedTableHead
              columnData={columnData}
              order={order}
              orderBy={orderedBy}
              onRequestSort={handleSort}
            />
            <TableBody>
              {items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(r => {
                  return (
                    <TableRow
                      key={r._id}
                      hover
                    >
                      <TableCell>{r.class_name}</TableCell>
                      <TableCell>{r.name}</TableCell>
                      <TableCell>{r.description}</TableCell>
                      <TableCell>{formatDate(r.due)}</TableCell>
                      <TableCell>{r.completed ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <IconButton onClick={onMoreClick}>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                      {optionsOpen && menuFunc(
                        optionsOpen,
                        () => setOptionsOpen(!optionsOpen),
                        moreAnchor,
                        r
                      )}
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columnData: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  rows: PropTypes.number.isRequired,
  menuFunc: PropTypes.func.isRequired
};

export default withStyles(styles)(EnhancedTable);
