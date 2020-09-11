import React, { Component } from "react";
import PropTypes from "prop-types";
import * as assignmentAction from "../../actions/assignmentActions";
import * as classAction from "../../actions/classActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Header from "../common/Header";
import EnhancedTable from "../common/EnhancedTable";
import AssignmentModal from "../common/AssignmentModal";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style";

const mapStateToProps = state => {
  const { assignments, total } = state.assignment;
  const { schedule } = state.sched;
  const classList = schedule.map(c => ({
    value: c._id,
    label: c.name
  }));
  classList.unshift({ value: 0, label: "All" });
  return {
    classAssignments: { assignments, total },
    classList
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...assignmentAction, ...classAction }, dispatch)
});

const columnData = [
  { id: "class", label: "Class"},
  { id: "name", label: "Assignment"},
  { id: "description", label: "Description"},
  { id: "due", label: "Due"},
  { id: "complete", label: "Complete" }
];

class Home extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    classAssignments: PropTypes.object.isRequired,
    classList: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedClass: 0,
      modalOpen: false,
      modalMode: "",
      activeData: {}
    };
  };

  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = async () => {
    const { actions } = this.props;
    const { loading } = this.state;
    
    if (!loading) {
      this.setState({ loading: true });
      try {
        await actions.loadAssignments();
        await actions.loadClasses();
      } catch (err) {
        console.error(err);
      }
      this.setState({ loading: false });
    }
  };

  renderPopMenuItems = (open, handleClose, anchorEl, item) => {
    return (
      <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <List>
          <ListItem button onClick={e => this.onEdit(item, handleClose)}>
            <ListItemText primary="Edit" />
          </ListItem>
          <ListItem button onClick={e => this.markItemComplete(item, handleClose)}>
            <ListItemText primary={!item.completed ? "Mark as complete" : "Mark as incomplete"} />
          </ListItem>
          <ListItem button onClick={e => this.onDelete(item, handleClose)}>
            <ListItemText primary="Delete" />
          </ListItem>
        </List>
      </Popover>
    );
  };

  markItemComplete = async (target, closeHandler) => {
    const { actions } = this.props;

    const data = {
      _id: target._id,
      class_id: target.class_id,
      class_name: target.class_name,
      due: target.due,
      description: target.description,
      completed: !target.completed,
      name: target.name
    };
    try {
      await actions.updateAssignment(data);
    } catch (err) {
      console.error(err);
    }
    closeHandler();
  };

  onDelete = async (target, closeHandler) => {
    const { actions } = this.props;
    const query = `?_id=${target._id}`;
    console.log(target);
    try {
      await actions.deleteAssignment(query);
    } catch (err) {
      console.error(err);
    }
    closeHandler();
  };

  onEdit = (target, closeHandler) => {
    this.setState({ modalMode: "edit" });
    this.setState({ activeData: target });
    this.toggleModal();
    closeHandler();
  };

  handleSelect = e => {
    this.setState({ selectedClass: e.target.value });
  };

  toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({ modalOpen: !modalOpen });
  };

  render() {
    const {
      classes,
      classAssignments: {
        assignments,
        total
      },
      classList
    } = this.props;
    const { selectedClass, modalOpen, modalMode, activeData } = this.state;
    const filteredData = selectedClass === 0 ? assignments : assignments.filter(a => a.class_id === selectedClass);
    const numRows = selectedClass === 0 ? total : filteredData.length;

    return (
      <>
        <Header />
        {modalOpen &&
          <AssignmentModal
            mode={modalMode}
            closeHandler={this.toggleModal}
            classList={classList}
            activeData={activeData}
          />
        }
        <div className={classes.root}>
          <p className={classes.title}>Welcome!</p>
          <p className={classes.text}>please use this platform to keep track of your assignments at Stanford University :)</p>
          {classList.length > 1 &&
            <FormControl variant="filled" className={classes.selectForm}>
              <InputLabel style={{ color: "#FFF" }}>Class</InputLabel>
              <Select
                disableUnderline
                value={selectedClass}
                onChange={this.handleSelect}
                IconComponent={ExpandMoreIcon}
                style={{ color: "#FFF" }}
                inputProps={{
                  classes: {
                    icon: classes.selectIcon
                  }
                }}
              >
                {classList.map(c => {
                  return <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
                })}
              </Select>
            </FormControl>
          }
          <EnhancedTable columnData={columnData} data={filteredData} rows={numRows || 0} menuFunc={this.renderPopMenuItems} />
          <Fab 
            className={classes.fab}
            onClick={() => this.setState({ modalOpen: true, modalMode: "create" })}
          >
            <AddIcon />
          </Fab>
        </div>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
