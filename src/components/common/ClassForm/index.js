import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as classAction from "../../../actions/classActions";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style";

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...classAction }, dispatch)
});

class ClassForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        
      </Paper>
    )
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(ClassForm));
