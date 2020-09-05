import React, { Component } from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

class EnhancedTableHead extends Component {
  static propTypes = {
    columnData: PropTypes.array.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    onRequestSort: PropTypes.func.isRequired
  };

  render() {
    const { columnData, order, orderBy, onRequestSort } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(c => (
            <TableCell
              key={c.id}
              align="left"
              sortDirection={orderBy === c.id ? order : false}
              onClick={e => onRequestSort(c.id)}
            >
              <TableSortLabel
                active={orderBy === c.id}
                direction={orderBy === c.id ? order : "asc"}
              >
                {c.label}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell padding="checkbox" />
        </TableRow>
      </TableHead>
    )
  }
}

export default EnhancedTableHead;
