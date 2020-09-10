import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as classAction from "../../../actions/classActions";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style";

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...classAction }, dispatch)
});

class ClassForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    mode: PropTypes.string.isRequired,
    closeHandler: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      prof: "",
      subject: ""
    };
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCancel = () => {
    const { closeHandler } = this.props;
    this.setState({ name: "" });
    this.setState({ prof: "" });
    this.setState({ subject: "" });
    closeHandler();
  };

  onSave = async () => {
    const { actions, closeHandler } = this.props;
    const { name, prof, subject } = this.state;

    const data = {
      name,
      professor: prof,
      subject
    };

    try {
      await actions.createClass(data);
    } catch (err) {
      console.error(err);
    }

    closeHandler();
  };

  render() {
    const { classes } = this.props;
    const { name, prof, subject } = this.state;

    return (
      <Paper className={classes.root}>
        <p className={classes.title}>Add a Class</p>
        <Grid container>
          <Grid className={classes.gridItem} item xs={12}>
            <TextField
              className={classes.form}
              name="name"
              label="Class name"
              onChange={this.handleChange}
              value={name}
            />
          </Grid>
          <Grid className={classes.gridItem} item xs={6}>
            <TextField
              className={classes.form}
              name="prof"
              label="Professor"
              onChange={this.handleChange}
              value={prof}
            />
          </Grid>
          <Grid className={classes.gridItem} item xs={6}>
            <TextField
              className={classes.form}
              name="subject"
              label="Subject"
              onChange={this.handleChange}
              value={subject}
            />
          </Grid>
          <Grid className={classes.btnWrapper} item xs={12}>
            <IconButton onClick={this.onCancel}>
              <CancelIcon className={classes.btn} />
            </IconButton>
            <IconButton onClick={this.onSave}>
              <SaveIcon className={classes.btn} />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(ClassForm));
