import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../common/Header";
import EnhancedTable from "../common/EnhancedTable";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style";

import * as dateformat from "dateformat";

const columnData = [
  { id: "class", label: "Class"},
  { id: "name", label: "Assignment"},
  { id: "description", label: "Description"},
  { id: "due", label: "Due"}
];

class Home extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    const { classes } = this.props;
    const data = [
      {
        id: 1,
        class: "Math 51",
        name: "1-10",
        description: "hello",
        due: dateformat(new Date(), "mm/dd/yyyy h:MM TT")
      },
      {
        id: 2,
        class: "CS 106B",
        name: "python",
        description: "program",
        due: dateformat(new Date(), "mm/dd/yyyy h:MM TT")
      }
    ];

    return (
      <>
        <Header />
        <div className={classes.root}>
          <p className={classes.title}>Welcome!</p>
          <p className={classes.text}>please use this platform to keep track of your assignments at Stanford University :)</p>
          <EnhancedTable columnData={columnData} data={data} />
        </div>
      </>
    )
  }
}

export default withStyles(styles)(Home);
