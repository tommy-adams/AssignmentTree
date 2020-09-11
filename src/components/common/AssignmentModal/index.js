import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as assignmentAction from "../../../actions/assignmentActions";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style";

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...assignmentAction }, dispatch)
});

class AssignmentModal extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    mode: PropTypes.string.isRequired,
    classList: PropTypes.array.isRequired,
    closeHandler: PropTypes.func.isRequired,
    activeData: PropTypes.object
  };

  constructor(props) {
    super(props);
    const { activeData, mode } = props;
    this.state = mode === "edit" ? {
      name: activeData.name,
      classId: activeData.class_id,
      className: activeData.class_name,
      dueDate: activeData.due,
      description: activeData.description,
      completed: activeData.completed
    } : {
      name: "",
      classId: 0,
      className: "",
      dueDate: new Date(),
      description: ""
    };
  };

  handleTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClassSelect = e => {
    const { classList } = this.props;
    const className = classList.filter(c => e.target.value === c.value)[0].label;
    this.setState({ className, classId: e.target.value });
  };

  handleDateChange = e => {
    this.setState({ dueDate: e });
  };

  onCreate = async () => {
    const { actions, closeHandler } = this.props;
    const { name, classId, className, dueDate, description } = this.state;
    const data = {
      class_id: classId,
      class_name: className,
      name,
      due: dueDate,
      description,
      completed: false
    };

    try {
      await actions.createAssignment(data);
      closeHandler();
    } catch (err) {
      console.error(err);
    }
  };

  onUpdate = async () => {
    const { actions, closeHandler } = this.props;
    const { name, classId, className, dueDate, description, completed } = this.state;
    const data = {
      class_id: classId,
      class_name: className,
      name,
      due: dueDate,
      description,
      completed
    };

    try {
      await actions.updateAssignment(data);
      closeHandler();
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { classes, classList, closeHandler, mode } = this.props;
    const { dueDate, classId, name, description } = this.state;

    return (
      <div className={classes.root}>
        <Paper className={classes.wrapper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <p className={classes.title}>Add Assignment</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Assignment Name"
                className={classes.form}
                onChange={this.handleTextChange}
                name="name"
                value={name}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.form}>
                <InputLabel>Class</InputLabel>
                <Select
                  value={classId}
                  onChange={this.handleClassSelect}
                >
                  {classList.map(c => {
                    return <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <KeyboardDatePicker
                className={classes.form}
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                id="date-picker-inline"
                label="Due Date"
                value={dueDate}
                onChange={this.handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                className={classes.form}
                name="description"
                onChange={this.handleTextChange}
                value={description}
              />
            </Grid>
            <div className={classes.btnWrapper}>
              <Button
                className={classes.button}
                variant="outlined"
                color="secondary"
                onClick={closeHandler}
              >
                CANCEL
              </Button>
              <Button
                className={classes.button}
                variant="outlined"
                color="primary"
                onClick={mode === "create" ? this.onCreate : this.onUpdate}
              >
                SAVE
              </Button>
            </div>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(AssignmentModal));