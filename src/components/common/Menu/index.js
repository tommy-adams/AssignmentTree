import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core";
import styles from "./style";

class Menu extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    closeHandler: PropTypes.func.isRequired
  };

  mouseExit = (e, path) => {
    if (window.location.pathname === path) {
      e.target.style.color = "#000";
    } else {
      e.target.style.color = "rgba(0,0,0,0.5)"; 
    }
  };

  render() {
    const { classes, closeHandler } = this.props;

    return (
      <div className={classes.root}>
        <Paper square className={classes.wrapper}>
          <IconButton onClick={closeHandler} className={classes.icon}>
            <CloseIcon style={{ color: "#8C1515", transform: "scale(1.25)" }} />
          </IconButton>
          <Grid container className={classes.grid}>
            <Grid item xs={12}>
              <p
                className={classes.text}
                onClick={() => window.location.pathname = "/"}
                onMouseOver={e => e.target.style.color = "#8C1515"}
                onMouseOut={e => this.mouseExit(e, "/")}
                style={
                  window.location.pathname === "/" ? { color: "#000" } : { color: "rgba(0,0,0,0.5)" }
                }
              >
                Assignments
              </p>
            </Grid>
            <Grid item xs={12}>
            <p
                className={classes.text}
                onClick={() => window.location.pathname = "/classes"}
                onMouseOver={e => e.target.style.color = "#8C1515"}
                onMouseOut={e => this.mouseExit(e, "/classes")}
                style={
                  window.location.pathname === "/classes" ? { color: "#000" } : { color: "rgba(0,0,0,0.5)" }
                }
              >
                Classes
              </p>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Menu);
